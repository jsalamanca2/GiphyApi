var cartoonGiphyArry = ["Sponge Bob", "Adventure Time", "Rugrats", "Hey Arnold", "Rocket Power", "South Park", "Simpsons", "Family Guy", "Futurama", "Teen Titans", "Dark Wing Duck", "Phineas and Ferb", "Doug", "Chowder", "Anamaniacs"];
var currentGiphy;
var arryOfGif;
var arryOfPausedGif;
var newGiphy;
var giph;

function displayGiphy(){

	$("#giphyDiv").html('');
	var giphyChoice = $(this).attr('data-name');
	var giphyURL = "http://api.giphy.com/v1/gifs/search?q=" +giphyChoice+ "&api_key=dc6zaTOxFJmzC";
	$.ajax({ url: giphyURL, method: 'GET'})
	.done(function(giphyData){
		console.log(giphyURL);
	currentGiphy = giphyData.data;
	
	$.each(currentGiphy, function(index, value){
	arryOfGif= value.images.original.url;
	arryOfPausedGif = value.images.original_still.url;
	newGiphy = $('<img class="img-rounded">');
	newGiphy.attr('src', arryOfPausedGif);
	newGiphy.addClass('choice');
	newGiphy.attr('data-play', arryOfGif);
	newGiphy.attr('data-paused', arryOfPausedGif);
	$("#giphyDiv").append(newGiphy);
	});
});
}


// show list of the button in a loop from the premade array
function addNewGiphyButton(){
	$("#giphyList").html('');
	for (var i=0; i<cartoonGiphyArry.length; i++){
		giph = $('<button id="btn" class="btn btn-warning">');
		giph.addClass("giphyChoice");
		giph.attr('data-name', cartoonGiphyArry[i]);
		giph.text(cartoonGiphyArry[i]);
		$("#giphyList").append(giph);
	}
}
// add new buttons
$("#addButton").on('click', function(){
	var giphyChoice = $("#giphy-add").val().trim();
	cartoonGiphyArry.push(giphyChoice);
	addNewGiphyButton();
	return false;
});
addNewGiphyButton();
$(document).on('click', '.giphyChoice', displayGiphy);