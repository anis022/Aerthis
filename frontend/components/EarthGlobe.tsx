'use client'
import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Globe from 'react-globe.gl';
import EarthLoading from './EarthLoading';

const EarthGlobe = ({ heatmapData }: any) => {
  const globeEl = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const isMounted = useRef(false);


  useEffect(() => {
    isMounted.current = true;
    console.log("Heat map data:", heatmapData);
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleGlobeReady = useCallback(() => {
    if (isMounted.current) {
      setGlobeReady(true);
      setShowOverlay(false);
    }
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

        setShowOverlay(false); // Hide loading overlay
    }
  }, [globeReady]); // Re-run if globe becomes ready

  const handleGlobeClick = ({ lat, lng }: { lat: number; lng: number }, event: Event) => {
    console.log(`Clicked at Latitude: ${lat}, Longitude: ${lng}`);
    // You can set state or perform other actions here
    const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-geo-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat, lng }),
      credentials: 'include',
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data);
      // Handle the response data as needed
    })
  };

  const handleHeatmapClick = (heatmap: any, event: Event, { lat, lng, altitude }: { lat: number; lng: number, altitude: number }) => {
    console.log(`Clicked at Latitude: ${lat}, Longitude: ${lng}`);
    // You can set state or perform other actions here
    const response = fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-geo-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat, lng }),
      credentials: 'include',
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data);
      // Handle the response data as needed
    })
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
        
        // --- Future Heatmap Prop ---
        // heatmapsData={[[{"lat": 0, "lng": 0, "aqi": 1}, {"lat": 0, "lng": -10, "aqi": 2}]]} // Data for heatmap
        heatmapsData={[heatmapData]}
        heatmapPointLat="lat"
        heatmapPointLng="lng"
        heatmapPointWeight="aqi"

        // heatmapsTransitionDuration={3000}
        onHeatmapClick={handleHeatmapClick} // Handle clicks on the heatmap
        enablePointerInteraction={true}

        onGlobeReady={handleGlobeReady} // Callback when globe is ready
        onGlobeClick={handleGlobeClick} // Handle clicks on the globe
      />
    </div>
  );
}

export default EarthGlobe
