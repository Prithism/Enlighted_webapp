"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircleQuestion,
  CheckCircle,
  Clock,
  Timer,
  Sparkles,
  Search,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  Send,
  Image,
  X,
  Calendar,
  User,
} from "lucide-react"
import styles from "./doubtResolution.module.css"

// Analytics Data
const analyticsData = [
  { label: "Total Doubts", value: "156", change: "+23 this month", icon: MessageCircleQuestion, color: "teal" },
  { label: "Resolved", value: "142", change: "91% resolution rate", icon: CheckCircle, color: "emerald" },
  { label: "Pending", value: "14", change: "3 urgent", icon: Clock, color: "amber" },
  { label: "Avg Resolution", value: "2.4h", change: "-30min from last week", icon: Timer, color: "sky" },
]

// Doubts Data
const doubtsData = [
  {
    id: 1,
    question: "How do I calculate the determinant of a 3x3 matrix using cofactor expansion?",
    subject: "Mathematics",
    subjectColor: "subjectMath",
    status: "resolved",
    statusColor: "statusResolved",
    askedAt: "May 26, 2026",
    responseTime: "1.5 hours",
    imagePreview: true,
    aiResponse: "To calculate the determinant of a 3x3 matrix using cofactor expansion, choose any row or column (usually the first row for simplicity). For each element, calculate its cofactor by removing the corresponding row and column, finding the determinant of the resulting 2x2 matrix, and multiplying by (-1)^(i+j). Then sum all the cofactor expansions.",
    teacherResponse: "Great question! The key is to remember the sign pattern: + - + in the first row. Practice with the matrix: |1 2 3| |4 5 6| |7 8 9|. The determinant is 1(5*9 - 6*8) - 2(4*9 - 6*7) + 3(4*8 - 5*7) = 0.",
    helpful: true,
  },
  {
    id: 2,
    question: "What is the difference between potential energy and kinetic energy in thermodynamics?",
    subject: "Physics",
    subjectColor: "subjectPhysics",
    status: "pending",
    statusColor: "statusPending",
    askedAt: "May 27, 2026",
    responseTime: null,
    imagePreview: false,
    aiResponse: null,
    teacherResponse: null,
    helpful: null,
  },
  {
    id: 3,
    question: "Can you explain Le Chatelier's principle with an example in chemical equilibrium?",
    subject: "Chemistry",
    subjectColor: "subjectChemistry",
    status: "in-progress",
    statusColor: "statusInProgress",
    askedAt: "May 26, 2026",
    responseTime: null,
    imagePreview: true,
    aiResponse: "Le Chatelier's principle states that when a system at equilibrium is disturbed, it will shift to counteract the disturbance. For example, in the reaction: N₂ + 3H₂ ⇌ 2NH₃, adding more N₂ will shift the equilibrium to the right to produce more NH₃.",
    teacherResponse: null,
    helpful: null,
  },
  {
    id: 4,
    question: "How does backpropagation work in neural networks?",
    subject: "Computer Science",
    subjectColor: "subjectPhysics",
    status: "resolved",
    statusColor: "statusResolved",
    askedAt: "May 25, 2026",
    responseTime: "45 minutes",
    imagePreview: false,
    aiResponse: "Backpropagation is an algorithm used to train neural networks. It works by calculating the gradient of the loss function with respect to each weight using the chain rule. The process: 1) Forward pass: input flows through network to generate output, 2) Calculate loss between predicted and actual output, 3) Backward pass: propagate error gradients from output to input, 4) Update weights using gradient descent.",
    teacherResponse: "Excellent explanation! To add: backpropagation essentially computes partial derivatives of the loss function with respect to each weight, allowing us to understand how changing each weight affects the final error.",
    helpful: true,
  },
  {
    id: 5,
    question: "What are the key differences between DFS and BFS algorithms?",
    subject: "Data Structures",
    subjectColor: "subjectMath",
    status: "resolved",
    statusColor: "statusResolved",
    askedAt: "May 24, 2026",
    responseTime: "2 hours",
    imagePreview: true,
    aiResponse: "DFS (Depth-First Search) explores as deep as possible before backtracking, using a stack (or recursion). It's O(V+E) time and uses less memory for wide graphs. BFS (Breadth-First Search) explores level by level, using a queue. It finds shortest path in unweighted graphs and guarantees finding the nearest solution first.",
    teacherResponse: "Great comparison! BFS is better for finding shortest path in unweighted graphs, while DFS is ideal for detecting cycles, topological sorting, and solving puzzles with one solution.",
    helpful: false,
  },
]

// Components
function AnalyticsCards() {
  return (
    <div className={styles.analyticsGrid}>
      {analyticsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={styles.analyticsCard}
        >
          <div className={styles.analyticsHeader}>
            <div className={`${styles.analyticsIcon} ${styles[stat.color]}`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <span className={styles.analyticsChange}>{stat.change}</span>
          </div>
          <p className={styles.analyticsValue}>{stat.value}</p>
          <p className={styles.analyticsLabel}>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

function AIBanner() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={styles.aiBanner}
    >
      <div className={styles.aiBannerIcon}>
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <div className={styles.aiBannerContent}>
        <h3 className={styles.aiBannerTitle}>AI-Powered Doubt Resolution</h3>
        <p className={styles.aiBannerText}>
          Get instant answers from AI and connect with teachers for detailed explanations. Average response time: under 3 hours.
        </p>
      </div>
    </motion.div>
  )
}

function DoubtCard({
  doubt,
  isExpanded,
  onToggle,
}: {
  doubt: typeof doubtsData[0]
  isExpanded: boolean
  onToggle: () => void
}) {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(doubt.helpful === true ? "up" : doubt.helpful === false ? "down" : null)

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={styles.doubtCard}
    >
      <div className={styles.doubtCardHeader} onClick={onToggle}>
        <div className={styles.doubtCardTop}>
          {doubt.imagePreview && (
            <div className={styles.doubtImagePreview}>
              <Image className="w-6 h-6 text-slate-400" />
            </div>
          )}
          <div className={styles.doubtContent}>
            <h3 className={styles.doubtQuestion}>{doubt.question}</h3>
            <div className={styles.doubtMeta}>
              <span className={styles.doubtMetaItem}>
                <Calendar className="w-3 h-3" />
                {doubt.askedAt}
              </span>
              {doubt.responseTime && (
                <span className={styles.doubtMetaItem}>
                  <Timer className="w-3 h-3" />
                  {doubt.responseTime}
                </span>
              )}
            </div>
          </div>
          <div className={styles.doubtBadges}>
            <span className={`${styles.statusBadge} ${styles[doubt.statusColor]}`}>
              {doubt.status.charAt(0).toUpperCase() + doubt.status.slice(1).replace("-", " ")}
            </span>
            <span className={`${styles.subjectBadge} ${styles[doubt.subjectColor]}`}>
              {doubt.subject}
            </span>
            <button className={styles.expandButton}>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.doubtCardExpanded}
          >
            {/* AI Response */}
            {doubt.aiResponse && (
              <div className={`${styles.responseSection} ${styles.aiResponse}`}>
                <div className={styles.responseLabel}>
                  <div className={styles.responseLabelIcon}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  AI Response
                </div>
                <div className={styles.responseBox}>
                  <p className={styles.responseText}>{doubt.aiResponse}</p>
                </div>
              </div>
            )}

            {/* Teacher Response */}
            {doubt.teacherResponse && (
              <div className={`${styles.responseSection} ${styles.teacherResponse}`}>
                <div className={styles.responseLabel}>
                  <div className={styles.responseLabelIcon}>
                    <User className="w-4 h-4" />
                  </div>
                  Teacher Response
                </div>
                <div className={styles.responseBox}>
                  <p className={styles.responseText}>{doubt.teacherResponse}</p>
                </div>
              </div>
            )}

            {/* Feedback Section */}
            {doubt.status === "resolved" && (
              <div className={styles.feedbackSection}>
                <span className={styles.feedbackText}>Was this helpful?</span>
                <div className={styles.feedbackButtons}>
                  <button
                    className={`${styles.feedbackButton} ${feedback === "up" ? styles.feedbackButtonActive : ""}`}
                    onClick={() => setFeedback("up")}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Yes
                  </button>
                  <button
                    className={`${styles.feedbackButton} ${feedback === "down" ? styles.feedbackButtonActive : ""}`}
                    onClick={() => setFeedback("down")}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    No
                  </button>
                </div>
              </div>
            )}

            {/* Pending/In-Progress Actions */}
            {doubt.status !== "resolved" && (
              <div className={styles.feedbackSection}>
                <span className={styles.feedbackText}>Need more clarification?</span>
                <div className={styles.feedbackButtons}>
                  <button className={styles.askButton} style={{ padding: "0.5rem 1rem" }}>
                    <Send className="w-4 h-4" />
                    Ask Follow-up
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <MessageCircleQuestion className="w-8 h-8" />
      </div>
      <h3 className={styles.emptyTitle}>No doubts found</h3>
      <p className={styles.emptyText}>Try adjusting your search or filter criteria</p>
    </div>
  )
}

export default function DoubtResolutionPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDoubts = doubtsData.filter((doubt) => {
    const matchesFilter = filter === "all" || doubt.status === filter
    const matchesSearch = doubt.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doubt.subject.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={styles.header}
      >
        <div className={styles.headerContent}>
          <div className={styles.headerTitle}>
            <h1>Doubt Resolution</h1>
            <p>Get instant answers from AI and expert teachers</p>
          </div>
          <button className={styles.askButton}>
            <MessageCircleQuestion className="w-4 h-4" />
            Ask a Doubt
          </button>
        </div>
      </motion.header>

      <main className={styles.main}>
        <AnalyticsCards />
        <AIBanner />

        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={styles.filters}
        >
          <div className={styles.searchBox}>
            <Search className={`${styles.searchIcon} w-4 h-4`} />
            <input
              type="text"
              placeholder="Search doubts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.filterTabs}>
            {["all", "pending", "in-progress", "resolved"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`${styles.filterTab} ${filter === status ? styles.filterTabActive : ""}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Doubts List */}
        <div className={styles.doubtList}>
          {filteredDoubts.length > 0 ? (
            filteredDoubts.map((doubt, index) => (
              <motion.div
                key={doubt.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <DoubtCard
                  doubt={doubt}
                  isExpanded={expandedId === doubt.id}
                  onToggle={() => handleToggle(doubt.id)}
                />
              </motion.div>
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  )
}