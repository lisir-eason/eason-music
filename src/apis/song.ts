import api from './index';
import {SongLevel} from '@/types';

export const getSongUrls = (params: {id: string; level: SongLevel}) =>
  api.get('/song/url/v1', {params});
