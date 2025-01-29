"use client";

import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SearchBar } from "../components/SearchBar";
import { Pagination } from "../components/Pagination";
import { EpisodeList } from "../components/EpisodeList";
import { Episode, Character, ApiResponse } from "@/types";

export const EpisodeViewer = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Record<string, Character>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEpisodes(currentPage);
  }, [currentPage]);

  const fetchEpisodes = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      );
      if (!response.ok) throw new Error("Failed to fetch episodes");

      const data: ApiResponse = await response.json();
      setEpisodes(data.results);
      setTotalPages(data.info.pages);

      // Fetch first three characters for each episode
      const characterPromises = data.results.flatMap((episode) =>
        episode.characters.slice(0, 3).map((url) => fetchCharacter(url))
      );
      await Promise.all(characterPromises);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchCharacter = async (url: string) => {
    try {
      if (characters[url]) return;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch character");
      const data: Character = await response.json();
      setCharacters((prev) => ({ ...prev, [url]: data }));
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.episode.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default EpisodeViewer;