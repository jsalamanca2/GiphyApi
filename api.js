var cartoonGiphyArray = ["Sponge Bob", "Adventure Time", "Rugrats", "Hey Arnold", "Rocket Power", "South Park", "Simpsons", "Family Guy", "Futurama", "Teen Titans", "Dark Wing Duck", "Phineas and Ferb", "Doug", "Chowder", "Archer"];
var currentGiphy;
var arrayOfGif;
var arrayOfPausedGif;
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
	arrayOfGif= value.images.original.url;
	arrayOfPausedGif = value.images.original_still.url;
	newGiphy = $('<img class="img-rounded">');
	newGiphy.attr('src', arrayOfPausedGif);
	newGiphy.addClass('choice');
	newGiphy.attr('data-play', arrayOfGif);
	newGiphy.attr('data-paused', arrayOfPausedGif);
	$("#giphyDiv").append(newGiphy);
	
	});
});
}
// attribute class for the play and pause for the giphys when mouse over.
$(document).on('mouseover','.choice', function(){
           $(this).attr('src', $(this).data('play'));                 
}); 
$(document).on('mouseleave','.choice', function(){
           $(this).attr('src', $(this).data('paused'));                   
});

// show list of the button in a loop from the premade array
function addNewGiphyButton(){
	$("#giphyList").html('');
	for (var i=0; i<cartoonGiphyArray.length; i++){
		giph = $('<button id="btn" class="btn btn-warning">');
		giph.addClass("giphyChoice");
		giph.attr('data-name', cartoonGiphyArray[i]);
		giph.text(cartoonGiphyArray[i]);
		$("#giphyList").append(giph);
		var p = $('<p>').text("Rating: " + cartoonGiphyArray[i].rating);
	}
}
// add new buttons
$("#addButton").on('click', function(){
	var giphyChoice = $("#giphy-add").val().trim();
	cartoonGiphyArray.push(giphyChoice);
	addNewGiphyButton();
	return false;
});
addNewGiphyButton();
$(document).on('click', '.giphyChoice', displayGiphy);