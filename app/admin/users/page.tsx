import { getUsers } from "@/firebase";

export default async function Page() {
  const users = await getUsers();
  return (
    <div className="text-[#ffffff] p-[48px]">
      <h1 className="text-4xl font-bold mb-[60px]">Użytkownicy</h1>
      <div className="grid grid-cols-4 w-full">
        {users.map((user: any, index: number) => (
          <div key={index}>{user?.email}</div>
        ))}
      </div>
    </div>
  );
}
