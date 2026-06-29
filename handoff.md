# Portfolio Project Handoff Guide

This project is a high-fidelity, dynamic portfolio website built using **Next.js (App Router)** and **Vanilla CSS**. It is fully structured, localized to your workspace, and prepared for GitHub synchronization and Vercel hosting.

---

## 📂 Project Structure

Here is a breakdown of the files in this workspace:
*   [package.json](file:///Users/daniellee/Downloads/%23personal/portfolio/package.json): Handles dependencies (Next.js, React, Lucide-react, Framer-motion) and scripts.
*   [next.config.mjs](file:///Users/daniellee/Downloads/%23personal/portfolio/next.config.mjs): Core configuration for the Next.js framework.
*   [jsconfig.json](file:///Users/daniellee/Downloads/%23personal/portfolio/jsconfig.json): Absolute import mapping configuration (using `@/*` relative to root).
*   [.gitignore](file:///Users/daniellee/Downloads/%23personal/portfolio/.gitignore): Specifies build artifacts, environment files, and node modules to ignore in Git.
*   [src/app/layout.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/layout.js): Root layout. Establishes the HTML structure, SEO metadata, and background glow styling.
*   [src/app/globals.css](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/globals.css): Central stylesheet containing custom design tokens, dark theme parameters, keyframes, scrollbar settings, and component styles.
*   [src/app/page.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/page.js): Core portfolio page rendering the interactive sections: Hero (Home), Research Abstracts, Experience, Beyond Physics (Hobbies), and Let's Connect (Contact).
*   [src/app/components/Navbar.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/components/Navbar.js): Fixed client-side navbar featuring responsive collapsible menu and dark/light theme switching. Includes the custom Outlined Star logo.
*   [src/app/components/ProjectCard.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/components/ProjectCard.js): Cards with hover zoom effects, tags, publication dates, and AAPM presentation badges.
*   [src/app/components/GridPattern.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/components/GridPattern.js): Spacetime gravity warp canvas grid background with actively generated, slow-twinkling stars that warp around the cursor.
*   [src/app/components/BubbleChamber.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/components/BubbleChamber.js): Programmatic circular logarithmic decay spiral rendering a three-layer glowing, decaying particle travel animation.
*   [src/app/components/CTHelix.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/components/CTHelix.js): Custom 3D rotating helical scanner graphic with laser scan sweeps, which sits horizontally underneath your contact information.
*   [src/app/components/ContactForm.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/components/ContactForm.js): Form handling contact messages, validation, and submission state.
*   [src/app/api/contact/route.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/api/contact/route.js): Serverless endpoint processing the contact form submissions.

---

## 🚀 How to Run Locally

If you clone or open this workspace elsewhere, follow these commands to run it locally:

### 1. Prerequisite
Ensure you have **Node.js** (v18.0.0 or higher recommended) and **npm** installed. You can verify this by running:
```bash
node -v
npm -v
```

### 2. Dependency Installation
Run the following command in the project root directory:
```bash
npm install
```
*Note: This will install Next.js, React, React-DOM, Lucide-react (for icons), and Framer-motion (for animation engines).*

### 3. Local Development Server
Launch the local server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view your portfolio.

---

## 🌐 Storing Code on GitHub

To push this codebase to your GitHub account:

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    git checkout -b main
    ```
2.  **Add and Commit your files**:
    ```bash
    git add .
    git commit -m "feat: complete portfolio improvements"
    ```
3.  **Link to a GitHub Repository**:
    *   Go to [GitHub](https://github.com) and create a new repository named `portfolio` (leave it empty without initializing README or gitignore).
    *   Copy the remote repository URL and run:
        ```bash
        git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
        ```
4.  **Push the code**:
    ```bash
    git push -u origin main
    ```

---

## ⚡ Hosting on Vercel

Vercel provides native, optimized hosting for Next.js with automatic continuous integration.

1.  **Sign Up / Log In**:
    Navigate to [Vercel](https://vercel.com) and sign in using your GitHub account.
2.  **Import Project**:
    *   Click **"Add New"** > **"Project"** in your Vercel Dashboard.
    *   Select your GitHub repository `portfolio` and click **"Import"**.
3.  **Configure Environment Variables**:
    *   Under the **Environment Variables** accordion, add the following key/value pair:
        *   **Key:** `GITHUB_USERNAME`
        *   **Value:** `ddaniiiiell` (or your actual GitHub username)
    *   *This will tell the `/api/github` route which profile to fetch repositories from.*
4.  **Deploy**:
    *   Click **"Deploy"**. Vercel will build and host your portfolio within a minute.
    *   Every time you push new commits to GitHub's `main` branch, Vercel will automatically build and deploy a fresh production version!

---

## 🎨 Customizing Content

When you want to tweak or customize the portfolio contents:
*   **Research Abstracts (Publications):** Edit the `projects` array inside [src/app/page.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/page.js#L33-L64) to modify links, titles, descriptions, dates, or AAPM presentation tags.
*   **Experience Timeline:** Edit the `experience` array in [src/app/page.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/page.js#L65-L81).
*   **Beyond Physics (Hobbies):** Edit the cards array in the hobbies section markup of [src/app/page.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/page.js#L190-L245).
*   **Social & Contact Info:** Change the contact details, phone numbers, and addresses in [src/app/page.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/page.js#L250-L285).
*   **Visual Style / Colors:** Adjust colors by tweaking the CSS variables inside `:root` (dark mode) or `[data-theme="light"]` (light mode, soft purple/white theme) of [src/app/globals.css](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/globals.css#L3-L45).
*   **Spacetime Stars Grid:** Edit background star numbers, pulse rates, or warping coefficients in [src/app/components/GridPattern.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/components/GridPattern.js).
*   **Decay Spiral Animation:** Modify decay speeds or coordinate dimensions in [src/app/components/BubbleChamber.js](file:///Users/daniellee/Downloads/%23personal/portfolio/src/app/components/BubbleChamber.js).
