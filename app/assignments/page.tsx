"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar,
  Download,
  Eye,
  Upload,
  ChevronDown,
  X,
  Search,
  MoreVertical,
  BookOpen,
  Calculator,
  FlaskConical,
  Code,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Analytics Data
const analyticsData = [
  { label: "Total Assignments", value: "48", change: "+8 this month", icon: FileText, color: "bg-ocean" },
  { label: "Completed", value: "32", change: "67% completion", icon: CheckCircle, color: "bg-emerald-500" },
  { label: "Pending", value: "12", change: "4 due this week", icon: Clock, color: "bg-amber-500" },
  { label: "Average Score", value: "87%", change: "+5% improvement", icon: TrendingUp, color: "bg-sky" },
]

// Assignments Data
const assignmentsData = [
  {
    id: 1,
    chapter: "Linear Algebra: Vector Spaces",
    subject: "Mathematics",
    subjectColor: "bg-sky/20 text-ocean",
    status: "completed",
    statusColor: "bg-emerald-100 text-emerald-700",
    assignedDate: "May 20, 2026",
    dueDate: "May 27, 2026",
    submissionDate: "May 25, 2026",
    grade: { score: 92, total: 100, grade: "A" },
    description: "Solve problems related to vector spaces, subspaces, and linear transformations.",
    hasPDF: true,
  },
  {
    id: 2,
    chapter: "Newton's Laws of Motion",
    subject: "Physics",
    subjectColor: "bg-ocean/10 text-ocean",
    status: "pending",
    statusColor: "bg-amber-100 text-amber-700",
    assignedDate: "May 22, 2026",
    dueDate: "May 29, 2026",
    submissionDate: null,
    grade: null,
    description: "Apply Newton's laws to solve real-world motion problems.",
    hasPDF: true,
  },
  {
    id: 3,
    chapter: "React Hooks Deep Dive",
    subject: "Web Development",
    subjectColor: "bg-purple-100 text-purple-700",
    status: "in-progress",
    statusColor: "bg-sky/20 text-ocean",
    assignedDate: "May 18, 2026",
    dueDate: "May 28, 2026",
    submissionDate: null,
    grade: null,
    description: "Build a complete React application using useState, useEffect, and custom hooks.",
    hasPDF: true,
  },
  {
    id: 4,
    chapter: "Graph Algorithms: BFS & DFS",
    subject: "Data Structures",
    subjectColor: "bg-amber-100 text-amber-700",
    status: "completed",
    statusColor: "bg-emerald-100 text-emerald-700",
    assignedDate: "May 15, 2026",
    dueDate: "May 22, 2026",
    submissionDate: "May 21, 2026",
    grade: { score: 88, total: 100, grade: "B+" },
    description: "Implement Breadth-First Search and Depth-First Search algorithms.",
    hasPDF: true,
  },
  {
    id: 5,
    chapter: "Thermodynamics: Heat Transfer",
    subject: "Physics",
    subjectColor: "bg-ocean/10 text-ocean",
    status: "pending",
    statusColor: "bg-amber-100 text-amber-700",
    assignedDate: "May 24, 2026",
    dueDate: "May 31, 2026",
    submissionDate: null,
    grade: null,
    description: "Analyze heat transfer mechanisms and solve thermodynamic problems.",
    hasPDF: false,
  },
  {
    id: 6,
    chapter: "Integration Techniques",
    subject: "Mathematics",
    subjectColor: "bg-sky/20 text-ocean",
    status: "completed",
    statusColor: "bg-emerald-100 text-emerald-700",
    assignedDate: "May 10, 2026",
    dueDate: "May 17, 2026",
    submissionDate: "May 16, 2026",
    grade: { score: 95, total: 100, grade: "A+" },
    description: "Practice various integration techniques including substitution and parts.",
    hasPDF: true,
  },
]

const subjectIcons: Record<string, React.ReactNode> = {
  Mathematics: <Calculator className="h-4 w-4" />,
  Physics: <FlaskConical className="h-4 w-4" />,
  "Web Development": <Code className="h-4 w-4" />,
  "Data Structures": <BookOpen className="h-4 w-4" />,
}

// Analytics Cards Component
function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {analyticsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={cn("p-3 rounded-xl", stat.color)}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs text-slate-500">{stat.change}</span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Assignment Card Component
function AssignmentCard({
  assignment,
  isExpanded,
  onToggle,
  onPreview,
}: {
  assignment: typeof assignmentsData[0]
  isExpanded: boolean
  onToggle: () => void
  onPreview: () => void
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden mb-4"
    >
      {/* Card Header */}
      <div
        className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={cn("p-3 rounded-xl", assignment.subjectColor)}>
              {subjectIcons[assignment.subject]}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  {assignment.chapter}
                </h3>
                <Badge variant="secondary" className={cn(assignment.subjectColor)}>
                  {assignment.subject}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Assigned: {assignment.assignedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Due: {assignment.dueDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className={cn(assignment.statusColor)}>
              {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1).replace("-", " ")}
            </Badge>
            <motion.button
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <ChevronDown className="h-5 w-5 text-slate-400" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-slate-100">
              <div className="py-6">
                <p className="text-slate-600 mb-4">{assignment.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Dates Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                        <span className="text-sm text-slate-500">Assigned Date</span>
                        <span className="text-sm font-medium text-slate-700">
                          {assignment.assignedDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50">
                        <span className="text-sm text-amber-600">Due Date</span>
                        <span className="text-sm font-medium text-amber-700">
                          {assignment.dueDate}
                        </span>
                      </div>
                      {assignment.submissionDate && (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50">
                          <span className="text-sm text-emerald-600">Submitted</span>
                          <span className="text-sm font-medium text-emerald-700">
                            {assignment.submissionDate}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Grade Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-slate-900">Performance</h4>
                    {assignment.grade ? (
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-ocean/5 to-sky/10 border border-ocean/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-slate-500">Score</span>
                          <span className="text-2xl font-bold text-ocean">
                            {assignment.grade.score}/{assignment.grade.total}
                          </span>
                        </div>
                        <Progress value={assignment.grade.score} />
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-slate-500">Grade</span>
                          <Badge className="bg-ocean text-white">
                            {assignment.grade.grade}
                          </Badge>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <p className="text-sm text-slate-500">Not yet graded</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* PDF Preview Area */}
                {assignment.hasPDF && (
                  <div className="mt-6">
                    <h4 className="font-medium text-slate-900 mb-3">Attachments</h4>
                    <div
                      className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-ocean/50 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        onPreview()
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-ocean/10">
                          <FileText className="h-6 w-6 text-ocean" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">
                            {assignment.chapter}_Assignment.pdf
                          </p>
                          <p className="text-sm text-slate-500">
                            2.4 MB • PDF Document
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="secondary" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100">
                  {assignment.status === "pending" || assignment.status === "in-progress" ? (
                    <>
                      <Button className="bg-ocean hover:bg-ocean/90">
                        <Upload className="h-4 w-4 mr-2" />
                        Submit Assignment
                      </Button>
                      <Button variant="secondary">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="secondary">
                        <Eye className="h-4 w-4 mr-2" />
                        View Submission
                      </Button>
                      <Button variant="secondary">
                        <Download className="h-4 w-4 mr-2" />
                        Download Grade
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// PDF Preview Modal Component
function PDFPreviewModal({
  isOpen,
  onClose,
  assignment,
}: {
  isOpen: boolean
  onClose: () => void
  assignment: typeof assignmentsData[0] | null
}) {
  return (
    <AnimatePresence>
      {isOpen && assignment && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[80vh] bg-white rounded-t-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-ocean/10">
                    <FileText className="h-5 w-5 text-ocean" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {assignment.chapter}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {assignment.subject} • Assignment Preview
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button size="icon" variant="ghost" onClick={onClose}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* PDF Content Placeholder */}
              <div className="flex-1 overflow-auto p-8 bg-slate-100">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 min-h-[600px]">
                  <div className="space-y-8">
                    <div className="text-center border-b border-slate-200 pb-6">
                      <h1 className="text-2xl font-bold text-slate-900 mb-2">
                        {assignment.chapter}
                      </h1>
                      <p className="text-slate-500">
                        {assignment.subject} • Assignment
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-slate-900">
                        Instructions
                      </h2>
                      <p className="text-slate-600 leading-relaxed">
                        {assignment.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-lg font-semibold text-slate-900">
                        Problems
                      </h2>
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <div
                            key={num}
                            className="p-4 rounded-xl bg-slate-50 border border-slate-200"
                          >
                            <p className="text-slate-700">
                              {num}. Problem statement goes here...
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Skeleton Loading Component
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden mb-4 animate-pulse">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-5 w-48 bg-slate-200 rounded" />
              <div className="h-4 w-32 bg-slate-200 rounded" />
            </div>
          </div>
          <div className="h-6 w-20 bg-slate-200 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Main Page Component
export default function AssignmentsPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<typeof assignmentsData[0] | null>(null)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const filteredAssignments = assignmentsData.filter((assignment) => {
    const matchesFilter = filter === "all" || assignment.status === filter
    const matchesSearch = assignment.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handlePreview = (assignment: typeof assignmentsData[0]) => {
    setSelectedAssignment(assignment)
    setPdfModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky/10">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-8 py-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Assignments</h1>
            <p className="text-slate-500 mt-1">Manage and track your academic progress</p>
          </div>
          <Button className="bg-ocean hover:bg-ocean/90">
            <Upload className="h-4 w-4 mr-2" />
            New Assignment
          </Button>
        </div>
      </motion.header>

      <main className="p-8">
        <AnalyticsCards />

        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-ocean/30 transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            {["all", "pending", "in-progress", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  filter === status
                    ? "bg-ocean text-white"
                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
                )}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Assignments List */}
        <div className="space-y-4">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            filteredAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <AssignmentCard
                  assignment={assignment}
                  isExpanded={expandedId === assignment.id}
                  onToggle={() => handleToggle(assignment.id)}
                  onPreview={() => handlePreview(assignment)}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* Empty State */}
        {!isLoading && filteredAssignments.length === 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center py-16"
          >
            <div className="p-4 rounded-full bg-slate-100 w-fit mx-auto mb-4">
              <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No assignments found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </main>

      {/* PDF Preview Modal */}
      <PDFPreviewModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        assignment={selectedAssignment}
      />
    </div>
  )
}