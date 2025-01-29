"use client";

import React from "react";
import { EpisodeCard } from "./EpisodeCard";
import { Episode, Character } from "@/types";
import { Loader2 } from "lucide-react";

interface EpisodeListProps {
  episodes: Episode[];
  characters: Record<string, Character>;
  loading: boolean;
}

export const EpisodeList = ({
  episodes,
  characters,
  loading,
}: EpisodeListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-green-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {episodes.map((episode) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
          characters={characters}
        />
      ))}
    </div>
  );
};