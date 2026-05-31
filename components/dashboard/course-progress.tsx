"use client"

import { motion } from "framer-motion"
import { Clock, PlayCircle, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Course {
  id: string
  title: string
  instructor: string
  instructorAvatar?: string
  progress: number
  totalLessons: number
  completedLessons: number
  nextLesson: string
  duration: string
  thumbnail?: string
}

interface CourseProgressProps {
  courses: Course[]
}

export function CourseProgress({ courses }: CourseProgressProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Continue Learning
            </h3>
            <p className="text-sm text-slate-500">
              Pick up where you left off
            </p>
          </div>
          <button className="text-sm text-ocean hover:text-ocean/80 font-medium">
            View All Courses
          </button>
        </div>

        <div className="space-y-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-4">
                {/* Course Icon */}
                <div
                  className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                    "bg-ocean/10"
                  )}
                >
                  <BookOpen className="h-6 w-6 text-ocean" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-slate-900 truncate">
                        {course.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar size="sm">
                          <AvatarFallback>
                            {course.instructor
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-slate-500">
                          {course.instructor}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {course.progress}%
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Progress value={course.progress} />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">
                        {course.completedLessons} of {course.totalLessons} lessons
                      </span>
                      <span className="text-slate-500">{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                    <PlayCircle className="h-4 w-4 text-ocean" />
                    <span className="text-sm text-slate-600">
                      Next: {course.nextLesson}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}