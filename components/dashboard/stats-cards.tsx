"use client"

import { motion } from "framer-motion"
import { BookOpen, Clock, Trophy, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardsProps {
  stats: {
    label: string
    value: string
    change?: string
    changeType?: "positive" | "negative" | "neutral"
    icon: string
    color: string
  }[]
}

const iconMap: Record<string, React.ReactNode> = {
  book: <BookOpen className="h-5 w-5" />,
  clock: <Clock className="h-5 w-5" />,
  trophy: <Trophy className="h-5 w-5" />,
  trending: <TrendingUp className="h-5 w-5" />,
}

const colorMap: Record<string, string> = {
  blue: "bg-sky/10 text-ocean",
  green: "bg-emerald-100 text-emerald-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-amber-100 text-amber-600",
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                {stat.change && (
                  <p
                    className={cn(
                      "text-sm mt-2 flex items-center gap-1",
                      stat.changeType === "positive"
                        ? "text-emerald-600"
                        : stat.changeType === "negative"
                        ? "text-red-500"
                        : "text-slate-500"
                    )}
                  >
                    {stat.changeType === "positive" && "↑"}
                    {stat.change}
                  </p>
                )}
              </div>
              <div
                className={cn(
                  "p-3 rounded-xl",
                  colorMap[stat.color] || colorMap.blue
                )}
              >
                {iconMap[stat.icon]}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}