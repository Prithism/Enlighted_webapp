"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Award,
  Target,
  Clock,
  BookOpen,
  Calendar,
  Download,
  Filter,
  ChevronDown,
  Users,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
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
import { ChartData, StudentStats } from "@/types"

// Types
interface PerformanceData {
  overallStats: {
    averageScore: number
    totalStudyHours: number
    assignmentsCompleted: number
    attendanceRate: number
  }
  scoreTrend: ChartData[]
  subjectPerformance: ChartData[]
  weeklyProgress: ChartData[]
  topPerformers: StudentPerformance[]
  recentAchievements: Achievement[]
  weakAreas: WeakArea[]
}

interface StudentPerformance {
  id: string
  name: string
  avatar?: string
  score: number
  improvement: number
  rank: number
}

interface Achievement {
  id: string
  title: string
  description: string
  date: string
  icon: string
  color: string
}

interface WeakArea {
  subject: string
  score: number
  total: number
  trend: "up" | "down" | "stable"
}

// Mock Data
const mockData: PerformanceData = {
  overallStats: {
    averageScore: 87,
    totalStudyHours: 156,
    assignmentsCompleted: 42,
    attendanceRate: 94,
  },
  scoreTrend: [
    { month: "Jan", score: 72, average: 70 },
    { month: "Feb", score: 75, average: 72 },
    { month: "Mar", score: 78, average: 74 },
    { month: "Apr", score: 82, average: 75 },
    { month: "May", score: 85, average: 76 },
    { month: "Jun", score: 87, average: 78 },
  ],
  subjectPerformance: [
    { subject: "Mathematics", score: 92, grade: "A" },
    { subject: "Physics", score: 78, grade: "C+" },
    { subject: "Chemistry", score: 85, grade: "B+" },
    { subject: "Computer Science", score: 94, grade: "A" },
    { subject: "English", score: 88, grade: "B+" },
  ],
  weeklyProgress: [
    { day: "Mon", hours: 3.5, score: 85 },
    { day: "Tue", hours: 4.2, score: 78 },
    { day: "Wed", hours: 2.8, score: 92 },
    { day: "Thu", hours: 5.1, score: 88 },
    { day: "Fri", hours: 3.9, score: 95 },
    { day: "Sat", hours: 6.2, score: 90 },
    { day: "Sun", hours: 4.5, score: 87 },
  ],
  topPerformers: [
    { id: "1", name: "Alex Johnson", score: 94, improvement: 12, rank: 1 },
    { id: "2", name: "Sarah Chen", score: 92, improvement: 8, rank: 2 },
    { id: "3", name: "Michael Brown", score: 89, improvement: 15, rank: 3 },
    { id: "4", name: "Emily Rodriguez", score: 88, improvement: 5, rank: 4 },
    { id: "5", name: "David Kim", score: 86, improvement: 10, rank: 5 },
  ],
  recentAchievements: [
    {
      id: "1",
      title: "Perfect Score",
      description: "Scored 100% in Mathematics quiz",
      date: "May 25, 2026",
      icon: "award",
      color: "bg-amber-500",
    },
    {
      id: "2",
      title: "Week Streak",
      description: "Completed 7 consecutive days of study",
      date: "May 24, 2026",
      icon: "fire",
      color: "bg-orange-500",
    },
    {
      id: "3",
      title: "Quick Learner",
      description: "Mastered 5 topics in one week",
      date: "May 22, 2026",
      icon: "brain",
      color: "bg-purple-500",
    },
  ],
  weakAreas: [
    { subject: "Physics", score: 62, total: 100, trend: "down" },
    { subject: "Organic Chemistry", score: 58, total: 100, trend: "down" },
    { subject: "Linear Algebra", score: 71, total: 100, trend: "stable" },
  ],
}

const COLORS = ["#22819A", "#90C2E7", "#64748B", "#94A3B8", "#CBD5E1"]

// Components
function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  isLoading,
}: {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: React.ComponentType<{ className?: string }>
  color: string
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
        <div className="h-10 w-10 bg-slate-200 rounded-xl animate-pulse mb-4" />
        <div className="h-8 w-20 bg-slate-200 rounded animate-pulse mb-1" />
        <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className={cn("p-3 rounded-xl w-fit mb-4", color)}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-500 mb-2">{title}</p>
      {change && (
        <div className="flex items-center gap-1">
          {changeType === "positive" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
          {changeType === "negative" && <TrendingDown className="h-4 w-4 text-red-500" />}
          <span
            className={cn(
              "text-sm font-medium",
              changeType === "positive" && "text-emerald-600",
              changeType === "negative" && "text-red-600",
              changeType === "neutral" && "text-slate-500"
            )}
          >
            {change}
          </span>
        </div>
      )}
    </motion.div>
  )
}

function ScoreTrendChart({
  data,
  isLoading,
}: {
  data: ChartData[] | null
  isLoading: boolean
}) {
  if (isLoading) {
    return <SkeletonChart />
  }

  if (!data) {
    return <EmptyState icon="sad" title="No data available" description="Score trend data could not be loaded" />
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Score Trend</h3>
          <p className="text-sm text-slate-500">Your performance over the last 6 months</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-ocean" />
            <span className="text-sm text-slate-600">Your Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-sky" />
            <span className="text-sm text-slate-600">Class Average</span>
          </div>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22819A" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#22819A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#90C2E7" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#90C2E7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} domain={[50, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
              }}
            />
            <Area type="monotone" dataKey="score" stroke="#22819A" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
            <Area type="monotone" dataKey="average" stroke="#90C2E7" strokeWidth={3} fillOpacity={1} fill="url(#colorAverage)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

function SubjectPerformanceChart({
  data,
  isLoading,
}: {
  data: ChartData[] | null
  isLoading: boolean
}) {
  if (isLoading) {
    return <SkeletonChart />
  }

  if (!data) {
    return <EmptyState icon="sad" title="No data available" description="Subject performance data could not be loaded" />
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Subject Performance</h3>
          <p className="text-sm text-slate-500">Current semester grades by subject</p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <YAxis type="category" dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} width={100} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
              }}
              formatter={(value: number) => [`${value}%`, "Score"]}
            />
            <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={24}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

function WeeklyProgressChart({
  data,
  isLoading,
}: {
  data: ChartData[] | null
  isLoading: boolean
}) {
  if (isLoading) {
    return <SkeletonChart />
  }

  if (!data) {
    return <EmptyState icon="sad" title="No data available" description="Weekly progress data could not be loaded" />
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Weekly Progress</h3>
          <p className="text-sm text-slate-500">Study hours and quiz scores this week</p>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} domain={[0, 10]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                boxShadow: "0 10px 40px -10px rgba(0,0,0,0.1)",
              }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="hours" stroke="#22819A" strokeWidth={2} dot={{ fill: "#22819A", strokeWidth: 2 }} name="Study Hours" />
            <Line yAxisId="right" type="monotone" dataKey="score" stroke="#90C2E7" strokeWidth={2} dot={{ fill: "#90C2E7", strokeWidth: 2 }} name="Quiz Score" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

function TopPerformers({
  performers,
  isLoading,
}: {
  performers: StudentPerformance[] | null
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
        <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-4" />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse mb-3" />
        ))}
      </div>
    )
  }

  if (!performers || performers.length === 0) {
    return <EmptyState icon="sad" title="No performers data" description="Top performers data could not be loaded" />
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Top Performers</h3>
          <p className="text-sm text-slate-500">Class ranking this month</p>
        </div>
        <Button variant="secondary" size="sm">
          View All
        </Button>
      </div>
      <div className="space-y-3">
        {performers.map((performer, index) => (
          <motion.div
            key={performer.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
              index === 0 && "bg-amber-100 text-amber-700",
              index === 1 && "bg-slate-200 text-slate-700",
              index === 2 && "bg-orange-100 text-orange-700",
              index > 2 && "bg-slate-100 text-slate-500"
            )}>
              {performer.rank}
            </div>
            <Avatar size="md">
              <AvatarFallback>
                {performer.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-slate-900 truncate">{performer.name}</p>
              <p className="text-sm text-slate-500">{performer.score}% average</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+{performer.improvement}%</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function Achievements({
  achievements,
  isLoading,
}: {
  achievements: Achievement[] | null
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
        <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse mb-3" />
        ))}
      </div>
    )
  }

  if (!achievements || achievements.length === 0) {
    return <EmptyState icon="sad" title="No achievements" description="Your achievements will appear here" />
  }

  const getIcon = (icon: string) => {
    switch (icon) {
      case "award":
        return Award
      case "fire":
        return Clock
      case "brain":
        return Target
      default:
        return Award
    }
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Recent Achievements</h3>
          <p className="text-sm text-slate-500">Your accomplishments</p>
        </div>
      </div>
      <div className="space-y-4">
        {achievements.map((achievement, index) => {
          const Icon = getIcon(achievement.icon)
          return (
            <motion.div
              key={achievement.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-100"
            >
              <div className={cn("p-3 rounded-xl", achievement.color)}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900">{achievement.title}</h4>
                <p className="text-sm text-slate-500">{achievement.description}</p>
                <p className="text-xs text-slate-400 mt-1">{achievement.date}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

function WeakAreas({
  areas,
  isLoading,
}: {
  areas: WeakArea[] | null
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100">
        <div className="h-6 w-40 bg-slate-200 rounded animate-pulse mb-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse mb-3" />
        ))}
      </div>
    )
  }

  if (!areas || areas.length === 0) {
    return <EmptyState icon="default" title="No weak areas" description="Great job! No areas need improvement" />
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-br from-amber-50 to-white rounded-3xl p-6 border border-amber-200"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-amber-100">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Areas for Improvement</h3>
          <p className="text-sm text-slate-500">Focus on these topics</p>
        </div>
      </div>
      <div className="space-y-4">
        {areas.map((area, index) => (
          <motion.div
            key={area.subject}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-slate-900">{area.subject}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-amber-600">{area.score}%</span>
                {area.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                {area.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500" />}
                {area.trend === "stable" && <span className="h-4 w-4 bg-slate-300 rounded-full" />}
              </div>
            </div>
            <Progress value={area.score} variant="warning" />
          </motion.div>
        ))}
      </div>
      <Button className="w-full mt-4 bg-ocean hover:bg-ocean/90">
        <Target className="h-4 w-4 mr-2" />
        Create Study Plan
      </Button>
    </motion.div>
  )
}

function Header() {
  const [timeRange, setTimeRange] = useState("6months")
  const { success } = useToastHook()

  const handleExport = useCallback(() => {
    success("Export", "Performance report exported successfully")
  }, [success])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-8 py-6 mb-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Performance</h1>
          <p className="text-slate-500 mt-1">Track your academic progress and achievements</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="h-11 px-4 pr-10 rounded-xl bg-slate-50 border border-slate-200 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ocean/30"
            >
              <option value="1month">Last 1 Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last 1 Year</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
          <Button variant="secondary" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

// Main Page Component
export default function PerformancePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<PerformanceData | null>(null)
  const { success } = useToastHook()

  // Simulate data fetching
  useState(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setData(mockData)
      setIsLoading(false)
      success("Performance", "Performance data loaded successfully")
    }
    fetchData()
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky/10">
      <ErrorBoundary
        fallback={
          <EmptyState
            icon="sad"
            title="Performance Error"
            description="Something went wrong loading performance data"
            action={{ label: "Refresh", onClick: () => window.location.reload() }}
          />
        }
      >
        <div className="ml-64">
          <Header />

          <main className="p-8">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Average Score"
                value={`${data?.overallStats.averageScore || 0}%`}
                change="+5% from last month"
                changeType="positive"
                icon={TrendingUp}
                color="bg-ocean"
                isLoading={isLoading}
              />
              <StatCard
                title="Study Hours"
                value={`${data?.overallStats.totalStudyHours || 0}h`}
                change="+12h this week"
                changeType="positive"
                icon={Clock}
                color="bg-sky"
                isLoading={isLoading}
              />
              <StatCard
                title="Assignments"
                value={`${data?.overallStats.assignmentsCompleted || 0}`}
                change="42% completed"
                changeType="neutral"
                icon={BookOpen}
                color="bg-emerald-500"
                isLoading={isLoading}
              />
              <StatCard
                title="Attendance"
                value={`${data?.overallStats.attendanceRate || 0}%`}
                change="+2% improvement"
                changeType="positive"
                icon={Calendar}
                color="bg-amber-500"
                isLoading={isLoading}
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <ScoreTrendChart data={data?.scoreTrend || null} isLoading={isLoading} />
              <SubjectPerformanceChart data={data?.subjectPerformance || null} isLoading={isLoading} />
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <WeeklyProgressChart data={data?.weeklyProgress || null} isLoading={isLoading} />
              </div>
              <WeakAreas areas={data?.weakAreas || null} isLoading={isLoading} />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopPerformers performers={data?.topPerformers || null} isLoading={isLoading} />
              <Achievements achievements={data?.recentAchievements || null} isLoading={isLoading} />
            </div>
          </main>
        </div>
      </ErrorBoundary>
    </div>
  )
}