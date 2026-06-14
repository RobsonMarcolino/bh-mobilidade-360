import { NextRequest, NextResponse } from 'next/server';
import { classifyImage } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { image, mimeType } = await request.json();

    if (!image || !mimeType) {
      return NextResponse.json(
        { error: 'Imagem e tipo MIME são obrigatórios' },
        { status: 400 }
      );
    }

    const result = await classifyImage(image, mimeType);

    // Tentar parsear o JSON retornado pela IA
    try {
      const classification = JSON.parse(result);
      return NextResponse.json({ classification });
    } catch {
      // Se não for JSON válido, retorna o texto bruto
      return NextResponse.json({
        classification: {
          tipo: 'OUTRO',
          severidade: 'MEDIA',
          descricao: result,
          orgao_responsavel: 'Prefeitura de BH - Central 156',
          confianca: 0.5,
          recomendacao: 'Ligue para a Central 156 para mais informações.',
        },
      });
    }
  } catch (error) {
    console.error('Erro na classificação:', error);
    return NextResponse.json(
      { error: 'Erro ao classificar imagem. Tente novamente.' },
      { status: 500 }
    );
  }
}
