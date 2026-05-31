"use client"

import { motion } from "framer-motion"
import {
  Play,
  BookOpen,
  MessageCircleQuestion,
  Calendar,
  Video,
  FileText,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface QuickAction {
  id: string
  label: string
  icon: string
  color: string
  bgColor: string
}

interface QuickActionsProps {
  actions: QuickAction[]
}

const iconMap: Record<string, React.ReactNode> = {
  play: <Play className="h-5 w-5" />,
  book: <BookOpen className="h-5 w-5" />,
  doubt: <MessageCircleQuestion className="h-5 w-5" />,
  calendar: <Calendar className="h-5 w-5" />,
  video: <Video className="h-5 w-5" />,
  file: <FileText className="h-5 w-5" />,
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200",
                action.bgColor,
                "hover:shadow-soft"
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-xl",
                  action.color === "white"
                    ? "bg-white/20"
                    : "bg-white shadow-sm"
                )}
              >
                {iconMap[action.icon]}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}