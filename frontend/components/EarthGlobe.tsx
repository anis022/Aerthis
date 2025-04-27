'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Globe from 'react-globe.gl';
import EarthLoading from './EarthLoading';
import Popup from './Popup';
import SearchBar from './SearchBar';

const EarthGlobe: React.FC<any> = ({ heatmapData, plasticData }) => {
  const globeEl = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [jsonData, setJsonData] = useState<any>(null);
  const isMounted = useRef(false);
  
  const [airToggle, setAirToggle] = useState(true);
  const [plasticToggle, setPlasticToggle] = useState(true);
  
  document.getElementById("airToggle")?.addEventListener("click", () => {
    setAirToggle(!airToggle);
  })

  document.getElementById("plasticToggle")?.addEventListener("click", () => {
    setPlasticToggle(!plasticToggle);
  })


  useEffect(() => {
    isMounted.current = true;
    // console.log("Heat map data:", heatmapData);
    // console.log("Plastic data:", plasticData);
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
        globeEl.current.pointOfView({ lat: 32, lng: -55, altitude: 1.5 }, 1500); // Adjust altitude for zoom

        setShowOverlay(false); // Hide loading overlay
    }
  }, [globeReady]); // Re-run if globe becomes ready

  const handleGlobeClick = ({ lat, lng }: { lat: number; lng: number }, event: Event) => {
    handleClick(lat, lng);
  };

  const handleHeatmapClick = (heatmap: any, event: Event, { lat, lng, altitude }: { lat: number; lng: number, altitude: number }) => {
    handleClick(lat, lng);
  };

  const handleClick = (lat: number, lng: number) => {
    globeEl.current.pointOfView({ lat: lat, lng: lng, altitude: 1 }, 1000);
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
      setJsonData(data);
      // Handle the response data as needed
    });
  }

  const handleSearch = (data: any) => {
    if (!data.lat) {
      alert("No country was found.");
      return;
    }
    console.log("Handle search data :", data['lat']);
    const lat = (data.lat);
    const lng = (data.lng);
    handleClick(lat, lng);
    globeEl.current.pointOfView({ lat: lat, lng: lng, altitude: 1 }, 1000);
  };


  return (
    <div>
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center z-10 duration-500 transition-opacity">
          <EarthLoading />
        </div>
      )}
      <div className="absolute flex z-30 right-12 top-4 space-x-4">
        <span id="airToggle" className={`flex items-center hover:cursor-pointer ${airToggle ? "" : "line-through opacity-50"}`}><div className='w-6 h-6 bg-[#64c54b] rounded-full m-2'></div>Air quality</span>
        <span id="plasticToggle" className={`flex items-center hover:cursor-pointer ${plasticToggle ? "" : "line-through opacity-50"}`}><div className='w-6 h-6 bg-purple-600 rounded-full m-2'></div>Plastic</span>
      </div>
      <SearchBar handleSearch={handleSearch} />
      <Popup jsonData={jsonData} />
      <div style={{left: '-45%', position:'absolute', overflow:"hidden", width:'100wh', height:'100vh'}}>
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg" // Basic globe texture
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png" // Optional: adds terrain texture
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png" // Optional: star background
          // globeImageUrl="world.200412.3x21600x10800.jpg"

          heatmapTopAltitude={0.1}
          heatmapsTransitionDuration={3000}
          
          atmosphereColor="lightskyblue"
          atmosphereAltitude={0.25}

          width={window.innerWidth * 1.5} // Full width
          height={window.innerHeight} // Full height
          
          // --- Future Heatmap Prop ---
          // heatmapsData={[[{"lat": 0, "lng": 0, "aqi": 1}, {"lat": 0, "lng": -10, "aqi": 2}]]} // Data for heatmap
          heatmapsData={airToggle ? [heatmapData] : [[{}]]}
          heatmapPointLat="lat"
          heatmapPointLng="lng"
          heatmapPointWeight="aqi"

          // pointsData={[{"lat": 0, "lng": 0}, {"lat": 0, "lng": -10}]}
          pointsData={plasticToggle ? plasticData : []}
          pointAltitude={0}
          pointColor={() => "purple"}

          // heatmapsTransitionDuration={3000}
          onHeatmapClick={handleHeatmapClick} // Handle clicks on the heatmap
          enablePointerInteraction={true}

          onGlobeReady={handleGlobeReady} // Callback when globe is ready
          onGlobeClick={handleGlobeClick} // Handle clicks on the globe
        />
      </div>
    </div>
  );
}

export default EarthGlobe
