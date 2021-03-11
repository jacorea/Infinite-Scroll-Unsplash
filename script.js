//Necessary to use ENVIRONMENT VARIABLES
require("dotenv").config();

//Image Container
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

//Photos Array
let photosArray = [];
//Unsplash Page
const count = 10;
const apiKey = process.env.UNSPLASH_API_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  //Run function for each object in photosArray
  photosArray.forEach((photo, index) => {
    console.log(photo);
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    //Create Image
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
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

getPhotos();
