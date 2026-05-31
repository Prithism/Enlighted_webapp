"use client"

import { motion } from "framer-motion"
import { Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  dueTime: string
  status: "pending" | "in-progress" | "completed"
  progress?: number
  priority: "high" | "medium" | "low"
}

interface UpcomingAssignmentsProps {
  assignments: Assignment[]
}

const priorityConfig = {
  high: { color: "bg-red-100 text-red-700", icon: AlertCircle },
  medium: { color: "bg-amber-100 text-amber-700", icon: Clock },
  low: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
}

const statusConfig = {
  pending: { label: "Not Started", color: "bg-slate-100 text-slate-600" },
  "in-progress": { label: "In Progress", color: "bg-sky/20 text-ocean" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-700" },
}

export function UpcomingAssignments({ assignments }: UpcomingAssignmentsProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Upcoming Assignments
            </h3>
            <p className="text-sm text-slate-500">
              {assignments.length} assignments due this week
            </p>
          </div>
          <button className="text-sm text-ocean hover:text-ocean/80 font-medium">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {assignments.map((assignment, index) => {
            const priority = priorityConfig[assignment.priority]
            const status = statusConfig[assignment.status]
            const PriorityIcon = priority.icon

            return (
              <motion.div
                key={assignment.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-slate-900">
                        {assignment.title}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {assignment.course}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {assignment.dueDate} at {assignment.dueTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
                        priority.color
                      )}
                    >
                      <PriorityIcon className="h-3.5 w-3.5" />
                      {assignment.priority.charAt(0).toUpperCase() +
                        assignment.priority.slice(1)}
                    </span>
                  </div>
                </div>

                {assignment.status === "in-progress" && assignment.progress && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-medium text-slate-700">
                        {assignment.progress}%
                      </span>
                    </div>
                    <Progress value={assignment.progress} />
                  </div>
                )}

                {assignment.status === "completed" && (
                  <Badge variant="success" className="mt-2">
                    {status.label}
                  </Badge>
                )}
              </motion.div>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}