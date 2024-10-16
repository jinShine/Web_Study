export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return <>Search {searchParams.q}</>;
}
