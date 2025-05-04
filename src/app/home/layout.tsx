import { UserMenu } from "@/components/user-menu";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto my-5 px-4 md:px-2">
      <UserMenu />
      {children}
    </div>
  );
}
