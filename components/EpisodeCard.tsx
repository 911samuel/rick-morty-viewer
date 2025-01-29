"use client";

import React from "react";
import { Calendar, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Episode, Character } from "@/types";
import { CharacterAvatar } from "./CharacterAvatar";

interface EpisodeCardProps {
  episode: Episode;
  characters: Record<string, Character>;
}

export const EpisodeCard = ({ episode, characters }: EpisodeCardProps) => {
  const getSeasonEpisode = (code: string) => {
    const match = code.match(/S(\d{2})E(\d{2})/);
    if (match) {
      return { season: parseInt(match[1]), episode: parseInt(match[2]) };
    }
    return { season: 0, episode: 0 };
  };

  const { season } = getSeasonEpisode(episode.episode);

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-green-400 transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant="secondary"
            className="bg-green-400/20 text-green-400 hover:bg-green-400/30"
          >
            {episode.episode}
          </Badge>
          <Badge variant="outline" className="border-gray-600 text-gray-400">
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
              {episode.characters.slice(0, 3).map((charUrl, idx) => (
                <CharacterAvatar
                  key={idx}
                  character={characters[charUrl]}
                  loading={!characters[charUrl]}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};