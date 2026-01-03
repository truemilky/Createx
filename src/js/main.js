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
