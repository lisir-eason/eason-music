import api from './index';

export const getRecommendedPlaylist = (params: {limit: number}) =>
  api.get('/personalized', {params});
