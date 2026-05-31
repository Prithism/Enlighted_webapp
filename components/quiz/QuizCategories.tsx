import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Atom, FlaskConical, Leaf, BookOpen, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryInfo {
  id: string;
  name: string;
  icon: keyof typeof iconMap;
  count: number;
  confidence: number;
}

const iconMap = {
  Calculator,
  Atom,
  Flask: FlaskConical,
  Leaf,
  BookOpen,
  Brain,
};

export default function QuizCategories({ categories }: { categories: CategoryInfo[] }) {
  return (
    <motion.section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {categories.map((cat) => {
        const Icon = iconMap[cat.icon as keyof typeof iconMap];
        return (
          <Card
            key={cat.id}
            className="bg-card rounded-3xl shadow-soft border border-border p-4 hover:shadow-xl transition-shadow"
          >
            <CardHeader className="p-0 flex items-center gap-2">
              <Icon className="h-6 w-6 text-primary" />
              <CardTitle className="text-lg font-medium">{cat.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-2 text-sm text-gray-600">
              <div>{cat.count} quizzes</div>
              <Badge variant="secondary" className="mt-1">
                AI confidence: {cat.confidence}%
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </motion.section>
  );
}
