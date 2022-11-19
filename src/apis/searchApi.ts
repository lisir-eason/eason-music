import api from './index';

export const getHotSearch = () => api.get('/search/hot');

export const getSearchSuggest = (keywords: string) =>
  api.get(`/search/suggest?keywords=${keywords}`);

export const searchKeywords = (params: {keywords: string; limit?: number; type?: '1' | '100'}) =>
  api.get('/cloudsearch', {params});
