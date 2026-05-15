// src/features/api-chat/apiClient.ts
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export const createMockStream = async function* (text: string) {
  const chunks = text.split('');
  for (const chunk of chunks) {
    await new Promise(r => setTimeout(r, 20));
    yield chunk;
  }
};

export const fetchMockChatResponse = async (messages: ChatMessage[], model: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`[来自 ${model} 的回复的模拟流]: 我已经收到了您的消息。这不仅是一个占位的回复，也代表了模型接口在此处的接入点。您刚才说了：\n\n> ${messages[messages.length - 1]?.content}\n\n如需扩展其他能力，我会负责执行您的指定任务！`);
    }, 500);
  });
};
