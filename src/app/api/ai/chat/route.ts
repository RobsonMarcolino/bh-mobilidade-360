import { NextRequest, NextResponse } from 'next/server';
import { sendChatMessage } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      );
    }

    const response = await sendChatMessage(message, history || []);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Erro no chat AI:', error);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
