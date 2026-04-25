import { auth } from "@/auth";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      <Header name={user?.name} email={user?.email} image={user?.image} />
      <Dashboard />
    </>
  );
}
