import { useRouter } from "expo-router";
import { Alert } from "react-native";
import type { Channel, StreamChat } from "stream-chat";

type UseStartChatParams = {
  client: StreamChat | null;
  userId: string;
  setChannel: (channel: Channel) => void;
  setCreating: (value: string | null) => void;
};
const useStartChat = ({
  client,
  userId,
  setChannel,
  setCreating,
}: UseStartChatParams) => {
  const router = useRouter();

  const handleStartChat = async (targetId: string) => {
    if (!client) {
      Alert.alert(
        "Chat unavailable",
        "Stream is not initialized yet. Finish the iOS pod install and rebuild the app.",
      );
      return;
    }
    setCreating(targetId);
    try {
      const channel = client.channel("messaging", {
        members: [userId, targetId],
      });
      await channel.watch();
      setChannel(channel);
      router.push(`/channel/${channel.cid}`);
    } catch (error) {
      Alert.alert("Error", "Failed to start chat. Please try again.");
      console.error("Error starting chat:", error);
    } finally {
      setCreating(null);
    }
  };
  return { handleStartChat };
};

export default useStartChat;
