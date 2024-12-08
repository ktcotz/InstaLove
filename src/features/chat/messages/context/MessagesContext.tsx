import { createContext, ReactNode, useState } from "react";
import { Profile } from "../../../profile/schema/ProfilesSchema";

type MessagesContextData = {
  reply: {
    user: Profile | null;
    message: string;
  } | null;
  setupReply: ({
    user,
    message,
  }: {
    user: Profile | null;
    message: string;
  }) => void;
  reset: () => void;
};

export const MessagesContext = createContext<MessagesContextData | null>(null);

type MessagesContextProviderProps = {
  children: ReactNode;
};

export const MessagesContextProvider = ({
  children,
}: MessagesContextProviderProps) => {
  const [reply, setReply] = useState<{
    user: Profile | null;
    message: string;
  } | null>(null);

  const setupReply = ({
    user,
    message,
  }: {
    user: Profile | null;
    message: string;
  }) => {
    setReply({ user, message });
  };

  const reset = () => {
    setReply({
      user: null,
      message: "",
    });
  };

  return (
    <MessagesContext.Provider value={{ reply, setupReply, reset }}>
      {children}
    </MessagesContext.Provider>
  );
};
