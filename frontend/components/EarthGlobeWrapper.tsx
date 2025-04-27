'use client'
import EarthGlobe from '@/components/EarthGlobe';
import EarthLoading from '@/components/EarthLoading';
import dynamic from 'next/dynamic';

const DynamicEarthGlobe = dynamic(() => import('@/components/EarthGlobe'), {
  ssr: false,
  loading: () => <EarthLoading />, // Optional loading indicator
});

export default function EarthGlobeWrapper({ heatmapData, plasticData }: any) {
    // console.log("Heat map dataaaa:", heatmapData);
  return (
    <div>
      <DynamicEarthGlobe heatmapData={heatmapData} plasticData={plasticData}/>
    </div>
  );
}
