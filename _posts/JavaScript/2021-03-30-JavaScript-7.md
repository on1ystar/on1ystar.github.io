---
layout: post
title: Javascript isNaN() vs Number.isNaN() - 신뢰성 있는 NaN 판별
date: 2021-03-30 +0900
categories: JavaScript
sitemap:
  changefreq: daily
  priority: 1.0
---

---

<div class="intro" >

의문점이나 지적 등의 관심 및 조언을 위한 댓글이나 메일은 언제나 환영이고 감사합니다.

</div>

<div class="text-to-center text-shadow-blue">What is the NaN</div>

`NaN` 값은 산술 연산이 정의되지 않은 결과 또는 표현할 수 없는 결과를 도출하면 생성된다.

> NaN은 전역 객체의 속성입니다. 즉 전역 스코프의 변수입니다.

- 초기값은 Not-A-Number(숫자가 아님) = `Number.NaN`
- `NaN`은 설정 불가, 쓰기 불가 속성

<div class="text-to-center text-shadow-blue">NaN을 반환하는 연산</div>

1. 숫자로서 읽을 수 없음 ex) `parseInt("어쩌구")`, `Number(undefined)`

2. 결과가 허수인 수학 계산식 ex) `Math.sqrt(-1)`

3. 피연산자가 `NaN` ex) `7 ** NaN`

4. 정의할 수 없는 계산식 ex) `0 * Infinity`, `0 / 0`

5. 문자열을 포함하면서 덧셈이 아닌 계산식 ex) `"가" / 3`

<div class="text-to-center text-shadow-blue">NaN 판별</div>

사실 `NaN`에 의해 오류가 주로 발생할 수 있는 경우로 `NaN`을 정확하게 이해해야 하고 있어야 하는 이유다. 예상치 못한 곳에서 `NaN`에 의한 오류가 발생해 버리면 발견하기도 쉽지 않다.

`NaN`은 다른 모든 값과 비교(==, !=, ===, !==)했을 때 같지 않으며, **다른 `NaN`과도 같지 않다.**

따라서 `NaN`을 올바르게 판별하기 위한 방법을 알고 있으면 유용하다.

<br>

<div class="text-shadow-orange"><h2>isNaN()</h2></div>

`isNaN()` 함수는 어떤 값이 NaN인지 판별

인수가 `Number` 형이 아닌 경우, 그 값은 먼저 숫자로 형 변환 후, `NaN`인지 판별하기 때문에 예상치 못한 결과를 내기도 함

```jsx
isNaN(NaN); // 참
isNaN(undefined); // 참, Number(undefined)가 NaN을 반환하기 때문
isNaN({}); // 참, Number({})가 NaN을 반환하기 때문

isNaN(true); // 거짓
isNaN(null); // 거짓
isNaN(37); // 거짓

isNaN("123ABC"); // 참: parseInt("123ABC")는 123이지만 Number("123ABC")는 NaN을 반환
isNaN(""); // 거짓: Number("")는 NaN이 아닌 0을 반환
isNaN(" "); // 거짓: Number(" ")는 NaN이 아닌 0을 반환
isNaN("abc"); // 참: Number("asd")는 NaN 반환
```

위의 예시만 보더라도 `NaN`을 판단하기에는 상당히 신뢰할 수 없게 된다.

<br>

<div class="text-shadow-orange"><h2>Number.isNaN()</h2></div>

기존부터 `isNaN()` 함수의 더 엄격한 버전

`Number.isNaN()`은 강제로 매개변수를 숫자로 변환하지 않고, 주어진 값의 유형이 `Number`이고 값이 `NaN`이면 `true`, 아니면 `false`

```jsx
Number.isNaN(NaN); // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0); // true

Number.isNaN(true); // false
Number.isNaN(null); // false
Number.isNaN(37); // false
Number.isNaN("37"); // false
Number.isNaN("37.37"); // false
Number.isNaN(""); // false
Number.isNaN(" "); // false

// isNaN()으로는 true
Number.isNaN("NaN"); // false
Number.isNaN(undefined); // false
Number.isNaN({}); // false
Number.isNaN("abc"); // false
```

<br>

<div class="text-shadow-orange"><h2>자기 자신과의 비교</h2></div>

오로지 `NaN`만이 자기자신과 비교했을 때 같지 않기 때문에 이를 이용하는 것도 신뢰성 있는 하나의 방법이다.

```jsx
function valueIsNaN(v) {
  return v !== v;
}
valueIsNaN(1); // false
valueIsNaN(NaN); // true
valueIsNaN(Number.NaN); // true
```

<br>

### Reference

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/NaN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/NaN)

[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/isNaN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/isNaN)

[모던 자바스크립트 Deep Dive - 이웅모](http://www.yes24.com/Product/Goods/92742567)
