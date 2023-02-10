let formSearch = $('#search-form');

// api kiey for spoontacular api
const apiKey = '&apiKey=c0fcbd7c25a14b24b516d287693d9360';

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

function displayRecipe(response) {
  for (let i = 0; i < 9; i++) {
    // let imgEl = $('<img>');
    // let foodType = $('<div>');
    let imageID = 'img' + i;
    let titleID = 'title' + i;

    let image = response.results[i].image;
    let title = response.results[i].title;


    // imgEl.text(image);
    $('#' + titleID).text(title);

    $('#' + imageID).attr('src', image)

    // $('body').append(imgEl)
    // $('body').append(foodType)
  }
}

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