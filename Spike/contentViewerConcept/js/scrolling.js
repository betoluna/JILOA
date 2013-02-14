$(document).ready(function(){
  var imageRows = $('div.image-row').size(); //Returns the number of image rows
  
  for(var i = 0;i<imageRows;i++){  //populate the div image-rows with the number of children as an attribute "images" for easier reference
	$('div.image-row:eq('+i+')').attr('images',$('div.image-row:eq('+i+')').children('img').size()); //get the number of img children
	$('.image-selector:eq('+i+')').attr('id',i); //find the image selectors and assign them an image row save the row under the id attribute
		for(var j = 0; j < $('div.image-row:eq('+i+')').attr('images'); j++){ //populate the div with the respective number of links
			$('.image-selector:eq('+i+')').append('<a image='+j+'>['+j+']</a> '); //here is where the link content goes
		}
  }
  //image row information parsing and application is complete at this point
  
  
  /*
	Functions to handle image movement
  */
  $('.image-selector a').click(function(){ //when the user clicks the numerical link under the "image selector" it will preform this function
	var parentIndex = $(this).parent().attr('id'); //get the parent index which tells us the row to modify
	var scrollIndex = $(this).attr('image'); //gets the image we want to scroll to
	$('div.image-row:eq('+parentIndex+')').animate({ 'marginLeft': -scrollIndex*545+'px'}, 1000); //scoll by modifying the margin, animation length 1000ms
  });
  
  $('.image-selector').click(function(){ //when the user clicks on the div around the links (this includes clicking on a link) it preforms this function
    var rowIndex = $(this).attr('id'); //get the row index (same as previous function)
	$('#row-wrapper').animate({ 'marginTop': -rowIndex*420+'px'},1000); //animates based on row height for 1000ms
	$('div.image-row:gt('+rowIndex+'),div.image-row:lt('+rowIndex+')').animate({ 'marginLeft' : "0px"} , 1000); //resets all other rows to the first image
  });
  
  /*
	Testing Swip Function -- "I don't know if this works yet because I do not have a platform to test it on"-Joe
	The concept is that if a user swipes it will animate the slide by 1 in either direction, if the row is at the end or begining respectively it will 
	make an animation that looks like it was trying to go, this was something i just thought would look nice
  */
  
  $('.image-row').live("swipeleft", function(){
						var currentMargin = $(this).css('marginLeft'); //Get the current margin of the swiped image-row
						if($(this).attr('images') > currentMargin/-545){ //get the number of images and compare it to what the last image margin would express
																		 //if it is below the last image would display then execute the default animation
							$(this).animate({ 'marginLeft': currentMargin-545+'px'}, 1000);
							}
						else{ //Otherwise execute the bounceback animation
							$(this).animate({ 'marginLeft': currentMargin-200+'px'}, 250).animate({ 'marginLeft': currentMargin+'px'}, 250);
						}
	});
	
	$('.image-row').live("swiperight", function(){
						var currentMargin = $(this).css('marginLeft'); //get the current margin of the swiped row
						if(currentMargin > 0){ //if the current margin is gt 0 then it can be swiped right
							$(this).animate({ 'marginLeft': currentMargin+545+'px'}, 1000); //execute animation
							}
						else{ //otherwise bounceback  animation
							$(this).animate({ 'marginLeft': '200px'}, 250).animate({ 'marginLeft': '0px'}, 250); 
						}
	});
});