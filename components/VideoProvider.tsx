import { COLORS } from "@/lib/theme";
import { useUser } from "@clerk/expo";
import {
    RingingCallContent,
    type Call,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

let StreamVideo: any = null;
let StreamVideoClient: any = null;
let useCalls: any = null;
let StreamCall: any = null;
let RingingCallContext: any = null;

try {
  const sdk = require("@stream-io/video-react-native-sdk");
  StreamVideo = sdk.StreamVideo;
  StreamVideoClient = sdk.StreamVideoClient;
  useCalls = sdk.useCalls;
  StreamCall = sdk.StreamCall;
  RingingCallContext = sdk.RingingCallContext;
} catch (error) {
  console.warn(
    "Stream Video SDK is not available. Please install @stream-io/video-react-native-sdk to use video calling features.",
  );
}

const sdkAvailable = !!StreamVideoClient && !!StreamVideo;
const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

function RingingCalls() {
  const calls = useCalls().filter((c: Call) => c.ringing);
  const ringingCalls = calls[0];
  if (!ringingCalls) return null;

  return (
    <StreamCall call={ringingCalls}>
      <SafeAreaView
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        }}
      >
        <RingingCallContent />
      </SafeAreaView>
    </StreamCall>
  );
}
const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<any>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!sdkAvailable || !isLoaded || !user) return;

    const tokenProvider = async () => {
      try {
        const response = await fetch("/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          throw new Error(
            `Token request failed with status ${response.status}`,
          );
        }

        const data = await response.json();
        return data.token;
      } catch (error) {
        console.error("Error fetching Stream video token:", error);
        throw error;
      }
    };

    const client = StreamVideoClient.getOrCreateInstance({
      apiKey,
      user: {
        id: user.id,
        name: user.fullName ?? user.username ?? "Guest",
        image: user.imageUrl,
      },
      tokenProvider,
    });
    setVideoClient(client);

    return () => {
      client.disconnect();
      setVideoClient(null);
    };
  }, [user, isLoaded]);

  if (!sdkAvailable) {
    return <>{children}</>;
  }

  if (!isLoaded || !user) {
    return <>{children}</>;
  }

  if (!videoClient) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <StreamVideo client={videoClient}>
      {children}
      {useCalls && <RingingCalls />}
    </StreamVideo>
  );
};

export default VideoProvider;
