'use client';

import { useState, useCallback } from 'react';
import type { ChatMessage } from '@/types';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'ASSISTANT',
      content:
        'Olá! 👋 Sou o assistente **BH Mobilidade 360**. Posso te ajudar com informações sobre transporte público, buracos, iluminação, e qualquer problema de infraestrutura em Belo Horizonte. Como posso ajudar?',
      createdAt: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'USER',
      content,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ASSISTANT',
        content: data.response || 'Desculpe, não consegui processar sua pergunta. Tente novamente.',
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ASSISTANT',
        content: '❌ Ops! Ocorreu um erro. Verifique sua conexão e tente novamente.',
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'ASSISTANT',
        content:
          'Olá! 👋 Conversa reiniciada. Como posso ajudar com mobilidade e infraestrutura em BH?',
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  return { messages, isLoading, sendMessage, clearMessages };
}
