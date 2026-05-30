import {COLORS} from '@/lib/theme';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type EmptyStateProps = {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
}

export function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
    return (
        <View className='flex-1 items-center justify-center bg-surface-light px-5'>
            <View className='mb-4'>
                <Ionicons name={icon} size={24} color={COLORS.primary} />
            </View>
            <Text className='text-center text-base text-foreground-muted '>{title}</Text>
            <Text className='mt-1 text-center text-sm text-foreground-subtle'>{subtitle}</Text>
        </View>
    );
}
