// props에는 params와 searchParams가 존재한다.
export default function Page({ params }: { params: { id: string } }) {
  console.log(params);
  return <>Book {params.id}</>;
}
