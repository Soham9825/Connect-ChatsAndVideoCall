import React, { createContext, useContext } from "react";

type PortalContextValue = {
  enabled: boolean;
};

const PortalContext = createContext<PortalContextValue | null>(null);

export const PortalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PortalContext.Provider value={{ enabled: true }}>
      {children}
    </PortalContext.Provider>
  );
};

export const PortalHost = ({ children }: { children?: React.ReactNode }) => {
  return <>{children ?? null}</>;
};

export const Portal = ({ children }: { children?: React.ReactNode }) => {
  const context = useContext(PortalContext);

  if (!context?.enabled) {
    return null;
  }

  return <>{children ?? null}</>;
};

export const usePortal = () => {
  const context = useContext(PortalContext);

  if (!context) {
    throw new Error("usePortalContext must be used within PortalProvider");
  }

  return context;
};

export default {
  PortalProvider,
  PortalHost,
  Portal,
  usePortal,
};
