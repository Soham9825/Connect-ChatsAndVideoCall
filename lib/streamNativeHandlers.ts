import { FlatList } from "react-native";
import type * as NativeModule from "stream-chat-react-native-core/lib/typescript/native";

const { NativeHandlers, registerNativeHandlers } =
  require("stream-chat-react-native-core/lib/commonjs/native") as typeof NativeModule;

registerNativeHandlers({ FlatList, SDK: "connect-expo" });

NativeHandlers.compressImage = undefined as never;
NativeHandlers.deleteFile = undefined as never;
NativeHandlers.getLocalAssetUri = undefined as never;
NativeHandlers.getPhotos = undefined as never;
NativeHandlers.iOS14RefreshGallerySelection = undefined as never;
NativeHandlers.pickDocument = undefined as never;
NativeHandlers.pickImage = undefined as never;
NativeHandlers.saveFile = undefined as never;
NativeHandlers.setClipboardString = undefined as never;
NativeHandlers.shareImage = undefined as never;
NativeHandlers.takePhoto = undefined as never;
NativeHandlers.triggerHaptic = undefined as never;
