---
layout: post
title: JavaScript 비교 연산자 == vs ===
date: 2020-12-24 +0900
categories: JavaScript
sitemap:
  changefreq: daily
  priority: 1.0
---

---

---

<br>

## 동등 비교 연산자 vs 일치 비교 연산자

---

동등 비교 연산자(loose equality): `==`

일치 비교 연산자(strict equality): `===`

둘의 차이는 비교하는 **엄격성**의 정도가 다르다. 기본적으로 자바스크립트 엔진은 비교 연산 시 암묵적으로 타입이 자동 변환되기도 한다. 이를 **암묵적 타입 변환**이라고 한다.

`==`는 좌항과 우항의 피연산자를 비교할 때 먼저 암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교한다.

그에 반면 `===`는 좌항과 우항의 피연산자가 타입도 같고 값도 같은 경우에 한하여 `true`를 반환한다.

```jsx
5 == 5; // true
5 == "5"; // true

"0" == ""; // false
0 == ""; // true

false == "false"; // false
false == "0"; // true
false == null; // false
false == undefined; // false

//---------------------------------------------------------------------------

5 === 5; // true
5 === "5"; // false

"0" === ""; // false
0 === ""; // false

false === "false"; // false
false === "0"; // false
false === null; // false
false === undefined; // false
```

이 외에 주의해야 할 것은 `NaN` 이다.

`NaN`은 자신과 일치하지 않은 유일한 값으로 조사하려면 빌트인 함수 `isNaN`을 사용

```jsx
NaN === NaN; // false

isNaN(NaN); // true
```

> NaN은 전역 객체의 속성입니다. 즉 전역 스코프의 변수입니다. NaN의 초기값은 Not-A-Number(숫자가 아님)로, Number.NaN의 값과 같습니다. - [NaN - JavaScript - MDN - Mozilla](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/NaN)

<br>

**따라서 비교 연산 시 `===` 사용을 권장하며, 명시적인 형 변환에 신경써줘야 한다.**

<br>

### Reference

모던 자바스크립트 Deep Dive -이웅모-
