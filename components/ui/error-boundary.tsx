"use client"

import { Component, ReactNode, ErrorInfo } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  className?: string
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })
    this.props.onError?.(error, errorInfo)
    console.error("Error caught by boundary:", error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          className={cn(
            "flex flex-col items-center justify-center min-h-[400px] p-8 text-center",
            this.props.className
          )}
        >
          <div className="p-4 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-500 mb-6 max-w-md">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
          <div className="flex gap-3">
            <Button onClick={this.handleRetry} className="bg-ocean hover:bg-ocean/90">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button variant="secondary" onClick={() => window.location.reload()}>
              <Home className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          </div>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-6 p-4 bg-slate-100 rounded-xl text-left max-w-2xl w-full">
              <summary className="text-sm font-medium text-slate-700 cursor-pointer">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs text-red-600 overflow-auto">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

// Async Error Boundary for data fetching
interface AsyncErrorBoundaryProps extends Omit<ErrorBoundaryProps, "fallback"> {
  onRetry?: () => void
  errorMessage?: string
}

export function AsyncErrorBoundary({
  children,
  onRetry,
  errorMessage = "Failed to load data",
  className,
}: AsyncErrorBoundaryProps) {
  return (
    <ErrorBoundary
      className={className}
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
          <div className="p-4 rounded-full bg-amber-100 mb-4">
            <AlertTriangle className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {errorMessage}
          </h3>
          {onRetry && (
            <Button onClick={onRetry} variant="secondary" className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          )}
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}