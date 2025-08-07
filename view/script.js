window.onload = () => {
  const artImages = document.querySelectorAll(".art");
  const frames = document.querySelectorAll(".frame");
  let zoomedIn = null;

  artImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      if (zoomedIn === index) {
        // Zoom out
        gsap.to(img, {
          scale: 1,
          x: 0,
          y: 0,
          zIndex: 1,
          duration: 0.6,
          ease: "power3.inOut"
        });

        // Show all frames again
        frames.forEach((frame, i) => {
          if (i !== index) {
            gsap.to(frame, {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.4
            });
          }
        });

        // ✅ Re-enable scroll
        document.body.classList.remove("no-scroll");
        zoomedIn = null;
      } else {
        // Zoom in
        const rect = img.getBoundingClientRect();
        const x = window.innerWidth / 2 - rect.left - rect.width / 2;
        const y = window.innerHeight / 2 - rect.top - rect.height / 2;

        gsap.to(img, {
          scale: 2.8,
          x: x,
          y: y,
          zIndex: 999,
          duration: 0.8,
          ease: "power3.inOut"
        });

        // Hide other frames
        frames.forEach((frame, i) => {
          if (i !== index) {
            gsap.to(frame, {
              opacity: 0,
              pointerEvents: "none",
              duration: 0.4
            });
          }
        });

        // ✅ Disable scroll
        document.body.classList.add("no-scroll");
        zoomedIn = index;
      }
    });
  });
};