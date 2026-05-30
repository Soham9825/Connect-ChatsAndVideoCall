import { COLORS } from "@/lib/theme";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useMessageInputContext } from "stream-chat-react-native-core";

const MessageComposerOutputButtons = () => {
  const { inputBoxRef } = useMessageInputContext();

  const handleAttach = () => {
    const pickImage = async () => {
      try {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) {
          Alert.alert(
            "Permission required",
            "Permission to access photos is required.",
          );
          return;
        }
        const res = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.8,
        });
        if (!res.canceled && res.assets && res.assets.length > 0) {
          const uri = res.assets[0].uri;
          Alert.alert("Selected photo", uri);
        }
      } catch (err) {
        console.warn("pickImage failed", err);
      } finally {
        inputBoxRef.current?.focus();
      }
    };

    const pickFile = async () => {
      try {
        const res = await DocumentPicker.getDocumentAsync({ type: "*/*" });
        const r: any = res;
        if (r.type === "success") {
          Alert.alert("Selected file", r.uri || r.name || "");
        }
      } catch (err) {
        console.warn("pickFile failed", err);
      } finally {
        inputBoxRef.current?.focus();
      }
    };

    Alert.alert("Add…", "Choose an attachment", [
      { text: "Photo", onPress: pickImage },
      { text: "File", onPress: pickFile },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Pressable
        onPress={() => {
          Alert.alert("Giphy", "Feature will be added soon");
        }}
        accessibilityLabel="Giphy"
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 8,
        }}
      >
        <Text style={{ color: COLORS.text, fontSize: 20 }}>⚡</Text>
      </Pressable>
      <Pressable
        onPress={handleAttach}
        accessibilityLabel="Attach"
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: COLORS.text, fontSize: 20 }}>📎</Text>
      </Pressable>
    </View>
  );
};

export default MessageComposerOutputButtons;
