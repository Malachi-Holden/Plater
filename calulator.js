export default calculatePlates = (platesArray, desiredWeight)=>{
  //plates array should be sorted for efficiency, but not required

  let resultArray = [];
  let currentSum = 0;
  for (weight of platesArray){
    if (currentSum + weight === desiredWeight){
      resultArray.push(weight);
      return resultArray;
    }
    if (currentSum + weight <= desiredWeight){
      resultArray.push(weight);
      currentSum += weight;
      continue;
    }
  }
  return calculatePlatesBruteForce(platesArray, desiredWeight);
}

const dotProduct = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

export const calculatePlatesBruteForce = (platesArray, desiredWeight)=>{
  let hasWeightArray = new Array(platesArray.length).fill(0);
  
  while (true){
    if (dotProduct(hasWeightArray, platesArray) === desiredWeight){
      return platesArray.filter((x, i)=>hasWeightArray[i]===1);
    }

    let weightIndex = 0;
    while (hasWeightArray[weightIndex] === 1){
      hasWeightArray[weightIndex] = 0;
      weightIndex ++;
      if (weightIndex >= hasWeightArray.length){
        return platesArray.filter((x, i)=>hasWeightArray[i]===1);
      }
    }
    hasWeightArray[weightIndex] = 1;
  }
}
