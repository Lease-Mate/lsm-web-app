"use client";

import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Chat, User } from "@/lib/types/types";

import ChatWindow from "./chat-window";

interface MessagesContentProps {
  chats: (Chat & { user: User })[];
  receiverId: string | undefined;
}

export default function MessagesContent({ chats, receiverId }: MessagesContentProps) {
  const [selectedChat, setSelectedChat] = useState<(Chat & { user: User }) | undefined>(
    chats.find((chat) => chat.userId === receiverId)
  );

  // const chatRef = useRef<HTMLDivElement>(null);  TODO: SCROLLING

  return (
    <div className="flex-1 flex">
      <div className="bg-gray-100 w-1/3">
        <ScrollArea className="h-full">
          {chats.map((chat) => {
            return (
              <div
                key={chat.chatId}
                className="border-b border-gray-300 py-8 px-5 cursor-pointer"
                onClick={() => setSelectedChat(chat)}
              >
                <div className="font-semibold text-lg">{`${chat.user.name} ${chat.user.surname}`}</div>
                <div>{chat.user.email}</div>
              </div>
            );
          })}
        </ScrollArea>
      </div>
      <div className="flex-1 bg-gray-200 flex flex-col">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="flex items-center justify-center h-full">Wybierz rozmowę</div>
        )}
      </div>
    </div>
  );
}
