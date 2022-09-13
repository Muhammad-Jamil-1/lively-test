const special = ['zeroth', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth'];
const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

const stringifyNumber=(n) => {
  if (n < 20) return special[n];
  if (n === 100) return "hundreth";
  if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + 'ieth';

  return deca[Math.floor(n / 10) - 2] + 'y' + special[n % 10];
}

let mappedArray = [];
for (let i = 0; i <= 100; i++) {
  mappedArray.push(stringifyNumber(i));
}

const chunk = (arr, size) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

const  retrievePartString =(des, inputStr)=> {
  for (let k = 0; k<des.length ; k++) {
    const descriptions = des[k].split(" ");
    const firstNumber = mappedArray.indexOf(descriptions[0]);
    const secondNumber = mappedArray.indexOf(descriptions[1]);
    const strLength = inputStr.length;

    if ((strLength % secondNumber) != 0) {
      //return error
      return undefined;
    }

    const division = strLength / secondNumber;
    let chunksArray = chunk(inputStr.split(""), division);
    inputStr = chunksArray[firstNumber - 1].join("");

  }
  return inputStr;
}

const main = (desc,input) => {
  const desArray = desc.split(" of ");
  const des = desArray.filter(word => word !== "it").reverse();
  let outPut = [];
  for (let j = 0; j < input.length; j++) {
    outPut.push(retrievePartString(des, input[j]));
  }
  return outPut;
}


console.log("first third of [123456789] ", main("first third of it",["123456789"]));
console.log("second fourth of [abcd,abcdefg] ", main("second fourth of it",["abcd", "abcdefgh"]));
console.log("second third of first third of [123456789] ", main("second third of first third of it",["123456789"]));
console.log("third fourth of [abcdef] ", main("third fourth of it",["abcdef"]));
