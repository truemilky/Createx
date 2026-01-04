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
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 4,
  spaceBetween: 10,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
