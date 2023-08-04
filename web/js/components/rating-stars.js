export default function createRatingStars(stars) {
  const ratingStars = document.createElement("div");
  ratingStars.classList.add("stars-rating", "text-amber");

  // Fill Star
  const fillStar = document.createElement("i");
  fillStar.classList.add("fa-solid", "fa-star");

  // Haft fill Star
  const halfFillStar = document.createElement("i");
  halfFillStar.classList.add("fa-solid", "fa-star-half-stroke");

  // Empty Star
  const emptyStar = document.createElement("i");
  emptyStar.classList.add("far", "fa-star");

  let currentStars = stars;
  let starIndex = 1;

  while (currentStars > 0) {
    if (currentStars < 1) {
      starIndex++;
      currentStars = 0;
      ratingStars.append(halfFillStar.cloneNode(true));
    } else {
      starIndex++;
      currentStars -= 1;
      ratingStars.append(fillStar.cloneNode(true));
    }
  }

  while (starIndex <= 5) {
    ratingStars.append(emptyStar.cloneNode(true));
    starIndex++;
  }

  return ratingStars;
}
