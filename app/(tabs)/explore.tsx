import ExploreUserCard from "@/components/ExploreUserCard";
import ListEmptyComponent from "@/components/ListEmptyComponent";
import { useAppContext } from "@/contexts/AppProvider";
import useStartChat from "@/hooks/useStartChat";
import useStreamUser from "@/hooks/useStreamUser";
import { COLORS } from "@/lib/theme";
import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { UserResponse } from "stream-chat";

const ExploreScreen = () => {
  const { setChannel, client } = useAppContext();

  const { user } = useUser();

  const userId = user?.id! ?? "";

  const [creating, setCreating] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const { users, loading } = useStreamUser(client, userId!);

  const { handleStartChat } = useStartChat({
    client,
    userId,
    setChannel,
    setCreating,
  });

  const filteredUsers = !search.trim()
    ? users
    : users.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.id.toLowerCase().includes(search.toLowerCase()),
      );

  const renderUserItem = ({ item }: { item: UserResponse }) => (
    <ExploreUserCard
      item={item}
      creating={creating}
      onStartChat={handleStartChat}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 pt-3 pb-1">
        <Text className="text-[28px] font-bold text-foreground">Explore</Text>
        <Text className="text-sm text-foreground-muted mt-1">
          Connect with other users and start chatting!
        </Text>
      </View>

      <View className="flex-row items-center bg-surface mx-5 my-4 px-3.5 py-3 rounded-[14px] gap-2.5 border border-border">
        <Ionicons name="search" size={20} color={COLORS.textMuted} />
        <TextInput
          placeholder="Search users..."
          placeholderTextColor={COLORS.textMuted}
          value={search}
          onChangeText={setSearch}
          className="flex-1 text-[16px] text-foreground"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")} className="p-1">
            <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
          </Pressable>
        )}
      </View>

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          renderItem={renderUserItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<ListEmptyComponent />}
        />
      )}
    </SafeAreaView>
  );
};

export default ExploreScreen;
