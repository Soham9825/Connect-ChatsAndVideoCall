import ComposerRow from "@/components/ComposerRow";
import { EmptyState } from "@/components/EmptyState";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import MessageComposerGifButtons from "@/components/MessageComposerGifButtons";
import { useAppContext } from "@/contexts/AppProvider";
import { COLORS } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import {
  Channel,
  MessageList,
  WithComponents
} from "stream-chat-react-native-core";

const ChannelScreen = () => {
  const { channel, client, setThread } = useAppContext();

  const router = useRouter();
  const navigation = useNavigation();

  const headerHeight = useHeaderHeight();
  const handleLongPressMessage = ({ actionHandlers, message }: any) => {
    Alert.alert(
      message?.user?.name ?? "Message",
      message?.text ?? "Choose an action",
      [
        { text: "Copy", onPress: () => actionHandlers?.copyMessage?.() },
        { text: "Reply", onPress: () => actionHandlers?.quotedReply?.() },
        { text: "Close", style: "cancel" },
      ],
    );
  };

  let displayName = "";
  let avatarUrl = "";

  if (channel) {
    const members = Object.values(channel.state.members);
    const otherMember = members.find((m) => m.user?.id !== client?.userID);
    displayName = otherMember?.user?.name!;
    avatarUrl = otherMember?.user?.image || "";
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.surface },
      headerTintColor: COLORS.text,
      headerLeft: () => (
        <Pressable onPress={() => router.back()} className="px-3">
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </Pressable>
      ),
      headerTitle: () => (
        <View className="flex-row items-center gap-2">
          {avatarUrl ? (
            <Image
              source={avatarUrl}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                marginRight: 10,
              }}
            />
          ) : (
            <View
              className="mr-2.5 w-8 h-8 rounded-full bg-primary/20 justify-center items-center"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Text className="text-base font-medium text-foreground">
                {displayName ? displayName[0].toUpperCase() : "?"}
              </Text>
            </View>
          )}
          <Text className="text-base text-foreground font-semibold">
            {displayName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <Pressable onPress={() => {
          router.push({
            pathname: "/call/[callId]",
            params: { callId: channel?.id! }
          })
        }} className="px-3">
          <Ionicons name="videocam-outline" size={24} color={COLORS.primary} />
        </Pressable>
      ),
    });
  }, [navigation, displayName, avatarUrl, channel?.cid, channel?.id, router]);

  if (!channel) {
    return <FullScreenLoader message="Loading chat room..." />;
  }
  return (
    <View className="flex-1 bg-background">
      <WithComponents
        overrides={
          {
            InputButtons: MessageComposerGifButtons,
            OutputButtons: require("@/components/MessageComposerOutputButtons")
              .default,
            EmptyStateIndicator: () => (
              <EmptyState
                icon="chatbubbles"
                title="No messages yet"
                subtitle="Start the conversation!"
              />
            ),
          } as unknown as any
        }
      >
        <Channel
          channel={channel}
          disableAttachmentPicker
          keyboardVerticalOffset={Math.max(0, headerHeight + 22)}
          onLongPressMessage={handleLongPressMessage}
        >
          <MessageList
            onThreadSelect={(thread) => {
              setThread(thread);
              router.push(`/channel/${channel.cid}/thread/${thread?.cid}`);
            }}
          />

          <ComposerRow />
        </Channel>
      </WithComponents>
    </View>
  );
};

export default ChannelScreen;
