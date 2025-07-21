//Requirements:
// 1. Count the frequency of each number in the list
// 2. Print the frequency of each number in the list

// Input: Array of numbers (A)

// Output: Object with two properties:
// - frequency: Array of frequencies
// - numbers: Array of numbers
// output example: { frequency: [...], numbers: [...] }

function calculateNumberFrequency(A) {

  // Two ways to do this: 
  // Faster approach:
  // This is the original approach I had written. The logic is correct, but it's not the most efficient. 
  // Basically, I am looping through the range and counting the matching elements using the filter method of the array. 
  // The benefit of this is that there is no additional data structure that I needed to create. I could work directly with the 
  // input array. This also made it easier to map the requirements to the problem description.


  /*const frequency = [];

  // const min = Math.min(...A);
  // const max = Math.max(...A);

  for (let i = min; i <= max; i++) {
    frequency.push(A.filter(x => x === i).length);
  }

  return {
    frequency,
    // I created an array that takes the index i and adds to the min to get the numbers.
    numbers: Array.from({ length: max - min + 1 }, (_, i) => i + min)
  };*/

  // More Efficient 
  // This is the more efficient approach when dealing with large arrays.
  // The logic is that I am creating a frequency map that maps the number to the frequency.
  // Then, I am looping through the range and pushing the number and the frequency to the frequency and numbers arrays.
  // The benefit of this is that I am not looping through the array multiple times. As the array grows, the time complexity 
  // of this approach will be better. The downside is that I am creating an additional data structure that I need to work with 
  // which requires more memory. This also made it harder to map the requirements to the problem description.

  // If the array is empty, return an empty array
  if (A.length === 0) return { frequency: [], numbers: [] };

  // I need to find the min and max of the array to loop through the range.
  const min = Math.min(...A);
  const max = Math.max(...A);

  const frequency = [];
  const numbers = [];

  // Here i create the frequency map and looped over the numbers to count how many times each number appears in the array.
  const freqMap = {};
  for (const num of A) {
    freqMap[num] = (freqMap[num] || 0) + 1;
  }

  // Here I looped over the range and pushed the number and the frequency to the frequency and numbers arrays.
  for (let i = min; i <= max; i++) {
    numbers.push(i);
    frequency.push(freqMap[i] || 0);
  }

  return { frequency, numbers };
}

// Bonus: I created the graph of * to represent the frequency of the number.
// Input: 
// Object with two properties:
// - frequency: Array of frequencies
// - numbers: Array of numbers
// Output: Graph of stars

// Example:
// Input: { frequency: [1, 2, 3, 4], numbers: [1, 2, 3, 4] }
// Output: Graph of stars


function renderFrequencyGraph(results) {
  const { frequency, numbers } = results;

  // First I need to get the max height of the graph.
  const maxHeight = Math.max(...frequency);

  // I need to get the max width of the numbers. So I looked for the longest number in the numbers array.
  const maxLabelLen = Math.max(...numbers.map(n => String(n).length));
  // Added a single space for additional styling.
  const colWidth = maxLabelLen + 1;

  const graph = [];
  // This is to print the graph of stars  
  // I started from the top and print down the graph
  for (let level = maxHeight; level > 0; level--) {
    let row = '';
    // I looped over the frequency array and if it was high enough to show a star on this row I added a star to the row.
    for (let freq of frequency) {
      let character = freq >= level ? '*' : ' ';
      // I ran into an issue here where the numbers were not aligning with the stars. Ended up using padStart to pad the characters.
      row += character.padStart(colWidth, ' ');
    };
    graph.push(row);
  };

  // This is to print the numbers below the graph.
  let numberRow = '';
  for (let num of numbers) {
    // same as above, but for the numbers.
    numberRow += String(num).padStart(colWidth, ' ');
    
  };
  graph.push(numberRow);
  return graph.join('\n');
};


// Command line support
// Example: node src/frequency.js 1,2,3,4
// Output: Frequency: 1, 1, 1, 1
//         Number:   1, 2, 3, 4
//         Graph:    of stars

// Command line support
if (require.main === module) {
  const inputArg = process.argv[2];
  if (!inputArg) {
    console.error('Please provide a comma-separated list of numbers as an argument.');
    process.exit(1);
  }
  const A = inputArg.split(',').map(Number);
  const result = calculateNumberFrequency(A);

  const { frequency, numbers } = result;

  // I also needed to fix the alignment of the numbers and frequencies.
  // To do this, I needed to compute the width of each column, and then add the padding to the numbers and frequencies just like I will do with the stars.
  // I computed the longest number and frequency.
  const colWidths = numbers.map((num, i) => {
    return Math.max(
      String(frequency[i]).length,
      String(num).length
    );
  });

let freqLine = 'Frequency: ';
let numLine  = 'Number:    ';
let graphLine  = 'Graph:';

// Here I added the padding to the numbers and frequencies.
for (let i = 0; i < numbers.length; i++) {
  const width = colWidths[i];
  // pad both freq and num to width
  freqLine += frequency[i].toString().padStart(width, ' ');
  numLine  += numbers[i].toString().padStart(width, ' ');
  
  // add a separator on all but the last
  if (i < numbers.length - 1) {
    freqLine += ', ';
    numLine  += ', ';
  }
}

console.log(freqLine);
console.log(numLine);

console.log(graphLine)

console.log(renderFrequencyGraph(result));
}

module.exports = { calculateNumberFrequency, renderFrequencyGraph };