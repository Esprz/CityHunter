import { defineStore } from "pinia";

export const useMapUIStore = defineStore("mapUI", {
    state: () => ({
        showDistance: false,
        DistanceContent: {
            distance: "",
            walkTime: ""
        },

        showDestination: false,
        DestinationContent: "",

        showStoreDetails: false,
        StoreDetailsContent:{}, 

        showNavBar: true,

        showDirection:false,

        showArrivalTask:false,
        showOneThirdCard:false,
        showCompleteCard:false,

        showTodoCard:true,



    }),
    getters: {

    },
    actions: {
        activeDestination(name){
            this.DestinationContent = name;
            this.showDestination = true;
        },
        inactiveDestination() {
            this.showDestination = false;
        },
        activeDistance(distance, walkTime){
            this.DistanceContent = { distance: distance, walkTime: walkTime };
            this.showDistance = true;
        },
        inactiveDistance() {
            this.showDistance = false;
        },

        toggleNavBarVisibility() {
            this.showNavBar = !this.showNavBar;
        },
        selectNavBarItem() {

        },
        activeStoreDetails(storeInfo) {
            this.showStoreDetails = true;
            this.StoreDetailsContent = storeInfo;
        },
        inactiveStoreDetails(){
            this.showStoreDetails=false;
        },
        activateDirection(){

        },
        
    },
});
