require("dotenv").config();

//Unsplash Page
const count = 10;
const apiKey = process.env.UNSPLASH_API_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl).then((response) => response.json());
    console.log(response);
  } catch (error) {
    //Catch Error Here
  }
}

getPhotos();
