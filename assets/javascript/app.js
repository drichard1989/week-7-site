$(document).ready(function(){

// Creating an empty global variable so I can call on this global variable inside both event listeners. 
var animal ;

// A function is performed when the #addingAnimals id is clicked on.
$("#addingAnimals").on("click", function() {
	
	// If the search box is empty, instead of adding a blank button, it will prompt you to enter a value, and will not let you add that blank button. 
	if($("#animalSearchText").val().trim() === "") {
		alert("Please enter a value");
	}
	// Once the box has some content in it, it will allow you to create a button. 
	else{
		// This line will make a local variable named animal which is equal to the value of the value of the text input trimmed without whitespace
		animal = $("#animalSearchText").val().trim();
		// This line creates a local variable named button that has classes with bootstrap in mind, adds the animals name as the text of the button, and adds an attribute of data-animal with a value of the animals name. 
		var button = $("<button>").addClass("btn btn-secondary").attr("type", "button").text(animal).attr("data-animal", animal);
		// Here we are appending the button in the HTML with the append method.
		$("#animalButtons").append(button);
		// Consoling...
		console.log(button);
		// And at the end, setting the value of the search box to nothing so that the text in the search box dissapears when the search is run.
		$("#animalSearchText").val("");
	};
	// Keeps the page from refreshing.
	return false;
});


// This is the event listener for a click on one of the animal buttons that were created.
$("#animalButtons").on("click", function() {
	
	// This is the API key for Giphy.
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
	// Here I am consoling the URL to make sure it is plugged in correctly. 
	console.log(queryURL);
	// Consoling the value of animal to make sure it is being stored correctly from the previous event listener. 
	console.log(animal);

	// Simple ajax syntax to get the array object from Giphy.
	$.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var results = response.data;



                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="item">')

                    var rating = results[i].rating;

                    var p = $('<p>').text("Rating: " + rating);

                    var animalImage = $('<img>');
                    animalImage.attr('src', results[i].images.fixed_height.url);

                    gifDiv.append(p)
                    gifDiv.append(animalImage)

                    $('#animalGifs').prepend(gifDiv);
                }
            });
});
























});