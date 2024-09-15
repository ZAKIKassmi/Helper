"use client"
import { ReactNode, Suspense } from 'react'
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

type Props = {
  children: ReactNode
}

export default function Main({children}: Props) {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  if (!sidebar) return null;
  return (
    <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50  transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
        >
        {children}
    </main>
  )
}