import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useChatContext } from 'stream-chat-react-native-core';
import { useState, useEffect } from 'react';
import { Call, StreamCall, useStreamVideoClient, useCall, useCallStateHooks, CallingState, OutgoingCall, IncomingCall, CallContent } from '@stream-io/video-react-native-sdk';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/lib/theme';
import { Ionicons } from '@expo/vector-icons';

const CallScreen = () => {
  const { callId } = useLocalSearchParams<{callId: string}>();
  const videoClient = useStreamVideoClient(); 
  const {client: chatClient} = useChatContext();

  const [call, setCall] = useState<Call | null >(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!videoClient || !callId) return;

    const startCall = async () => {
      try {
        const channel = chatClient.channel("messaging", callId);
        await channel.watch();

        const _call = videoClient.call("default", callId);

        const members = Object.values(channel.state.members).map(member => ({
          user_id: member?.user?.id! as string
        }));

        await _call.getOrCreate({
          ring: true,
          data: {
            members,
            custom: {
              triggeredBy: chatClient.user?.id,
            }
          }
      });

        setCall(_call);
      } catch (err) {
        console.warn("Failed to start call:", err);
        setError("Unable to start the call. Please try again.");
      }
    }
    startCall();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if (error) {
    return <ErrorCallUI error={error} />
  }

  if (!call) {
    return (
          <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center gap-4">
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text className="text-foreground-muted mt-2 text-base">Starting the call...</Text>
      </View>
    </SafeAreaView>
    )}

  
      

  return (
    <StreamCall call={call}>
      <CallUi />
    </StreamCall>
  )
}

function CallUi() {
  const call = useCall();
  const router = useRouter();
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const isCallCreatedByMe = call?.isCreatedByMe??false;

  useEffect(() => {
    if (callingState === CallingState.LEFT) router.back();
  }, [callingState, router, call])

  if( [CallingState.RINGING, CallingState.JOINING, CallingState.RECONNECTING].includes(callingState) ) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        {isCallCreatedByMe ? <OutgoingCall /> : <IncomingCall />}
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['bottom']}>
      <CallContent
      onHangupCallHandler={async () =>{
        await call?.endCall();
      }}
      layout="spotlight"
      />
    </SafeAreaView>
  )
}

export default CallScreen

function ErrorCallUI({error}: {error: string}) {
  const router = useRouter();
  return (

    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center gap-4">
        <Ionicons name="alert-circle-outline" size={64} color={COLORS.danger} />
        <Text className="text-foreground mt-2 text-base">{error}</Text>
        <Pressable onPress={() => router.back()} className="mt-4 px-6 py-3 rounded-xl bg-primary">
          <Text className="text-[15px] font-semibold text-foreground">Go Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )}