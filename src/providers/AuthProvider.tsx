// "use client";

// import { selectIsAuthenticated } from "@/features/auth/authSelectors";
// import { useAppSelector } from "@/lib/redux/hooks";
// import { redirect, usePathname } from "next/navigation";

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const isAuthenticated = useAppSelector(selectIsAuthenticated);
//   const pathname = usePathname();

//   console.log({ isAuthenticated });

//   if (!isAuthenticated && pathname !== "/auth/login") {
//     redirect("/auth/login");
//   } else if (isAuthenticated && pathname === "/auth/login") {
//     redirect("/home");
//   }

//   return <>{children}</>;
// }
