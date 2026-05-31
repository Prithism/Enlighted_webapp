"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Calendar,
  Clock,
  TrendingUp,
  BookOpen,
  MessageCircleQuestion,
  Award,
  Users,
  Play,
  Sparkles,
  ChevronRight,
  Bell,
  Search,
  MoreVertical,
  Video,
  FileText,
  Brain,
  Target,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { SkeletonCard, SkeletonChart } from "@/components/ui/skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { useToastHook } from "@/components/ui/toast"
import { useBreakpoints, useDebounce } from "@/hooks"
import { StudentStats, ScheduleItem, Activity, ChartData } from "@/types"

// Types
interface DashboardData {
  greeting: {
    name: string
    date: string
    summary: {
      classesToday: number
      assignmentsDue: number
      studyHoursGoal: number
    }
  }
  studentStats: StudentStats
  performanceData: ChartData[]
  scheduleData: ScheduleItem[]
  activityData: Activity[]
}

// Mock Data
const mockData: DashboardData = {
  greeting: {
    name: "Alex",
    date: "Wednesday, May 27, 2026",
    summary: {
      classesToday: 4,
      assignmentsDue: 2,
      studyHoursGoal: 6,
    },
  },
  studentStats: {
    totalAssignments: 48,
    completedAssignments: 32,
    pendingAssignments: 12,
    averageScore: 87,
    attendanceRate: 94,
    studyHours: 24.5,
    rank: 12,
  },
  performanceData: [
    { week: "Week 1", score: 78, attendance: 95 },
    { week: "Week 2", score: 82, attendance: 92 },
    { week: "Week 3", score: 75, attendance: 88 },
    { week: "Week 4", score: 88, attendance: 96 },
    { week: "Week 5", score: 85, attendance: 94 },
    { week: "Week 6", score: 92, attendance: 98 },
  ],
  scheduleData: [
    {
      id: "1",
      subject: "Advanced Mathematics",
      teacher: "Dr. Sarah Chen",
      time: "09:00 AM",
      duration: "1h 30m",
      type: "live",
    },
    {
      id: "2",
      subject: "Physics Lab",
      teacher: "Prof. Michael Brown",
      time: "11:30 AM",
      duration: "2h 00m",
      type: "lab",
    },
    {
      id: "3",
      subject: "Machine Learning",
      teacher: "Dr. Emily Rodriguez",
      time: "02:00 PM",
      duration: "1h 30m",
      type: "live",
    },
  ],
  activityData: [
    {
      id: "1",
      type: "assignment",
      title: "Submitted: Linear Algebra Problem Set",
      time: "2 hours ago",
      icon: "file",
      color: "bg-ocean",
    },
    {
      id: "2",
      type: "doubt",
      title: "Asked: Backpropagation in RNNs",
      time: "4 hours ago",
      icon: "question",
      color: "bg-sky",
    },
    {
      id: "3",
      type: "achievement",
      title: "Earned: Perfect Score Badge",
      time: "Yesterday",
      icon: "award",
      color: "bg-amber-500",
    },
    {
      id: "4",
      type: "class",
      title: "Completed: Web Development Session",
      time: "Yesterday",
      icon: "play",
      color: "bg-emerald-500",
    },
  ],
}

// Components
function GreetingHero({ data, isLoading }: { data: DashboardData | null; isLoading: boolean }) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 17) return "Good Afternoon"
    return "Good Evening"
  }

  if (isLoading || !data) {
    return (
      <div className="mb-8 space-y-4">
        <div className="h-10 w-64 bg-slate-200 rounded animate-pulse" />
        <div className="h-6 w-48 bg-slate-200 rounded animate-pulse" />
        <div className="flex gap-4 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 w-32 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="mb-8"
    >
      <h1 className="text-4xl font-bold text-slate-900 mb-2">
        {getGreeting()}, {data.greeting.name}! 👋
      </h1>
      <p className="text-slate-500 text-lg">{data.greeting.date}</p>
      <div className="flex flex-wrap gap-4 mt-4">
        <span className="px-4 py-2 rounded-xl bg-ocean/10 text-ocean text-sm font-medium">
          {data.greeting.summary.classesToday} Classes Today
        </span>
        <span className="px-4 py-2 rounded-xl bg-sky/20 text-ocean text-sm font-medium">
          {data.greeting.summary.assignmentsDue} Assignments Due
        </span>
        <span className="px-4 py-2 rounded-xl bg-amber-100 text-amber-700 text-sm font-medium">
          {data.greeting.summary.studyHoursGoal}h Study Goal
        </span>
      </div>
    </motion.div>
  )
}

function StudentOverviewCard({
  stats,
  isLoading,
}: {
  stats: StudentStats | null
  isLoading: boolean
}) {
  const { isMd } = useBreakpoints()

  if (isLoading || !stats) {
    return <SkeletonCard className="mb-8" />
  }

  const floatingStats = [
    { label: "Attendance", value: `${stats.attendanceRate}%`, icon: Users, color: "bg-ocean" },
    { label: "Avg Score", value: `${stats.averageScore}%`, icon: TrendingUp, color: "bg-sky" },
    { label: "Rank", value: `#${stats.rank}`, icon: Award, color: "bg-amber-500" },
    { label: "Study Hrs", value: `${stats.studyHours}h`, icon: Clock, color: "bg-emerald-500" },
  ]

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ocean/5 via-white to-sky/10 border border-slate-200/50 p-8 mb-8"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-ocean/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col lg:flex-row gap-8">
        {/* Student Info */}
        <div className="flex items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="relative"
          >
            <Avatar size="xl">
              <AvatarFallback className="bg-ocean text-white text-2xl">AJ</AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Alex Johnson</h2>
            <p className="text-slate-500">Computer Science • Year 2</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-ocean/10 text-ocean">Pro Member</Badge>
              <Badge variant="secondary" className="bg-sky/20 text-ocean">Top 10% Student</Badge>
            </div>
          </div>
        </div>

        {/* Floating Stats Grid */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {floatingStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg shadow-slate-200/50 border border-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={cn("p-2 rounded-xl", stat.color)}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="relative mt-8 pt-6 border-t border-slate-200/50">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">AI Doubts Solved</span>
              <span className="text-sm font-semibold text-ocean">15</span>
            </div>
            <Progress value={75} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Assignment Completion</span>
              <span className="text-sm font-semibold text-ocean">{Math.round((stats.completedAssignments / stats.totalAssignments) * 100)}%</span>
            </div>
            <Progress value={(stats.completedAssignments / stats.totalAssignments) * 100} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Study Hours This Week</span>
              <span className="text-sm font-semibold text-ocean">{stats.studyHours}h</span>
            </div>
            <Progress value={68} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-500">Attendance Rate</span>
              <span className="text-sm font-semibold text-ocean">{stats.attendanceRate}%</span>
            </div>
            <Progress value={stats.attendanceRate} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PerformanceCharts({
  data,
  isLoading,
}: {
  data: ChartData[] | null
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SkeletonChart />
        <SkeletonChart />
      </div>
    )
  }

  if (!data) {
    return (
      <EmptyState
        icon="sad"
        title="No data available"
        description="Performance data could not be loaded"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Performance Trend */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Performance Trend</h3>
            <p className="text-sm text-slate-500">Weekly scores & progress</p>
          </div>
          <Badge variant="success" className="bg-emerald-100 text-emerald-700">+5% this week</Badge>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22819A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22819A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} domain={[60, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
                }}
              />
              <Area type="monotone" dataKey="score" stroke="#22819A" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Attendance Chart */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Attendance</h3>
            <p className="text-sm text-slate-500">Weekly attendance rate</p>
          </div>
          <Badge variant="secondary" className="bg-sky/20 text-ocean">94% Average</Badge>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="attendance" fill="#90C2E7" radius={[8, 8, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}

function ScheduleCard({
  schedule,
  isLoading,
}: {
  schedule: ScheduleItem[] | null
  isLoading: boolean
}) {
  const { success } = useToastHook()

  if (isLoading) {
    return <SkeletonCard className="mb-8" />
  }

  if (!schedule || schedule.length === 0) {
    return (
      <EmptyState
        icon="inbox"
        title="No classes scheduled"
        description="Your schedule for today is empty"
        className="mb-8"
      />
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "live":
        return Video
      case "lab":
        return FileText
      default:
        return Video
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-ocean/10">
            <Calendar className="h-5 w-5 text-ocean" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Today's Schedule</h3>
            <p className="text-sm text-slate-500">{schedule.length} classes remaining</p>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={() => success("Schedule", "Full schedule opened")}>
          View Full Schedule
        </Button>
      </div>

      <div className="space-y-4">
        {schedule.map((item, index) => {
          const Icon = getIcon(item.type)
          return (
            <motion.div
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-sky/10 transition-colors cursor-pointer"
            >
              <div className="p-3 rounded-xl bg-ocean/10">
                <Icon className="h-5 w-5 text-ocean" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 truncate">{item.subject}</h4>
                <p className="text-sm text-slate-500">{item.teacher}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-ocean">{item.time}</p>
                <p className="text-xs text-slate-500">{item.duration}</p>
              </div>
              <Button size="icon" variant="ghost" className="rounded-xl">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

function RecentActivityTimeline({
  activities,
  isLoading,
}: {
  activities: Activity[] | null
  isLoading: boolean
}) {
  if (isLoading) {
    return <SkeletonCard />
  }

  if (!activities || activities.length === 0) {
    return (
      <EmptyState
        icon="inbox"
        title="No recent activity"
        description="Your activity timeline is empty"
      />
    )
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return FileText
      case "doubt":
        return MessageCircleQuestion
      case "achievement":
        return Award
      case "class":
        return Play
      default:
        return Clock
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-sky/10">
          <Clock className="h-5 w-5 text-ocean" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Recent Activity</h3>
          <p className="text-sm text-slate-500">Your latest updates</p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100" />
        <div className="space-y-6">
          {activities.map((activity, index) => {
            const Icon = getIcon(activity.type)
            return (
              <motion.div
                key={activity.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="relative flex items-start gap-4 pl-12"
              >
                <div className={cn("absolute left-4 p-2 rounded-full border-4 border-white shadow-md", activity.color)}>
                  <Icon className="h-3 w-3 text-white" />
                </div>
                <div className="flex-1 p-4 rounded-2xl bg-slate-50 hover:bg-sky/10 transition-colors">
                  <p className="font-medium text-slate-900">{activity.title}</p>
                  <p className="text-sm text-slate-500 mt-1">{activity.time}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

function AIRecommendations({ isLoading }: { isLoading: boolean }) {
  const recommendations = [
    { id: "1", type: "practice", title: "Practice: Graph Algorithms", reason: "Based on your recent quiz performance", priority: "high", icon: Target },
    { id: "2", type: "weakness", title: "Focus: Differential Equations", reason: "Topics need more revision", priority: "medium", icon: Brain },
    { id: "3", type: "suggestion", title: "Review: React Hooks", reason: "Related to your upcoming project", priority: "low", icon: Zap },
  ]

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
        <div className="h-6 w-48 bg-slate-200 rounded animate-pulse mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-100 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-br from-ocean/10 via-white to-sky/10 rounded-3xl p-6 border border-slate-200/50 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-ocean">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">AI Recommendations</h3>
          <p className="text-sm text-slate-500">Personalized suggestions for you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-5 shadow-lg shadow-slate-200/50 border border-slate-100 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs",
                  rec.priority === "high" ? "bg-red-100 text-red-700" :
                  rec.priority === "medium" ? "bg-amber-100 text-amber-700" :
                  "bg-emerald-100 text-emerald-700"
                )}
              >
                {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
              </Badge>
              <Button size="icon" variant="ghost" className="rounded-xl h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2 rounded-xl bg-ocean/10 w-fit mb-3">
              <rec.icon className="h-5 w-5 text-ocean" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-1">{rec.title}</h4>
            <p className="text-sm text-slate-500 mb-4">{rec.reason}</p>
            <Button variant="secondary" size="sm" className="w-full">
              Start Practice
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedQuery = useDebounce(searchQuery, 300)
  const { success } = useToastHook()

  const handleSearch = useCallback(() => {
    if (debouncedQuery) {
      success("Search", `Searching for "${debouncedQuery}"`)
    }
  }, [debouncedQuery, success])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-8 py-4 mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            placeholder="Search courses, assignments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-50 border-0 focus:bg-white focus:ring-2 focus:ring-ocean/30 transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <Bell className="h-5 w-5 text-slate-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-ocean" />
          </motion.button>

          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <Avatar size="md">
              <AvatarFallback className="bg-ocean text-white">AJ</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-900">Alex Johnson</p>
              <p className="text-xs text-slate-500">Pro Member</p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

// Main Dashboard Component
export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const { success } = useToastHook()

  // Simulate data fetching
  useState(() => {
    const fetchData = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setData(mockData)
      setIsLoading(false)
      success("Welcome", "Dashboard loaded successfully")
    }

    fetchData()
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky/10">
      <ErrorBoundary
        fallback={
          <EmptyState
            icon="sad"
            title="Dashboard Error"
            description="Something went wrong loading the dashboard"
            action={{ label: "Refresh", onClick: () => window.location.reload() }}
          />
        }
      >

          <Header />

          <main className="p-8">
            <GreetingHero data={data} isLoading={isLoading} />
            <StudentOverviewCard stats={data?.studentStats || null} isLoading={isLoading} />
            <PerformanceCharts data={data?.performanceData || null} isLoading={isLoading} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <ScheduleCard schedule={data?.scheduleData || null} isLoading={isLoading} />
              <RecentActivityTimeline activities={data?.activityData || null} isLoading={isLoading} />
            </div>
            <AIRecommendations isLoading={isLoading} />
          </main>
      </ErrorBoundary>
    </div>
  )
}