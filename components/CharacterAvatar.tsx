// components/CharacterAvatar.tsx
import React from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Character } from "@/Types";

interface CharacterAvatarProps {
  url: string;
  character?: Character;
}

const CharacterAvatar: React.FC<CharacterAvatarProps> = ({ character }) => {
  if (!character) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-green-400">
            <Image
              src={character.image}
              alt={character.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <span className="text-white">{character.name}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CharacterAvatar;
