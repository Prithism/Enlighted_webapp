"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";



interface Question {
  id: string;
  text: string;
  options: string[];
}

interface ActiveQuizProps {
  quiz: {
    subject: string;
    difficulty: "easy" | "medium" | "hard";
    questions: Question[];
  };
}

export default function ActiveQuiz({ quiz }: ActiveQuizProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [seconds, setSeconds] = useState(300); // 5 min timer

  // countdown timer
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => Math.max(s - 1, 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const selectOption = (idx: number) => {
    setAnswers({ ...answers, [quiz.questions[current].id]: idx });
  };

  const next = () => setCurrent((c) => Math.min(c + 1, quiz.questions.length - 1));
  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  const formattedTime = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <motion.section
      className="bg-card rounded-3xl shadow-soft border border-border p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <CardTitle className="text-lg font-medium">{quiz.subject} Quiz</CardTitle>
          <p className="text-sm text-gray-500">Difficulty: {quiz.difficulty}</p>
        </div>
        <div className="flex items-center gap-1 text-primary">
          <Clock className="h-4 w-4" /> {formattedTime}
        </div>
      </CardHeader>
      <CardContent className="mt-4">
        <div className="mb-4 text-xl font-semibold">{quiz.questions[current].text}</div>
        <div className="grid gap-2">
          {quiz.questions[current].options.map((opt, i) => (
            <Button
              key={i}
              variant={answers[quiz.questions[current].id] === i ? "default" : "outline"}
              className={cn("w-full justify-start text-left", answers[quiz.questions[current].id] === i && "bg-primary/10")}
              onClick={() => selectOption(i)}
            >
              {opt}
            </Button>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <Button onClick={prev} disabled={current === 0} variant="outline">
            Previous
          </Button>
          {current < quiz.questions.length - 1 ? (
            <Button onClick={next}>Next</Button>
          ) : (
            <Button variant="default">Submit Quiz</Button>
          )}
        </div>
      </CardContent>
    </motion.section>
  );
}
