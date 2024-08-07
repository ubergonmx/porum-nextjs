export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">Current feed</h1>
      <div className="grid grid-cols-1 gap-y-4 py-6 md:grid-cols-3 md:gap-x-4"></div>
    </>
  );
}
