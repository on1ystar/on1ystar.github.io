---
layout: post
title: JavaScript Array 메서드 forEach, map, filter, reduce
date: 2021-01-01 +0400
categories: JavaScript
---

---

<br>

## `forEach`

---

> [Array.prototype.forEach()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

- 주어진 `callback`을 배열에 있는 각 요소에 대해 오름차순으로 한 번씩 실행
- 초기화하지 않은 인덱스 속성에 대해서는 실행하지 않는다. (`map`, `filter`, `reduce` 동일)
- `forEach()`호출을 시작한 뒤 배열에 추가한 요소는 `callback`이 방문하지 않는다.
- 반환값은 언제나 `undefined`
- `break`, `continue`를 사용할 수 없기 때문에 배열의 모든 요소를 빠짐없이 모두 순회하며 중간에 순회를 중단할 수 없다.

`callback` 함수를 호출하면서 3개의 인자를 전달한다. (`map`, `filter` 동일)

```jsx
[1, 2, 3].forEach((item, index, arr) => {
  console.log(
    `요소값: ${item}. 인덱스: ${index}, this: ${JSON.stringify(arr)}`
  );
});
/*
요소값: 1. 인덱스: 0, this: [1,2,3]
요소값: 2. 인덱스: 1, this: [1,2,3]
요소값: 3. 인덱스: 2, this: [1,2,3]
*/
```

`callback` 함수를 이용해 원본 배열을 변경하는 방법

```jsx
const testArr = [1, 2, 3];

testArr.forEach((item, index, arr) => {
  item += 1;
  console.log(
    `요소값: ${item}. 인덱스: ${index}, this: ${JSON.stringify(arr)}`
  );
});
/*
요소값: 2. 인덱스: 0, this: [1,2,3]
요소값: 3. 인덱스: 1, this: [1,2,3]
요소값: 4. 인덱스: 2, this: [1,2,3]
*/
testArr.forEach((item, index, arr) => {
  arr[index] += 1; // 원본 배열(this)인 arr을 이용해 변경
  console.log(
    `요소값: ${item}. 인덱스: ${index}, this: ${JSON.stringify(arr)}`
  );
});
/*
요소값: 1. 인덱스: 0, this: [2,2,3]
요소값: 2. 인덱스: 1, this: [2,3,3]
요소값: 3. 인덱스: 2, this: [2,3,4]
*/
```

<br>

## `map`

---

> [Array.prototype.map()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

- `callback` 함수를 각각의 요소에 대해 한 번씩 호출해 그 함수의 **반환값**으로 **새로운 배열을 생성**
- 원본 배열은 변경되지 않음
- `map` 메서드를 호출한 배열과 `map` 메서드가 생성하여 반환한 배열은 반드시 **1:1 매핑**

`map`은 `sort`와 사용할 때 유용할 수 있음 ([`map`을 활용한 `sort` 효율성 증대](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#map을_사용한_정렬))

```jsx
// 소트 할 배열
var list = ["Delta", "alpha", "CHARLIE", "bravo"];

// 임시 배열은 위치 및 정렬 값이있는 객체를 보유합니다.
var mapped = list.map(function (el, i) {
  return { index: i, value: el.toLowerCase() };
});

// 축소 치를 포함한 매핑 된 배열의 소트
mapped.sort(function (a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});

// 결과 순서를 위한 컨테이너
var result = mapped.map(function (el) {
  return list[el.index];
});
```

<br>

## `filter`

---

> [Array.prototype.filter()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

- `callback` 함수의 반환값이 `ture`인 요소로만 구성된 새로운 배열을 반환
- 원본 배열은 변경되지 않음
- 어떤 요소도 테스트를 통과하지 못하면(모든 반환값이 `false`) 빈 배열 반환

검색 조건에 따른 배열 필터링(쿼리)

```jsx
var fruits = ["apple", "banana", "grapes", "mango", "orange"];

function filterItems(query) {
  return fruits.filter(function (el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
}

console.log(filterItems("ap")); // ['apple', 'grapes']
console.log(filterItems("an")); // ['banana', 'mango', 'orange']
```

배열의 중복된 요소 없애기 → `filter`보단 `Set()` 이용
<br>

## `reduce`

---

> [Array.prototype.reduce()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

- 첫 번째 인자로 `callback` 함수, 두 번째 인자로 초기값을 전달
- `callback` 함수는 아래와 같이 4개의 인자를 받음

```jsx
// 초기값을 사용하지 않은 경우

[0, 1, 2, 3, 4].reduce(function (
  accumulator,
  currentValue,
  currentIndex,
  array
) {
  return accumulator + currentValue;
});
```

<img data-action="zoom" src="/img/2.JPG" >

```jsx
// 초기값을 사용한 경우

[0, 1, 2, 3, 4].reduce(function (
  accumulator,
  currentValue,
  currentIndex,
  array
) {
  return accumulator + currentValue;
},
10);
```

<img src="/img/1.JPG" >

- 하나의 결과값을 반환
- 원본 배열은 변경하지 않음
- 보통 배열 내 요소들을 비교, 계산할 때 사용되지만 `reduce` 함수를 대체할 방법이 있다면 그 방법을 사용하는 것이 더 직관적(예를 들어 **최대값은** `Math.max`, **평탄화는** `Array.flat` 등)
- 주의해야 할 점은 **초기값을 되도록 생략하지 않는 것**이 코드 작성에 안전함

### Reference

모던 자바스크립트 Deep Dive -이웅모-

[MDN](https://developer.mozilla.org/)
