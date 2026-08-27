import { NextResponse } from 'next/server';
import { demoTenders } from '../../../../../data/nicl/demoContent';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const q = searchParams.get('q')?.trim().toLowerCase();

  await new Promise((resolve) => setTimeout(resolve, 320));

  const items = demoTenders.filter((item) => {
    const statusMatch = !status || status === 'All' || item.status.toLowerCase() === status.toLowerCase();
    const queryMatch =
      !q ||
      `${item.title} ${item.category} ${item.summary}`.toLowerCase().includes(q);
    return statusMatch && queryMatch;
  });

  return NextResponse.json({
    demo: true,
    source: 'seeded-local-demo-data',
    items,
  });
}
