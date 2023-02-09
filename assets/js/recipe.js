// api kiey for spoontacular api
const apiKey = '&apiKey=c0fcbd7c25a14b24b516d287693d9360';

let search = 'pizza'

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

function displayRecipe(response){
    let imgEl = $('<img>');
    let foodType = $('<div>');

    let image = response.results[0].image;
    let title = response.results[0].title;

    imgEl.text(image);
    foodType.text(title);

    imgEl.attr('src', image)

    $('body').append(imgEl)
    $('body').append(foodType)
}






