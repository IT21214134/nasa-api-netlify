const API_KEY = 'R3z2ePRigITkSnBcxpDwCDI3x7zbV5mSP4VQZddy';

export async function fetchAstronomyData() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}