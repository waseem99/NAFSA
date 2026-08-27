import { NextResponse } from 'next/server';
import { assistantKnowledge } from '../../../../../data/nicl/demoContent';

function selectAnswer(prompt: string) {
  const q = prompt.toLowerCase();
  if (q.includes('tender') || q.includes('procurement') || q.includes('supplier')) return assistantKnowledge.tenders;
  if (q.includes('annual') || q.includes('report') || q.includes('disclosure')) return assistantKnowledge.annualReport;
  if (q.includes('marine') || q.includes('hull') || q.includes('cargo')) return assistantKnowledge.marine;
  if (q.includes('cms') || q.includes('publish') || q.includes('approval') || q.includes('role')) return assistantKnowledge.cms;
  return assistantKnowledge.fallback;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';

  await new Promise((resolve) => setTimeout(resolve, 520));

  const result = selectAnswer(prompt);

  return NextResponse.json({
    demo: true,
    grounded: result !== assistantKnowledge.fallback,
    prompt,
    ...result,
  });
}
