// components/EpisodeViewer.tsx
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import EpisodeList from "../components/EpisodeList";
import { Episode, Character } from "@/Types";

interface EpisodeViewerProps {
  fetchEpisodes: (
    page: number,
    searchQuery: string
  ) => Promise<{
    episodes: Episode[];
    totalPages: number;
    characters: Record<string, Character>;
  }>;
}

const EpisodeViewer: React.FC<EpisodeViewerProps> = ({ fetchEpisodes }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Record<string, Character>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadEpisodes = async () => {
      const { episodes, totalPages, characters } = await fetchEpisodes(
        currentPage,
        searchQuery
      );
      setEpisodes(episodes);
      setTotalPages(totalPages);
      setCharacters(characters);
    };

    loadEpisodes();
  }, [currentPage, searchQuery, fetchEpisodes]);

  return (
    <div className="space-y-6">
      <SearchBar onSearch={setSearchQuery} />
      <EpisodeList
        episodes={episodes}
        characters={characters}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default EpisodeViewer;