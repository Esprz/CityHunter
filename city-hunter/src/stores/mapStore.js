import { defineStore } from "pinia";
import { useHuntStore } from "./huntStore";
import { useMapUIStore } from "./mapUIStore";
const huntStore = useHuntStore();
const mapUIStore = useMapUIStore();
export const useMapStore = defineStore("mapStore", {
    state: () => ({
        map3D: null,
        currentLocation: null,
        currentLocationMarker: null,
        markersMap: new Map(),
        svgCache: new Map(),
        markersRendered: false,
        mapStyle: [
            {
                featureType: 'poi',
                elementType: 'all',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'transit',
                elementType: 'all',
                stylers: [{ visibility: 'off' }],
            },
            {
                featureType: 'road',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }],
            },
        ],
        polyline: null,
        destination: null,
    }),
    actions: {
        /*------------------------------Map----------------------------------- */
        async fetchCurrentLocation() {
            const defaultLocation = {
                lat: 40.7580,
                lng: -73.9855,
                alt: 0,
            };

            if (navigator.geolocation) {
                return new Promise((resolve) => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            this.currentLocation = {
                                lat: latitude,
                                lng: longitude,
                                alt: 0,
                            };
                            resolve(this.currentLocation);
                        },
                        (error) => {
                            console.warn("Error fetching current location:", error.message);
                            this.currentLocation = defaultLocation;
                            resolve(this.currentLocation);
                        }
                    );
                });
            } else {
                console.warn("Geolocation is not supported by this browser.");
                this.currentLocation = defaultLocation;
                return defaultLocation;
            }
        },

        async initMap(container) {
            const { Map3DElement, Polyline3DElement, AltitudeMode } = await google.maps.importLibrary("maps3d");

            this.map3D = new Map3DElement({
                center: {
                    lat: this.currentLocation.lat,
                    lng: this.currentLocation.lng,
                    altitude: 0
                },
                tilt: 67.5,
                range: 300,
                style: this.mapStyle,
            });


            this.polyline = new Polyline3DElement({
                strokeColor: 'rgba(255,178,115,0.7)',
                strokeWidth: 200,
                altitudeMode: AltitudeMode.RELATIVE_TO_MESH,
                extruded: true,
                drawsOccludedSegments: true,
            })
            /*

            const polylineElement = document.createElement("gmp-polyline-3d");
            polylineElement.setAttribute("altitude-mode", "relative-to-ground");
            polylineElement.setAttribute("stroke-color", "rgba(255,178,115,0.9)");
            polylineElement.setAttribute("stroke-width", 200);
            polylineElement.setAttribute("drawsOccludedSegments", true);
            
            this.polyline = polylineElement;
            */
            this.map3D.appendChild(this.polyline);
            this.map3D.defaultLabelsDisabled = true;
            container.appendChild(this.map3D);
        },

        renderMap(container) {
            container.appendChild(this.map3D);
        },

        fitBounds() {
            if (!this.map3D) return;

            const bounds = {
                north: -Infinity,
                south: Infinity,
                east: -Infinity,
                west: Infinity,
            };

            [...huntStore.huntStores, this.currentLocation].map((store) => {
                if (!store.visited) {
                    bounds.north = Math.max(bounds.north, store.lat);
                    bounds.south = Math.min(bounds.south, store.lat);
                    bounds.east = Math.max(bounds.east, store.lng);
                    bounds.west = Math.min(bounds.west, store.lng);
                }
            })

            const center = {
                lat: (bounds.north + bounds.south) / 2,
                lng: (bounds.east + bounds.west) / 2,
                altitude: 0
            };

            const latRange = bounds.north - bounds.south;
            const lngRange = bounds.east - bounds.west;
            const maxRange = Math.max(latRange, lngRange) * 350000; // Adjust scale factor
            //console.log(center)
            //console.log(maxRange)
            // Adjust Map3DElement properties
            this.map3D.center = center;
            this.map3D.range = maxRange;
            //console.log(this.map3D.tilt)
            //console.log(this.map3D.roll)
            this.map3D.tilt = 67.5;
        },

        /* --------------------------Marker------------------------------- */

        async renderCurrentLocation() {
            const { Marker3DElement, AltitudeMode } = await google.maps.importLibrary("maps3d");
            const parser = new DOMParser();
            const pinSvgString = '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d_232_3051)"><path d="M20 32C20 25.3726 25.3726 20 32 20C38.6274 20 44 25.3726 44 32C44 38.6274 38.6274 44 32 44C25.3726 44 20 38.6274 20 32Z" fill="#FF7200"/><path d="M21 32C21 25.9249 25.9249 21 32 21C38.0751 21 43 25.9249 43 32C43 38.0751 38.0751 43 32 43C25.9249 43 21 38.0751 21 32Z" stroke="white" stroke-width="2"/></g><defs><filter id="filter0_d_232_3051" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feMorphology radius="10" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_232_3051"/><feOffset/><feGaussianBlur stdDeviation="5"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.447059 0 0 0 0 0 0 0 0 0.3 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_232_3051"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_232_3051" result="shape"/></filter></defs></svg>';

            const pinSvg =
                parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;
            const templateForSvg = document.createElement('template');
            templateForSvg.content.append(pinSvg);


            const currentMarker = new Marker3DElement({
                position: {
                    lat: this.currentLocation.lat,
                    lng: this.currentLocation.lng,
                    altitude: 10
                },
                altitudeMode: AltitudeMode.RELATIVE_TO_MESH,
                drawsWhenOccluded: true,
                sizePreserved: true,
                label: "You are here",
                zIndex: 10000,
            });

            currentMarker.append(templateForSvg);
            this.currentLocationMarker = currentMarker;
            this.map3D.append(this.currentLocationMarker);

            //console.log(currentMarker);
        },

        async loadSvgInline(url) {
            if (this.svgCache.has(url)) {
                return this.svgCache.get(url);
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch SVG: ${response.statusText}`);
                }
                const svgText = await response.text();
                const parser = new DOMParser();
                const svgElement = parser.parseFromString(svgText, "image/svg+xml").documentElement;

                this.svgCache.set(url, svgElement);
                return svgElement;
            } catch (error) {
                console.error("Error loading SVG:", error);
                return null;
            }
        },


        async addMarker({ id, position, label, avatar }) {
            if (!this.map3D) return;
            const { Marker3DInteractiveElement, AltitudeMode } = await google.maps.importLibrary("maps3d");
            const { CollisionBehavior } = await google.maps.importLibrary("marker")

            const pinSvg = await this.loadSvgInline(avatar);
            if (!pinSvg) {
                console.error("Failed to load SVG for marker:", avatar);
                return;
            }

            //pinSvg.setAttribute("width", "64px");
            //pinSvg.setAttribute("height", "64px");

            const marker = new Marker3DInteractiveElement({
                position: { lat: position.lat, lng: position.lng, altitude: 10 },
                altitudeMode: AltitudeMode.RELATIVE_TO_MESH,
                //collisionBehavior:CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
                //label: label,
            });

            const templateForSvg = document.createElement("template");
            templateForSvg.content.append(pinSvg);
            marker.append(templateForSvg);

            this.map3D.append(marker);
            this.markersMap.set(id, marker);
            //console.log(id);
        },

        removeMarker(id) {
            const marker = this.markersMap.get(id);
            if (marker) {
                this.map3D.removeChild(marker);
                this.markersMap.delete(id);
            }
        },

        /* ------------------------------------Draw Road================================== */


        /* -------------------------------------Direction--------------------------------------- */

        extractLocationsFromJson(routes) {
            const locations = [];
            routes.forEach((route) => {
                route.legs[0].steps.forEach((leg) => {
                    locations.push({
                        lat: leg.start_location.lat(),
                        lng: leg.start_location.lng(),
                    });
                    locations.push({
                        lat: leg.end_location.lat(),
                        lng: leg.end_location.lng(),
                    });
                });
            });
            console.log('location')
            console.log(locations)

            return locations;
        },
        async drawPolylineFromJson(jsonResponse) {
            if (!this.map3D) {
                console.error("Map is not initialized.");
                return;
            }

            //const locations = this.extractLocationsFromJson(jsonResponse.routes);
            customElements.whenDefined(this.polyline.localName).then(() => {
                console.log('rerender polyline')
                console.log(jsonResponse.routes[0].overview_path);
                //this.polyline.coordinates = locations;
                this.polyline.coordinates = jsonResponse.routes[0].overview_path;
                this.map3D.appendChild(this.polyline);
            });

        },
        async calculateAndDisplayRoute(destination) {
            const directionsService = new google.maps.DirectionsService();
            const { UnitSystem } = await google.maps.importLibrary("core")
            directionsService.route(
                {
                    origin: this.currentLocation,
                    destination: destination,
                    travelMode: google.maps.TravelMode.WALKING,
                    UunitSystem: UnitSystem.METRIC,
                },
                async (response, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        //directionsRenderer.setDirections(response);
                        console.log("Directions request success", status);
                        console.log(response);
                        console.log(response.routes);
                        await this.drawPolylineFromJson(response);
                        const route = response.routes[0];
                        const firstStep = route.legs[0].steps[0];
                        const startLocation = firstStep.start_location;
                        this.map3D.center =
                        {
                            lat: startLocation.lat(),
                            lng: startLocation.lng(),
                            altitude: 20
                        };
                        const endLocation = firstStep.end_location;
                        const heading = Math.atan2(
                            endLocation.lng() - startLocation.lng(),
                            endLocation.lat() - startLocation.lat()
                        ) * (180 / Math.PI);
                        this.map3D.heading = heading;
                        this.map3D.tilt = 80;
                        this.map3D.range = 50;
                        console.log('11111')

                        //const locationArray = this.extractLocationsFromJson(response.routes);
                        const locationArray = response.routes[0].overview_path;

                        /*locationArray.forEach(async (loc) => {
                            console.log(loc);
                            await this.map3D.flyCameraTo({
                                endCamera: {
                                    center: {
                                        lat: loc.lat(),
                                        lng: loc.lng(),
                                        altitude: 100,
                                    },
                                    tilt: 10,
                                    range: 150
                                },
                                durationMillis: 15000
                            });
                            
                        });*/

                        const syncCenter = () => {
                            this.currentLocation = this.map3D.center;
                            this.currentLocationMarker.position = {
                                lat: this.currentLocation.lat,
                                lng: this.currentLocation.lng,
                                altitude: 0
                            }
                            this.currentLocationMarker.altitudeMode = AltitudeMode.CLAMP_TO_GROUND;

                            //console.log(this.currentLocation);
                        };
                        this.map3D.addEventListener("gmp-centerchange", syncCenter)

                        function delay(ms) {
                            return new Promise((resolve) => setTimeout(resolve, ms));
                        }
                        for (const loc of locationArray) {
                            //console.log(loc);
                            await this.map3D.flyCameraTo({
                                endCamera: {
                                    center: {
                                        lat: loc.lat(),
                                        lng: loc.lng(),
                                        altitude: 100,
                                    },
                                    tilt: 10,
                                    range: 150,
                                },
                                durationMillis: 1000,
                            });
                            await delay(900);
                        }
                        this.map3D.removeEventListener("gmp-centerchange", syncCenter)
                        mapUIStore.showArrivalTask = true;
                        this.map3D.removeChild(this.polyline);

                        /*
                        this.map3D.flyCameraTo({
                            endCamera: {
                                center: {
                                    lat: endLocation.lat(),
                                    lng: endLocation.lng(),
                                    altitude: 0,
                                },
                                tilt: 50,
                                range: 5000
                            },
                            durationMillis: 1000000000000000000
                        });*/
                        //console.log('2222222')

                        //this.animateCameraAlongRoute(response.routes[0].overview_path);
                    } else {
                        console.error("Directions request failed due to", status);
                    }
                }
            );
        },

        animateCamera(path) {
            let stepIndex = 0;

            const updateCamera = () => {
                if (stepIndex >= path.length) return;

                const step = path[stepIndex];
                this.map3D.setCenter(step);
                this.map3D.setHeading((stepIndex * 10) % 360);
                this.map3D.setTilt(67.5);

                stepIndex++;
                setTimeout(updateCamera, 1000);
            };

            updateCamera();
        },

        async navigateTo(destination) {
            this.destination = destination;
            await this.calculateAndDisplayRoute(destination);
        },

    },
});
