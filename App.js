import React from "react";
import Home from "./Home";
import messaging from "@react-native-firebase/messaging";

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
  onMessageReceived(remoteMessage);
});

export default function App() {
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      onMessageReceived(remoteMessage);
    });

    return unsubscribe;
  }, []);
  return <Home />;
}
