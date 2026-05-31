"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { FileText, Search, Inbox, Frown } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { ComponentProps } from "@/types"

interface EmptyStateProps extends ComponentProps {
  icon?: "default" | "search" | "inbox" | "sad"
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
}

const icons = {
  default: <FileText className="w-8 h-8" />,
  search: <Search className="w-8 h-8" />,
  inbox: <Inbox className="w-8 h-8" />,
  sad: <Frown className="w-8 h-8" />,
}

export function EmptyState({
  icon = "default",
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "flex flex-col items-center justify-center min-h-[300px] p-8 text-center",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="p-4 rounded-full bg-slate-100 mb-4"
      >
        {icons[icon]}
      </motion.div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      {description && (
        <p className="text-slate-500 mb-6 max-w-md">{description}</p>
      )}
      {(action || secondaryAction) && (
        <div className="flex gap-3">
          {action && (
            <Button onClick={action.onClick} className="bg-ocean hover:bg-ocean/90">
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  )
}

// Specialized Empty States
export function EmptyAssignments({ onClearFilters }: { onClearFilters?: () => void }) {
  return (
    <EmptyState
      icon="inbox"
      title="No assignments found"
      description="Try adjusting your search or filter criteria, or check back later for new assignments."
      action={
        onClearFilters
          ? {
              label: "Clear Filters",
              onClick: onClearFilters,
            }
          : undefined
      }
    />
  )
}

export function EmptyDoubts({ onAsk }: { onAsk?: () => void }) {
  return (
    <EmptyState
      icon="sad"
      title="No doubts yet"
      description="You haven't asked any questions. Get started by asking your first doubt!"
      action={
        onAsk
          ? {
              label: "Ask a Doubt",
              onClick: onAsk,
            }
          : undefined
      }
    />
  )
}

export function EmptySearch({ onClear }: { onClear: () => void }) {
  return (
    <EmptyState
      icon="search"
      title="No results found"
      description="We couldn't find anything matching your search. Try different keywords."
      action={{
        label: "Clear Search",
        onClick: onClear,
      }}
    />
  )
}