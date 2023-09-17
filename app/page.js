import Profile from "./components/Profile";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession()

  return (
    <div>
      <Profile session={session}/>
    </div>
  )
}
