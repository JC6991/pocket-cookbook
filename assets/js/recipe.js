// $(document).ready()

let formSearch = $('#search-form');


let recipeEl = document.getElementById("search");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
let clearEl = document.getElementById("clear-history");

// api key for spoontacular api
// const apiKey = '&apiKey=7f77bc0ac3a540babaab9a36bfd949e8';
const recipeKey = '&apiKey=bde81041405e4c90a0859dee8cd0078f';


const giphyKey = 'k1qbPQr1VChVz4qnj3hhtTFNLs1CGc6T';


// clears the previous recipes when user searches new ingredients
function clearPreviousSearch() {
  for (let i = 0; i < 9; i++) {
    $('#card' + i).text('');
  }
}


function getResponse(search) {
  // queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=burgers&maxFat=25&number=20' + apiKey;
  queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=' + search + '&maxFat=25&number=9' + recipeKey;

  
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
  // no results found
  if (response.results === 0) {
    // create HTML element
    let h3 = $('<h3>');

    // assign value
    h3.text('No results found.');

    // append to screen
    $('main').prepend(h3);

  }

  // for loop to iterate through results array 
  for (let i = 0; i < response.results.length; i++) {
    // create HTML elements an assign to a variable
    let imgEl = $('<img>');
    let foodTitle = $('<div>');

    // create IDs to assign to HTML elements
    // let imageID = 'img' + i;
    // let titleID = 'title' + i;

    // grab the recipe image and titile and assign to a variable
    let image = response.results[i].image;
    let title = response.results[i].title;
    let recipeID = response.results[i].id


    // add attributes to elements
    $(imgEl).attr('src', image);
    $(imgEl).attr('id', recipeID);
    $(foodTitle).attr('id', recipeID);
    $('#card' + i).attr('data-toggle', 'modal');
    $('#card' + i).attr('data-target', '#exampleModal');

    // add classes to HTML elements
    $(imgEl).addClass('card-img-top cardImage');
    $(foodTitle).addClass('card cardTitle');

    // set value of created ID
    // imgEl.text(image);
    $(foodTitle).text(title);

    // append to card containers
    $('#card' + i).append(imgEl)
    $('#card' + i).append(foodTitle)
  }
}

// run an API request to retrieve 3 random recipes to display when the page loads 
function randomRecipes() {
  let randomRecipeURL = 'https://api.spoonacular.com/recipes/random?number=3' + recipeKey;

  $.ajax({
    url: randomRecipeURL,
    method: "GET"
  }).then(function (response) {

    displayRandomRecipes(response);
  });
}

function displayRandomRecipes(response) {
  console.log(response);
  for (let i = 0; i < 3; i++) {        
    // create IDs to assign to HTML elements
    // let imageID = 'imgInsp' + i;
    // console.log(imageID);
    // let titleID = 'titleInsp' + i;
    // console.log(titleID);

    // grab the recipe image and titile and assign to a variable
    let image = response.recipes[i].image;    
    let title = response.recipes[i].title;    
    let inspID = response.recipes[i].id;

    // // set value of created ID        
    $('.inspCard' + i).text(title);

    // // add attributes to elements
    $('.inspCardImg' + i).attr('src', image);
    $('.inspCardImg' + i).attr('id', inspID);
    $('.inspCard' + i).attr('id', inspID);
  }
}

randomRecipes();



function displayGiphy(search) {
  queryURL2 = 'https://api.giphy.com/v1/gifs/search?api_key=' + giphyKey + '&limit=1&q=' + search;
  console.log(queryURL2);

  fetch(queryURL2)
    .then(response => response.json())
    .then(content => {
      // console log data returned from api
      console.log(content.data);

      let giphyImgEl = $('<img>');

      
      
      // append to empty div element
      let giphyIMG = content.data[0].images.downsized.url
      
      $('#' + 'giphy1').attr('src', giphyIMG)

      $(giphyImgEl).addClass('card-img-top')

      $(giphyImgEl).attr('src', giphyIMG)

      $('#giphy').append(giphyImgEl);

    })
}

$(".recipeCard").on('click', function (event) {
  $('#modalBody').text('');
  
  $('#recipeList').text('');

  // extract id of the card that has been clicked
  let id = $(this).children('img').attr('id')

  let recipeMethodURL = 'https://api.spoonacular.com/recipes/'+ id + '/analyzedInstructions?'  + recipeKey;


  $.ajax({
        url: recipeMethodURL,
        method: "GET"
      }).then(function (response) { 
        console.log(response); 
         // create HTML elements
        let olEl = $('<ol>');

        // add attribute to ol element
        olEl.attr('id', 'recipeList')
        
        // append list to modal
        $('#modalBody').append(olEl);

        // issue with response for steak dish with id=661522.
        if (id == '661522') {          
          for (let i = 0; i < response.length; i++) {
            // create HTML element
          let listEl = $('<li>');

          // add class to each list element

          // add value of response array 
          listEl.text(response[i].name);

          // append to created ol element
          $('#recipeList').append(listEl);
          }  
        }

        for (let i = 0; i < response[0].steps.length; i++) {          
          // create HTML element
          let liEl = $('<li>');

          // add class to each list element

          // add value of response array 
          liEl.text(response[0].steps[i].step);

          // append to created ol element
          $('#recipeList').append(liEl);
        }
      })
})

// clear the body of modal when the modal is hidden
$(".modal").on("hidden.bs.modal", function(){
  $("#modalBody").html('');
});

// event listener for when the form is submitted
$("#search-form").on('submit', function (event) {
  event.preventDefault();

  // store history array in localstorage
  const searchTerm = recipeEl.value;
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));

  // let search = $('#search-form').val().trim();
  let inputSearch = $('#search').val().trim();  

  $('#search').val('');

  clearPreviousSearch();
  console.log(inputSearch);

  getResponse(inputSearch);

  displayGiphy(inputSearch)
})


// Clear History button
clearEl.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
})