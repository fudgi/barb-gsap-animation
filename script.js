const fullscreen = document.querySelector("body");
fullscreen.style.width = window.innerWidth + "px";
fullscreen.style.height = window.innerHeight + "px";

barba.init({
  transitions: [
    {
      name: "start-transition",
      sync: true,
      from: {
        namespace: ["page1"],
      },
      leave: function (data) {
        const top = data.current.container.querySelector(".top");
        const bottom = data.current.container.querySelector(".bottom");
        gsap.to(top, { y: "-600%", x: "-600%", scale: 3, duration: 2 });
        gsap.to(bottom, { y: "1000%", x: "1000%", scale: 3, duration: 1 });
        return gsap.to(data.current.container, {
          delay: 2,
          opacity: 0,
        });
      },

      enter: function (data) {
        const top = data.next.container.querySelector(".top");
        const bottom = data.next.container.querySelector(".bottom");
        gsap.from(data.next.container, {
          delay: 0.8,
          duration: 0.2,
          opacity: 0,
        });

        gsap.from(top, { scale: 0, delay: 1, duration: 2 });
        gsap.from(bottom, { scale: 0, delay: 1, duration: 1 });

        gsap.set("#circle", { scale: 0, transformOrigin: "center center" });
        gsap.set("#circle1", { scale: 0, transformOrigin: "center center" });
        gsap.set("#circle2", { scale: 0, transformOrigin: "center center" });
        gsap.to("#circle1", {
          y: "500%",
          x: "500%",
          scale: 2,
          delay: 0.8,
          duration: 2,
        });
        gsap.to("#circle2", {
          y: "-500%",
          x: "-500%",
          scale: 2,
          delay: 0.8,
          duration: 2,
        });
        gsap.to("#circle", {
          scale: 1,
          delay: 1,
          transformOrigin: "center center",
          duration: 3,
        });

        return;
      },
    },
    {
      name: "back-transition",
      sync: true,
      from: {
        namespace: ["page2"],
      },
      leave: function (data) {
        const top = data.current.container.querySelector(".top");
        const bottom = data.current.container.querySelector(".bottom");
        gsap.to(top, { scale: 0, duration: 1 });
        gsap.to(bottom, { scale: 0, duration: 1 });

        gsap.set("#circle", { scale: 1, transformOrigin: "center center" });
        gsap.set("#circle1", {
          y: "500%",
          scale: 1,
          x: "500%",
          transformOrigin: "center center",
        });
        gsap.set("#circle2", {
          y: "-500%",
          scale: 1,
          x: "-500%",
          transformOrigin: "center center",
        });

        gsap.to("#circle1", { y: "-10", x: "-10", scale: 0, duration: 1.5 });
        gsap.to("#circle2", {
          y: "10",
          scale: 0,
          x: "10",
          duration: 1.5,
        });

        gsap.to("#circle", {
          scale: 0,
          transformOrigin: "center center",
          duration: 1.5,
        });
        return gsap.to(data.current.container, {
          delay: 1.5,
          opacity: 0,
        });
      },

      enter: function (data) {
        const top = data.next.container.querySelector(".top");
        const bottom = data.next.container.querySelector(".bottom");
        gsap.from(top, { y: "-600%", x: "-600%", scale: 3, delay: 1.5, duration: 1.5 });
        gsap.from(bottom, { y: "1000%",x: "1000%", scale: 3, delay: 1.5, duration: 1.5 });

        return gsap.from(data.next.container, {
          delay: 1.2,
          opacity: 0,
        });
      },
    },
  ],
});

let count = 0;
window.addEventListener("wheel", function (e) {
  console.log(e, count);
  if (!count) {
    if (e.deltaY < 0) {
      if (barba.url.getPath() !== "/barb") barba.go("barb");
    } else {
      if (barba.url.getPath() !== "/barb2") barba.go("barb2");
    }
    count += 1;
    setTimeout(function () {
      count = 0;
    }, 1000);
  }
});
