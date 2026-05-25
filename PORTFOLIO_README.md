# Portfolio Project: PickNRide

## 📝 Project Overview

**PickNRide** is a comprehensive, cross-platform mobile application designed to facilitate self-service vehicle sharing and ride tracking. Built from the ground up using **React Native** and **Expo**, it allows users to locate nearby vehicles on a map, scan QR codes to unlock them, and track their rides in real-time.

This project demonstrates my ability to build complex mobile applications that integrate hardware features (camera, GPS) with robust backend services, state management, and localized payment gateways.

---

## 🛠️ Tools & Technologies Used

### Frontend & Core Framework

- **React Native:** Used as the core framework to build a cross-platform application for both iOS and Android from a single codebase.
- **Expo:** Leveraged for rapid development, utilizing its managed workflow and powerful native modules without needing to write custom Swift/Kotlin code.
- **TypeScript:** Provided static typing, improving code maintainability and catching errors during development.

### State Management & API

- **Redux Toolkit (RTK):** Managed the global state of the application efficiently, avoiding prop drilling.
- **RTK Query:** Handled data fetching (e.g., polling for nearest cars based on coordinates) and caching.
- **Redux Persist:** Ensured that user authentication tokens and vital app state were preserved across app restarts.
- **Axios:** Used for specific API requests alongside RTK Query.

### Navigation & Routing

- **React Navigation (v6):** Implemented complex routing flows, including nested authentication stacks, secure user areas, bottom tabs, and custom drawer navigation.

### Native Integrations & Features

- **Expo Location & Task Manager:** Implemented background tasks to continuously track user coordinates and calculate vehicle speed (km/h) in real-time.
- **Expo Camera & Barcode Scanner:** Built the core flow for scanning QR codes on vehicles to unlock them and start rides.
- **React Native Maps:** Integrated interactive maps to display user location, pin nearby vehicles, and draw routes.
- **MyFatoorah Integration:** Integrated a prominent MENA-region payment gateway to handle wallet balances, pricing, and ride receipts securely.

### UI / UX & Styling

- **Styled Components & Native Base:** Built a scalable, component-driven design system.
- **Lottie React Native & Moti:** Added fluid micro-interactions and loading animations to give the app a premium, native feel.
- **Formik & Yup:** Handled complex form validations, especially during the multi-step user onboarding and document submission (ID/License verification).

---

## 🚀 Key Features & Technical Highlights

1. **Background Location Tracking:**
   Successfully implemented a reliable background location tracking system using `expo-task-manager`. This was a major technical challenge, requiring precise calculations to determine the speed of the ride and update the user's trajectory on the map in real-time.
2. **Dynamic Vehicle Discovery:**
   Engineered a seamless map experience where the app constantly polls for the nearest available vehicles (`useGetNearestCarsApiQuery`) relative to the user's changing coordinates.

3. **Secure Hardware Interaction:**
   Built a fast and responsive QR code scanning mechanism that communicates with the backend to validate and unlock physical vehicles securely.

4. **Weather Context Integration:**
   Added an environmental context feature that fetches real-time weather data based on the user's GPS coordinates, enhancing the rider's experience.

5. **Deep Linking Strategy:**
   Configured deep linking (`picknride://`) to allow users to transition smoothly from external links (like email verifications) directly into specific states of the app.

---
