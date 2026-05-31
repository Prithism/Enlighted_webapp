import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizInfo {
  id: string;
  subject: string;
  chapter: string;
  difficulty: "easy" | "medium" | "hard";
  questions: number;
  eta: string;
  reason: string;
  aiScore: number;
}

export default function QuizCard({ quiz }: { quiz: QuizInfo }) {
  const diffColor = {
    easy: "bg-easy",
    medium: "bg-medium",
    hard: "bg-hard",
  }[quiz.difficulty];

  return (
    <motion.div
      className={cn(
        "min-w-[260px] p-4 bg-card rounded-3xl shadow-soft border border-border bg-white/60 backdrop-blur-lg",
        diffColor
      )}
      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(144,194,231,0.4)" }}
    >
      <CardHeader className="p-0 mb-2">
        <Badge variant="secondary" className={cn("uppercase text-xs", diffColor)}>
          {quiz.difficulty}
        </Badge>
        <CardTitle className="text-lg font-semibold mt-2">{quiz.chapter}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 space-y-2 text-sm text-gray-600">
        <div>{quiz.reason}</div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" /> {quiz.eta}
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-400" /> {quiz.aiScore}% AI match
        </div>
      </CardContent>
      <Button variant="outline" className="mt-3 w-full rounded-3xl">
        Start Quiz
      </Button>
    </motion.div>
  );
}
