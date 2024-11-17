import { defineStore } from "pinia";

export const useHuntStore = defineStore("store", {
  state: () => ({
    huntStores: [
      {
        name: "Golden Bakery",
        place_id: "ChIJpbQyiqpZwokRgs7yFKjVzxM",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/bakery.svg',
        frameAvatar: '/avatars/Category=F-Bakery.svg',
        description: "Nestled in the heart of the city, Golden Bakery is a charming family-owned establishment known for its artisanal bread and pastries. Founded in 1985, this beloved local gem uses traditional recipes passed down through generations. Golden Bakery offers a warm atmosphere where the aroma of freshly baked goods welcomes customers daily.",
        rating: "4.7",
        photos: [
          "https://images.unsplash.com/photo-1547978059-2639fd612c66?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1546237769-6f84ec1a512a?q=80&w=3400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=3286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=2362&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          
        ]
      },
      {
        name: "Sweet Berry",
        place_id: "ChIJ0c9PLABZwokRuRKyEhjjLVs",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/berry.svg',
        frameAvatar: '/avatars/Category=F-Berry.svg',
        description: "----please fill in-----store-descirption------",
        rating: "---------please fill in---------- rating of the store: 0-5",
        photos: []
      },
      {
        name: "Burger On Fire",
        place_id: "ChIJJfLZyKxZwokR2E2pEczjivs",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/burger.svg',
        frameAvatar: '/avatars/Category=F-Burger.svg',
        description: "----please fill in-----store-descirption------",
        rating: "---------please fill in---------- rating of the store: 0-5",
        photos: []
      },
      {
        name: "Foodie Lounge",
        place_id: "ChIJi2ZrWFJYwokRlrr7eU-pfCU",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/foodie.svg',
        frameAvatar: '/avatars/Category=F-Foodie.svg',
        description: "----please fill in-----store-descirption------",
        rating: "---------please fill in---------- rating of the store: 0-5",
        photos: []
      },
      {
        name: "Fresh Market",
        place_id: "ChIJ_4N-dlVYwokRK-86g-kUS0Y",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/fresh.svg',
        frameAvatar: '/avatars/Category=F-Fresh.svg',
        description: "----please fill in-----store-descirption------",
        rating: "---------please fill in---------- rating of the store: 0-5",
        photos: []
      },
      {
        name: "Pizza Club",
        place_id: "ChIJfZ6f2lRYwokRpIzsliYmj9c",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/pizza.svg',
        frameAvatar: '/avatars/Category=F-Pizza.svg',
        description: "----please fill in-----store-descirption------",
        rating: "---------please fill in---------- rating of the store: 0-5",
        photos: []
      },
      {
        name: "Tasty Ramen",
        place_id: "ChIJ4Wb8klRYwokRmLEtFnkgy6I",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/ramen.svg',
        frameAvatar: '/avatars/Category=F-Ramen.svg',
        description: "----please fill in-----store-descirption------",
        rating: "---------please fill in---------- rating of the store: 0-5",
        photos: []
      },
      {
        name: "Sushi House",
        place_id: "ChIJzcJPy1VYwokRqxKyrmx7Vpg",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/sushi.svg',
        frameAvatar: '/avatars/Category=F-Sushi.svg',
        description: "----please fill in-----store-descirption------",
        rating: "---------please fill in---------- rating of the store: 0-5",
        photos: []
      },
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
              //"photos",
              //"rating",
              //"formatted_address",
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
                //photos: details.photos || [],
                //rating: details.rating || null,
                //address: details.formatted_address || null,
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
