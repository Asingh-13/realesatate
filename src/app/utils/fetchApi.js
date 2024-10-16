import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'x-rapidapi-key': '6bb0694bbdmshf70ba28e990ad80p1a8661jsncf747373a14e',
        'x-rapidapi-host': 'bayut.p.rapidapi.com'
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
};
