// types/index.ts
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
}

export interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Episode[];
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface EpisodeCardProps {
  episode: Episode;
  characters: Record<string, Character>;
}

export interface EpisodeListProps {
  episodes: Episode[];
  characters: Record<string, Character>;
  loading: boolean;
  searchTerm: string;
}