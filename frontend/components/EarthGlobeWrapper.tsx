'use client'
import EarthLoading from '@/components/EarthLoading';
import dynamic from 'next/dynamic';

const DynamicEarthGlobe = dynamic(() => import('@/components/EarthGlobe'), {
  ssr: false,
  loading: () => <EarthLoading />, // Optional loading indicator
});

export default function EarthGlobeWrapper() {
  return (
    <div>
      <DynamicEarthGlobe />
    </div>
  );
}
