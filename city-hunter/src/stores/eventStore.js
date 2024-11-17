import { defineStore } from 'pinia';

export const useEventStore = defineStore('event', {
  state: () => ({
    isEnrolled: false, 
    countdown: 0,
    timer: null,
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
