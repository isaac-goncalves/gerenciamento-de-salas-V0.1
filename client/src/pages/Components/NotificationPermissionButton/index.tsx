import React from "react";

import {firebaseApp, messaging} from "../../../../services/firebase"

import firebase from "firebase/app";
import "firebase/messaging";

const NotificationPermissionButton = () => {
  const handlePermissionRequest = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // const token = await messaging.getToken(); // Get the registration token
        // console.log("Registration token:", token);
        // You can send the token to the backend for further use
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  return (
    <button onClick={handlePermissionRequest}>
      Request Notification Permission
    </button>
  );
};

export default NotificationPermissionButton;