import Glide from "@glidejs/glide";

export const glideHours = new Glide(".glide-hours", {
  // type: "slider",
  // rewind: true,
  // startAt: 0,
  perView: 7,
  // focusAt: 0,
  // swipeThreshold: false,
  // dragThreshold: false,
  // bound: true,

  // gap: 10,
  // peek: {
  //   before: 5,
  //   after: 5,
  // },
  breakpoints: {
    1280: {
      // swipeThreshold: 80,
      // dragThreshold: 120,
      perView: 4,
    },
    768: {
      // swipeThreshold: 80,
      // dragThreshold: 120,
      perView: 2,
    },
  },
});

export const glideDays = new Glide(".glide-days", {
  swipeThreshold: false,
  dragThreshold: false,
  rewind: false,
  bound: true,
  perView: 5,
  breakpoints: {
    768: {
      swipeThreshold: 80,
      dragThreshold: 120,
      perView: 3,
    },
  },
});

export const glide = new Glide(".glide", {
  type: "slider",
  startAt: 0,
  focusAt: 0,
  perView: 4,
  rewind: false,
  bound: true,
  breakpoints: {
    768: {
      perView: 2,
    },
  },
});
