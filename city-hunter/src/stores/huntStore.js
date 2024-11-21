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
        frameAvatar: '/avatars/CategoryFBakery.svg',
        description: "Nestled in the heart of the city, Golden Bakery is a charming family-owned establishment known for its artisanal bread and pastries. Founded in 1985, this beloved local gem uses traditional recipes passed down through generations. Golden Bakery offers a warm atmosphere where the aroma of freshly baked goods welcomes customers daily.",
        rating: 4.7,
        photos: [
          "https://images.unsplash.com/photo-1547978059-2639fd612c66?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1546237769-6f84ec1a512a?q=80&w=3400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=3286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=2362&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
      },
      {
        name: "Sweet Berry",
        place_id: "ChIJ0c9PLABZwokRuRKyEhjjLVs",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/berry.svg',
        frameAvatar: '/avatars/CategoryFBerry.svg',
        description: "Sweet Berry is a delightful dessert haven offering a wide selection of fresh and flavorful treats, including signature berry parfaits and creamy smoothies. Known for its cozy ambiance and friendly service, it's the perfect spot for a refreshing indulgence.",
        rating: 4.3,
        photos: [],
      },
      {
        name: "Burger On Fire",
        place_id: "ChIJJfLZyKxZwokR2E2pEczjivs",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/burger.svg',
        frameAvatar: '/avatars/CategoryFBurger.svg',
        description: "Burger On Fire is a must-visit for burger enthusiasts, serving juicy patties grilled to perfection. With its bold flavors and creative toppings, this vibrant eatery transforms classic burgers into gourmet masterpieces.",
        rating: 4.9,
        photos: [],
      },
      {
        name: "Foodie Lounge",
        place_id: "ChIJi2ZrWFJYwokRlrr7eU-pfCU",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/foodie.svg',
        frameAvatar: '/avatars/CategoryFFoodie.svg',
        description: "Foodie Lounge is a trendy spot for culinary adventurers, featuring a diverse menu that spans global cuisines. With its chic decor and innovative dishes, it promises a unique dining experience that delights the palate.",
        rating: 4.7,
        photos: [],
      },
      {
        name: "Fresh Market",
        place_id: "ChIJ_4N-dlVYwokRK-86g-kUS0Y",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/fresh.svg',
        frameAvatar: '/avatars/CategoryFFresh.svg',
        description: "Fresh Market is your go-to destination for organic and locally sourced produce. With its vibrant selection of fruits, vegetables, and specialty goods, it champions sustainability and wholesome living.",
        rating: 4.8,
        photos: [],
      },
      {
        name: "Pizza Club",
        place_id: "ChIJfZ6f2lRYwokRpIzsliYmj9c",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/pizza.svg',
        frameAvatar: '/avatars/CategoryFPizza.svg',
        description: "Pizza Club is a hotspot for pizza lovers, offering a menu of handcrafted pies with fresh ingredients and bold flavors. Whether you crave classic Margherita or adventurous toppings, this cozy spot has something for everyone.",
        rating: 4.5,
        photos: [],
      },
      {
        name: "Tasty Ramen",
        place_id: "ChIJ4Wb8klRYwokRmLEtFnkgy6I",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/ramen.svg',
        frameAvatar: '/avatars/CategoryFRamen.svg',
        description: "Tasty Ramen is a warm and inviting noodle house, specializing in flavorful broths and freshly made noodles. Perfect for a comforting meal, it’s a favorite among ramen enthusiasts seeking authenticity and quality.",
        rating: 4.6,
        photos: [],
      },
      {
        name: "Sushi House",
        place_id: "ChIJzcJPy1VYwokRqxKyrmx7Vpg",
        visited: false,
        distance: null,
        walkTime: null,
        avatar: '/avatars/sushi.svg',
        frameAvatar: '/avatars/CategoryFSushi.svg',
        description: "Sushi House is a premier destination for sushi lovers, known for its fresh ingredients and artistic presentation. Whether dining in or taking out, it offers a menu of traditional favorites and creative rolls.",
        rating: 4.7,
        photos: [],
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
              console.log("Store ditance details fetched successfully:", this.huntStores);
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

  },

});
