//Necessary to use ENVIRONMENT VARIABLES
require("dotenv").config();

//Image Container
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

//Inital values
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//Photos Array
let photosArray = [];
//Unsplash Page
const count = 30;
const apiKey = process.env.UNSPLASH_API_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check to see if image is done loading
function imageLoaded() {
  //increase number of images loaded
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //Run function for each object in photosArray
  photosArray.forEach((photo, index) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    //Create Image
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    //Load Event Listener, check when each event is finished loading
    img.addEventListener("load", imageLoaded);
    //Put <img> inside <a>, and put both inside image-container Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

//Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    //Catch Error Here
  }
}
//Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
