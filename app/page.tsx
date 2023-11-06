import Image from "next/image";
import Search from "./components/search/Search";
import CityList from "./components/CtiyList";

type HomeProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: HomeProps) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2">
      <Search city="تهران" search={search} />
      <CityList search={search} />
    </main>
  );
}
