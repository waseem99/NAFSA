import { NextResponse } from 'next/server';
import { searchCorpus } from '../../../../../data/nicl/demoContent';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim().toLowerCase() ?? '';

  await new Promise((resolve) => setTimeout(resolve, 260));

  const tokens = q.split(/\s+/).filter(Boolean);
  const ranked = searchCorpus
    .map((item) => {
      const haystack = `${item.type} ${item.title} ${item.summary} ${item.keywords.join(' ')}`.toLowerCase();
      const score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 1 : 0), 0);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => ({
      type: item.type,
      title: item.title,
      summary: item.summary,
      href: item.href,
    }));

  return NextResponse.json({
    demo: true,
    query: q,
    items: ranked,
  });
}
