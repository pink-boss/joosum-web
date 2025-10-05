interface Props {
  loading: boolean;
}

export default function ButtonLoading({ loading }: Props) {
  return (
    loading && (
      <span className="ml-2 inline-block align-middle">
        <span className="block size-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </span>
    )
  );
}
