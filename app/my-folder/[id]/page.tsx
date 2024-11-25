type InputProps = {
  params: Promise<{ id: string }>;
};

export default async function FolderDetail({ params }: InputProps) {
  const id = (await params).id;
  return <div className="w-full flex-1">{id}</div>;
}
