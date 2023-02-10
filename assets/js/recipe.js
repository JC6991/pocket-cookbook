// $( document ).ready() {

  let formSearch = $('#search-form');

  // api kiey for spoontacular api
  // const apiKey = '&apiKey=c0fcbd7c25a14b24b516d287693d9360';
  const apiKey = '&apiKey=7f77bc0ac3a540babaab9a36bfd949e8';


  function getResponse(search) {
    // queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=burgers&maxFat=25&number=20' + apiKey;
    queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=' + search + '&maxFat=25&number=20&number=9' + apiKey;
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

  // function to obtain api request results and display them on the screen
  function displayRecipe(response){
    // for loop to iterate through results array 
    for(let i = 0; i < 9; i++) {
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
    }).then(function(response) {
      
      displayRandomRecipes(response);
    });
  }

  function displayRandomRecipes(response) {
    console.log(response);  
    for(let i = 0; i < 3; i++) {      
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

  randomRecipes();

  $("#search-form").on('submit', function(event) {
    event.preventDefault();
    
    // let search = $('#search-form').val().trim();
    let search = $('#search').val().trim();
    console.log(typeof search);
    console.log('search: ' + search);

    formSearch.val('');

    getResponse(search);


  });


// }



