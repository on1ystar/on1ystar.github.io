const testArr = [1, 2, 3];

testArr.forEach((item, index, arr) => {
  item += 1;
  console.log(
    `요소값: ${item}. 인덱스: ${index}, this: ${JSON.stringify(arr)}`
  );
});

testArr.forEach((item, index, arr) => {
  arr[index] += 1;
  console.log(
    `요소값: ${item}. 인덱스: ${index}, this: ${JSON.stringify(arr)}`
  );
});
