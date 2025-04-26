'use client'
import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Globe from 'react-globe.gl';
import EarthLoading from './EarthLoading';

const EarthGlobe = () => {
  const globeEl = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const isMounted = useRef(true); // Add this ref to track mount status

  const ANIMATION_DURATION = 500; // Duration in milliseconds - doesnt work but its here for future reference

  const handleGlobeReady = useCallback(() => {
    if (isMounted.current) { // Check if component is still mounted
      setGlobeReady(true);
      console.log('Globe is ready');
    }
  }, []);

  useEffect(() => {
    return () => {
      // This cleanup runs when component unmounts
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // Optional: Setup camera controls or initial view
    if (globeReady && globeEl.current) {
        // Example: Zoom controls
        globeEl.current.controls().enableZoom = true;
        globeEl.current.controls().autoRotate = false;
        // globeEl.current.controls().autoRotateSpeed = 0.2;

        // Set initial point of view
        globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 1.5 }); // Adjust altitude for zoom

        const timer = setTimeout(() => {
          if (isMounted.current) { // Check before state update
            setShowOverlay(false);
          }
        }, 1000);
        
        return () => clearTimeout(timer);
    }
  }, [globeReady]); // Re-run if globe becomes ready

  const handleGlobeClick = ({ lat, lng }: { lat: number; lng: number }, event: Event) => {
    console.log(`Clicked at Latitude: ${lat}, Longitude: ${lng}`);
    // You can set state or perform other actions here
  };


  return (
    <div>
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center z-10 duration-500 transition-opacity">
          <EarthLoading />
        </div>
      )}
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" // Basic globe texture
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" // Optional: adds terrain texture
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png" // Optional: star background
        
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.25}

        width={window.innerWidth} // Full width
        height={window.innerHeight} // Full height
        onGlobeReady={handleGlobeReady} // Callback when globe is ready
        onGlobeClick={handleGlobeClick} // Handle clicks on the globe
        
        // --- Future Heatmap Prop ---
        // heatmapsData={[{ lat, lng, weight }, ...]}
        // heatmapPointRadius={0.5}
        // heatmapWeight="weight" // key in your data objects for weight
      />
    </div>
  );
}

export default EarthGlobe
