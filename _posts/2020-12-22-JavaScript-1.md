---
layout: post
title: JavaScript var vs. let vs. const
date: 2020-12-22 +0900
categories: JavaScript
---

---

<br>

## `var` 변수의 문제점

---

### → 변수 중복 선언 허용

```jsx
var x = 1;
var y = 1;

var x = 100;
var y;

console.log(x); // 10
console.log(y); // 1
```

### → 함수 레벨 스코프

```jsx
var i = 1;

if (true) {
  var i = 10;
}

console.log(i); // 10

for (var i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

console.log(i); // 5
```

이로 인해 전역변수가 남발하게 됨

### → 변수 호이스팅

_변수 호이스팅(Variable hoisting): 변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징_

```jsx
console.log(foo); // undefined -> 본래는 참조 에러(ReferenceError)가 발생해야 납득

foo = 123; // 변수 중복 선언처럼 동작

console.log(foo); // 123

var foo;
```

`var` 키워드로 변수를 선언하면 **변수 호이스팅**에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작. 즉, 변수 호이스팅에 의해 `var` 키워드로 선언한 변수는 **변수 선언문 이전에 참조**할 수 있다.

자바스크립트는 인터프리터 언어다. 하지만 변수 선언은 **런타임**이 아니라 그 이전 단계인 **소스코드 평가 과정** 시에 실행된다.

<br>

## `let` 키워드

---

### → 변수 중복 선언 금지

`SyntexError: Identifier 'variable' has already been declared` 에러 발생

### → 블록 레벨 스코프

### → 변수 호이스팅

`let` 키워드로 선언한 변수는 **변수 호이스팅**이 발생하지 않는 것처럼 동작(실제로는 동작)

자바스크립트 엔진은 **소스코드 평가**와 **소스코드 실행** 두 단계로 나누어 처리한다.

**소스코드 평가** 시 암묵적으로 "선언 단계"와 "초기화 단계"가 한번에 진행된다. 만약 `var` 키워드로 변수를 선언만 해도 자동으로 실행 컨텍스트의 렉시컬 환경에 `undefined`로 초기화 시켜놓는다.

```jsx
// var foo; -> 소스코드 평가 과정에 의해 먼저 실행, foo 변수가 선언되고 undefined로 초기화
console.log(foo); // undefined

var foo; // 런타임 시 제외

console.log(foo); // undefined
foo = 1;
console.log(foo); // 1
```

하지만 `let` 키워드로 선언된 변수는 "선언 단계"와 "초기화 단계"가 분리되어 진행된다.

```jsx
// var foo; -> 소스코드 평가 과정에 의해 먼저 실행되지만 선언 단계까지만 실행
console.log(foo); // ReferenceError: Cannot access 'foo' before initialization(TDZ)

var foo; // 런타임 시 초기화 단계가 실행되어 undefined로 초기화

console.log(foo); // undefined
foo = 1;
console.log(foo); // 1
```

> 일시적 사각지대(Temporal Dead Zone; TDZ): 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간

### → `let` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아님

_이 내용은 추후 더 공부한 후 추가_

<br>

## `const` 키워드

---

### → 상수이기 때문에 반드시 선언과 동시에 초기화해야 한다.

### → 블록 레벨 스코프, 변수 호이스팅이 발생하지 않는 것처럼 동작

### → 재할당 금지

### → `const` 키워드와 객체

`const` 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다. 이는 **변경 불가능한 값인 원시 값**은 재할당 없이 변경할 수 있는 방법이 없지만 **변경 가능한 값인 객체**는 재할당 없이도 직접 변경이 가능하기 때문

재할당 금지와 "불변"은 다른 의미. `const` 키워드는 재할당을 금지할 뿐.

<br>

## 변수 선언 키워드 권장 사항

---

- `var` 키워드는 되도록 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 `let` 키워드 사용
- 재할당이 필요 없는 상수인 원시 값이나 객체에는 `const` 키워드 사용

<br>

### Reference

모던 자바스크립트 Deep Dive -이웅모-
