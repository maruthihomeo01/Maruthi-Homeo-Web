# Maruthi Homeo Centre · Web Application

Official modern web application for **Maruthi Homeo Centre Pharmacy - Clinic** (Shop No: 244/B, ESI Hospital Main Rd, 2nd Block, 41st Cross, Rajajinagar, Bengaluru, Karnataka 560010).

Built with **React 19**, **Vite 8**, and **Tailwind CSS v4**, featuring a high-performance clinical and pharmacy architecture with genuine German remedy catalog, WhatsApp order enquiry flow, and verified Google reviews.

---

## 🏗️ Commercial Architecture & Directory Structure

```
F:\Swasthya Homeo\
├── public/
│   ├── images/
│   │   ├── Logo.png                      # Brand logo (RGBA horizontal wordmark)
│   │   ├── Logo-white.png                # Brand logo in white for dark headers/footers
│   │   ├── Ayush.avif                    # Ministry of AYUSH statutory certification
│   │   ├── GMP.avif                      # Good Manufacturing Practice certification
│   │   ├── FSSAI.avif                    # Food & Health Safety compliance
│   │   ├── MadeinIndia.avif              # Made in India manufacturing badge
│   │   ├── clinic-apothecary.jpeg        # Full-bleed Hero slide 1 apothecary photo
│   │   ├── homeopathy-globules.jpeg      # Full-bleed Hero slide 2 globules photo
│   │   ├── botanicals-dropper.jpeg       # Full-bleed Hero slide 3 botanicals photo
│   │   └── treatments/                   # Curated, condition-specific treatment photos
├── src/
│   ├── assets/images/                    # Bundled high-res assets
│   ├── components/
│   │   ├── common/
│   │   │   ├── ConfirmationModal.jsx     # Booking confirmation modal with direct WhatsApp trigger
│   │   │   ├── MarqueeStrip.jsx          # Continuous animated clinical trust ticker
│   │   │   └── TrustindexReviews.jsx     # Live Trustindex Google Reviews auto-syncing widget
│   │   ├── contact/
│   │   │   └── GoogleMapEmbed.jsx        # Google Maps Embed & satellite toggle at Rajajinagar
│   │   └── layout/
│   │       ├── Header.jsx                # Sticky navbar with Logo.png, navigation & mobile drawer
│   │       ├── Footer.jsx                # Clinic footer with Logo-white.png, address, hours, legal info
│   │       └── WhatsAppWidget.jsx        # Floating WhatsApp interactive chat launcher with Logo.png
│   ├── context/
│   │   ├── navigation-context.js         # React Context definition
│   │   ├── NavigationProvider.jsx        # Global routing & prefilled booking state
│   │   ├── useNavigation.js              # Hook for navigation and booking actions
│   │   └── index.js                      # Context barrel export
│   ├── data/
│   │   └── clinicData.js                 # Complete treatments catalog, FAQs, doctors, hours, place IDs
│   ├── pages/
│   │   ├── HomePage.jsx                  # Full-bleed 78vh Hero Carousel, value props, services, Trustindex
│   │   ├── AboutPage.jsx                 # Practice background, process, licenses/accreditations (4 badges)
│   │   ├── TreatmentsPage.jsx            # Searchable & category-filtered treatment catalog
│   │   ├── FaqPage.jsx                   # Searchable & categorized accordion FAQ hub
│   │   └── ContactPage.jsx               # Interactive appointment form, session logs, Google Maps embed
│   ├── App.jsx                           # Application shell orchestrating layout and active pages
│   ├── index.css                         # Tailwind v4 theme tokens, fonts, and marquee animations
│   └── main.jsx                          # Root React DOM entry
├── index.html                            # Schema.org MedicalClinic metadata, Google Fonts, Logo favicon
├── package.json
└── vite.config.js
```

---

## ✨ Live Google Reviews Integration (Trustindex)

The application is connected to your live Google Business reviews via **Trustindex**:
* **Script**: `https://cdn.trustindex.io/loader.js?46d700f860b8154ae2668874f34`
* Automatically displays genuine, verified patient reviews pulled directly from your Google Business Profile.
* Includes direct **"Write a Review"** and **"View on Google Maps"** links.

---

## 🚀 Running the Project

```bash
# Navigate to the project folder
cd "F:\Swasthya Homeo"

# Start the Vite development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
