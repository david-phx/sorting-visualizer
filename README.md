# SORTING ALGORITHMS VISUALIZER
#### Video Demo: https://youtu.be/UC-ydtrg9s0
#### Live Demo: https://david-phx.github.io/sorting-visualizer/
#### Description:
Ladies and gentlemen, I present you with my final project for CS50!

To be honest, as much as I would have loved to to build something that solves an actual problem, impacts other people, or
helps achieve [world peace](https://youtu.be/3st-Hai1y54), being realistic about my current abilities as
a programmer, I decided to start with something simpler.

The idea of this project was inspired by the week 3 lab, where we were asked to determine which sorting algorithms have been
utilized in pre-compiled programs by using them on sets of sorted, reversed and random numbers. It was an interesting challenge.
After diving deeper into HTML, CSS and JavaScript in week 8, I decided to write an app to visualize the three sorting algorithms
used in the week 2 lab - select, bubble, and merge on shuffled, sorted and reversed arrays. I know there are a bunch of similar
visualization scripts online, but this one is mine and I like it more (well, obviously I'm somewhat biased here).

The app is written in vanilla JavaScript, HTML, and Bootstrap CSS framework to make the interface look cleaner and more professional.

**index.html** sets up the user interface using Bootstrap;

**styles.css** has some additional styling for the visualization;

**functions.js** contains all the functions used in the app;

and finally **script.js** contains the "control logic" so to speak (I suspect there's probably a better term for that).

## Usage

Usage is pretty self explanatory.

Use the length slider to change the size of the array (between 10 and 50), click the corresponding button to re-shuffle it or
sort it in ascending or descending order, select the sorting algorithm, and click 'Start' to launch the visualization. The delay
slider allows to speed up or slow down the visualization process (well, honestly, it doesn't actually speed anything up, it
either slows the process down or slows it down even more).

## Structure

### index.html

I built the user interface here using HTML with Bootstrap framework. There's a main container, containing all the content (hmm...)

Within the main container there are 3 main DIVs: one for all the controls, one for the actual sorting algorithms visualization,
and another one for step counter and a little info about the project. Coding this part was pretty straightforward, although
it took a while to figure out Bootstrap's grid and adaptive design. Other than Bootstrap's magic, there's not much else in this file.

### styles.css

Styles.css contains some additional styling, needed for the sort algorithm visualizations. I'm pretty sure it's possible to achieve
similar or better visuals using Bootstrap, but I just used my own styling instead.

### functions.js

This is where most of the magic happens.

I'm using a class named NumbersArray, which is esentially just a regular array with a bunch of methods. I tried changing
Array.prototype initially, but decided to go with a new class instead - it seemed a better design.

First few functions construct, populate, clear, shuffle, and sort the array. I have to admit that I googled the shuffle algorithm,
the rest was pretty easy.

renderBar() function adds a single bar to the visualization, and render() function uses it to draw the initial array.

colorAsSorted() and colorAsUnsorted() are two helper functions to color the whole array green (after a successful bubble or
merge sort) or silver (to reset after a sort).

And then I needed a way to slow down the sorting process, so that a human being can actually see what's happennig, so delay()
does exactly that.

Next I coded the visualizer funtions.

sortSelect() and sortBubble() were pretty straghtforward. Code the sorting process, swap the bars as needed, color them -
nothing too complicated.

sortMerge() turned out to be more challenging. I'm using sortMerge() to launch the sorting process, mergeSort() recursively
to split the array into subarrays, sub-subarrays, and sub-sub-subarrays, and then merge() to merge the sub- (and sub-sub-sub-)
arrays. merge() is actually doing all the heavy lifting here. The trickiest part was to do the visualization part in
a process using recursion, but after two nights and lots of coffee, everything finally worked as intended.

I had to add two functions to disableControls() and enableControls(), since clicking any of the shuffle/asc/desc buttons,
moving the length slider, or clicking the start button mid sort was causing absolute mess. I thought about maybe adding a
pause/restart functionality to the process, but didn't seem that useful.

And there's a also step counter of course.

### script.js

And finally all the control logic (again, I'm sure there's a better term for it).

Variable initialization, all the addEventListener stuff, and launching sortSelect/sortBubble/sortMerge happens here.

### Thank you

That's pretty much it, folks.

I had a lot of fun studying and programming this final project. Thank you everyone for an amazing course, and see you in the next one!
