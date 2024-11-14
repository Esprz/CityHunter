import { defineStore } from "pinia";
import { useMapStore } from "./mapStore";

export const useHuntStore = defineStore("store", {
  state: () => ({
    huntStores: [
      { name: "Dominique Ansel Bakery", place_id: "ChIJP0KOWoxZwokRmvPiQAIaH1A", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Burger.svg' },
      { name: "The Metropolitan Museum of Art", place_id: "ChIJb8Jg9pZYwokR-qHGtvSkLzs", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Donut.svg' },
      { name: "Chelsea Market", place_id: "ChIJw2lMFL9ZwokRosAtly52YX4", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Food_market.svg' },
      { name: "Eataly NYC Downtown", place_id: "ChIJvx7i_BlawokRidb5WfdvqRM", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=French.svg' },
      { name: "La Parisienne", place_id: "ChIJt1KQKxhawokRujL-AUeoW-Y", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Museum.svg' },
    ],
    fetchedStoreDetails: false,
    unvisitedMarkers: [],
  }),

  actions: {
    async fetchStoreDetails(map) {
      if (!google || !google.maps || !google.maps.places) {
        console.error("Google Maps JavaScript API is not loaded properly.");
        return;
      }

      const service = new google.maps.places.PlacesService(map);

      const fetchDetails = (store) => {
        return new Promise((resolve, reject) => {
          const request = {
            placeId: store.place_id,
            fields: [
              "name",
              "geometry",
              "photos",
              "rating",
              "formatted_address",
              "reviews",
            ],
          };

          service.getDetails(request, (details, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              resolve({
                ...store,
                lat: details.geometry.location.lat(),
                lng: details.geometry.location.lng(),
                location: details.geometry.location,
                photos: details.photos || [],
                rating: details.rating || null,
                address: details.formatted_address || null,
                reviews: details.reviews || [],
              });
            } else {
              console.error(`Failed to fetch details for ${store.name}:`, status);
              reject(status);
            }
          });
        });
      };

      const promises = this.huntStores.map((store) => fetchDetails(store));

      try {
        const updatedStores = await Promise.all(promises);
        this.huntStores = updatedStores;
        console.log("Store details fetched successfully:", this.huntStores);
        this.fetchedStoreDetails = true;
      } catch (error) {
        console.error("Error fetching store details:", error);
      }
    },

    async updateStoreDistances(currentLocation) {
      if (!currentLocation) {
        console.error("Current location is not available.");
        return;
      }
      const origins = [`${currentLocation.lat},${currentLocation.lng}`];
      const destinations = this.huntStores.filter((store) => !store.visited).map((store) => `${store.lat},${store.lng}`);
      if (destinations.length === 0) return;

      const service = new google.maps.DistanceMatrixService();
      return new Promise((resolve, rejects) => {
        //console.log("Origins:", origins);
        //console.log("Destinations:", destinations);

        service.getDistanceMatrix({
          origins,
          destinations,
          travelMode: google.maps.TravelMode.WALKING,
          unitSystem: google.maps.UnitSystem.METRIC,
        },
          (response, status) => {
            //console.log("Distance Matrix Response:", response);
            //console.log("Status:", status);

            if (status === google.maps.DistanceMatrixStatus.OK) {
              const results = response.rows[0].elements;
              this.huntStores = this.huntStores.map((store, index) => {
                if (!store.visited) {
                  const result = results[index];
                  return {
                    ...store,
                    distance: result.distance ? result.distance.text : null,
                    walkTime: result.duration ? result.duration.text : null,
                  };
                }
                return store;
              });
              resolve();
            }
            else {
              console.error("Failed to fetch distances:", status);
              rejects(status);
            }
          }
        )
      })
    },

    initializeUnvisitedMarkers() {
      this.unvisitedMarkers = this.huntStores
        .filter((store) => !store.visited)
        .map((store) => ({
          id:store.place_id,
          position: { lat: store.lat, lng: store.lng },
          label: store.name,
          avatar: store.avatar,
        }));
    },

    markStoreAsVisited(storeId) {
      const store = this.huntStores.find((s) => s.id === storeId);
      if (store && !store.visited) {
        store.visited = true;

        const mapStore = useMapStore();
        mapStore.removeMarker(storeId);
      }
    },
  },

});
