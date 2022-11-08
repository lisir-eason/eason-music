export type songLevel = 'standard' | 'higher' | 'exhigh' | 'lossless' | 'hires';

export type songUrl = {
  id: number;
  url: string;
  size: number;
  type: string;
  level: songLevel;
  time: number;
};
