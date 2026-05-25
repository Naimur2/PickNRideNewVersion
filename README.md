# PickNRide - Vehicle Sharing & Ride Tracking App

PickNRide is a cross-platform mobile application built using **React Native** and **Expo**. Based on its architecture, it is designed as a **self-service vehicle sharing/rental platform** (similar to Lime or Zipcar), heavily focusing on real-time location tracking, QR code scanning for vehicle unlocking, and a seamless ride experience.

## 🎯 What is the project built for?

PickNRide is built to allow users to:
- **Discover nearby vehicles:** Users can view the nearest available cars or rides on an interactive map.
- **Unlock and start rides:** Users can scan a QR code or barcode on the vehicle to start their trip (`ScanQrCode`, `StartEndRide` modules).
- **Manage trips:** The app tracks the trip details, speed, ride history, and OTP verifications for security (`TripDetails`, `TripOtpScreen`).
- **Handle Payments:** Integrated with **MyFatoorah**, a prominent payment gateway in the MENA region, to handle wallets, pricing, and receipts.
- **User Verification:** Handles document submissions (ID/License) and citizenship selection during onboarding (`DocumentSubmission`, `SelectCitizenShip`).

## ⚙️ Why it is working (Core Mechanisms)

The application relies on several interconnected systems to deliver its core functionality:
1. **Background Location Tracking:** It uses `expo-task-manager` and `expo-location` to track the user's location continuously, even in the background. This calculates real-time speed and updates the user's position relative to available vehicles.
2. **Real-time Map Data:** Uses `useGetNearestCarsApiQuery` (via RTK Query) to poll the backend for vehicles nearby based on the user's current coordinates.
3. **Weather Integration:** Automatically fetches real-time weather data based on the user's coordinates to provide environmental context (temperature, conditions) to the rider.
4. **Deep Linking:** Configured to handle deep links (`picknride://` and `webapi.pickandride.qa`) to smoothly redirect users from emails or SMS straight into specific app screens like Login.

## 🏗️ Why what we have here (Architecture & Stack)

- **React Native & Expo:** Chosen for fast, cross-platform mobile development (iOS/Android) with deep native module support (Camera, Location, Maps) without managing complex native codebases.
- **Redux Toolkit & Redux Persist:** For robust, centralized state management. Redux Persist ensures that authentication tokens, user preferences, and critical state survive app restarts.
- **React Navigation:** Handles complex routing, including deeply nested Auth stacks, Drawer navigations, and Bottom Tabs.
- **React Native Maps:** Essential for the core experience of viewing location, pinning vehicles, and drawing routes.
- **UI/UX Stack (`styled-components`, `native-base`, `moti`):** Provides a highly customizable, theme-able, and animated user interface.
- **MyFatoorah & Wallet:** Tailored for localized, secure payment processing directly within the app.

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd PickNRideNewVersion
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup:**
   - Add your Google Maps API Key to `app.json` under `android.config.googleMaps.apiKey` and `ios.config.googleMapsApiKey`.
   - Ensure `config.ts` has the correct `WEATHER_API_KEY` and backend API endpoints.

4. **Start the development server:**
   ```bash
   npx expo start
   ```

## 📱 Essential Permissions
- **Location:** (Foreground & Background) Critical for tracking rides, finding cars, and speed calculation.
- **Camera:** Required for scanning QR/Barcodes to unlock vehicles.
- **Storage/Photos:** Required for submitting ID/License documents for user verification.
