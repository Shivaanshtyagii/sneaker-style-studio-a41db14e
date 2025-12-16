# 👟 Sneaker Studio - Product Customizer

A modern, interactive web application that allows users to design, customize, and preview sneakers in real-time. Built as a technical assignment for the Frontend Developer Intern role.

![Sneaker Studio Banner](https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop)

## 🚀 Live Demo & Test Credentials

* **Live URL:** [Insert Your Vercel/Netlify Link Here]
* **GitHub Repo:** [Insert Your GitHub Link Here]

### 🧪 Test Account
To test the full functionality (Saving designs, Gallery, AI features), use these credentials:
* **Email:** `demo@example.com`
* **Password:** `password123`

---

## 👶 Explanation for a Kid
Imagine a digital coloring book for sneakers! You can pick any colors you like for the laces, sole, and top. You can even write your name on the shoe. When you are done, you can save your special design to show your friends later!

---

## ✨ Features

### ✅ Core Requirements (Completed)
* **Authentication:** Secure Login/Signup using Supabase Auth (Email/Password) with protected routes.
* **Real-time Customization:** Interactive UI to change colors of specific parts (Sole, Upper, Laces, Logo).
* **Material Toggle:** Switch between different textures (e.g., "Matte" vs. "Shiny").
* **Personalization:** text engraving input to add a name or custom text to the sneaker.
* **Live Preview:** Dynamic SVG-based preview with smooth Framer Motion animations.
* **Export Design:** "Export Image" button to download high-resolution PNGs of the custom design.
* **Design Gallery:** Save creations to the cloud (Supabase) and view/edit them later in a responsive grid.

### 🤖 Bonus Features (Completed)
* **AI Designer:** Integrated **Google Gemini 2.0 Flash** to auto-generate creative color palettes based on natural language prompts (e.g., "Ocean vibe", "Cyberpunk", "Sunset").

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Styling:** Tailwind CSS, Shadcn UI, Lucide React
* **State Management:** Zustand
* **Animations:** Framer Motion
* **Data Fetching:** TanStack Query
* **Backend & Auth:** Supabase (PostgreSQL, Auth, Row Level Security)
* **AI Integration:** Google Gemini API (via Supabase Edge Functions)
* **Image Generation:** html-to-image

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/sneaker-style-studio.git](https://github.com/your-username/sneaker-style-studio.git)
cd sneaker-style-studio
