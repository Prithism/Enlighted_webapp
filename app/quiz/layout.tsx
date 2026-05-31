import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quiz Center",
  description: "Practice intelligently with AI‑generated quizzes.",
};

/**
 * Layout for the quiz route — hosts metadata (server component requirement)
 * while the page itself is a client component.
 */
export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
