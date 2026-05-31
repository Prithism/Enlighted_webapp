"use client"

import { motion } from "framer-motion"
import { MessageCircle, Sparkles, ArrowRight, ThumbsUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Doubt {
  id: string
  question: string
  course: string
  askedAt: string
  status: "resolved" | "pending" | "ai-suggested"
  responses: number
  upvotes: number
  isAIGenerated?: boolean
}

interface RecentDoubtsProps {
  doubts: Doubt[]
}

const statusConfig = {
  resolved: { label: "Resolved", color: "bg-emerald-100 text-emerald-700" },
  pending: { label: "Pending", color: "bg-amber-100 text-amber-700" },
  "ai-suggested": { label: "AI Suggested", color: "bg-purple-100 text-purple-700" },
}

export function RecentDoubts({ doubts }: RecentDoubtsProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Recent Doubts
            </h3>
            <p className="text-sm text-slate-500">
              Questions from your courses
            </p>
          </div>
          <button className="flex items-center gap-1 text-sm text-ocean hover:text-ocean/80 font-medium">
            Ask a Doubt
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {doubts.map((doubt, index) => {
            const status = statusConfig[doubt.status]

            return (
              <motion.div
                key={doubt.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {doubt.isAIGenerated && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                          <Sparkles className="h-3 w-3" />
                          AI
                        </span>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {doubt.course}
                      </Badge>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          status.color
                        )}
                      >
                        {status.label}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium mb-2">
                      {doubt.question}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{doubt.askedAt}</span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {doubt.responses} responses
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {doubt.upvotes}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* AI Help Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-slate-900">
                AI Study Assistant
              </h4>
              <p className="text-sm text-slate-600">
                Get instant answers to your questions 24/7
              </p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors">
              Try Now
            </button>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}