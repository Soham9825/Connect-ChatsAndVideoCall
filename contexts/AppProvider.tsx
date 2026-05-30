import React, { useState } from "react";
import type { StreamChat } from "stream-chat";
import { Channel, LocalMessage } from "stream-chat";

type AppContextType = {
  channel: Channel | null;
  setChannel: (channel: Channel | null) => void;
  thread: LocalMessage | null;
  setThread: (thread: LocalMessage | null) => void;
  client: StreamChat | null;
  setClient: (client: StreamChat | null) => void;
};
export const AppContext = React.createContext<AppContextType>({
  channel: null,
  setChannel: (channel) => {},
  thread: null,
  setThread: (thread) => {},
  client: null,
  setClient: (client) => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [channel, setChannel] = useState<Channel | null>(null);
  const [thread, setThread] = useState<LocalMessage | null>(null);
  const [client, setClient] = useState<StreamChat | null>(null);

  return (
    <AppContext.Provider
      value={{ channel, setChannel, thread, setThread, client, setClient }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
