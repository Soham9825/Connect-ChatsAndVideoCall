import { useAppContext } from "@/contexts/AppProvider";
import "@/lib/streamNativeHandlers";
import { Connect } from "@/lib/theme";
import { useUser } from "@clerk/expo";
import React, { useEffect, useRef } from "react";
import { FullScreenLoader } from "./FullScreenLoader";

let Chat: any = null;
let ThemeProvider: any = null;
let useCreateChatClient: any = null;

try {
  const streamChat = require("stream-chat-react-native");
  Chat = streamChat.Chat;
  ThemeProvider = streamChat.ThemeProvider;
  useCreateChatClient = streamChat.useCreateChatClient;
} catch (err) {
  try {
    const streamChat = require("stream-chat-expo");
    Chat = streamChat.Chat;
    ThemeProvider = streamChat.ThemeProvider;
    useCreateChatClient = streamChat.useCreateChatClient;
  } catch (innerErr) {
    try {
      const streamChat = require("stream-chat-react-native-core");
      Chat = streamChat.Chat;
      ThemeProvider = streamChat.ThemeProvider;
      useCreateChatClient = streamChat.useCreateChatClient;
    } catch (coreErr) {
      console.warn("Stream chat packages not available:", coreErr);
    }
  }
}

type UserResource = {
  id: string;
  firstName?: string | null;
  username?: string | null;
  emailAddresses: { emailAddress: string }[];
  imageUrl?: string | null;
};

const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

const syncUserToStream = async (user: UserResource) => {
  try {
    const response = await fetch("/api/sync-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        name:
          user.firstName ??
          user.username ??
          user.emailAddresses[0].emailAddress.split("@")[0],
        image: user.imageUrl,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to sync user");
    }
  } catch (error) {
    console.error("Error syncing user:", error);
  }
};

const ChatClientWithHook = ({
  children,
  user,
  setClient,
}: {
  children: React.ReactNode;
  user: UserResource;
  setClient: (client: any | null) => void;
}) => {
  const syncedRef = useRef(false);

  const tokenProvider = async () => {
    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };

  const chatClient = useCreateChatClient({
    apiKey: STREAM_API_KEY,
    userData: {
      id: user.id,
      name:
        user.firstName ??
        user.username ??
        user.emailAddresses[0].emailAddress.split("@")[0],
      image: user.imageUrl ?? undefined,
    },
    tokenOrProvider: tokenProvider,
  });

  useEffect(() => {
    if (!syncedRef.current) {
      syncedRef.current = true;
      syncUserToStream(user);
    }
  }, [user]);

  useEffect(() => {
    setClient(chatClient ?? null);

    return () => {
      setClient(null);
    };
  }, [chatClient, setClient]);

  if (!chatClient) {
    return <FullScreenLoader message="Connecting to chat..." />;
  }

  return <Chat client={chatClient}>{children}</Chat>;
};

const ChatClient = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserResource;
}) => {
  const { setClient } = useAppContext();

  if (!Chat || !useCreateChatClient) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider style={Connect}>
      <ChatClientWithHook user={user} setClient={setClient}>
        {children}
      </ChatClientWithHook>
    </ThemeProvider>
  );
};

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <FullScreenLoader message="Loading..." />;
  }

  if (!user) {
    return <>{children}</>;
  }

  if (!Chat || !useCreateChatClient) {
    return <>{children}</>;
  }

  return <ChatClient user={user}>{children}</ChatClient>;
};

export default ChatWrapper;
