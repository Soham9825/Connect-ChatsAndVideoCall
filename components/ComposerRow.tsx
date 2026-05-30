import { COLORS } from "@/lib/theme";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  MessageComposer,
  useMessageInputContext,
} from "stream-chat-react-native-core";

const ComposerRow = () => {
  const { inputBoxRef } = useMessageInputContext();

  const handleGif = (api: any) => {};

  const handleAttach = () => {
    const { Alert } = require("react-native");
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

    Alert.alert("Attach", "Choose: Photo or File", [
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
        backgroundColor: COLORS.surface,
        paddingHorizontal: 8,
        paddingVertical: 6,
      }}
    >
      <Pressable
        onPress={handleAttach}
        accessibilityLabel="Attach"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: COLORS.surfaceDark,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 8,
          zIndex: 1,
        }}
      >
        <Text style={{ color: COLORS.text, fontSize: 16 }}>📎</Text>
      </Pressable>

      <Pressable
        onPress={() => {
          const { Alert } = require("react-native");
          Alert.alert("Giphy", "Feature will be added soon");
        }}
        accessibilityLabel="Giphy"
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: COLORS.surfaceDark,
          justifyContent: "center",
          alignItems: "center",
          marginRight: 8,
          zIndex: 1,
        }}
      >
        <Text style={{ color: COLORS.text, fontSize: 16 }}>⚡</Text>
      </Pressable>

      <View style={{ flex: 1 }}>
        <MessageComposer
          additionalTextInputProps={{
            placeholder: "Write a message...",
            placeholderTextColor: COLORS.textMuted,
            style: { color: COLORS.text },
          }}
        />
      </View>
    </View>
  );
};

export default ComposerRow;
