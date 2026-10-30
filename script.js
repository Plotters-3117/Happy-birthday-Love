/*
  PERSONALISE YOUR WEBSITE HERE.
  Replace the sample text and photo paths below whenever you're ready.
*/
const SITE_CONTENT = {
  birthdayHeading: "happy 21st birthday ♡",
  birthdayParagraphs: [
    "today is a celebration of you — the kindest, most beautiful, incredibly strong, and the most amazing person i know.",
    "it's kind of crazy that you're already 21, stepping into a new chapter, with so many dreams, ideas and a whole future ahead of you. you inspire me so much with the way you see the world, the way you care, and the little things you do that make everything brighter.",
    "i hope this year brings you so much happiness, peace, new experiences, and all the opportunities you've been wishing for. i hope you feel proud of how far you've come and excited for all that's still ahead.",
    "most of all, i hope you always remember how special you are, not just today, but every single day.",
    "happy 21st birthday, my love. you deserve all the good things in the world and so much more. ♡"
  ],
  birthdaySignoff: "with all my love, ♡",

  letterTitle: "A little letter for you",
  letterParagraphs: [
    "I wanted to leave you something you could come back to whenever you need a reminder of how loved and appreciated you are.",
    "I hope you never forget how much goodness you bring into the world just by being yourself. Keep dreaming, keep growing, and keep being wonderfully you.",
    "I am always wishing the very best for you. Happy birthday, beautiful. ♡"
  ],

  prayerTitle: "A prayer for you",
  prayerParagraphs: [
    "May this new year of your life bring you peace in your heart, clarity in your choices, and courage for every new beginning.",
    "May the things you quietly wish for find their way to you. May you be protected from what is not meant for you and guided towards everything that helps you grow.",
    "May you always find reasons to smile, strength when days feel difficult, and people who remind you how precious you are.",
    "May your 21st year be filled with love, health, beautiful opportunities, and countless little blessings. ♡"
  ],

  // Put your photos inside assets/photos/ and update these paths.
  photos: [
    { src: "assets/photos/photo-1.jpg", caption: "a favourite little moment" },
    { src: "assets/photos/photo-2.jpg", caption: "one to keep forever" },
    { src: "assets/photos/photo-3.jpg", caption: "a little bit of sunshine" },
    { src: "assets/photos/photo-4.jpg", caption: "beautiful memories" }
  ]
};

// Render the editable birthday letter.
document.getElementById("birthday-heading").textContent = SITE_CONTENT.birthdayHeading;
document.getElementById("birthday-message").innerHTML = SITE_CONTENT.birthdayParagraphs
  .map(paragraph => `<p>${escapeHTML(paragraph)}</p>`).join("");
document.getElementById("birthday-signoff").textContent = SITE_CONTENT.birthdaySignoff;

// Lightweight floating particles: created once, animated by CSS.
const particleHost = document.getElementById("particles");
for (let i = 0; i < 28; i++) {
  const particle = document.createElement("span");
  particle.className = "particle";
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.setProperty("--duration", `${7 + Math.random() * 9}s`);
  particle.style.setProperty("--delay", `${-Math.random() * 12}s`);
  particleHost.appendChild(particle);
}

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

// Keepsake modal.
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const modalEyebrow = document.getElementById("modal-eyebrow");
const closeButton = document.getElementById("modal-close");
let previousFocus = null;

function openModal(kind, trigger) {
  previousFocus = trigger;
  modalContent.innerHTML = "";
  if (kind === "letter") {
    modalEyebrow.textContent = "open for letter 1";
    modalTitle.textContent = SITE_CONTENT.letterTitle;
    modalContent.innerHTML = SITE_CONTENT.letterParagraphs.map(p => `<p>${escapeHTML(p)}</p>`).join("");
  } else if (kind === "prayer") {
    modalEyebrow.textContent = "open for a prayer";
    modalTitle.textContent = SITE_CONTENT.prayerTitle;
    modalContent.innerHTML = SITE_CONTENT.prayerParagraphs.map(p => `<p>${escapeHTML(p)}</p>`).join("");
  } else if (kind === "photos") {
    modalEyebrow.textContent = "little moments";
    modalTitle.textContent = "Some Pics ♡";
    const gallery = document.createElement("div");
    gallery.className = "photo-gallery";
    SITE_CONTENT.photos.forEach((photo, index) => {
      const frame = document.createElement("button");
      frame.className = "gallery-photo";
      frame.type = "button";
      frame.style.setProperty("--rotation", `${[-3, 2, -1, 3][index % 4]}deg`);
      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = photo.caption;
      image.onerror = () => {
        image.removeAttribute("src");
        image.setAttribute("aria-label", "Photo placeholder — add your image in assets/photos");
      };
      const caption = document.createElement("span");
      caption.textContent = photo.caption;
      frame.append(image, caption);
      frame.addEventListener("click", () => {
        if (image.getAttribute("src")) showLightbox(photo.src, photo.caption);
      });
      gallery.appendChild(frame);
    });
    modalContent.appendChild(gallery);
    const hint = document.createElement("p");
    hint.className = "photo-hint";
    hint.textContent = "Replace the sample photo paths in script.js with your own pictures.";
    modalContent.appendChild(hint);
  }
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll("[data-open]").forEach(card => {
  card.addEventListener("click", () => openModal(card.dataset.open, card));
});
closeButton.addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
    hideLightbox();
  }
});

// Optional image lightbox.
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = '<img alt="">';
document.body.appendChild(lightbox);
function showLightbox(src, alt) {
  const image = lightbox.querySelector("img");
  image.src = src;
  image.alt = alt;
  lightbox.classList.add("show");
}
function hideLightbox() {
  lightbox.classList.remove("show");
}
lightbox.addEventListener("click", hideLightbox);

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}
