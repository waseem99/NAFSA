type Props = { label: string; value: string };

export default function StatisticsWidget({ label, value }: Props) {
  return (
    <div className="rounded-lg border p-5">
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}
