"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  FileText,
  TrendingUp,
  Calendar,
  MessageCircleQuestion,
  Sparkles,
  BookOpen,
  CreditCard,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Target,
  FlaskConical,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavItem {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
  badgeColor?: string
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { id: "assignments", label: "Assignments", href: "/assignments", icon: <FileText className="h-5 w-5" /> },
  { id: "performance", label: "Performance", href: "/performance", icon: <TrendingUp className="h-5 w-5" /> },
  { id: "doubts", label: "Doubt Resolution", href: "/doubts", icon: <MessageCircleQuestion className="h-5 w-5" /> },
  { id: "ai", label: "AI Assistant", href: "/ai-assistant", icon: <Sparkles className="h-5 w-5" /> },
  { id: "schedule", label: "Schedule", href: "/schedule", icon: <Calendar className="h-5 w-5" /> },
  { id: "batches", label: "Batches", href: "/batches", icon: <Users className="h-5 w-5" /> },
  { id: "revision", label: "Revision Center", href: "/revision", icon: <BookOpen className="h-5 w-5" /> },
  { id: "quiz", label: "Quiz Center", href: "/quiz", icon: <Target className="h-5 w-5" /> },
  { id: "virtual-lab", label: "Virtual Lab", href: "/virtual-lab", icon: <FlaskConical className="h-5 w-5" /> },
]

const bottomItems: NavItem[] = [
  { id: "billing", label: "Billing", href: "/billing", icon: <CreditCard className="h-5 w-5" /> },
  { id: "settings", label: "Settings", href: "/settings", icon: <Settings className="h-5 w-5" /> },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 },
  }

  const itemVariants = {
    expanded: { paddingLeft: "1rem", paddingRight: "1rem" },
    collapsed: { paddingLeft: "0.75rem", paddingRight: "0.75rem" },
  }

  const labelVariants = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -10 },
  }

  const NavItemComponent = ({
    item,
    isActive,
  }: {
    item: NavItem
    isActive: boolean
  }) => (
    <motion.div variants={itemVariants} initial={false} animate={isCollapsed ? "collapsed" : "expanded"}>
      <Link
        href={item.href}
        className={cn(
          "w-full flex items-center gap-3 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden",
          isActive
            ? "bg-ocean text-white shadow-lg shadow-ocean/25"
            : "text-slate-500 hover:bg-sky/15 hover:text-slate-700"
        )}
      >
        <div className={cn("relative z-10", isCollapsed && "mx-auto")}>
          {item.icon}
        </div>

        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span
              variants={labelVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative z-10 font-medium text-sm whitespace-nowrap"
            >
              {item.label}
            </motion.span>
          )}
        </AnimatePresence>

        {!isCollapsed && item.badge && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={cn(
              "ml-auto px-2 py-0.5 rounded-full text-xs font-semibold text-white",
              item.badgeColor || "bg-ocean"
            )}
          >
            {item.badge}
          </motion.span>
        )}

        {isCollapsed && item.badge && (
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        )}

        {isActive && !isCollapsed && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 bg-ocean/0"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  )

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "flex items-center gap-3 mb-8",
          isCollapsed ? "justify-center px-2" : "px-4"
        )}
      >
        <Link href="/dashboard" className="h-10 w-10 shrink-0 rounded-xl overflow-hidden bg-white flex items-center justify-center">
          <Image src="/logo.jpeg" alt="EnlightEd Logo" width={40} height={40} className="w-full h-full object-contain" />
        </Link>
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-xl font-bold text-slate-900"
            >
              EnlightEd
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Notification Bell (Collapsed Mode) */}
      {isCollapsed && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-full flex justify-center py-3 mb-4 text-slate-400 hover:text-ocean transition-colors relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-6 h-2 w-2 rounded-full bg-red-500" />
        </motion.button>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <NavItemComponent item={item} isActive={pathname === item.href} />
          </motion.div>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="space-y-1 px-2 pt-6 border-t border-slate-100">
        {bottomItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <NavItemComponent item={item} isActive={pathname === item.href} />
          </motion.div>
        ))}
      </div>

      {/* User Profile */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className={cn(
          "mt-6 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200",
          isCollapsed && "px-2"
        )}
      >
        <div className={cn("flex items-center gap-3", isCollapsed && "flex-col")}>
          <Avatar size="md">
            <AvatarFallback className="bg-ocean text-white">AJ</AvatarFallback>
          </Avatar>
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-slate-900 truncate">
                  Alex Johnson
                </p>
                <p className="text-xs text-slate-500 truncate">
                  Pro Member
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Collapse Toggle (Desktop) */}
      {!isMobileOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "absolute -right-3 top-20 h-6 w-6 rounded-full bg-white border border-slate-200 shadow-md",
            "flex items-center justify-center text-slate-400 hover:text-ocean transition-colors",
            "hidden lg:flex"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </motion.button>
      )}
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-ocean text-white shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 h-screen w-80 bg-white z-50 flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 pb-2">
              <SidebarContent />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "hidden lg:flex flex-col fixed left-0 top-0 h-screen",
          "bg-white/95 backdrop-blur-xl border-r border-slate-200/50",
          "shadow-xl shadow-slate-200/50 z-30",
          isCollapsed ? "px-3 py-6" : "px-4 py-6"
        )}
      >
        <SidebarContent />
      </motion.aside>
    </>
  )
}