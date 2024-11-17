import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
  state: () => ({
    isEnrolled: false, 
    countdown: 0,
    coupons:[
      {
        title:'Early Bird',
        deal:'15% off up to US$15',
        badge:'/rewards/early_bird.svg',
        claimed:false,
      },
      {
        title:'Next Level',
        deal:'25% off up to US$20',
        badge:'/rewards/next_level.svg',
        claimed:false,
      },
      {
        title:'SuperNova',
        deal:'40% off any 2 orders',
        badge:'/rewards/supernova.svg',
        claimed:false,
      },
      {
        title:'Ace Hunter',
        deal:'50% off any 5 orders',
        badge:'/rewards/ace_hunter.svg',
        claimed:false,
      },
    ]
  }),

  getters: {
    formattedCountdown(state) {
      const hours = Math.floor(state.countdown / 3600);
      const minutes = Math.floor((state.countdown % 3600) / 60);
      const seconds = state.countdown % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },
  },

  actions: {
    enroll() {
      this.isEnrolled = true;
      this.startCountdown(50400);
    },

    startCountdown(seconds) {
      this.countdown = seconds;
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
  },
});
