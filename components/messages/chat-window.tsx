import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Chat, Message, User } from "@/lib/types/types";
import { useEffect, useState } from "react";
import { getChatMessages } from "@/lib/actions/chat-actions";
import useChat from "@/hooks/useChat";
import { getCurrentUser } from "@/lib/actions/user-actions";

interface ChatProps {
  chat: Chat & { user: User };
}

export default function ChatWindow({ chat }: ChatProps) {
  const [fetchedMessages, setfetchedMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>();

  const { client, messages } = useChat("http://localhost:8080/ws", chat.chatId);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getChatMessages(chat.chatId);
      setfetchedMessages(messages);
    };

    fetchMessages();
  }, [chat.chatId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUserId(user?.id);
    };

    fetchCurrentUser();
  }, []);

  const allMessages = [...fetchedMessages, ...messages];

  return (
    <>
      <ScrollArea className="h-full">
        {allMessages.map((message) => {
          return (
            <div
              key={message.id}
              className={cn("flex flex-col p-5", message.sender === chat.userId ? "items-start" : "items-end")}
            >
              <div className="bg-white p-3 rounded-lg mt-2">{message.content}</div>
            </div>
          );
        })}
      </ScrollArea>
      <div className="p-5 ">
        <form
          className="flex gap-2 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            if (client && newMessage) {
              const chatMessage = {
                sender: currentUserId,
                chatId: chat.chatId,
                content: newMessage,
              };
              client.publish({ destination: "/app/chat.send-message", body: JSON.stringify(chatMessage) });
              setNewMessage("");

              // client.send(input.value);
              // input.value = "";
            }
          }}
        >
          <Input
            placeholder="Wpisz wiadomość"
            value={newMessage}
            onChange={(e) => setNewMessage(e.currentTarget.value)}
          />
          <Button type="submit">Wyślij</Button>
        </form>
      </div>
    </>
  );
}
