"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Loader2,
  Info,
  Calendar,
  Play,
  Users,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Types
interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
}

const EpisodeViewer = () => {
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
      if (characters[url]) return; // Skip if already fetched
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch character");
      const data: Character = await response.json();
      setCharacters((prev) => ({ ...prev, [url]: data }));
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  const getSeasonEpisode = (code: string) => {
    const match = code.match(/S(\d{2})E(\d{2})/);
    if (match) {
      return { season: parseInt(match[1]), episode: parseInt(match[2]) };
    }
    return { season: 0, episode: 0 };
  };

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.episode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold text-green-400 mb-6">
            Rick and Morty Episodes
          </h1>
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search episodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-green-400" />
          </div>
        ) : (
          <>
            {/* Episodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredEpisodes.map((episode) => {
                const { season, episode: epNum } = getSeasonEpisode(
                  episode.episode
                );
                return (
                  <Card
                    key={episode.id}
                    className="bg-gray-800 border-gray-700 hover:border-green-400 transition-all duration-300 group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-400/20 text-green-400 hover:bg-green-400/30"
                        >
                          {episode.episode}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-gray-600 text-gray-400"
                        >
                          Season {season}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-green-400 transition-colors">
                        {episode.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center text-gray-400 gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{episode.air_date}</span>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-400">
                            <Users className="h-4 w-4" />
                            <span>Featured Characters:</span>
                          </div>
                          <div className="flex gap-2">
                            {episode.characters
                              .slice(0, 3)
                              .map((charUrl, idx) => {
                                const char = characters[charUrl];
                                return char ? (
                                  <div
                                    key={idx}
                                    className="relative group/char"
                                  >
                                    <img
                                      src={char.image}
                                      alt={char.name}
                                      className="w-12 h-12 rounded-full border-2 border-gray-700"
                                    />
                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/char:opacity-100 whitespace-nowrap transition-opacity">
                                      {char.name}
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    key={idx}
                                    className="w-12 h-12 rounded-full bg-gray-700 animate-pulse"
                                  />
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 pb-8">
              <Button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
              <span className="text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EpisodeViewer;
