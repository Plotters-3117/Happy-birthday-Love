/*
  PERSONALISE YOUR WEBSITE HERE.
  Replace the sample text and photo paths below whenever you're ready.
*/
const SITE_CONTENT = {
  birthdayHeading: "happy 21st birthday ♡",
  birthdayParagraphs: [
    "today is a celebration of you — the kindest, most beautiful, incredibly strong, and the most amazing person i know.",
    "it's kind of crazy that you're already 21, yesterday only you were 19(insert teary emoji). You intriguere me so much with your way of life and the way you care for me and the way you treat your people, everything is just better with you in it. I know we've had our ups and downs in life and i know we've come a long way but youa re still thew one i've always admired romantically and ill continue to do so. I am so proud of you and I love you so much my sweetheart.",
    "i hope this year brings you so much happiness, peace, joy, new experiences, and all the opportunities you've been wishing for physically, emotionally and mentally(maybe even romantically). i hope you feel proud of how far you've come and excited for all that's still ahead of you because i know how hard you work and how dedicated you are to building your life love.",
    "most of all, i hope you always remember how special you are, not just today, but every single day, 24 x 7, 365. Never stop radiating this glow you show me everyday maybe in college or our date or anywhere else",
    "happy 21st birthday, my love. you deserve all the good things in the world and so much more and just know ill always be here rooting for you and clapping the hardest. ♡"
  ],
  birthdaySignoff: "with all my love my lovely luan, ♡",

  letterTitle: "A little letter for you",
  letterParagraphs: [
    "I wanted to leave you something you could come back to whenever you need a reminder of how loved and appreciated you are.",
    "I hope you never forget how much you mean to me and how much joy you bring into my life. Our fun little dates and outigns where we laugh on random thigns and the way we do those calls will never tire me because this has been my dream. I love you sweetheart and i wish nothign but the very best for you forever. Keep dreaming, keep growing, and keep being wonderfully you.",
    "I am always wishing the very best for you. Happy birthday, beautiful. ♡"
  ],

  prayerTitle: "A prayer for you",
  prayerParagraphs: [
    "May this new year of your life bring you peace in your heart, clarity in your choices, and courage for every new beginning.",
    "May the things you quietly wish for find their way to you. May you be protected from what is not meant for you and guided towards everything that helps you grow.",
    "May you always find reasons to smile, strength when days feel difficult, and people who remind you how precious you are.",
    "May your 21st year be filled with love, health, beautiful opportunities, and countless little blessings. ♡",
    "God bless you, my love, and a very very very happy birthday. I love you so much."
  ],

  // Put your photos inside assets/photos/ and update these paths.
  photos: [
    { src: "assets/photos/imag1.jpeg", caption: "Our favourite Photo" },
    { src: "assets/photos/imag2.jpeg", caption: "My beautiful star" },
    { src: "assets/photos/imag3.jpeg", caption: "Dayum" },
    { src: "assets/photos/imag4.jpeg", caption: "Hot Model" }
  ]
};

// Render the birthday letter with a typewriter effect.
const birthdayHeading = document.getElementById("birthday-heading");
const birthdayMessage = document.getElementById("birthday-message");
const birthdaySignoff = document.getElementById("birthday-signoff");

birthdayHeading.textContent = SITE_CONTENT.birthdayHeading;
birthdaySignoff.textContent = SITE_CONTENT.birthdaySignoff;

let letterStarted = false;

function typeBirthdayLetter() {
  if (letterStarted) return;
  letterStarted = true;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    birthdayMessage.innerHTML = SITE_CONTENT.birthdayParagraphs
      .map(p => `<p>${escapeHTML(p)}</p>`).join("");
    birthdaySignoff.classList.add("visible");
    return;
  }

  birthdayMessage.innerHTML = "";
  birthdayMessage.classList.add("typing");

  let paragraphIndex = 0;
  let characterIndex = 0;
  let currentParagraph = null;

  function typeNext() {
    if (paragraphIndex >= SITE_CONTENT.birthdayParagraphs.length) {
      birthdayMessage.classList.remove("typing");
      birthdaySignoff.classList.add("visible");
      return;
    }

    const characters = Array.from(
      SITE_CONTENT.birthdayParagraphs[paragraphIndex]
    );

    if (!currentParagraph) {
      currentParagraph = document.createElement("p");
      birthdayMessage.appendChild(currentParagraph);
    }

    if (characterIndex < characters.length) {
      const character = characters[characterIndex];
      currentParagraph.textContent += character;
      characterIndex++;

      let delay = 27;

      if (/[.!?]/.test(character)) delay = 180;
      else if (/[,;:]/.test(character)) delay = 100;
      else if (character === " ") delay = 10;

      setTimeout(typeNext, delay);
    } else {
      paragraphIndex++;
      characterIndex = 0;
      currentParagraph = null;

      setTimeout(typeNext, 450);
    }
  }

  typeNext();
}

// Start writing when the birthday letter enters the screen.
const letterObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    typeBirthdayLetter();
    letterObserver.disconnect();
  }
}, { threshold: 0.2 });

letterObserver.observe(document.getElementById("birthday-letter"));

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
    hint.textContent = "Click a photo to enlarge it.";
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
