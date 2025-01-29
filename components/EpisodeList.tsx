"use client";

import React from "react";
import { EpisodeCard } from "./EpisodeCard";
import { Episode, Character } from "@/types";
import { Loader2, SearchX } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { Alert, AlertDescription } from "./ui/alert";
import { Pagination } from "./Pagination";

interface EpisodeListProps {
  episodes: Episode[];
  characters: Record<string, Character>;
  loading: boolean;
  searchTerm?: string;
}

export const EpisodeList = ({
  episodes,
  characters,
  loading,
  searchTerm,
}: EpisodeListProps) => {
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

// Update EpisodeViewer.tsx to pass searchTerm
export const EpisodeViewer = () => {
  // ... existing state and functions ...

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold text-green-400 mb-6">
            Rick and Morty Episodes
          </h1>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </header>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <EpisodeList
          episodes={filteredEpisodes}
          characters={characters}
          loading={loading}
          searchTerm={searchTerm}
        />

        {filteredEpisodes.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};