"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface InfoCardProps {
  title: string
  icon: string
  content: React.ReactNode
  className?: string
}

export function InfoCard({ title, icon, content, className }: InfoCardProps) {
  return (
    <Card
      className={cn(
        "group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card/90",
        className,
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          <span className="text-2xl">{icon}</span>
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  )
}
