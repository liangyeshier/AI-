export interface WebProvider {
  id: string;
  name: string;
  url: string;
}

export const WEB_PROVIDERS: WebProvider[] = [
  { id: 'gemini', name: 'Gemini网页', url: 'https://gemini.google.com/' },
  { id: 'chatgpt', name: 'ChatGPT网页', url: 'https://chat.openai.com/' },
  { id: 'claude', name: 'Claude网页', url: 'https://claude.ai/' },
  { id: 'grok', name: 'Grok网页', url: 'https://grok.com/' },
  { id: 'deepseek', name: 'DeepSeek网页', url: 'https://chat.deepseek.com/' }
];
