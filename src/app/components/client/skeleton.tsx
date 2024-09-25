export default function Skeleton() {
  return (
    <div className="card card-compact w-full max-h-96 h-full rounded-sm gap-4">
      <div className="w-full h-48 skeleton" />
      <div className="skeleton h-6 w-28"></div>
      <div className="skeleton h-6 w-full"></div>
      <div className="skeleton h-6 w-full"></div>
      <div className="skeleton h-6 w-28 self-end"></div>
    </div>
  );
}
