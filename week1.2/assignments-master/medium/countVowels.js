/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) { 
   let count=0;
    str=str.toLowerCase();
    for(let i of str) {
      if(i=='a' || i=='e' || i=='i' || i=='o' || i=='u'){
        count++;
      }
    } 
    return count;
}

module.exports = countVowels;