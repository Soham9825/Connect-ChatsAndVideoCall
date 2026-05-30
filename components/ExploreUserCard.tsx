import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import type { UserResponse } from "stream-chat";
import { Image } from "expo-image";
import { COLORS } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';

type ExploreUserCardProps = {
  item: UserResponse;
  creating: string | null;
  onStartChat: (targetId: string) => void;
}

const ExploreUserCard = ({ item, creating, onStartChat }: ExploreUserCardProps) => {
  return (
    <Pressable className='flex-row items-center bg-surface rounded-2xl  px-4 py-4 mb-2.5 border border-border gap-3.5'
      onPress={() => onStartChat(item.id)}
      disabled ={creating !== null}
      style={{ opacity: creating !== null ? 0.6 : 1 }}
    >
        <View style={{ position: 'relative', width: 48, height: 48 }}>
        <Image
            source={item.image}
            style={{ width: 48, height: 48, borderRadius: 24 }}
            contentFit="cover"
        />

        {item.online && (
            <View
            style={{
                position: 'absolute',
                right: -3,
                bottom: -3,
                width: 12,
                height: 12,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: COLORS.surface,
                backgroundColor: COLORS.accentSecondary,
                zIndex: 10,
            }}
            />
        )}
        </View>

        <View className='flex-1'>
            <Text className='text-base text-foreground font-medium' numberOfLines={1}>{item.name || item.id}</Text>
            <Text className='text-sm text-foreground-muted mt-0.5'>
                {item.online ? 'Online' : 'Offline'} </Text>
            </View>

            
        { creating === item.id ? (
          <ActivityIndicator size='small' color={COLORS.primary}  />
        ): (
            <View className='w-9 h-9 rounded-xl bg-primary/20 justify-center items-center'>
                <Ionicons name="chatbubble" size={16} color={COLORS.primary} />
            </View>
        )}
    </Pressable>
  )
}

export default ExploreUserCard