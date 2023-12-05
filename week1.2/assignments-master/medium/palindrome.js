/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str=str.toLowerCase(); 
  let s=""; 
  for(let i of str){
    if(i.match(/[a-z]/)){
      s+=i;
    }
  }
  let reverseStr=s.split('').reverse().join(''); 
  return s===reverseStr;
}

module.exports = isPalindrome;
