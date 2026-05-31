"use client"

import { cn } from "@/lib/utils"
import { ComponentProps } from "@/types"

interface SkeletonProps extends ComponentProps {
  variant?: "text" | "circular" | "rectangular" | "card"
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  ...props
}: SkeletonProps) {
  const variantStyles = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
    card: "rounded-3xl",
  }

  return (
    <div
      className={cn(
        "animate-pulse bg-slate-200",
        variantStyles[variant],
        className
      )}
      style={{ width, height }}
      {...props}
    />
  )
}

// Skeleton Card for Analytics
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <Skeleton variant="circular" width="3rem" height="3rem" />
        <Skeleton variant="text" width="5rem" height="1rem" />
      </div>
      <Skeleton variant="text" width="4rem" height="2.25rem" className="mb-1" />
      <Skeleton variant="text" width="6rem" height="1rem" />
    </div>
  )
}

// Skeleton for Charts
export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton variant="text" width="10rem" height="1.25rem" className="mb-1" />
          <Skeleton variant="text" width="6rem" height="0.875rem" />
        </div>
        <Skeleton variant="rectangular" width="5rem" height="1.5rem" />
      </div>
      <Skeleton variant="rectangular" width="100%" height="16rem" />
    </div>
  )
}

// Skeleton for List Items
export function SkeletonListItem({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden p-6",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <Skeleton variant="rectangular" width="3rem" height="3rem" className="rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" height="1.25rem" />
          <Skeleton variant="text" width="40%" height="1rem" />
        </div>
        <Skeleton variant="circular" width="1.5rem" height="1.5rem" />
      </div>
    </div>
  )
}

// Skeleton for Chat
export function SkeletonChat({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-white/70 backdrop-blur-12 rounded-3xl border border-slate-200/30 overflow-hidden",
        className
      )}
    >
      <div className="p-4 border-b border-slate-200/30">
        <div className="flex items-center gap-3">
          <Skeleton variant="circular" width="2.5rem" height="2.5rem" />
          <div className="space-y-2">
            <Skeleton variant="text" width="8rem" height="1rem" />
            <Skeleton variant="text" width="5rem" height="0.75rem" />
          </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton variant="circular" width="2rem" height="2rem" />
            <div className="flex-1 space-y-2">
              <Skeleton variant="text" width="30%" height="0.75rem" />
              <Skeleton
                variant="rectangular"
                width={i === 2 ? "70%" : "50%"}
                height="3rem"
                className="rounded-2xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Skeleton Grid
export function SkeletonGrid({
  count = 4,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <div className={cn("grid gap-6", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}