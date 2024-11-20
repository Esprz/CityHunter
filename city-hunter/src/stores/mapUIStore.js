import { defineStore } from "pinia";

export const useMapUIStore = defineStore("mapUI", {
    state: () => ({
        showDistance: false,
        DistanceContent: {
            distance: "",
            walkTime: ""
        },

        nextStop: {},

        showDestination: false,
        DestinationContent: "",

        showStoreDetails: false,
        StoreDetailsContent: {},
        expandStoreDetails:false,

        showTodoCard: false,

        showNavBar: false,
        NavBarItem: "my-hunt",

        showDirection: false,

        showArrivalTask: false,

        showOneThirdCard: false,
        alreadyOneThird: false,

        showCompleteCard: false,

        showCouponReedemCard: false,


    }),
    getters: {

    },
    actions: {
        activeDestination(name) {
            this.DestinationContent = name;
            this.showDestination = true;
        },
        inactiveDestination() {
            this.showDestination = false;
        },
        activeDistance(distance, walkTime) {
            this.DistanceContent = { distance: distance, walkTime: walkTime };
            this.showDistance = true;
        },
        inactiveDistance() {
            this.showDistance = false;
        },

        toggleNavBarVisibility() {
            this.showNavBar = !this.showNavBar;
        },
        activeStoreDetails(storeInfo) {
            this.showStoreDetails = true;
            this.StoreDetailsContent = storeInfo;
        },
        inactiveStoreDetails() {
            this.showStoreDetails = false;
        },
        activateDirection() {

        },

    },
});
