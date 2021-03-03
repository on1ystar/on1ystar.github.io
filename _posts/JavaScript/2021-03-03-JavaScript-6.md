---
layout: post
title: JavaScript split() - 문자열 나누기
date: 2021-03-03 +0900
categories: JavaScript
sitemap:
  changefreq: daily
  priority: 1.0
---

---

<br>

> 더 자세한 내용은 [MDN 공식 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split) 참고

<br>

## 🔶 `str.split([separator[, limit]])`

주어진 문자열을 `separator`마다 나눈 부분 문자열을 담은 `Array`를 반환한다. _배열의 원소로 담겨진 부분 문자열들은 공백(white space)을 포함함을 주의_

### 🔸 `separator`|Optional: 원본 문자열을 나누기 위한 기준이 되는 부분 문자열

- 실제 문자열이나 정규표현식 가능
- 생략 시, 원본 문자열을 유일한 원소로 가지는 배열 반환
- 원본 문자열에 1회 이상 발견되지 않아도, 원본 문자열을 유일한 원소로 가지는 배열 반환
- 빈 문자열일 경우 각각의 원본 문자를 원소로 가지는 배열 반환
- `separator`가 원본 문자열의 처음이나 끝에 등장할 경우 반환되는 배열도 빈 문자열로 시작하거나 끝남

### 🔸 `limit`|Optional: 나눌 문자열의 최대 개수를 지정하는 정수형

- 반환되는 배열의 원소 개수와 동일
- `limit`개 미만의 원소일 수 있지만, 초과하지는 않음

<br>

## 🔶 간단 예시

```jsx
const str = "I'm always awake.";

const t1 = str.split();
console.log(t1);

const t2 = str.split("");
console.log(t2[3]);

const t3 = str.split(" ");
console.log(t3);

const t4 = str.split(".");
console.log(t4);

const t5 = str.split("a", 3);
console.log(t5);
```

```jsx
> Array ["I'm always awake."]
> " "
> Array ["I'm", "always", "awake."]
> Array ["I'm always awake", ""]
> Array ["I'm ", "lw", "ys "]
```

<br>

## 🔶 문자열을 주어진 `separator`로 끊는 함수

```jsx
function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);

  console.log('The original string is: "' + stringToSplit + '"'); // 원본 문자열
  console.log('The separator is: "' + separator + '"'); // 사용한 구분자
  console.log(
    "The array has " +
      arrayOfStrings.length +
      " elements: " +
      arrayOfStrings.join(" / ")
  ); // 배열의 길이와 각 원소
}
```

<br>

## 🔶 문자열 뒤집기

```jsx
var str = "asdfghjkl";
var strReverse = str.split("").reverse().join(""); // 'lkjhgfdsa'
```

<br>

### REFERENCE

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split)
