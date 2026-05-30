import ComposerRow from "@/components/ComposerRow";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import MessageComposerGifButtons from "@/components/MessageComposerGifButtons";
import { useAppContext } from "@/contexts/AppProvider";
import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Channel,
  MessageList,
  WithComponents,
} from "stream-chat-react-native-core";

const ThreadScreen = () => {
  const { channel, thread } = useAppContext();

  const headerHeight = useHeaderHeight();

  const handleLongPressMessage = ({ actionHandlers, message }: any) => {
    Alert.alert(
      message?.user?.name ?? "Message",
      message?.text ?? "Choose an action",
      [
        { text: "Copy", onPress: () => actionHandlers?.copyMessage?.() },
        { text: "Reply", onPress: () => actionHandlers?.quotedReply?.() },
        { text: "Close", style: "cancel" },
      ]
    );
  };

  if (!channel || !thread) {
    return <FullScreenLoader message="Loading thread..." />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <WithComponents
        overrides={
          {
            InputButtons: MessageComposerGifButtons,
            OutputButtons:
              require("@/components/MessageComposerOutputButtons").default,
          } as any
        }
      >
        <Channel
          channel={channel}
          thread={thread}
          threadList
          disableAttachmentPicker
          keyboardVerticalOffset={Math.max(0, headerHeight + 22)}
          onLongPressMessage={handleLongPressMessage}
        >
          <MessageList />

          <ComposerRow />
        </Channel>
      </WithComponents>
    </SafeAreaView>
  );
};

export default ThreadScreen;