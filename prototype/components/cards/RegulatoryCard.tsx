type Props = { title: string; date?: string };

export default function RegulatoryCard({ title, date }: Props) {
  return (
    <article className="rounded-lg border p-5">
      <h3>{title}</h3>
      {date && <small>{date}</small>}
    </article>
  );
}
