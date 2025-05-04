"use client";

import { selectCurrentUser } from "@/features/auth/authSelectors";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/authSlice";

export function UserMenu() {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-2 justify-between">
      <Avatar>
        <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <Button className="text-sm" onClick={() => dispatch(logout())}>
        <LogOut />
        Log Out
      </Button>
    </div>
  );
}
