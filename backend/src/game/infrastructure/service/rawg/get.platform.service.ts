import * as qs from 'qs';

export class GetPlatformService {
  async gamePlatform(page: number) {
    const queryParams = {
      page,
    };
    const filteredParams = Object.entries(queryParams)
      .filter(([value]) => value !== undefined)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    const queryString = qs.stringify(filteredParams);
    const apiUrl = `https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}&${queryString}`;
    try {
      const response = await fetch(apiUrl);
      const platforms = await response.json();
      return platforms;
    } catch (error) {
      console.error('Error making rawg API request:', error);
      return 'Error making rawg API request:';
    }
  }
}
