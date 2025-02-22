import { IdResponse } from "../types/responses";
import { Chat, Message } from "../types/types";
import { fetchWrapper } from "./fetch-wrapper";

export async function createChat(receiverId: string): Promise<IdResponse> {
  const response = await fetchWrapper<IdResponse>(`/message/${receiverId}/chat`, {
    method: "GET",
    auth: true,
    errorMessage: "Nie udało się utworzyć czatu",
  });

  return response;
}

export async function getChatsForUser(): Promise<Chat[]> {
  const response = await fetchWrapper<Chat[]>("/message/chat/all", {
    method: "GET",
    auth: true,
    errorMessage: "Nie udało się pobrać listy czatów",
  });

  return response;
}

export async function getChatMessages(chatId: string): Promise<Message[]> {
  const response = await fetchWrapper<Message[]>(`/message/chat/${chatId}/messages`, {
    method: "GET",
    auth: true,
    errorMessage: "Nie udało się pobrać wiadomości",
  });

  return response;
}
