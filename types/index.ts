// Core Types for EdTech Dashboard

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "teacher" | "admin"
  createdAt: Date
}

export interface Student extends User {
  role: "student"
  studentId: string
  grade: number
  section: string
  enrollmentDate: Date
  stats: StudentStats
}

export interface StudentStats {
  totalAssignments: number
  completedAssignments: number
  pendingAssignments: number
  averageScore: number
  attendanceRate: number
  studyHours: number
  rank: number
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: Instructor
  progress: number
  totalLessons: number
  completedLessons: number
  nextLesson: string
  duration: string
  thumbnail?: string
  category: string
}

export interface Instructor {
  id: string
  name: string
  avatar?: string
  title: string
}

export interface Assignment {
  id: string
  chapter: string
  subject: Subject
  status: AssignmentStatus
  assignedDate: Date
  dueDate: Date
  submissionDate?: Date
  grade?: Grade
  description: string
  hasPDF: boolean
}

export type AssignmentStatus = "pending" | "in-progress" | "completed"

export interface Grade {
  score: number
  total: number
  grade: string
  feedback?: string
}

export interface Subject {
  id: string
  name: string
  color: string
  icon: string
}

export interface Doubt {
  id: string
  question: string
  subject: Subject
  status: DoubtStatus
  askedAt: Date
  responseTime?: string
  imagePreview?: boolean
  aiResponse?: string
  teacherResponse?: string
  helpful?: boolean
}

export type DoubtStatus = "pending" | "in-progress" | "resolved"

export interface ChatMessage {
  id: number
  role: "user" | "ai"
  content: string
  timestamp: string
}

export interface ScheduleItem {
  id: string
  subject: string
  teacher: string
  time: string
  duration: string
  type: "live" | "lab" | "recorded"
}

export interface Activity {
  id: string
  type: "assignment" | "doubt" | "achievement" | "class"
  title: string
  time: string
  icon: string
  color: string
}

export interface Recommendation {
  id: string
  title: string
  meta: string
  icon: React.ReactNode
  priority?: "high" | "medium" | "low"
}

export interface WeakTopic {
  name: string
  score: number
  total: number
}

export interface PracticeItem {
  id: string
  subject: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export interface AnalyticsData {
  label: string
  value: string
  change: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export interface ChartData {
  name?: string
  week?: string
  [key: string]: string | number | undefined
}

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface Toast {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
}

export interface LoadingState {
  isLoading: boolean
  error?: string
  data?: unknown
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ClickableProps extends ComponentProps {
  onClick?: () => void
  disabled?: boolean
}

export interface AsyncComponentProps<T> extends ComponentProps {
  data: T | null
  isLoading: boolean
  error?: string
  onRetry?: () => void
}