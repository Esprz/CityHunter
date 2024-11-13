export function loadGoogleMapsAPI() {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        console.log("Google Maps API already loaded.");
        resolve(window.google.maps);
        return;
      }
  
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&v=alpha&libraries=maps3d,places,geometry`;
      script.async = true;
      script.defer = true;
  
      script.onload = () => {
        console.log("Google Maps API loaded.");
        resolve(window.google.maps);
      };
  
      script.onerror = () => {
        console.error("Failed to load Google Maps API.");
        reject(new Error("Failed to load Google Maps API."));
      };
  
      document.head.appendChild(script);
    });
  }
  