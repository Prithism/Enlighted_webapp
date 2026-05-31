"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface Stats {
  total: number;
  accuracy: number;
  weeklyImprovement: number;
  aiSkill: number;
}

export default function QuizOverview({ stats }: { stats: Stats }) {
  const [counters, setCounters] = useState({ total: 0, accuracy: 0, weeklyImprovement: 0, aiSkill: 0 });

  useEffect(() => {
    const start = Date.now();
    const duration = 1000; // 1s animation
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      setCounters({
        total: Math.floor(stats.total * progress),
        accuracy: Math.floor(stats.accuracy * progress),
        weeklyImprovement: Math.floor(stats.weeklyImprovement * progress),
        aiSkill: Math.floor(stats.aiSkill * progress),
      });
      if (progress < 1) requestAnimationFrame(animate);
    };
    animate();
  }, [stats]);

  const items = [
    { label: "Total Quizzes Attempted", value: counters.total },
    { label: "Average Accuracy", value: `${counters.accuracy}%` },
    { label: "Weekly Improvement", value: `${counters.weeklyImprovement}%` },
    { label: "AI Skill Rating", value: `${counters.aiSkill}%` },
  ];

  return (
    <motion.section
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {items.map((item) => (
        <Card
          key={item.label}
          className="bg-card rounded-3xl shadow-soft border border-border p-4"
        >
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 text-2xl font-bold text-primary">
            {item.value}
          </CardContent>
        </Card>
      ))}
    </motion.section>
  );
}
