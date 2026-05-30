import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useSocialAuth from '@/hooks/useSocialAuth';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const AuthScreen = () => {
  const { handleSocialAuth, loadingStrategy } = useSocialAuth(); 
  const isLoading = loadingStrategy !== null;


  return (
    <View className='flex-1 bg-background'>
      <View className='absolute inset-0'>
            <LinearGradient
              colors={[
                '#0a0a0a',
                '#1a1a1a',
                '#2b2b2b',
                '#121212', 
              ]}
              locations={[0, 0.25, 0.5, 0.75, 1]}
              style={{ width: '100%', height: '100%' }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
      </View>
      <SafeAreaView className='flex-1 justify-between' >
        <View>
          <View className='items-center pt-10 pb-2'>
            <View className='w-16 h-16 rounded-[20px] bg-primary/15 items-center justify-center border border-primary/20'>
            <Ionicons name='school' size={30} color="#A29BFF" />
            </View>
            <Text className='text-3xl font-extrabold 
            text-white tracking-tight mt-4 font-mono'>Connect</Text>

            <Text className='text-white text-[15px] mt-1.5 tracking-wide'>
              Connect with your loved ones.
            </Text>
          </View>

          <View className='items-center px-6 mt-8'>
            <Ionicons name="chatbubble-outline" size={250} color="white" />
          </View>

          <View className='flex-row flex-wrap justify-center gap-3 px-6 mt-5'>
            {[
              { 
                icon: 'videocam' as const,
                label: "Video Calls",
                color: "#A29BFF",
                bg: "bg-primary/12 border-primary/20",
              },
              {
                icon: 'chatbubbles' as const,
                label: "Messaging",
                color: "#FF6B6B",
                bg: "bg-accent/12 border-accent/20",
              },
              {
                icon: 'people' as const,
                label: "Find Friends",
                color: "#00B894",
                bg: 'bg-accent-secondary/12 border-accent-secondary/20',
              },
            ].map(({ icon, label, color, bg }) => (
              <View key={label} className={`flex-row items-center gap-3 px-4 py-2 rounded-lg border ${bg}`}>
                <Ionicons name={icon} size={20} color={color} />
                <Text className='text-sm text-white'>{label}</Text>
              </View>
             )
            )}
          </View>
        </View>

        <View className='px-8 pb-4'>
           <View className='flex-row items-center gap-3 mb-6'>
            <View className='flex-1 h-px bg-white'/>
            <Text className='text-white text-xs font-medium tracking-widest uppercase'>
              Continue with
            </Text>
            <View className='flex-1 h-px bg-white'/>
          </View>
          <View className='flex-row justify-center gap-4 mb-5'>
            <Pressable className='size-20 rounded-2xl bg-surface border border-border-light items-center justify-center active:scale-95'
            style = {({pressed}) => ({
              opacity: pressed ? 0.85 : 1,
            })}
            disabled={isLoading}
            accessibilityRole='button'
            accessibilityLabel='Continue with Google'
            onPress={()=> !isLoading && handleSocialAuth("oauth_google")}>
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size="small" color="#6C5CE7" />
              ) : (
                <Ionicons name='logo-google' size={30} color="#A29BFF" />
              )}
            </Pressable>

            <Pressable className='size-20 rounded-2xl bg-surface border border-border-light items-center justify-center active:scale-95'
            style = {({pressed}) => ({
              opacity: pressed ? 0.85 : 1,
            })}
            disabled={isLoading}
            accessibilityRole='button'
            accessibilityLabel='Continue with Apple'
            onPress={()=> !isLoading && handleSocialAuth("oauth_apple")}>
              {loadingStrategy === "oauth_apple" ? (
                <ActivityIndicator size="small" color="#6C5CE7" />
              ) : (
                <Ionicons name='logo-apple' size={30} color="#A29BFF" />
              )}
            </Pressable>

            <Pressable className='size-20 rounded-2xl bg-surface border border-border-light items-center justify-center active:scale-95'
            style = {({pressed}) => ({
              opacity: pressed ? 0.85 : 1,
            })}
            disabled={isLoading}
            accessibilityRole='button'
            accessibilityLabel='Continue with GitHub'
            onPress={()=> !isLoading && handleSocialAuth("oauth_github")}>
              {loadingStrategy === "oauth_github" ? (
                <ActivityIndicator size="small" color="#6C5CE7" />
              ) : (
                <Ionicons name='logo-github' size={30} color="#A29BFF" />
              )}
            </Pressable>
          </View>

          <Text className='text-white text-[11px] text-center leading-4'>
            By Continuing, you agree to our {" "}<Text className='underline'>Terms of Service</Text> and{" "} <Text className='underline'>Privacy Policy</Text>.
          </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default AuthScreen