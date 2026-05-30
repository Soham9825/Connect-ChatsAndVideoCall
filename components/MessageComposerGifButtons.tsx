import { COLORS } from "@/lib/theme";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useMessageInputContext } from "stream-chat-react-native-core";

const MessageComposerGifButtons = () => {
  const { inputBoxRef } = useMessageInputContext();

  const handleGifPress = () => {
    Alert.alert("Giphy", "Feature will be added soon");
  };
  const handlePlusPress = () => {
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

    const { Alert } = require("react-native");
    Alert.alert("Add…", "Choose an attachment", [
      { text: "Photo", onPress: pickImage },
      { text: "File", onPress: pickFile },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 6,
        paddingVertical: 4,
      }}
    >
      <Pressable
        onPress={handlePlusPress}
        accessibilityLabel="Attach"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 8,
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
            includeFontPadding: false,
          }}
        >
          📎
        </Text>
      </Pressable>

      <Pressable
        onPress={handleGifPress}
        accessibilityLabel="Giphy"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.text,
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
            includeFontPadding: false,
          }}
        >
          ⚡
        </Text>
      </Pressable>
    </View>
  );
};

export default MessageComposerGifButtons;
