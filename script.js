const accessKey = "sXUMCGwCrRJz0dis_avmtXQDqHoOC_fUWQt9ogxxSf0";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  // console.log(data)
  const results = data.results;
  // console.log(results)
  if (page === 1) {
    searchResults.innerHTML = "";
    // showMore.style.display="none"
  }
//   results.map((result) => {
//     const imageWrapper = document.createElement("div");
//     imageWrapper.classList.add("search-result");
//     const image = document.createElement("img");
//     image.src = result.urls.small;
//     image.alt = result.alt_description;
//     const imageLink = document.createElement("a");
//     imageLink.href = result.links.innerHTML;
//     imageLink.target = "_blank";
//     imageLink.textContent = result.alt_description;

//     imageWrapper.appendChild(image);
//     imageWrapper.appendChild(imageLink);
//     searchResults.appendChild(imageWrapper);
//   });
searchResults.innerHTML+=results.map((result)=>{
    return ` <div class="search-result">
    <img
      src="${result.urls.small}"
      alt="${result.alt_description}"
    />
    <a href="${result.links.innerHTML}" target="_blank">${result.alt_description}</a>
  </div>`
})
  page++;

  if (page > 1) {
    showMore.style.display = "block";
  }
}
// searchImages();
formEl.addEventListener("submit", (e) => {
  if (inputEl.value === "") {
    return;
  } else {
    e.preventDefault();
    page = 1;
    searchImages();
  }
});
showMore.addEventListener("click", () => {
  searchImages();
});
