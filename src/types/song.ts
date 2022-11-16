export type SongLevel = 'standard' | 'higher' | 'exhigh' | 'lossless' | 'hires';

export type SongUrl = {
  id: number;
  url: string;
  size: number;
  type: string;
  level: SongLevel;
  time: number;
};
