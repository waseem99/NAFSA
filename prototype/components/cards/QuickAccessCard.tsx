type Props = { title: string; description: string };

export default function QuickAccessCard({ title, description }: Props) {
  return (
    <div className="rounded-lg border p-5">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
