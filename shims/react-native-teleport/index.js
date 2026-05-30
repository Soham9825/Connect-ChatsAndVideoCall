const React = require("react");

const PortalContext = React.createContext(null);

function PortalProvider({ children }) {
  return React.createElement(
    PortalContext.Provider,
    { value: { enabled: true } },
    children,
  );
}

function PortalHost({ children }) {
  return React.createElement(React.Fragment, null, children ?? null);
}

function Portal({ children }) {
  const context = React.useContext(PortalContext);

  if (!context?.enabled) {
    return null;
  }

  return React.createElement(React.Fragment, null, children ?? null);
}

function usePortal() {
  const context = React.useContext(PortalContext);

  if (!context) {
    throw new Error("usePortalContext must be used within PortalProvider");
  }

  return context;
}

module.exports = {
  PortalProvider,
  PortalHost,
  Portal,
  usePortal,
  default: {
    PortalProvider,
    PortalHost,
    Portal,
    usePortal,
  },
};
