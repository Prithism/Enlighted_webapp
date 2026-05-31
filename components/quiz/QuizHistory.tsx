import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface HistoryEntry {
  id: string;
  subject: string;
  score: number;
  time: string;
  accuracy: number;
  date: string;
}

export default function QuizHistory({ history }: { history: HistoryEntry[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="bg-card rounded-3xl shadow-soft border border-border p-4">
        <CardHeader>
          <CardTitle className="text-primary">Quiz History</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="p-2">Subject</th>
                <th className="p-2">Score</th>
                <th className="p-2">Time</th>
                <th className="p-2">Accuracy</th>
                <th className="p-2">Date</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-b border-gray-100">
                  <td className="p-2 font-medium">{h.subject}</td>
                  <td className="p-2 text-primary">{h.score}%</td>
                  <td className="p-2 flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {h.time}
                  </td>
                  <td className="p-2">{h.accuracy}%</td>
                  <td className="p-2 text-sm text-gray-500">{h.date}</td>
                  <td className="p-2 text-right">
                    <Button variant="outline" size="sm">Retry</Button>
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
