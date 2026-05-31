"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import QuizOverview from "@/components/quiz/QuizOverview";
import QuizCard from "@/components/quiz/QuizCard";
import QuizCategories from "@/components/quiz/QuizCategories";
import ActiveQuiz from "@/components/quiz/ActiveQuiz";
import QuizAnalysis from "@/components/quiz/QuizAnalysis";
import Leaderboard from "@/components/quiz/Leaderboard";
import QuizHistory from "@/components/quiz/QuizHistory";

// Mock data – replace with real API calls via dependency injection
const overviewData = {
  total: 124,
  accuracy: 87,
  weeklyImprovement: 5,
  aiSkill: 92,
};

const recommendedQuizzes = [
  {
    id: "q1",
    subject: "Mathematics",
    chapter: "Algebra Basics",
    difficulty: "easy" as const,
    questions: 10,
    eta: "5‑7 min",
    reason: "Great for reinforcing fundamentals",
    aiScore: 94,
  },
  {
    id: "q2",
    subject: "Physics",
    chapter: "Newton's Laws",
    difficulty: "medium" as const,
    questions: 12,
    eta: "8‑10 min",
    reason: "High relevance to upcoming exam",
    aiScore: 88,
  },
];

const categories = [
  { id: "c1", name: "Mathematics", icon: "Calculator" as const, count: 42, confidence: 93 },
  { id: "c2", name: "Physics", icon: "Atom" as const, count: 35, confidence: 89 },
  { id: "c3", name: "Chemistry", icon: "Flask" as const, count: 28, confidence: 85 },
  { id: "c4", name: "Biology", icon: "Leaf" as const, count: 22, confidence: 80 },
  { id: "c5", name: "English", icon: "BookOpen" as const, count: 30, confidence: 88 },
  { id: "c6", name: "Logical Reasoning", icon: "Brain" as const, count: 18, confidence: 82 },
];

const activeQuiz = {
  id: "aq1",
  subject: "Mathematics",
  difficulty: "medium" as const,
  questions: [
    {
      id: "q1",
      text: "What is 7 × 8?",
      options: ["54", "56", "58", "60"],
    },
    {
      id: "q2",
      text: "Solve for x: 2x + 3 = 11",
      options: ["2", "3", "4", "5"],
    },
  ],
};

const analysis = {
  accuracy: 85,
  weakTopics: ["Fractions", "Decimals"],
  strongTopics: ["Multiplication", "Division"],
  recommendations: ["Practice fractions daily", "Watch tutorial on decimals"],
};

const leaderboardEntries = [
  { rank: 1, name: "Alice", score: 98 },
  { rank: 2, name: "Bob", score: 95 },
  { rank: 3, name: "You", score: 92 },
];

const history = [
  { id: "h1", subject: "Physics", score: 88, time: "9 min", accuracy: 90, date: "2024‑09‑12" },
  { id: "h2", subject: "Chemistry", score: 92, time: "12 min", accuracy: 94, date: "2024‑09‑10" },
];

export default function QuizPage() {
  return (
    <motion.main
      className="p-6 space-y-8 bg-offWhite min-h-screen"
      initial="hidden"
      animate="visible"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
    >
      {/* Header */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Quiz Center</h1>
          <p className="text-lg text-gray-600">Practice intelligently with AI‑generated quizzes.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="default" className="bg-primary hover:bg-primary/90 text-white rounded-3xl">
            Create Quiz
          </Button>
          <Button variant="outline" className="rounded-3xl">
            Continue Last Quiz
          </Button>
        </div>
      </section>

      {/* Sections */}
      <QuizOverview stats={overviewData} />
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">AI‑Recommended Quizzes</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {recommendedQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </section>
      <QuizCategories categories={categories} />
      <ActiveQuiz quiz={activeQuiz} />
      <QuizAnalysis analysis={analysis} />
      <Leaderboard entries={leaderboardEntries} />
      <QuizHistory history={history} />
    </motion.main>
  );
}
