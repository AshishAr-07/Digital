# CatchyDeals Digital Store

CatchyDeals is a modern, high-performance Next.js digital marketplace for printable holiday party games, festive bingo bundles, customizable party invitations, and digital greeting cards. All designs are ready for instant download and 100% editable in free Canva accounts.

---

## Key Features

- **Instant Digital Delivery**: Direct Canva template access and PDF guides delivered immediately upon payment.
- **Frictionless Guest Checkout**: Customers can purchase with full name and email—no mandatory accounts or passwords required.
- **Razorpay Integration**: Server-validated pricing and cryptographic HMAC-SHA256 signature verification.
- **Comprehensive Technical SEO**:
  - Dynamic XML sitemap (`/sitemap.xml`) generated automatically from database products.
  - Search engine directives (`/robots.txt`) with strict `noindex` protection on administrative and order pages.
  - Schema.org structured data (`WebSite`, `Organization`, `FAQPage`, `Product`, `Offer`).
  - Open Graph, Twitter cards, and canonical URL tags across all pages.
- **Responsive & Accessible UI**: Optimized for mobile, tablet, and desktop with zero layout shift and fast Core Web Vitals.

---

## Environment Variables

Create or update `.env` in the project root:

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.bcsom.mongodb.net/digital?retryWrites=true&w=majority

# Site Production URL (Required for canonical URLs, sitemaps, and structured data)
NEXT_PUBLIC_SITE_URL=https://catchydeals.in

# Razorpay Credentials
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx

# Admin Email (For Clerk Admin Access)
ADMIN_EMAIL=rawatzon@gmail.com
```

In `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

---

## Development & Production Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build & verify routes
npm run build

# Start production server
npm start
```

---

## Search Engine Optimization & Google Search Console Submission Guide

Follow these steps to submit the sitemap and request indexing once deployed to your production domain:

### Step 1: Set the Production Domain
Ensure `NEXT_PUBLIC_SITE_URL` in your hosting environment (e.g. Vercel, VPS) is set to your exact live domain (e.g. `https://catchydeals.in`). This ensures canonical tags, Open Graph URLs, and the sitemap reflect your live origin.

### Step 2: Verify Site Ownership in Google Search Console
1. Open [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** and choose **Domain** (recommended) or **URL Prefix**.
3. Verify ownership:
   - **DNS Verification (Recommended)**: Add the TXT record provided by Google to your domain registrar (e.g. GoDaddy, Namecheap, Cloudflare).
   - **HTML Tag**: Alternatively, add Google's verification meta tag to the `other` object in `app/layout.js`.

### Step 3: Submit the XML Sitemap
1. In the Google Search Console sidebar, navigate to **Sitemaps** (under *Indexing*).
2. In the "Add a new sitemap" input, enter `sitemap.xml` (the full URL is `https://<your-domain>/sitemap.xml`).
3. Click **Submit**.
4. Confirm that the status changes to **Success**. The sitemap dynamically lists the homepage, all public product pages, and policy pages.

### Step 4: Request Indexing for Priority Pages
1. Use the **URL Inspection** bar at the top of Google Search Console.
2. Enter your homepage URL (`https://<your-domain>/`) and click Enter.
3. Once the live test finishes, click **Request Indexing**.
4. Repeat this for your top product URLs (`https://<your-domain>/product/<id>`).

> [!NOTE]
> Submitting a sitemap informs search engines of your pages and initiates the crawling schedule; it does not guarantee immediate indexation. Google will crawl, evaluate, and index pages based on quality, crawl budget, and domain authority over several days or weeks.

---

## Admin Management

- Access the admin portal at `/admin`.
- Admin routes are protected by Clerk authentication and restricted to emails matching `ADMIN_EMAIL`.
- Customer purchases remain 100% guest-friendly and never require sign-in.
