import { createContext } from "react";

export const UserContext = createContext(null);
export const FriendsContext = createContext({});
export const ActivePartnerContext = createContext({});
export const SendMessageContext = createContext(null);
export const OnlineIdsContext = createContext({})

export const MessagesContext = createContext([]);
export const SetMessagesContext = createContext(null);
