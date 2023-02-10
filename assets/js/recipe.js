let formSearch = $('#search-form');

// api kiey for spoontacular api
const apiKey = '&apiKey=c0fcbd7c25a14b24b516d287693d9360';


function getResponse(search) {
  // queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=burgers&maxFat=25&number=20' + apiKey;
  queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=' + search + '&maxFat=25&number=20' + apiKey;
  console.log(queryURL);

  // ajax request to the URL above 
  $.ajax({
      url: queryURL,
      method: "GET"    
    }).then(function(response) {
      console.log(response);
      displayRecipe(response);
    });
}

function displayRecipe(response){
   for(let i = 0; i < 9; i++) {
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

$("#search-form").on('submit', function(event) {
  event.preventDefault();
  
  // let search = $('#search-form').val().trim();
  let search = $('#search').val().trim();
  console.log(typeof search);
  console.log('search: ' + search);

  formSearch.val('');

  getResponse(search);


});






