'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Globe from 'react-globe.gl';
import EarthLoading from './EarthLoading';
import Popup from './Popup';
import SearchBar from './SearchBar';

const EarthGlobe: React.FC = () => {
  const globeEl = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [jsonData, setJsonData] = useState<any>(null);
  const [backendReady, setBackendReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading Earth...");
  const [heatmapData, setHeatmapData] = useState<any[]>([]);
  const [plasticData, setPlasticData] = useState<any[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const isMounted = useRef(false);
  const healthCheckInterval = useRef<NodeJS.Timeout | null>(null);
  const dataFetchInterval = useRef<NodeJS.Timeout | null>(null);
  
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

  // Data fetching useEffect
  useEffect(() => {
    const fetchData = async () => {
      if (!backendReady) return;
      
      try {
        setLoadingMessage("Loading map data...");
        
        // Fetch heatmap data
        const heatmapResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-heatmap-data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        
        // Fetch plastic data
        const plasticResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-plastic-data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (heatmapResponse.ok && plasticResponse.ok) {
          const heatmapResult = await heatmapResponse.json();
          const plasticResult = await plasticResponse.json();
          
          setHeatmapData(heatmapResult);
          setPlasticData(plasticResult);
          setDataReady(true);
          setLoadingMessage("Loading Earth...");
          
          // Clear the data fetch interval if it exists
          if (dataFetchInterval.current) {
            clearInterval(dataFetchInterval.current);
            dataFetchInterval.current = null;
          }
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching map data:', error);
        setDataReady(false);
        setLoadingMessage("Loading map data...");
      }
    };

    // Initial fetch when backend becomes ready
    if (backendReady && !dataReady) {
      fetchData();
      
      // Set up interval to retry every 10 seconds if data fetching fails
      dataFetchInterval.current = setInterval(fetchData, 10000);
    }

    // Cleanup function
    return () => {
      if (dataFetchInterval.current) {
        clearInterval(dataFetchInterval.current);
        dataFetchInterval.current = null;
      }
    };
  }, [backendReady, dataReady]); // Re-run when backend becomes ready or data status changes

  // Backend health check useEffect
  useEffect(() => {
    const checkBackendHealth = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/test`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        
        if (data.message === "I'm alive") {
          setBackendReady(true);
          setLoadingMessage("Loading Earth...");
          if (healthCheckInterval.current) {
            clearInterval(healthCheckInterval.current);
            healthCheckInterval.current = null;
          }
        } else {
          setBackendReady(false);
          setLoadingMessage("Waiting for backend to start...");
        }
      } catch (error) {
        setBackendReady(false);
        setLoadingMessage("Waiting for backend to start...");
      }
    };

    // Initial check
    checkBackendHealth();
    
    // Set up interval to check every 10 seconds if backend is not ready
    if (!backendReady) {
      healthCheckInterval.current = setInterval(checkBackendHealth, 10000);
    }

    // Cleanup function
    return () => {
      if (healthCheckInterval.current) {
        clearInterval(healthCheckInterval.current);
        healthCheckInterval.current = null;
      }
    };
  }, [backendReady]); // Re-run when backendReady changes

  const handleGlobeReady = useCallback(() => {
    if (isMounted.current) {
      setGlobeReady(true);
      // Only hide overlay if globe, backend, and data are all ready
      if (backendReady && dataReady) {
        setShowOverlay(false);
      }
    }
  }, [backendReady, dataReady]);

  useEffect(() => {
    // Optional: Setup camera controls or initial view
    if (globeReady && globeEl.current) {
        // Example: Zoom controls
        globeEl.current.controls().enableZoom = true;
        globeEl.current.controls().autoRotate = false;
        // globeEl.current.controls().autoRotateSpeed = 0.2;

        // Set initial point of view
        globeEl.current.pointOfView({ lat: 32, lng: -55, altitude: 1.5 }, 1500); // Adjust altitude for zoom

        // Only hide overlay if globe, backend, and data are all ready
        if (backendReady && dataReady) {
          setShowOverlay(false);
        }
    }
  }, [globeReady, backendReady, dataReady]); // Re-run if any condition changes

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
    setJsonData({status: "loading"});
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
          <EarthLoading message={loadingMessage} />
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
