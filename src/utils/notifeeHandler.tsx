import notifee, { AndroidStyle } from "@notifee/react-native";
import validImageUrl from "./isValidImageUrl";

interface Message {
  type: "general";
  data: {
    notifee: string;
  };
}

interface Notifee {
  title: string;
  body: string;
  android: {
    channelId: string;
  };
  data: {
    id: string;
    type: "general";
    message: string;
    image?: string;
    largeText?: string;
  };
}

async function onMessageReceived(message: Message) {
  const { data, type } = message;

  console.log("onMessageReceived", message);

  const notifeeData = JSON.parse(data.notifee) as Notifee;
  await notifee.createChannel({
    id: "notifications",
    name: "MeatMoot Notifications",
    lights: true,
  });

  if (type === "general") {
    const imageUri = notifeeData?.["data"]?.["image"] as string;
    const largeText = notifeeData?.["data"]?.["largeText"] as string;

    const androidStyle: any = {};
    const iosStyle: any = {};

    if (imageUri && validImageUrl(imageUri)) {
      androidStyle.picture = validImageUrl(imageUri);
      androidStyle.type = AndroidStyle.BIGPICTURE;
      iosStyle.attachments = [{ url: imageUri }];
    }

    if (largeText) {
      androidStyle.summary = largeText;
      androidStyle.type = AndroidStyle.BIGTEXT;
    }

    await notifee.displayNotification({
      title: notifeeData.title,
      body: notifeeData.body,

      android: {
        channelId: "notifications",
        pressAction: {
          id: "default",
          launchActivity: "com.meatmoot.MainActivity",
        },
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
        ...iosStyle,
      },
      data: notifeeData?.data,
    });
  } else {
    await notifee.displayNotification({
      title: notifeeData.title,
      body: notifeeData.body,

      android: {
        channelId: "notifications",
        pressAction: {
          id: "default",
          launchActivity: "com.meatmoot.MainActivity",
        },
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
      data: notifeeData?.data,
    });
  }
}
// Do something

export default onMessageReceived;
