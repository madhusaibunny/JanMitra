# 🇮🇳 JanMitra - Your Personal Election Guide

JanMitra is an interactive, highly accessible Progressive Web App (PWA) designed to guide citizens through the Indian election process. It empowers users, especially first-time voters and those with low literacy, by providing clear, step-by-step guidance, a modern interactive UI, and an intelligent AI chatbot.

## ✨ Key Features

* **Interactive Election Journey:** A step-by-step guide explaining the entire voting process, from registration to casting a ballot.
* **Intelligent AI Chatbot:** Powered by Google's **Gemini 2.5 Flash**, the built-in AI assistant dynamically answers any question related to the election process in real-time.
* **Secure Authentication:** Integrated with Google Firebase for secure Email/Password registration, along with a friction-free "Continue as Guest" mode.
* **Cloud Database:** Stores user login instances securely using Firebase Firestore.
* **Progressive Web App (PWA):** Installable directly on mobile devices with offline capabilities and a native-app feel.
* **Responsive & Accessible Design:** Built with high-contrast UI elements, smooth micro-animations, and full mobile responsiveness.

## 🛠️ Technology Stack

* **Frontend Framework:** React 18 (Vite)
* **Styling:** Custom Vanilla CSS with modern Glassmorphism & Animations
* **AI Integration:** Google Gemini API (`gemini-2.5-flash`)
* **Backend / Database:** Firebase Authentication & Firestore
* **Icons:** Lucide React
* **Deployment:** Containerized via Docker and deployed on **Google Cloud Run**

## 🚀 Getting Started Locally

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

* Node.js (v18 or higher)
* A Google Cloud Project (for Gemini API)
* A Firebase Project

### Installation

1. **Clone the repository or download the source code:**
   ```bash
   git clone <your-repository-url>
   cd JanMitra
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## ⚙️ Firebase Configuration

To enable the backend database and authentication, you must connect the app to your own Firebase project.

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a Web App and retrieve your `firebaseConfig` object.
3. Open `src/firebase.js` and replace the configuration object with your own keys.
4. Go to **Authentication** in the Firebase Console and enable **Email/Password**.
5. Go to **Firestore Database** and create a database (Start in Test Mode).

## 🚢 Deployment (Google Cloud Run)

This application is fully configured for containerized deployment on Google Cloud Run.

1. Ensure your Google Cloud CLI is authenticated and billing is enabled.
2. Build and deploy using the Cloud Run source deployment:
   ```bash
   gcloud run deploy janmitra --source . --region us-central1 --allow-unauthenticated
   ```

---
*Built with ❤️ to strengthen democracy.*
