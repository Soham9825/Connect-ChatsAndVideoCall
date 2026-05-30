import ChatWrapper from "@/components/ChatWrapper";
import { AppProvider } from "@/contexts/AppProvider";
import "@/lib/streamNativeHandlers";
import { COLORS, Connect } from "@/lib/theme";
import { ClerkProvider } from "@clerk/expo";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { OverlayProvider } from "stream-chat-react-native-core";
import "../global.css";
import VideoProvider from "@/components/VideoProvider";

export default function RootLayout() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <SafeAreaProvider>
        <StatusBar
          style="light"
          backgroundColor={COLORS.background}
          translucent={false}
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <OverlayProvider value={{ style: Connect as any }}>
            <AppProvider>
              <ChatWrapper>
                <VideoProvider>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: COLORS.background },
                  }}
                >
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(tabs)" />
                </Stack>
                </VideoProvider>
              </ChatWrapper>
            </AppProvider>
          </OverlayProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
