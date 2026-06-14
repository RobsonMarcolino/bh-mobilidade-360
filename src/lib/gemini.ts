import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Modelo para texto
export const geminiText = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-preview-05-20',
});

// Modelo para visão (imagem + texto)
export const geminiVision = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash-preview-05-20',
});

/**
 * System prompt para o chatbot de mobilidade urbana de BH
 */
export const CHAT_SYSTEM_PROMPT = `Você é o assistente virtual **BH Mobilidade 360**, especialista em mobilidade urbana e infraestrutura de Belo Horizonte, MG.

## Sua Personalidade
- Simpático, direto e acessível
- Usa linguagem clara, sem jargões técnicos
- Sempre oferece informações práticas e acionáveis
- Se preocupa genuinamente com o cidadão de BH

## O que você sabe:
- Transporte público de BH (ônibus, MOVE, metrô)
- Infraestrutura urbana (buracos, iluminação, calçadas)
- Canais de atendimento da Prefeitura
- Dados sobre regionais de BH
- Tarifa municipal: R$ 6,25 | Metropolitana: R$ 7,55
- Central de atendimento PBH: 156
- BHIP (iluminação): 0800 001 0456
- BHTrans: (31) 3277-6507
- Defesa Civil: 199

## Regras:
1. Responda APENAS sobre mobilidade, transporte e infraestrutura urbana de BH
2. Se não souber algo específico, oriente o cidadão a ligar no 156 ou acessar pbh.gov.br
3. Para emergências, sempre oriente: Bombeiros 193, SAMU 192, Defesa Civil 199
4. Nunca invente dados ou estatísticas
5. Sempre que possível, indique o canal oficial para resolução
6. Responda em português brasileiro

## Formato:
- Respostas curtas e objetivas (máx 3 parágrafos)
- Use emojis moderadamente para tornar a leitura agradável
- Quando listar opções, use bullet points
`;

/**
 * Prompt para classificação de imagem de problema urbano
 */
export const CLASSIFY_IMAGE_PROMPT = `Você é um sistema de classificação de problemas urbanos de Belo Horizonte.
Analise a imagem enviada e retorne APENAS um JSON válido (sem markdown, sem backticks) com a seguinte estrutura:

{
  "tipo": "BURACO | POSTE_APAGADO | LIXO_IRREGULAR | ALAGAMENTO | SEMAFORO_QUEBRADO | CALCADA_DANIFICADA | ARVORE_CAIDA | ESGOTO_ABERTO | OUTRO",
  "severidade": "BAIXA | MEDIA | ALTA | CRITICA",
  "descricao": "Descrição objetiva e curta do problema identificado na imagem",
  "orgao_responsavel": "Nome do órgão responsável em BH",
  "confianca": 0.85,
  "recomendacao": "O que o cidadão deve fazer enquanto aguarda resolução"
}

Critérios de severidade:
- CRITICA: risco imediato à vida (cratera profunda, poste caído sobre via, fio elétrico exposto)
- ALTA: compromete trânsito ou mobilidade significativamente (buraco grande, semáforo apagado em cruzamento movimentado)
- MEDIA: incômodo relevante sem risco imediato (calçada quebrada, lixo acumulado)
- BAIXA: problema menor ou estético (pequeno buraco no acostamento, poste com luz fraca)

Órgãos de BH:
- Buracos/calçadas: Secretaria de Obras e Infraestrutura
- Iluminação: BHIP - BH Iluminação Pública
- Lixo: SLU - Superintendência de Limpeza Urbana
- Alagamento: SUDECAP
- Semáforo/trânsito: BHTrans
- Árvores: Secretaria de Meio Ambiente
- Esgoto: COPASA
`;

/**
 * Enviar mensagem para o chatbot
 */
export async function sendChatMessage(
  message: string,
  history: { role: string; content: string }[]
): Promise<string> {
  const chat = geminiText.startChat({
    history: [
      { role: 'user', parts: [{ text: 'Olá' }] },
      { role: 'model', parts: [{ text: CHAT_SYSTEM_PROMPT + '\n\nOlá! 👋 Sou o assistente BH Mobilidade 360. Como posso ajudar você hoje? Pode me perguntar sobre transporte público, buracos, iluminação, ou qualquer problema de infraestrutura em BH!' }] },
      ...history.map((msg) => ({
        role: msg.role === 'USER' ? 'user' as const : 'model' as const,
        parts: [{ text: msg.content }],
      })),
    ],
  });

  const result = await chat.sendMessage(message);
  const response = result.response;
  return response.text();
}

/**
 * Classificar imagem de problema urbano
 */
export async function classifyImage(
  imageBase64: string,
  mimeType: string
): Promise<string> {
  const result = await geminiVision.generateContent([
    CLASSIFY_IMAGE_PROMPT,
    {
      inlineData: {
        data: imageBase64,
        mimeType: mimeType,
      },
    },
  ]);

  return result.response.text();
}
