const themeToggle = document.querySelector(".theme-toggle");

const applyTheme = (theme) => {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  applyTheme(savedTheme);
}

themeToggle?.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const nextTheme = isDark ? "light" : "dark";
  localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
});

// Marquee scroll-based animation
const focusTrack = document.querySelector(".focus-track");
const focusMarquee = document.querySelector(".focus-marquee");

if (focusTrack && focusMarquee) {
  let focusOffset = 0;
  let focusTarget = 0;

  // Calculate center offset to position marquee in the middle
  const updateOffset = () => {
    const trackWidth = focusTrack.scrollWidth;
    const viewportWidth = focusMarquee.clientWidth;
    const centerOffset = (viewportWidth - trackWidth) / 2;
    return centerOffset;
  };

  const onScroll = () => {
    const trackWidth = focusTrack.scrollWidth;
    const viewportWidth = focusMarquee.clientWidth;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = window.scrollY / Math.max(1, maxScroll);
    
    // Start centered, then scroll to show all content
    const startOffset = (viewportWidth - trackWidth) / 2;
    const totalScrollDistance = (trackWidth - viewportWidth + Math.abs(startOffset)) * 0.6;
    
    // // Items repeat 3 times, so scroll through 1/3 of track to see all unique items
    // const startOffset = (viewportWidth - trackWidth) / 2;
    // const oneSetWidth = trackWidth / 3;  // One complete set of all 7 items
    // const totalScrollDistance = oneSetWidth + Math.abs(startOffset);
    
    focusTarget = startOffset - (totalScrollDistance * scrollProgress);
  };

  const animate = () => {
    focusOffset += (focusTarget - focusOffset) * 0.08;
    focusTrack.style.transform = `translateX(${focusOffset}px)`;
    requestAnimationFrame(animate);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  
  onScroll();
  animate();
}