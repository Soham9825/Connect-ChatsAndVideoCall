import { Dimensions } from "react-native";
import type { DeepPartial, Theme } from "stream-chat-expo";

const { width } = Dimensions.get("window");
const vw = (percent: number) => (width * percent) / 100;

export const COLORS = {
  primary: "#6C5CE7",
  primaryDark: "#5A4BD1",
  primaryLight: "#A29BFE",

  background: "#0F0E17",
  surface: "#1A1A2E",
  surfaceDark: "#0F0E17",
  surfaceLight: "#16213E",

  text: "#FFFFFE",
  textMuted: "#A7A9BE",
  textSubtle: "#72757E",

  border: "#232946",

  success: "#00B894",
  warning: "#FDCB6E",
  danger: "#FF6B6B",

  outgoingBubble: "#3D3580",
  incomingBubble: "#1A1A2E",
  chatBackground: "#0F0E17",

  accent: "#FF6B6B",
  accentSecondary: "#00B894",
};

export const Connect = {
  colors: {
    accent_blue: COLORS.primary,
    grey_dark: COLORS.text,
    white: COLORS.text,
    black: COLORS.background,
    targetedMessageBackground: "transparent",
  },

  channelListMessenger: {
    flatList: {
      backgroundColor: COLORS.background,
    },
    flatListContent: {
      backgroundColor: COLORS.background,
    },
  },

  loadingIndicator: {
    container: {
      backgroundColor: COLORS.background,
    },
    loadingText: {
      color: COLORS.textMuted,
    },
  },

  channelPreview: {
    container: {
      backgroundColor: COLORS.background,
    },
    contentContainer: {
      backgroundColor: COLORS.background,
    },
    title: {
      color: COLORS.text,
      fontSize: 16,
      fontWeight: "600",
    },
    unreadContainer: {
      backgroundColor: COLORS.primary,
    },
  },

  messageList: {
    container: {
      backgroundColor: COLORS.background,
    },
    contentContainer: {
      backgroundColor: COLORS.background,
    },
    scrollToBottomButton: {
      container: {
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
      },
    },
  },

  messageInput: {
    container: {
      backgroundColor: COLORS.surface,
      borderTopColor: COLORS.border,
      borderTopWidth: 0,
      paddingVertical: 10,
      paddingHorizontal: 12,
    },

    inputBox: {
      backgroundColor: COLORS.surfaceDark,
      color: COLORS.text,
      borderRadius: 8,
      paddingHorizontal: 12,
    },

    inputBoxContainer: {
      backgroundColor: COLORS.surfaceDark,
      borderRadius: 8,
    },

    autoCompleteInputContainer: {
      backgroundColor: COLORS.surface,
    },
  },

  messageComposer: {
    container: {
      backgroundColor: COLORS.surface,
      paddingHorizontal: 0,
      paddingVertical: 8,
    },
    wrapper: {
      backgroundColor: COLORS.surface,
      paddingBottom: 14,
      paddingTop: 8,
    },
    inputBoxWrapper: {
      backgroundColor: COLORS.surfaceDark,
      borderColor: "transparent",
      borderWidth: 0,
    },
    inputBoxContainer: {
      backgroundColor: COLORS.surfaceDark,
      borderWidth: 0,
    },
    inputContainer: {
      backgroundColor: COLORS.surface,
      borderWidth: 0,
    },
    inputButtonsContainer: {
      backgroundColor: COLORS.surface,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    outputButtonsContainer: {
      backgroundColor: COLORS.surface,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    contentContainer: {
      gap: 10,
      paddingHorizontal: 10,
    },
    inputBox: {
      color: COLORS.text,
      paddingTop: 0,
      paddingBottom: 0,
      paddingVertical: 0,
    },
    suggestionsListContainer: {
      container: {
        backgroundColor: COLORS.surface,
      },
    },
  },

  messageSimple: {
    avatarWrapper: {
      container: {
        marginRight: 8,
      },
    },

    content: {
      textContainer: {
        maxWidth: vw(80),
        paddingHorizontal: 12,
      },

      containerInner: {
        backgroundColor: COLORS.incomingBubble,
        borderColor: COLORS.incomingBubble,
        borderRadius: 8,
      },

      markdown: {
        text: {
          color: COLORS.text,
        },
        em: {
          color: COLORS.textMuted,
        },
      },

      metaText: {
        color: COLORS.textSubtle,
      },
    },

    file: {
      container: {
        backgroundColor: COLORS.surfaceDark,
        borderColor: COLORS.border,
      },
      title: {
        color: COLORS.text,
      },
      fileSize: {
        color: COLORS.textMuted,
      },
    },

    card: {
      container: {
        width: vw(80),
        backgroundColor: COLORS.surface,
        borderColor: COLORS.border,
      },

      cover: {
        borderRadius: 8,
      },

      footer: {
        backgroundColor: COLORS.surfaceDark,
        padding: 12,
        title: {
          color: COLORS.text,
        },
        description: {
          color: COLORS.textMuted,
        },
      },
    },

    replies: {
      container: {
        backgroundColor: COLORS.surface,
        borderRadius: 8,
      },

      messageRepliesText: {
        color: COLORS.primary,
      },
    },

    status: {
      readByCount: {
        color: COLORS.textSubtle,
      },
    },
  },

  reply: {
    container: {
      backgroundColor: COLORS.surfaceDark,
      borderColor: COLORS.border,
    },

    markdownStyles: {
      text: {
        color: COLORS.textMuted,
      },
    },
  },

  typingIndicator: {
    container: {
      backgroundColor: COLORS.surfaceLight,
    },

    text: {
      color: COLORS.textMuted,
    },
  },

  poll: {
    button: {
      text: {
        color: COLORS.primary,
      },
    },

    message: {
      container: {
        backgroundColor: COLORS.incomingBubble,
        borderRadius: 8,
      },

      header: {
        title: {
          color: COLORS.primary,
        },

        subtitle: {
          color: COLORS.textMuted,
        },
      },

      option: {
        text: {
          color: COLORS.text,
        },

        progressBar: {
          backgroundColor: COLORS.border,
        },

        progressBarVotedFill: COLORS.primary,
        progressBarWinnerFill: COLORS.primaryLight,
      },
    },
  },

  emptyStateIndicator: {
    channelContainer: {
      backgroundColor: COLORS.background,
    },
    channelTitle: {
      color: COLORS.textMuted,
    },
    messageContainer: {
      backgroundColor: COLORS.background,
    },
    messageTitle: {
      color: COLORS.textMuted,
    },
  },
} as DeepPartial<Theme>;
