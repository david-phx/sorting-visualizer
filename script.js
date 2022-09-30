// The id of the wrapper element, didn't want to hardcode it
const wrapper = 'wrapper';

// Bar colors
const colorUnsorted = 'silver';
const colorComparing = 'blue';
const colorMin = 'yellow';
const colorSorted = 'green';

// Initialize steps counter
var steps = 0;
document.getElementById('steps').innerHTML = steps;

var numbers = new NumbersArray();

// Array length slider
var lengthSlider = document.getElementById('array-length');
var lengthOutput = document.getElementById('array-length-value');
lengthOutput.innerHTML = lengthSlider.value;

lengthSlider.oninput = function() {
    lengthOutput.innerHTML = this.value;
    numbers.populate(this.value);
    if (document.getElementById('shuffle').classList.contains('active')) {
        numbers.shuffle();
    }
    else if (document.getElementById('desc').classList.contains('active')) {
        numbers.reverse();
    }
    numbers.render(wrapper);
}

// Delay slider
var delaySlider = document.getElementById('sort-delay');
var delayOutput = document.getElementById('sort-delay-value');
delayOutput.innerHTML = delaySlider.value;

delaySlider.oninput = function() {
    delayOutput.innerHTML = this.value;
}

// The 'Shuffle' button
document.getElementById('shuffle').addEventListener('click', function() {
    numbers.shuffle();
    numbers.render(wrapper);

    document.getElementById('shuffle').classList.add('active');
    document.getElementById('asc').classList.remove('active');
    document.getElementById('desc').classList.remove('active');
});

// The 'Asc' button
document.getElementById('asc').addEventListener('click', function() {
    numbers.sort();
    numbers.render(wrapper);

    document.getElementById('shuffle').classList.remove('active');
    document.getElementById('asc').classList.add('active');
    document.getElementById('desc').classList.remove('active');
});

// The 'Desc' button
document.getElementById('desc').addEventListener('click', function() {
    numbers.reverse();
    numbers.render(wrapper);

    document.getElementById('shuffle').classList.remove('active');
    document.getElementById('asc').classList.remove('active');
    document.getElementById('desc').classList.add('active');
});


// The 'Sort' button
document.getElementById('sort').addEventListener('click', async function() {
    disableControls();

    steps = 0; // Reset the step counter
    document.getElementById('steps').innerHTML = steps;

    numbers.colorAsUnsorted(wrapper); // Reset the bars color to unsorted
    
    if (document.getElementById('select').checked) {
        await numbers.sortSelect(wrapper);
    }
    else if (document.getElementById('bubble').checked) {
        await numbers.sortBubble(wrapper);
    }
    else if (document.getElementById('merge').checked) {
        await numbers.sortMerge(wrapper);
    }
    
    enableControls();
});

// Populate, shuffle, and render the inital array
numbers.populate(lengthSlider.value);
numbers.shuffle();
numbers.render(wrapper);