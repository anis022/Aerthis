import EarthGlobe from '@/components/EarthGlobe'
import EarthGlobeWrapper from '@/components/EarthGlobeWrapper'
import SearchBar from '@/components/SearchBar';
import React from 'react'

const Home = async () => {
  const heatmapData = await (async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-heatmap-data-test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      // console.log('Heatmap data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching heatmap data:', error);
    }
  })();
  // console.log("Heat map data2:", heatmapData);

  return (
    <div>
      <SearchBar />
      <EarthGlobeWrapper heatmapData={heatmapData} />
    </div>
  )
}

export default Home