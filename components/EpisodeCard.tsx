// components/EpisodeCard.tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import CharacterAvatar from "./CharacterAvatar";
import { Episode, Character } from "@/Types";

const getSeasonEpisode = (code: string) => {
  const match = code.match(/S(\d{2})E(\d{2})/);
  return match ? { season: parseInt(match[1]) } : { season: 0 };
};

interface EpisodeCardProps {
  episode: Episode;
  characters: Record<string, Character>;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, characters }) => {
  const { season } = getSeasonEpisode(episode.episode);

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-green-400 transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <Badge className="bg-green-400/20 text-green-400">
            {episode.episode}
          </Badge>
          <Badge className="border-gray-600 text-gray-400">
            Season {season}
          </Badge>
        </div>
        <CardTitle className="text-xl text-white">{episode.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center text-gray-400 gap-2">
            <Calendar className="h-4 w-4" />
            <span>{episode.air_date}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="h-4 w-4" />
              <span>Featured Characters:</span>
            </div>
            <div className="flex gap-2">
              {episode.characters.slice(0, 3).map((charUrl, idx) => (
                <CharacterAvatar
                  key={idx}
                  url={charUrl}
                  character={characters[charUrl]}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EpisodeCard;