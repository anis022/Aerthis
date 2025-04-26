'use client'
import EarthGlobe from '@/components/EarthGlobe';
import EarthLoading from '@/components/EarthLoading';
import dynamic from 'next/dynamic';

const DynamicEarthGlobe = dynamic(() => import('@/components/EarthGlobe'), {
  ssr: false,
  loading: () => <EarthLoading />, // Optional loading indicator
});

// const DynamicEarthGlobe = dynamic(() => new Promise((resolve) => {
//     // Force a 5 second delay
//     setTimeout(() => {
//       resolve(import('@/components/EarthGlobe'))
//     }, 5000) // 5000ms = 5 seconds
//   }), {
//   ssr: false,
//   loading: () => <EarthLoading />
// });

export default function Home() {
  return (
    <div>
      <DynamicEarthGlobe />
    </div>
  );
}
