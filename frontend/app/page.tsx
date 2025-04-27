import EarthGlobeWrapper from '@/components/EarthGlobeWrapper'
import React from 'react'

const Home = async () => {
  const heatmapData = await (async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-heatmap-data`, {
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

  const plasticData = await (async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-plastic-data`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await response.json();
      // console.log('Plastic data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching plastic data:', error);
    }
  })();
  // console.log("Heat map data2:", heatmapData);

  return (
    <div>
      <EarthGlobeWrapper heatmapData={heatmapData} plasticData={plasticData} />
    </div>
  )
}

export default Home