$(document).ready(function(){

// This is the array of animals that I created.
var animalArray = ["Elephant", "Ant", "Alligator", "Cat", "Dog", "Bird", "Peacock", "Giraffe", "Lion", "Seal", "Whale", "Shark", "Bee"]

// Creating an empty global variable so I can call on this global variable inside both event listeners. 
var animal ;

// This variable is going to be set to the button in the for loop that is going to be dynamically added when the page loads. 
var animalPreButton ;

// Function that is written to be executed when the page loads. 
function pageAnimalLoad() {
	// Goes through the animalArray and for each item, creates a button with the attributes listed below. 
	for (i=0; i<animalArray.length; i++) {
		animalPreButton = $("<button>").addClass("btn btn-secondary animalButton").attr("type", "button").text(animalArray[i]).attr("data-animal", animalArray[i]);
		// Appends those buttons inside of the section in the HTML document of #animalButtons.
		$("#animalButtons").append(animalPreButton);
		console.log(animalArray[i]);
	}
};

// This function is called when the submit button to add an animal is clicked and there are characters in the text box.
function addAnimal() {
		// Clears the #animalButtons container in the HTML document.
		$("#animalButtons").empty();
		// Makes the value of animal equal to the text that was inserted in the search box without whitespace.
		animal = $("#animalSearchText").val().trim();
		// Adds the animal that was searched into the array.
		animalArray.push(animal);
		// Consoles the array. 
		console.log(animalArray);
		// This line creates a local variable named button that has classes with bootstrap in mind, adds the animals name as the text of the button, and adds an attribute of data-animal with a value of the animals name. 
		var button = $("<button>").addClass("btn btn-secondary animalButton").attr("type", "button").text(animal).attr("data-animal", animal);
		// Consoling...
		console.log(button);
		// And at the end, setting the value of the search box to nothing so that the text in the search box dissapears when the search is run.
		$("#animalSearchText").val("");

		for (i=0; i<animalArray.length; i++) {
		animalPreButton = $("<button>").addClass("btn btn-secondary animalButton").attr("type", "button").text(animalArray[i]).attr("data-animal", animalArray[i]);
		$("#animalButtons").append(animalPreButton);
		console.log(animalArray[i]);
		};
};


// When the page loads, it is running the pageAnimalLoad function, which is defined below. 
pageAnimalLoad();


// A function is performed when the #addingAnimals id is clicked on.
$("#addingAnimals").on("click", function() {
	
	// If the search box is empty, instead of adding a blank button, it will prompt you to enter a value, and will not let you add that blank button. 
	if($("#animalSearchText").val().trim() === "") {
		alert("Please enter a value");
	}
	// Once the box has some content in it, it will allow you to create a button. 
	else{

		addAnimal();
		// This line will make a local variable named animal which is equal to the value of the value of the text input trimmed without whitespace
		
	};
	// Keeps the page from refreshing.
	return false;
});

// This event listener turns still gifs into animated gifs, and vice versa
$(".animalGifsParent").on("click", ".animalGif", function () {
	var state = $(this).attr("data-state")
	// This is done by taking the attributes and applying them to the src of the element on the click.
	if(state === "still") {
		$(this).attr("src", $(this).data("animate"));
		$(this).attr("data-state", "animate");
	}
	else{
		$(this).attr("src", $(this).data("still"));
		$(this).attr("data-state", "still");
	}

});

// This is the event listener for a click on one of the animal buttons that were created.
$(".animalButtonsParent").on("click", ".animalButton", function() {

	// This emptys out the gifs from the previous return to only have 10 gifs at a time in the bay
	$("#animalGifs").empty();
	
	var animalSearch = $(this).attr("data-animal");
	// This is the API key for Giphy, and also sets teh limit of the return to 10, and applies the search word from the user input to return Gifs affiliated with that word. 
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animalSearch + "&api_key=dc6zaTOxFJmzC&limit=10";
	// Here I am consoling the URL to make sure it is plugged in correctly. 
	console.log(queryURL);
	// Consoling the value of animal to make sure it is being stored correctly from the previous event listener. 
	console.log(animalSearch);

	// Simple ajax syntax to get the array object from Giphy.
	$.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
                var results = response.data;


            	// This loops through all of the returns for the API object.
                for (var i = 0; i < results.length; i++) {
                	// This creates a variable named gifDiv that dynamically adds a div, and a class of that div of item
                    var gifDiv = $('<div class="item">')
                	// Adds a rating variable equal to the rating of the objects return.
                    var rating = results[i].rating;
                	// Creates a variable named p that is equal to html text of p and adding the text of Rating: and the rating that is returned from the object.
                    var p = $('<p>').text("Rating: " + rating);
                    // Creates a variable named animalImage that is equal to the image html tag
                    var animalImage = $('<img>');
                    // adds an attribute to the animalImage var of "data-state"- "still".
                    animalImage.attr("data-state", "still");
                    // Adding a class of animalGif to the gifs that are loaded from the api request
                    animalImage.addClass("animalGif");

                    console.log(results)




                    // Sets the default src of the image of the still image returned from the gif's object 
                    animalImage.attr('src', results[i].images.fixed_height_still.url);
                    animalImage.attr("data-still", results[i].images.fixed_height_still.url)
                    // Adds an attribute of data-animate equal to the url for the animated gif
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    

                    // Appends the rating to the gifDiv container
                    gifDiv.append(p)
                    // appends the image to the gifDiv container
                    gifDiv.append(animalImage)

                    $('#animalGifs').prepend(gifDiv);
                }
            });
});
























});