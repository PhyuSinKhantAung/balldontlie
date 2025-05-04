import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthGuard } from "@/features/auth/components/AuthGuard";
import { PlayersList } from "@/features/player/components/PlayersList";
import { TeamsList } from "@/features/team/components/TeamsList";

export default function Home() {
  return (
    <AuthGuard>
      <Label className="py-5">Welcome To Balldontlie!!</Label>

      <Tabs defaultValue="players" className="w-full">
        <div className="max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="players">
          <PlayersList />
        </TabsContent>
        <TabsContent value="teams">
          <TeamsList />
        </TabsContent>
      </Tabs>
    </AuthGuard>
  );
}
