export default function Loading() {
  return (
    <div className="flex size-full flex-wrap items-center justify-center gap-4 py-6">
      <div className="size-6 animate-spin rounded-full border-4 border-gray-400 border-t-transparent"></div>
      <div className="text-gray-500">Loading...</div>
    </div>
  );
}
