"use client"

import Wrapper from "./Wrapper"

export default function ContactForm() {
    // const [isClient, setIsClient] = useState(false)
    // const [formData, setFormData] = useState({
    //     name: "",
    //     email: "",
    //     message: "",
    // })
    // const [isSubmitting, setIsSubmitting] = useState(false)
    // const [submitResult, setSubmitResult] = useState(null)

    // useEffect(() => {
    //     setIsClient(true)
    // }, [])

    // // Add new effect for clearing submit result
    // useEffect(() => {
    //     if (submitResult) {
    //         const timeout = setTimeout(() => {
    //             setSubmitResult(null)
    //         }, 2000)

    //         return () => clearTimeout(timeout)
    //     }
    // }, [submitResult])

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     setIsSubmitting(true)
    //     setSubmitResult(null)

    //     const form = e.target
    //     const formData = new FormData(form)

    //     const result = await sendEmail(formData)
    //     setIsSubmitting(false)
    //     setSubmitResult(result)

    //     if (result.success) {
    //         setFormData({ name: "", email: "", phone: "", message: "" })
    //     }
    // }

    // if (!isClient) {
    //     return null
    // }

    return (
        <Wrapper className="pt-8">
            <div className="relative">
                <form
                    className="relative bg-white text-black rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100">
                    {/* Themed header */}
                    <div className="mb-4">
                        <div className="flex items-center mb-3">
                            
                            <h3 className="text-2xl font-medium ">Contact Form</h3>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-5">
                        <div className="w-full">
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    required

                                    className="w-full pl-10 px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 
                            
                            transition-all duration-300 outline-none"
                                    placeholder="Your full name"

                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                   
                                    className="w-full pl-10 px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 
                            
                            transition-all duration-300 outline-none"
                                    placeholder="your@email.com"

                                />
                            </div>
                        </div>


                        <div className="w-full">
                            <label className="block text-sm font-medium mb-1.5 text-gray-700">Message</label>
                            <div className="relative">
                                <div className="absolute top-3 left-0 flex items-start pl-3 pointer-events-none text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                </div>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full pl-10 px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 transition-all duration-300 outline-none resize-none"
                                    placeholder="Share details about your event type, date, expected guests, and any special requirements..."

                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full  text-white py-3 px-6 rounded-lg
                      transition-all duration-300
                      focus:outline-none focus:ring-2 
                      font-medium disabled:opacity-70 disabled:cursor-not-allowed
                      flex items-center justify-center"
                        >
                            Submit
                        </button>
                    </div>

                </form>
            </div>
        </Wrapper>
    )
}