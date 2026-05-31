import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Entry {
  rank: number;
  name: string;
  score: number;
}

export default function Leaderboard({ entries }: { entries: Entry[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="bg-card rounded-3xl shadow-soft border border-border p-4">
        <CardHeader>
          <CardTitle className="text-primary">Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Student</th>
                <th className="p-2">Score</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr
                  key={e.rank}
                  className={cn(
                    "border-b border-gray-100",
                    e.name === "You" && "bg-primary/10"
                  )}
                >
                  <td className="p-2 font-medium">
                    {e.rank === 1 ? <Trophy className="inline h-4 w-4 text-yellow-500" /> : e.rank}
                  </td>
                  <td className="p-2 flex items-center gap-2">
                    {e.rank === 2 && <Medal className="h-4 w-4 text-blue-400" />}
                    {e.name}
                  </td>
                  <td className="p-2 font-semibold text-primary">{e.score}%</td>
                  <td className="p-2 text-right">
                    {e.name === "You" && <Star className="h-4 w-4 text-primary" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </motion.section>
  );
}
