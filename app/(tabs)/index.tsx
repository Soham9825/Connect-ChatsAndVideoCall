import { useAppContext } from "@/contexts/AppProvider";
import { COLORS } from "@/lib/theme";
import { getGreetingForHour } from "@/lib/utils";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { Channel } from "stream-chat";

const ChatsScreen = () => {
  const router = useRouter();

  const { client, setChannel } = useAppContext();

  const { user } = useUser();

  const [search, setSearch] = useState("");
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firstName = user?.firstName || "there";

  useEffect(() => {
    const loadChannels = async () => {
      if (!client || !user?.id) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await client.queryChannels(
          { members: { $in: [user.id] }, type: "messaging" },
          { last_updated: -1 },
          { state: true, watch: true, presence: true },
        );
        setChannels(result as Channel[]);
      } catch (queryError) {
        console.warn("Failed to load channels:", queryError);
        setError("Unable to load chats right now.");
      } finally {
        setLoading(false);
      }
    };

    void loadChannels();
  }, [client, user?.id]);

  const filteredChannels = !search.trim()
    ? channels
    : channels.filter((channel) => {
        const q = search.toLowerCase();
        const name =
          (channel.data?.name as string | undefined)?.toLowerCase() ||
          "unnamed channel";
        const cid = channel.cid.toLowerCase();
        return name.includes(q) || cid.includes(q);
      });

  const renderChannelItem = ({ item }: { item: Channel }) => {
    const members = Object.values(item.state.members || {});
    const otherMember = members.find((member) => member.user?.id !== user?.id);
    const name =
      (item.data?.name as string | undefined) ||
      otherMember?.user?.name ||
      "Unnamed Channel";
    const avatar = otherMember?.user?.image;
    const online = Boolean(otherMember?.user?.online);
    const lastMessage = [...(item.state.messages || [])]
      .reverse()
      .find((message) => message.text);

    return (
      <Pressable
        onPress={() => {
          setChannel(item);
          router.push(`/channel/${item.cid}`);
        }}
        className="mb-3 rounded-2xl border border-border bg-surface px-4 py-4"
      >
        <View className="flex-row items-center justify-between gap-4">
          <View className="relative h-12 w-12">
            {avatar ? (
              <Image
                source={avatar}
                style={{ width: 48, height: 48, borderRadius: 24 }}
                contentFit="cover"
              />
            ) : (
              <View className="h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <Text className="text-base font-semibold text-primary">
                  {name.slice(0, 1).toUpperCase()}
                </Text>
              </View>
            )}
            {online ? (
              <View className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-surface bg-secondary" />
            ) : null}
          </View>
          <View className="flex-1 justify-center py-0.5">
            <Text
              className="text-base font-semibold leading-tight text-foreground"
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text
              className="mt-0.5 text-sm leading-tight text-foreground-muted"
              numberOfLines={1}
            >
              {lastMessage?.text || "No messages yet"}
            </Text>
          </View>
          <View className="ml-1 h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Ionicons name="chatbubble" size={18} color={COLORS.primary} />
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 pt-3 pb-1">
        <Text className="text-sm text-foreground-muted mb-0.5">
          {getGreetingForHour()}, {firstName}
        </Text>
      </View>

      <View className="flex-row items-center bg-surface mx-5 my-4 px-3.5 py-3 rounded-[14px] gap-2.5 border border-border">
        <Ionicons name="search" size={20} color={COLORS.textMuted} />
        <TextInput
          className="flex-1 text-[16px] text-foreground"
          placeholder="Search chats..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-foreground text-base">{error}</Text>
        </View>
      ) : (
        <FlatList
          data={filteredChannels}
          keyExtractor={(item) => item.cid}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          renderItem={renderChannelItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center px-6 pt-24">
              <Text className="text-center text-foreground text-base">
                No chats yet. Start one from Explore.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ChatsScreen;
