// $(document).ready()

let formSearch = $('#search-form');

// api kiey for spoontacular api
const apiKey = '&apiKey=7f77bc0ac3a540babaab9a36bfd949e8';

const apiKey2 = 'k1qbPQr1VChVz4qnj3hhtTFNLs1CGc6T';



function getResponse(search) {
  // queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=burgers&maxFat=25&number=20' + apiKey;
  queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=' + search + '&maxFat=25&number=20' + apiKey;

  queryURL2 = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey2 + '&limit=1&q=' + search
  console.log(queryURL);
  console.log(queryURL2);

  // ajax request to the URL above 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    displayRecipe(response);

  });
}

// function to obtain api request results and display them on the screen
function displayRecipe(response) {
  // for loop to iterate through results array 
  for (let i = 0; i < 9; i++) {
    // create HTML elements an assign to a variable
    // let imgEl = $('<img>');
    // let foodType = $('<div>');

    // create IDs to assign to HTML elements
    let imageID = 'img' + i;
    let titleID = 'title' + i;

    // grab the recipe image and titile and assign to a variable
    let image = response.results[i].image;
    let title = response.results[i].title;

    // set value of created ID
    // imgEl.text(image);
    $('#' + titleID).text(title);

    // add attributes to elements
    $('#' + imageID).attr('src', image);

    // $('body').append(imgEl)
    // $('body').append(foodType)
  }
}

// run an API request to retrieve 3 random recipes to display when the page loads 
function randomRecipes() {
  let randomRecipeURL = 'https://api.spoonacular.com/recipes/random?number=3' + apiKey;

  $.ajax({
    url: randomRecipeURL,
    method: "GET"
  }).then(function (response) {

    displayRandomRecipes(response);
  });
}

function displayRandomRecipes(response) {
  console.log(response);
  for (let i = 9; i < 12; i++) {
    // create IDs to assign to HTML elements
    let imageID = 'img' + i;
    let titleID = 'title' + i;

    // grab the recipe image and titile and assign to a variable
    let image = response.recipes[i].image;
    let title = response.recipes[i].title;

    // set value of created ID        
    $('#' + titleID).text(title);

    // add attributes to elements
    $('#' + imageID).attr('src', image);
  }
}

// randomRecipes();

function displayGiphy() {
  fetch(queryURL2)
    .then(response => response.json())
    .then(content => {
      // console log data returned from api
      console.log(content.data);

      // append to empty div element
      let giphyIMG = content.data[0].images.downsized.url
      console.log(giphyIMG)

      $('#' + 'giphy1').attr('src', giphyIMG)
    })
}

$("#search-form").on('submit', function (event) {
  event.preventDefault();

  // let search = $('#search-form').val().trim();
  let search = $('#search').val().trim();
  console.log(typeof search);
  console.log('search: ' + search);

  formSearch.val('');

  getResponse(search);

  displayGiphy()
});