export default function TypePill({ type }: { type: string }) {
  return (
    <p className={"px-4 py-1 font-medium rounded-full text-sm tracking-wide " + type}>
      {type}
    </p>
  );
}
