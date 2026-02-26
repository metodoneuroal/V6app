"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { PromoBanner } from "@/components/promo-banner"
import { HomeDashboard } from "@/components/home-dashboard"
import { NeuralPlaylists } from "@/components/neural-playlists"
import { NeuralAcademy } from "@/components/neural-academy"
import { MorningActivation } from "@/components/morning-activation"
import { Arsenal } from "@/components/arsenal"
import { BiohackerTracker } from "@/components/biohacker-tracker"
import { BottomNav, type Tab } from "@/components/bottom-nav"
import { BrainDumpFab } from "@/components/brain-dump-fab"
import { ProModal } from "@/components/pro-modal"
import { useAudioPlayer } from "@/lib/audio-context"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [proModalOpen, setProModalOpen] = useState(false)
  const { currentTrack } = useAudioPlayer()
  const isPlayerVisible = !!currentTrack

  return (
    <div className="min-h-dvh bg-background max-w-md mx-auto relative">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-[0.03] rounded-full"
        style={{
          background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Scrollable content */}
      <main className={`relative z-10 ${isPlayerVisible ? "pb-44" : "pb-24"}`}>
        <AppHeader />

        {activeTab === "home" && (
          <>
            <PromoBanner
              onOpenPro={() => setProModalOpen(true)}
              onNavigateToTab={(tab) => setActiveTab(tab as Tab)}
            />
            <HomeDashboard onNavigateToTab={(tab) => setActiveTab(tab as Tab)} />
            <NeuralPlaylists />
          </>
        )}

        {activeTab === "activation" && <MorningActivation />}

        {activeTab === "academy" && <NeuralAcademy />}

        {activeTab === "tracker" && (
          <BiohackerTracker onNavigateToShop={() => setActiveTab("arsenal")} />
        )}

        {activeTab === "arsenal" && <Arsenal />}
      </main>

      {/* Brain Dump FAB */}
      <BrainDumpFab isPlayerVisible={isPlayerVisible} />

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <ProModal open={proModalOpen} onClose={() => setProModalOpen(false)} />
    </div>
  )
}
