'use client'
import React, { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const EarthGlobe = () => {
  const globeEl = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);

  useEffect(() => {
    // Optional: Setup camera controls or initial view
    if (globeEl.current) {
        // Example: Zoom controls
        globeEl.current.controls().enableZoom = true;
        globeEl.current.controls().autoRotate = false;
        // globeEl.current.controls().autoRotateSpeed = 0.2;

        // Set initial point of view
        globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 1.5 }); // Adjust altitude for zoom
    }
  }, [globeReady]); // Re-run if globe becomes ready

  const handleGlobeClick = ({ lat, lng }: { lat: number; lng: number }, event: Event) => {
    console.log(`Clicked at Latitude: ${lat}, Longitude: ${lng}`);
    // You can set state or perform other actions here
  };

  return (
    <div>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" // Basic globe texture
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" // Optional: adds terrain texture
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png" // Optional: star background
        
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.25}

        width={800} // Adjust as needed
        height={600} // Adjust as needed
        onGlobeReady={() => setGlobeReady(true)} // Callback when globe is ready
        onGlobeClick={handleGlobeClick} // Handle clicks on the globe
        
        // --- Future Heatmap Prop ---
        // heatmapsData={[{ lat, lng, weight }, ...]}
        // heatmapPointRadius={0.5}
        // heatmapWeight="weight" // key in your data objects for weight
      />
    </div>
  )
}

export default EarthGlobe
