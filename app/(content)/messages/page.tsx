import MessagesContent from "@/components/messages/messages-content";
import { createChat, getChatsForUser } from "@/lib/actions/chat-actions";
import { getUserById } from "@/lib/actions/user-actions";
import { Chat, User } from "@/lib/types/types";
import { revalidatePath } from "next/cache";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const receiverId = (await searchParams).receiverId;
  let chats: Chat[] = [];
  let chatsWithDetails: (Chat & { user: User })[] = [];

  const fetchChatDetails = async (chats: Chat[]) => {
    const result = await Promise.all(
      chats.map(async (chat) => {
        const user = await getUserById(chat.userId);
        return { ...chat, user };
      })
    );

    return result;
  };

  chats = await getChatsForUser();

  if (chats.length > 0) {
    chatsWithDetails = await fetchChatDetails(chats);
  }

  if (!chatsWithDetails.find((chat) => chat.userId === receiverId) && receiverId) {
    await createChat(receiverId);
    chats = await getChatsForUser();
    chatsWithDetails = await fetchChatDetails(chats);
  }

  return (
    <div className="w-[90%] bg-background flex-1 flex overflow-hidden">
      <MessagesContent receiverId={receiverId} chats={chatsWithDetails} />
    </div>
  );
}
