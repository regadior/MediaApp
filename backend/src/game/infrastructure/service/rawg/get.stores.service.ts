export class GetStoresService {
  async gameStores() {
    const apiUrl = `https://api.rawg.io/api/stores?key=${process.env.RAWG_API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const stores = await response.json();
      return stores;
    } catch (error) {
      console.error('Error making rawg API request:', error);
      return 'Error making rawg API request:';
    }
  }
}
