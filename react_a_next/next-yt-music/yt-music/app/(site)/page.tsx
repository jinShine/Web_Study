import { sleep } from "@/lib/utils";

export default async function Home() {
  await sleep(2500);

  // return <main>Home</main>;
  throw new Error("!!!");
}
