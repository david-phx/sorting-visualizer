/**
 * The class we'll be using to visualize sorting algorithms
 * Essentially an array with some methods
 */

 class NumbersArray {
    
    constructor() {
        this.n = [];
    }

    // Clear the array
    clear() {
        while (this.n.length) {
            this.n.pop();
        }
    }

    // Populate the array with integers between 1 and length
    populate(length) {
        this.clear(); // Clear first
        for (let i = 0; i < length; i++) {
            this.n.push(i + 1);
        }
    }

    // Shuffle an array using Fisher–Yates shuffle (I had to google this one)
    shuffle() {
        var m = this.n.length, t, i;

        while (m) { // While there still remain elements to shuffle...
            i = Math.floor(Math.random() * m--); // Pick a remaining element...
            // And swap it with the current element
            t = this.n[m];
            this.n[m] = this.n[i];
            this.n[i] = t;
        }  
    }

    // Sort ascending
    sort() {
        this.n.sort(function(a, b){return a - b});
    }

    // Sort descending
    reverse() {
        this.n.sort(function(a, b){return b - a});
    }

    // Render a bar, index of -1 means append to the end
    renderBar(index, value, wrapper) {
        let div = document.getElementById(wrapper);

        var x = document.createElement('div');
        var y = document.createElement('div');
        var t = document.createTextNode(value.toString());
        x.appendChild(y);
        y.appendChild(t);
        x.style.height = (95 / this.n.length * value).toString() + '%';
        x.style.width = (100 / this.n.length).toString() + '%';
        x.setAttribute("class", "bar");

        if (index == -1) {
            div.appendChild(x);
        }
        else {
            div.insertBefore(x, div.children[index]);
        }
        
    }

    // Render numbers array
    render(wrapper) {

        // Delete existing contents
        let div = document.getElementById(wrapper);
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }

        // Render all bars
        for (let i = 0; i < this.n.length; i++) {
            this.renderBar(-1, this.n[i], wrapper);
        }
    }

    // Color the whole array as sorted
    colorAsSorted(wrapper) {
        let div = document.getElementById(wrapper);

        for (let i = 0; i < this.n.length; i++) {
            div.children[i].style.backgroundColor = colorSorted;
        }
    }

    // Color the whole array as unsorted
    colorAsUnsorted(wrapper) {
        let div = document.getElementById(wrapper);

        for (let i = 0; i < this.n.length; i++) {
            div.children[i].style.backgroundColor = colorUnsorted;
        }
    }

    // ♫ Mustang Sally, guess you better slow your Mustang down... ♫
    async delay() {
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, delaySlider.value)
        );
    }

    // Sort using SELECTION algorithm
    async sortSelect(wrapper) {

        let div = document.getElementById(wrapper);

        for (let i = 0; i < this.n.length - 1; i++) {
            
            let min = i;
            
            for (let j = i + 1; j < this.n.length; j++) {

                div.children[i].style.backgroundColor = colorComparing;
                div.children[j].style.backgroundColor = colorComparing;

                await this.delay();

                div.children[j].style.backgroundColor = colorUnsorted;

                // Found a new min value
                if (this.n[min] > this.n[j]) {
                    div.children[min].style.backgroundColor = colorUnsorted;
                    min = j;
                    div.children[min].style.backgroundColor = colorMin;
                }
            
                incrementSteps();
            }

            if (min != i) { // If we found a new min => swap
                
                await this.delay();
            
                div.insertBefore(div.children[min], div.children[i]);
                div.insertBefore(div.children[i + 1], div.children[min].nextSibling);
                div.children[min].style.backgroundColor = colorUnsorted;

                let temp = this.n[i];
                this.n[i] = this.n[min];
                this.n[min] = temp;

                incrementSteps();
            }

            div.children[i].style.backgroundColor = colorSorted;
        }

        await this.delay();
        div.lastChild.style.backgroundColor = colorSorted;
    }

    // Sort using BUBBLE alrogithm
    async sortBubble(wrapper) {

        let div = document.getElementById(wrapper);

        for (let i = 0; i < this.n.length; i++) {

            let swapped = false;

            for (let j = 0; j < this.n.length - 1 - i; j++) {

                div.children[j].style.backgroundColor = colorComparing;
                div.children[j+1].style.backgroundColor = colorComparing;
                
                await this.delay();

                if (this.n[j] > this.n[j + 1]) { // Swap the numbers if needed

                    div.insertBefore(div.children[j + 1], div.children[j]);

                    let temp = this.n[j];
                    this.n[j] = this.n[j + 1];
                    this.n[j + 1] = temp;

                    swapped = true;
                }

                div.children[j].style.backgroundColor = colorUnsorted;
                div.children[j+1].style.backgroundColor = colorSorted;

                incrementSteps();
            }

            incrementSteps();

            if (!swapped) { // if no swapping happened this cycle, we're done
                this.colorAsSorted(wrapper);
                break;
            }
        }

    }

    // Sort using MERGE alrogithm
    async sortMerge(wrapper) {

        // Launch recursive merge sort on the whole array...
        await this.mergeSort(0, this.n.length - 1, wrapper);

        // ... and once done, color everything as sorted
        this.colorAsSorted(wrapper);

    }

    // Divide a subarray into two sub-subarrays, sort each of them recursively, and merge
    async mergeSort(start, end, wrapper) {

        /**
         * If there's more than one element in the subbarray, do the split/sort/merge thing
         * If there's only one element - do nothing, higher level merge handles it
         */ 
        if (start < end) {
            let split = Math.floor((start + end) / 2); // Find the splitting point

            // mergeSort() two sub-subarrays...
            await this.mergeSort(start, split, wrapper);
            await this.mergeSort(split + 1, end, wrapper);

            // .. and merge() them
            await this.merge(start, split, end, wrapper);
        }
    };

    // Merge subarrays [start .. split] & [split + 1 .. end]
    async merge(start, split, end, wrapper) {

        let tempArray = [];

        let i = start; // starting index for the first subarray
        let j = split + 1; // starting index for the second subarray

        // Push the lower value into tempArray
        while (i < split + 1 && j < end + 1) {
            if (this.n[i] < this.n[j]) {
                tempArray.push(this.n[i]);
                i++;
            }
            else {
                tempArray.push(this.n[j]);
                j++;
            }
        }

        // Once one of the subarrays is emtpy, push the rest of the other one
        while (i < split + 1) {
            tempArray.push(this.n[i]);
            i++;
        }
        while (j < end + 1) {
            tempArray.push(this.n[j]);
            j++;
        }

        // Copy tempArray over the original & visualize
        let div = document.getElementById(wrapper);
            
        for (let i = 0; i < tempArray.length; i++) { 

            // Wait...
            await this.delay();

            div.removeChild(div.children[start + i]);
            
            this.renderBar(start + i, tempArray[i], wrapper);
            div.children[start + i].style.backgroundColor = colorComparing;

            this.n[start + i] = tempArray[i];

            incrementSteps();
        }

        await this.delay();

        for (let i = 0; i < tempArray.length; i++) {
            div.children[start + i].style.backgroundColor = colorUnsorted;
        }
    }

}

function incrementSteps() {
    steps++;
    document.getElementById('steps').innerHTML = steps;
}


// Disable all controls except delay slider
function disableControls() {
    controls = document.getElementsByClassName('control');
    for (let i = 0; i < controls.length; i++) {
        controls[i].disabled = true;
    }
}

// Enable all controls
function enableControls() {
    controls = document.getElementsByClassName('control');
    for (let i = 0; i < controls.length; i++) {
        controls[i].disabled = false;
    }

    // Also switch the shuffle/asc/desc button group to asc=active
    // since the array is supposed to be sorted now
    document.getElementById('shuffle').classList.remove("active");
    document.getElementById('asc').classList.add("active");
    document.getElementById('desc').classList.remove("active");
}