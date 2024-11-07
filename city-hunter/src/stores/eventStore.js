import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
  state: () => ({
    isEnrolled: false, 
  }),

  getters:{

  },

  actions: {
    enroll(event) {
      this.isEnrolled = true;
    },
  },

});
