// components/EpisodeList.tsx
import React from "react";
import EpisodeCard from "./EpisodeCard";
import Pagination from "./Pagination";
import { Episode, Character } from "@/Types";

interface EpisodeListProps {
  episodes: Episode[];
  characters: Record<string, Character>;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const EpisodeList: React.FC<EpisodeListProps> = ({
  episodes,
  characters,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            episode={episode}
            characters={characters}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default EpisodeList;
