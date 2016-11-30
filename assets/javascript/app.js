$(document).ready(function(){
var animal ;

$("#addingAnimals").on("click", function() {
	

	if($("#animalSearchText").val().trim() === "") {
		alert("Please enter a value");
	}else{
		// This line will make a local variable named animal which is equal to the value of the value of the text input trimmed without whitespace
		animal = $("#animalSearchText").val().trim();
		// This line will create 
		var button = $("<button>").addClass("btn btn-secondary").attr("type", "button").text(animal).attr("data-animal", animal);
		$("#animalButtons").append(button);
		console.log(button);
		$("#animalSearchText").val("");
	};


	return false;
});

$("#animalButtons").on("click", function() {
	
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
	console.log(queryURL);
	console.log(animal);

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