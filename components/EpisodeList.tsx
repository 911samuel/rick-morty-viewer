// components/EpisodeList.tsx
"use client";

import React from "react";
import { EpisodeCard } from "./EpisodeCard";
import type { EpisodeListProps } from "@/types";
import { Loader2, SearchX } from "lucide-react";

export const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  characters,
  loading,
  searchTerm,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-green-400" />
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <SearchX className="h-16 w-16 text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">
          No Episodes Found
        </h3>
        <p className="text-gray-500 max-w-md">
          {searchTerm
            ? `No episodes match "${searchTerm}". Try a different search term.`
            : "No episodes available."}
        </p>
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