/*
 * 
 * HTML Slideshow
 * Hannah's version - loosely based upon slides written by 
 * Author: Rob Flaherty | rob@ravelrumba.com
 * Copyright (c) 2010 Rob Flaherty 
 * MIT Licensed: http://www.opensource.org/licenses/mit-license.php
 *
 * This version (Hannah's version) does not use JQuery, enabling easier
 * understanding of code by beginner JavaScript students (so it is not better
 * but merely easier to follow in class).
 *
 * This is pretty much the minimal slideshow I think. Simplifications welcome
 *
 * Contact: hmd1@aber.ac.uk
 * github.com/handee
 */


//we'll have a big smelly global variable to keep the slides. there are neater
//ways to do it, but i am going for easy here... 
var lslides;

//we're going to put, in that big smelly global, all of the elements in the 
//html file which are of the tag type "section". so each slide is an individual
//section in the original html file.
//
lslides=document.getElementsByTagName('section');


function buildShow() {
// this function takes the html and builds an actual slideshow out of it -
// numbers the slides, makes the forward and back buttons work, that kind of stuff.


 // first up let us number the slides; each slide wants a unique id, we're 
 // going to call them lslide1, lslide2 and so on.
 // lslides.length is the total number of slides in our html file

	for (var i=0; i< lslides.length; i++) {
		lslides[i].id="lslide"+(i+1);
	}

 // It's really useful to be able to bookmark and link slides. so we use location.hash
 // to store the current slide in the actual address bar: if the page loads, and there's 
 // something there, let's go there. Otherwise, we'll start at slide 1. so let's start with 
 // slide 1... 

        var slideno=1;    

 // and then get the url hash. this is in location.hash = but it has a # on it. so if your page
 // has the URL http://www.boo.com/hannah.html#43 the location.hash will be equal to #43.
 // so we slice the location.hash to get rid of the first character, leaving us with just a number.
 
       var url_hash=location.hash.slice(1);

 // then we turn that number into an int 
 // (we could have done this in one line but it's easier to see what is going on with 2 lines)

        url_hash=parseInt(url_hash);

// if this number is within a sensible range for this set of slides... we'll use it as a slide number
        if (url_hash<lslides.length && url_hash>0) {
              slideno=url_hash;
        } 

// we'll set the slide - which is actually a section id - to have the class "slide-selected". 
// in our css we set slides to be invisible by default and only to show when they're selected.
        
	lslides[slideno-1].className="slide-selected"; 

// now to sort out the navigation bar at the top.
// we'll update the navigation bar with the current slide number
        
	document.getElementById('slide-number').innerHTML=slideno;

// we'll update the navigation bar with the total number of slides in the deck
        
        document.getElementById('slide-total').innerHTML=" of " + (lslides.length);
      
// and finally we'll make next and previous buttons link to our nextslide and prevslide functions
// you can find these functions below...

        document.getElementById('next-btn').onclick=nextslide;
        document.getElementById('prev-btn').onclick=prevslide;

}

function nextslide() {
   var cslide=getslide();
   if (cslide<lslides.length) {
	   document.getElementById('lslide'+cslide).className="";
	   change_slide(cslide+1);
   }
}
function prevslide() {
   var cslide=getslide();
   if (cslide>1) {
	   document.getElementById('lslide'+cslide).className="";
	   change_slide(cslide-1);
   }
}

function getslide() {
    return(parseInt(document.getElementById('slide-number').innerHTML));
}

function change_slide(newslide) {
   document.getElementById('lslide'+newslide).className="slide-selected";
   document.getElementById('slide-number').innerHTML=newslide;
}
