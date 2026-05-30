const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const teleportShim = path.resolve(__dirname, "shims/react-native-teleport");

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === "react-native-teleport" ||
    moduleName.startsWith("react-native-teleport/")
  ) {
    return context.resolveRequest(context, teleportShim, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });
