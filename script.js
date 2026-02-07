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

const certModal = document.getElementById("certModal");
const certModalTitle = document.getElementById("certModalTitle");
const certModalCounter = document.getElementById("certModalCounter");
const certModalImage = document.getElementById("certModalImage");
const certModalPdf = document.getElementById("certModalPdf");
const certModalEmpty = document.getElementById("certModalEmpty");
const certModalClose = document.getElementById("certModalClose");
const certPrev = document.getElementById("certPrev");
const certNext = document.getElementById("certNext");

const certButtons = Array.from(document.querySelectorAll(".cert-btn"));
const certItems = certButtons.map((button) => ({
  title: button.dataset.title,
  file: button.dataset.file
}));
let certIndex = 0;

const renderCert = () => {
  if (!certModal || !certItems.length) return;
  const { title, file } = certItems[certIndex];
  if (certModalTitle) certModalTitle.textContent = title;
  if (certModalCounter) {
    certModalCounter.textContent = `${certIndex + 1} / ${certItems.length}`;
  }
  certModalImage.style.display = "none";
  certModalPdf.style.display = "none";
  certModalEmpty.style.display = "none";

  if (!file) {
    certModalEmpty.style.display = "block";
  } else if (file.toLowerCase().endsWith(".pdf")) {
    certModalPdf.src = file;
    certModalPdf.style.display = "block";
  } else {
    certModalImage.src = file;
    certModalImage.alt = `${title} certificate`;
    certModalImage.style.display = "block";
  }
};

const openCertModal = (index) => {
  if (!certModal) return;
  certIndex = index;
  renderCert();
  certModal.showModal();
};

certButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    openCertModal(index);
  });
});

certPrev?.addEventListener("click", () => {
  certIndex = (certIndex - 1 + certItems.length) % certItems.length;
  renderCert();
});

certNext?.addEventListener("click", () => {
  certIndex = (certIndex + 1) % certItems.length;
  renderCert();
});

certModalClose?.addEventListener("click", () => {
  certModal.close();
});

certModal?.addEventListener("click", (event) => {
  if (event.target === certModal) {
    certModal.close();
  }
});