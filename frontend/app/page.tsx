'use client'
import EarthGlobe from '@/components/EarthGlobe';
import dynamic from 'next/dynamic';

const DynamicEarthGlobe = dynamic(() => import('@/components/EarthGlobe'), {
  ssr: false,
  loading: () => <p>Loading Globe...</p> // Optional loading indicator
});

export default function Home() {
  return (
    <div>
      <DynamicEarthGlobe />
    </div>
  );
}
