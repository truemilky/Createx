/* Button that expands horizantal card-list */
const horizontalCardsShowButton = document.getElementById(
  "cardsHorizontalShowBtn"
);
const horizontalCards = document.querySelectorAll(
  ".cources-cards .card-horizontal"
);

horizontalCardsShowButton.addEventListener("click", function () {
  horizontalCardsShowButton.setAttribute("disabled", "true");
  horizontalCards.forEach((el) => {
    el.classList.add("show");
  });
});

/* Benefits Tabs */
const benefitsTabsButtons = document.querySelectorAll(".benefits-tab-button");
const benefitsTabsContent = document.querySelectorAll(".benefits-tab-content");

benefitsTabsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    benefitsTabsButtons.forEach((b) => b.classList.remove("active"));
    benefitsTabsContent.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});

/* Events (index.html) "View More" button content */
const eventCardsButtons = document.querySelectorAll(".event-card-button");
const eventCardsText = document.querySelectorAll(".event-card-text");

eventCardsButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const activeText = document.getElementById("event-" + btn.dataset.event);

    activeText.classList.toggle("active");

    activeText.classList.contains("active")
      ? (btn.innerHTML = `<span>Hide</span>`)
      : (btn.innerHTML = "<span>View more</span>");
  });
});

/* Team section (index.html) swiper control */
const teamSlider = new Swiper(".team-slider", {
  // Optional parameters
  direction: "horizontal",
  loop: false,
  slidesPerView: 4,
  spaceBetween: 20,

  // Navigation arrows
  navigation: {
    nextEl: ".team-slider-next",
    prevEl: ".team-slider-prev",
    disabledClass: "swiper-button-disabled",
  },
});

/* Testimonials section (index.html) swiper control */
const testimonialsSlider = new Swiper(".testimonials-slider", {
  // Optional parameters
  direction: "horizontal",
  loop: false,
  slidesPerView: 1,
  spaceBetween: 0,
  autoHeight: true,

  // Navigation arrows
  navigation: {
    nextEl: ".testimonials-slider-next",
    prevEl: ".testimonials-slider-prev",
    disabledClass: "swiper-button-disabled",
  },

  pagination: {
    el: ".testimonials-pagination",
    clickable: true,
  },
});
