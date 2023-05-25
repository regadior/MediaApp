import * as qs from 'qs';

export class GetPublisherService {
  async gamePublisher(page: number) {
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
    const apiUrl = `https://api.rawg.io/api/publishers?key=${process.env.RAWG_API_KEY}&${queryString}`;
    try {
      const response = await fetch(apiUrl);
      const publishers = await response.json();
      return publishers;
    } catch (error) {
      console.error('Error making rawg API request:', error);
      return 'Error making rawg API request:';
    }
  }
}
