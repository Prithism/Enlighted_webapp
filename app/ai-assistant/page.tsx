"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Send,
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  AlertTriangle,
  Brain,
  MessageCircle,
  ChevronRight,
  Settings,
  History,
  X,
  GraduationCap,
  Calculator,
  FlaskConical,
  Code,
  FileQuestion,
} from "lucide-react"
import styles from "./aiAssistant.module.css"

// Types
interface Message {
  id: number
  role: "user" | "ai"
  content: string
  timestamp: string
}

interface Recommendation {
  id: number
  title: string
  meta: string
  icon: React.ReactNode
}

interface WeakTopic {
  name: string
  score: number
  total: number
}

interface PracticeItem {
  id: number
  subject: string
  title: string
  difficulty: "Easy" | "Medium" | "Hard"
}

// Mock Data
const suggestedPrompts = [
  "Explain quantum entanglement",
  "Help me with calculus derivatives",
  "What is machine learning?",
  "Explain Newton's laws",
  "How does blockchain work?",
  "Write a Python function",
]

const recommendations: Recommendation[] = [
  { id: 1, title: "Calculus II: Integration", meta: "Chapter 5 • 45 min", icon: <Calculator className="w-4 h-4" /> },
  { id: 2, title: "Physics: Thermodynamics", meta: "Chapter 3 • 30 min", icon: <FlaskConical className="w-4 h-4" /> },
  { id: 3, title: "Data Structures: Trees", meta: "Chapter 8 • 1 hr", icon: <Code className="w-4 h-4" /> },
]

const weakTopics: WeakTopic[] = [
  { name: "Differential Equations", score: 62, total: 100 },
  { name: "Linear Algebra", score: 71, total: 100 },
  { name: "Organic Chemistry", score: 58, total: 100 },
]

const practiceItems: PracticeItem[] = [
  { id: 1, subject: "Mathematics", title: "Integration by Parts", difficulty: "Medium" },
  { id: 2, subject: "Physics", title: "Kinetic Energy Problems", difficulty: "Easy" },
]

const initialMessages: Message[] = [
  {
    id: 1,
    role: "ai",
    content: "Hello! I'm your AI academic assistant. I can help you understand complex concepts, solve problems, generate practice exercises, and more. What would you like to learn today?",
    timestamp: "Just now",
  },
]

// Components
function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={styles.header}
    >
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
          <div className={styles.aiAvatar}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className={styles.headerTitle}>
            <h1>AI Academic Assistant</h1>
            <p>Your personal learning companion</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.iconButton}>
            <History className="w-5 h-5" />
          </button>
          <button className={styles.iconButton}>
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.header>
  )
}

function ChatMessage({ message, isLast }: { message: Message; isLast: boolean }) {
  const [isTyping, setIsTyping] = useState(isLast && message.role === "ai")

  useEffect(() => {
    if (isLast && message.role === "ai") {
      const timer = setTimeout(() => setIsTyping(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [isLast, message.role])

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`${styles.message} ${message.role === "user" ? styles.messageUser : ""}`}
    >
      {message.role === "ai" && (
        <div className={`${styles.messageAvatar} ${styles.messageAvatarAI}`}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}
      {message.role === "user" && (
        <div className={`${styles.messageAvatar} ${styles.messageAvatarUser}`}>
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
      )}
      <div className={styles.messageContent}>
        <div className={styles.messageLabel}>
          {message.role === "ai" ? "AI Assistant" : "You"}
        </div>
        {isTyping ? (
          <div className={styles.typingIndicator}>
            <span className={styles.typingDot} />
            <span className={styles.typingDot} />
            <span className={styles.typingDot} />
          </div>
        ) : (
          <p className={styles.messageText}>{message.content}</p>
        )}
      </div>
    </motion.div>
  )
}

function SuggestedPrompts({ onSelect }: { onSelect: (prompt: string) => void }) {
  return (
    <div className={styles.suggestedPrompts}>
      <div className={styles.promptsLabel}>Suggested prompts</div>
      <div className={styles.promptsGrid}>
        {suggestedPrompts.map((prompt, index) => (
          <motion.button
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => onSelect(prompt)}
            className={styles.promptChip}
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (message: string) => void
  disabled?: boolean
}) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles.chatInputArea}>
      <div className={styles.chatInputWrapper}>
        <textarea
          className={styles.chatTextarea}
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={!input.trim() || disabled}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function RecommendationsCard() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className={styles.card}
    >
      <div className={styles.cardHeader}>
        <div className={`${styles.cardIcon} ${styles.cardIconTeal}`}>
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <div className={styles.cardTitle}>Continue Learning</div>
          <div className={styles.cardSubtitle}>Based on your progress</div>
        </div>
      </div>
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.id}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className={styles.recommendationItem}
        >
          <div className={styles.recommendationIcon} style={{ background: "rgba(34, 129, 154, 0.1)", color: "#22819a" }}>
            {rec.icon}
          </div>
          <div className={styles.recommendationContent}>
            <div className={styles.recommendationTitle}>{rec.title}</div>
            <div className={styles.recommendationMeta}>{rec.meta}</div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </motion.div>
      ))}
    </motion.div>
  )
}

function WeakTopicsCard() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className={styles.card}
    >
      <div className={styles.cardHeader}>
        <div className={`${styles.cardIcon} ${styles.cardIconAmber}`}>
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <div className={styles.cardTitle}>Weak Topics</div>
          <div className={styles.cardSubtitle}>Need more practice</div>
        </div>
      </div>
      {weakTopics.map((topic, index) => (
        <motion.div
          key={topic.name}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className={styles.weakTopicItem}
        >
          <div className={styles.weakTopicHeader}>
            <span className={styles.weakTopicName}>{topic.name}</span>
            <span className={styles.weakTopicScore}>{topic.score}%</span>
          </div>
          <div className={styles.weakTopicBar}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${topic.score}%` }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              className={styles.weakTopicProgress}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

function PracticeGeneratorCard() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className={styles.card}
    >
      <div className={styles.cardHeader}>
        <div className={`${styles.cardIcon} ${styles.cardIconPurple}`}>
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <div className={styles.cardTitle}>Quick Practice</div>
          <div className={styles.cardSubtitle}>Generate exercises</div>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>24</div>
          <div className={styles.statLabel}>Solved Today</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>87%</div>
          <div className={styles.statLabel}>Accuracy</div>
        </div>
      </div>

      {practiceItems.map((practice, index) => (
        <motion.div
          key={practice.id}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className={styles.practiceCard}
        >
          <div className={styles.practiceHeader}>
            <span className={styles.practiceSubject}>{practice.subject}</span>
            <span className={styles.practiceDifficulty}>{practice.difficulty}</span>
          </div>
          <div className={styles.practiceTitle}>{practice.title}</div>
          <button className={styles.practiceButton}>Start Practice</button>
        </motion.div>
      ))}
    </motion.div>
  )
}

function AIGlowCard() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className={styles.card}
      style={{
        background: "linear-gradient(135deg, rgba(34, 129, 154, 0.12) 0%, rgba(144, 194, 231, 0.18) 100%)",
        border: "1px solid rgba(34, 129, 154, 0.25)",
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.aiAvatar} style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem" }}>
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className={styles.cardTitle}>Smart Insights</div>
          <div className={styles.cardSubtitle}>AI-powered analysis</div>
        </div>
      </div>
      <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.6 }}>
        Based on your recent performance, I recommend focusing on <strong>Differential Equations</strong> this week. 
        Your quiz scores show a 15% improvement potential with targeted practice.
      </p>
      <button
        className={styles.practiceButton}
        style={{ marginTop: "1rem" }}
      >
        Get Detailed Plan
      </button>
    </motion.div>
  )
}

// Main Component
export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content,
      timestamp: "Just now",
    }
    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        "Explain quantum entanglement": "Quantum entanglement is a phenomenon where two or more particles become connected in such a way that the quantum state of each particle cannot be described independently, even when separated by large distances. When you measure one entangled particle, it instantly affects the state of the other, regardless of the distance between them.",
        "Help me with calculus derivatives": "The derivative of a function measures how the function changes as its input changes. The basic formula is: f'(x) = lim(h→0) [f(x+h) - f(x)] / h. For practice, try finding the derivative of f(x) = x³ + 2x² - 5x + 3.",
        "What is machine learning?": "Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn patterns and make decisions.",
        "Explain Newton's laws": "Newton's three laws of motion are: 1) An object at rest stays at rest and an object in motion stays in motion unless acted upon by an external force. 2) F = ma (Force equals mass times acceleration). 3) For every action, there is an equal and opposite reaction.",
        "How does blockchain work?": "A blockchain is a distributed ledger technology that records transactions across multiple computers. Each block contains a cryptographic hash of the previous block, transaction data, and a timestamp. This makes it virtually impossible to alter historical records.",
        "default": "That's a great question! Let me break it down for you. This concept is fundamental to understanding the broader topic. Would you like me to explain it in more detail, or perhaps provide some practice problems?",
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "ai",
        content: aiResponses[content] || aiResponses.default,
        timestamp: "Just now",
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handlePromptSelect = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.main}>
        {/* Chat Section */}
        <div className={styles.chatSection}>
          <div className={styles.chatMessages}>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLast={index === messages.length - 1}
              />
            ))}
            {isTyping && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`${styles.message} ${styles.messageUser}`}
                style={{ display: "none" }}
              >
                {/* Typing indicator handled separately */}
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <SuggestedPrompts onSelect={handlePromptSelect} />
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <RecommendationsCard />
          <WeakTopicsCard />
          <PracticeGeneratorCard />
          <AIGlowCard />
        </div>
      </div>
    </div>
  )
}