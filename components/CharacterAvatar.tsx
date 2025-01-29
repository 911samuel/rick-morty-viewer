"use client";

import React from "react";
import Image from "next/image";
import { Character } from "@/types";

interface CharacterAvatarProps {
  character: Character | undefined;
  loading?: boolean;
}

export const CharacterAvatar = ({
  character,
  loading,
}: CharacterAvatarProps) => {
  if (loading || !character) {
    return <div className="w-12 h-12 rounded-full bg-gray-700 animate-pulse" />;
  }

  return (
    <div className="relative group/char">
      <Image
        src={character.image}
        alt={character.name}
        width={48}
        height={48} 
        className="rounded-full border-2 border-gray-700"
      />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/char:opacity-100 whitespace-nowrap transition-opacity">
        {character.name}
      </div>
    </div>
  );
};