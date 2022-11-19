import api from './index';

export const getRecommendedPlaylist = (params: {limit: number}) =>
  api.get('/personalized', {params});

export const getPlaylistDetail = (params: {id: string}) => api.get('/playlist/detail', {params});
