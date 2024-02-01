import { createContext } from "react";

export const UserContext = createContext(null);
export const FriendsContext = createContext([]);
export const SetFriendsContext = createContext(null);
export const SetActiveFriendContext = createContext(null);
export const ActiveFriendContext = createContext(null);
export const SendMessageContext = createContext(null);

export const MessagesContext = createContext([]);
export const SetMessagesContext = createContext(null);
