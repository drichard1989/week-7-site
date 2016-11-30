$(document).ready(function(){


$("#addingAnimals").on("click", function() {

	var animal = $("#animalSearchText").val().trim();
	var button = $("<button>").addClass("btn btn-secondary").attr("type", "button").text(animal);
	$("#animalButtons").append(button);
	console.log(button);
	$("#animalSearchText").val("");

	return false;
})
























});