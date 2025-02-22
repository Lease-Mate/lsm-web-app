import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useChat = (url: string, chatId: string) => {
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [client, setClient] = useState<Client | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    setMessages({});

    const stompClient = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected");
        console.log(chatId);
        setIsConnected(true);

        stompClient.subscribe(`/topic/public/${chatId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          console.log(newMessage);
          setMessages((prevMessages) => ({
            ...prevMessages,
            [chatId]: [...(prevMessages[chatId] || []), newMessage],
          }));
        });
      },
      onDisconnect: () => {
        console.log("Disconnected");
        setIsConnected(false);
      },
      onStompError: (error) => {
        console.error("Broker reported error: " + error);
        setIsConnected(false);
      },
      onWebSocketError: (event) => {
        console.error("WS error: ", event);
        setIsConnected(false);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      console.log("Deactivating");
      stompClient.deactivate();
    };
  }, [chatId]);

  return { messages: messages[chatId] || [], client, isConnected };
};

export default useChat;
