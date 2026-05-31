import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface AnalysisProps {
  analysis: {
    accuracy: number;
    weakTopics: string[];
    strongTopics: string[];
    recommendations: string[];
  };
}

const COLORS = ["#22819A", "#90C2E7", "#FFD166", "#FF6F61"]; // primary, soft blue, amber, red

export default function QuizAnalysis({ analysis }: AnalysisProps) {
  const data = [
    { name: "Correct", value: analysis.accuracy },
    { name: "Incorrect", value: 100 - analysis.accuracy },
  ];

  return (
    <motion.section
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="bg-card rounded-3xl shadow-soft border border-border p-6">
        <CardHeader>
          <CardTitle className="text-primary">Quiz Accuracy</CardTitle>
        </CardHeader>
        <CardContent className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} label>
                {data.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card rounded-3xl shadow-soft border border-border p-6">
        <CardHeader>
          <CardTitle className="text-primary">Topic Strengths & Weaknesses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2 text-sm text-gray-600">Strong Topics</h3>
              {analysis.strongTopics.map((t) => (
                <Badge key={t} variant="secondary" className="mr-2 mb-2">{t}</Badge>
              ))}
            </div>
            <div>
              <h3 className="font-medium mb-2 text-sm text-gray-600">Weak Topics</h3>
              {analysis.weakTopics.map((t) => (
                <Badge key={t} variant="destructive" className="mr-2 mb-2">{t}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card rounded-3xl shadow-soft border border-border p-6">
        <CardHeader>
          <CardTitle className="text-primary">AI Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            {analysis.recommendations.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.section>
  );
}
