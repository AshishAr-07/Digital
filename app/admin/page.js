"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salePrice: "",
    originalPrice: "",
    imagesPath: [""],
    canvaUrl: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    verifyAdmin();
    fetchProducts();
  }, []);

  const verifyAdmin = async () => {
    try {
      const response = await axios.get("/api/auth/isadmin");
      if (response.data.success && response.data.isAdmin) {
        setIsAdmin(true);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Admin verification failed:", error);
      router.push("/");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/product");
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      showMessage("error", error.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.imagesPath];
    newImages[index] = value;
    setFormData({ ...formData, imagesPath: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, imagesPath: [...formData.imagesPath, ""] });
  };

  const removeImageField = (index) => {
    if (formData.imagesPath.length > 1) {
      const newImages = formData.imagesPath.filter((_, i) => i !== index);
      setFormData({ ...formData, imagesPath: newImages });
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title,
        description: product.description,
        salePrice: product.salePrice,
        originalPrice: product.originalPrice,
        imagesPath: product.imagesPath && product.imagesPath.length > 0 ? product.imagesPath : [""],
        canvaUrl: product.canvaUrl,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: "",
        description: "",
        salePrice: "",
        originalPrice: "",
        imagesPath: [""],
        canvaUrl: "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      title: "",
      description: "",
      salePrice: "",
      originalPrice: "",
      imagesPath: [""],
      canvaUrl: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Filter out empty image paths
      const filteredImages = formData.imagesPath.filter(img => img.trim() !== "");
      
      if (filteredImages.length === 0) {
        showMessage("error", "At least one image is required");
        setLoading(false);
        return;
      }

      const url = "/api/product";
      const body = editingProduct
        ? { ...formData, imagesPath: filteredImages, id: editingProduct._id }
        : { ...formData, imagesPath: filteredImages };

      const response = editingProduct
        ? await axios.put(url, body)
        : await axios.post(url, body);

      if (response.data.success) {
        showMessage("success", response.data.message);
        closeModal();
        fetchProducts();
      } else {
        showMessage("error", response.data.message);
      }
    } catch (error) {
      console.error("Submit error:", error);
      showMessage("error", error.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    try {
      const response = await axios.delete(`/api/product?id=${id}`);

      if (response.data.success) {
        showMessage("success", "Product deleted successfully");
        fetchProducts();
      } else {
        showMessage("error", response.data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      showMessage("error", error.response?.data?.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <div className="text-xl text-white">Verifying access...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Product Management
              </h1>
              <p className="text-gray-400">Manage your digital products inventory</p>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              ✨ Add Product
            </button>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl border-l-4 animate-slide-in ${
              message.type === "success"
                ? "bg-green-500/10 border-green-500 text-green-400"
                : "bg-red-500/10 border-red-500 text-red-400"
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{message.type === "success" ? "✅" : "❌"}</span>
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {loading && products.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <div className="text-xl text-gray-400">Loading products...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-gray-800/50 rounded-2xl border border-gray-700">
            <div className="text-6xl mb-4">📦</div>
            <div className="text-2xl text-gray-300 mb-2">No products yet</div>
            <div className="text-gray-500">Add your first product to get started!</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.imagesPath && product.imagesPath[0] ? product.imagesPath[0] : "/placeholder.png"}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {product.imagesPath && product.imagesPath.length > 1 && (
                    <div className="absolute top-3 right-3 bg-linear-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      +{product.imagesPath.length - 1} more
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                    {product.description}
                  </p>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold bg-linear-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      ${product.salePrice}
                    </span>
                    {product.originalPrice && product.originalPrice !== product.salePrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(product)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
              <div className="sticky top-0 bg-linear-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
                <h2 className="text-3xl font-bold text-white">
                  {editingProduct ? "✏️ Edit Product" : "✨ Add New Product"}
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      📝 Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                      placeholder="Amazing Product Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      📄 Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all resize-none"
                      placeholder="Describe your product in detail..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        💰 Sale Price ($)
                      </label>
                      <input
                        type="number"
                        name="salePrice"
                        value={formData.salePrice}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                        placeholder="19.99"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        🏷️ Original Price ($)
                      </label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleInputChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                        placeholder="29.99"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-semibold text-gray-300">
                        🖼️ Images (from public folder)
                      </label>
                      <button
                        type="button"
                        onClick={addImageField}
                        className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
                      >
                        ➕ Add Image
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Enter paths like: /card1.png or /images/product.jpg
                    </p>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                      {formData.imagesPath.map((image, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-lg text-gray-400 font-semibold shrink-0">
                            {index + 1}
                          </div>
                          <input
                            type="text"
                            value={image}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            required
                            className="flex-1 px-4 py-2.5 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                            placeholder="/card1.png"
                          />
                          {formData.imagesPath.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImageField(index)}
                              className="bg-red-600 hover:bg-red-700 text-white px-4 rounded-xl transition-colors shrink-0"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      🔗 Canva URL
                    </label>
                    <input
                      type="url"
                      name="canvaUrl"
                      value={formData.canvaUrl}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                      placeholder="https://canva.com/design/..."
                    />
                  </div>

                  <div className="flex gap-3 pt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {loading ? "⏳ Saving..." : editingProduct ? "💾 Update Product" : "✨ Create Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}