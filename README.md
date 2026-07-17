# Mobile App (Expo + Clerk + Stream)

A modern, high-performance mobile application built with **Expo (React Native)**, featuring secure user authentication via **Clerk**, and real-time communication powered by **GetStream**.

## Features

*   **Authentication:** Secure, seamless user authentication (OAuth, Email/Password) via Clerk.
*   **Real-time Communication:** High-fidelity chat or video feeds powered by Stream.
*   **Cross-Platform:** Shared codebase for seamless performance on both iOS and Android.
*   **Expo Router:** File-based routing for native navigation.

---

## Tech Stack

*   **Framework:** [Expo](https://expo.dev/) (React Native)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **Real-time Infrastructure:** [GetStream](https://getstream.io/)
*   **Language:** TypeScript

---

## Prerequisites

Before setting up the project locally, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
*   [Expo Go](https://expo.dev/go) app installed on your physical device, or an iOS Simulator / Android Emulator.

---

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository
```bash
git clone [https://github.com/Soham9825/Connect-ChatsAndVideoCall.git](https://github.com/Soham9825/Connect-ChatsAndVideoCall.git)
cd CONNECT 
```


### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup
```bash
Create a file named .env.local in the root directory of your project and paste the following environment variables. Replace the key placeholders with your actual credentials from the Clerk and GetStream dashboards.

# Clerk Authentication Keys
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

# GetStream Live Keys
EXPO_PUBLIC_STREAM_API_KEY=your_stream_api_key_here
STREAM_SECRET_KEY=your_stream_secret_key_here
```

### 4. Run the Application
```bash
npx expo start
```
