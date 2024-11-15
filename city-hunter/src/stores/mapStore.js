import { defineStore } from "pinia";

export const useMapStore = defineStore("mapStore", {
    state: () => ({
        map3D: null,
        currentLocation: null,
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
    }),
    actions: {
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
            const { Map3DElement } = await google.maps.importLibrary("maps3d");

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

            container.appendChild(this.map3D);
        },

        renderMap(container) {
            container.appendChild(this.map3D);
        },

        async renderCurrentLocation() {
            const { Marker3DElement } = await google.maps.importLibrary("maps3d");
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
                    altitude: 200 
                },
                altitudeMode: 'RELATIVE_TO_GROUND',
                label: "You are here",
            });

            currentMarker.append(templateForSvg);
            this.map3D.append(currentMarker);
            console.log(currentMarker);
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
            const { Marker3DElement, Marker3DInteractiveElement } = await google.maps.importLibrary("maps3d");

            const pinSvg = await this.loadSvgInline(avatar);
            if (!pinSvg) {
                console.error("Failed to load SVG for marker:", avatar);
                return;
            }

            //pinSvg.setAttribute("width", "64px");
            //pinSvg.setAttribute("height", "64px");

            const marker = new Marker3DInteractiveElement({
                position: { lat: position.lat, lng: position.lng, altitude: 50 },
                altitudeMode: 'RELATIVE_TO_GROUND',
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

    },
});
