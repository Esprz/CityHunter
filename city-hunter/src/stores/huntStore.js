import { defineStore } from "pinia";

export const useHuntStore = defineStore("store", {
  state: () => ({
    huntStores: [
      { name: "Dominique Ansel Bakery", place_id: "ChIJpbQyiqpZwokRgs7yFKjVzxM", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Burger.svg',description:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },
      { name: "The Metropolitan Museum of Art", place_id: "ChIJ0c9PLABZwokRuRKyEhjjLVs", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Donut.svg',description:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },
      { name: "Chelsea Market", place_id: "ChIJJfLZyKxZwokR2E2pEczjivs", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Food_market.svg',description:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },
      { name: "Eataly NYC Downtown", place_id: "ChIJi2ZrWFJYwokRlrr7eU-pfCU", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=French.svg',description:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },

      { name: "La Parisienne", place_id: "ChIJ_4N-dlVYwokRK-86g-kUS0Y", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Museum.svg',description:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },
      { name: "La Parisienne", place_id: "ChIJfZ6f2lRYwokRpIzsliYmj9c", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Museum.svg',description:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },
      { name: "La Parisienne", place_id: "ChIJ4Wb8klRYwokRmLEtFnkgy6I", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=Museum.svg',description:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },
      { name: "La Parisienne", place_id: "ChIJzcJPy1VYwokRqxKyrmx7Vpg", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=French.svg',description:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },
      { name: "La Parisienne", place_id: "EiwzMTUgVyA0NHRoIFN0ICM1NDAyLCBOZXcgWW9yaywgTlkgMTAwMzYsIFVTQSIgGh4KFgoUChIJmSOIkFNYwokRH96iDQhS6wYSBDU0MDI", visited: false, distance: null, walkTime: null, avatar: '/avatars/Category=French.svg',description:"111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111" },
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
          id: store.place_id,
          position: { lat: store.lat, lng: store.lng },
          label: store.name,
          avatar: store.avatar,
        }));
    },

    visitStore(storeId) {
      const store = this.huntStores.get(storeId);
      if (store && !store.visited) {
        store.visited = true;

        const mapStore = useMapStore();
        mapStore.removeMarker(storeId);
      }
    },
  },

});
