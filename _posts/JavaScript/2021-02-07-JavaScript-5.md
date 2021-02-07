---
layout: post
title: JavaScript window 객체 정리
date: 2021-02-07 +0900
categories: JavaScript
sitemap:
  changefreq: daily
  priority: 1.0
---

---

<br>

> Window 인터페이스는 DOM 문서를 담은 창을 나타낸다.

[https://developer.mozilla.org/ko/docs/Web/API/Window](https://developer.mozilla.org/ko/docs/Web/API/Window)

`document`속성이 창에 불러온 DOM 문서를 가리킨다면, `window`는 창, 전체 브라우저 창을 가리킨다.

또한 `window` 인터페이스는 자바스크립트 내 모든 객체들의 조상격으로 전역객체다.

전역 객체들 → [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference)

<br>

### `window.open()`

---

```jsx
var window = window.open(url, windowName, [windowFeatures]);
```

브라우저에 `windowName`으로 `url`을 로드시킨다. 이때 브라우저 창이 열려있으면 새 탭에 열리고, 없으면 새로운 브라우저가 열린다. 3번째 매개변수는 열릴 `window`의 크기, 스크롤 바 유무 등 다양한 속성 값을 지정할 수 있다. 저장된 `window` 변수로 열린 창에 접근할 수 있다.

<br>

### `window.close()`

---

열린 윈도우 창을 닫는다. 이때 이전에 `window.open()`이 담겨있던 변수에 사용하면, 그 창을 닫을 수 있다.

<br>

### `window.location`

---

읽기 전용인 `Location` 오브젝트를 얻어올 수 있다.

```jsx
> let loc = window.location
undefined
> loc
Location {ancestorOrigins: DOMStringList, href: "https://www.naver.com/", origin: "https://www.naver.com", protocol: "https:", host: "www.naver.com", …}
ancestorOrigins: DOMStringList {length: 0}
assign: ƒ assign()
hash: ""
host: "www.naver.com"
hostname: "www.naver.com"
href: "https://www.naver.com/"
origin: "https://www.naver.com"
pathname: "/"
port: ""
protocol: "https:"
reload: ƒ reload()
replace: ƒ replace()
search: ""
toString: ƒ toString()
valueOf: ƒ valueOf()
Symbol(Symbol.toPrimitive): undefined
__proto__: Location
```

- `location.href` : `location` 객체에 담긴 url 주소
- `location.assign()` : 새 페이지로 이동

```jsx
location.assign("http://www.mozilla.org"); // 또는
location = "http://www.mozilla.org";
```

- `location.reload(true)` : 현재 페이지 새로고침
- `location.replace()` : 현재 리소스를 제공된 URL의 리소스로 바꿈(새 페이지로 이동). `assign()`과 차이점은 현재 페이지가 세션 기록에 저장되지 않기 때문에 뒤로가기 버튼을 눌러도 이전 페이지로 되돌아 갈 수 없다.

<br>

### `window.innerWidth`, `window.innerHeight`, `window.outerWidth`, `window.outerHeight`

---

<img src="{{'/public/img/javascript/javascript-5-1.png'}}">

출처 : [https://sometimes-n.tistory.com/22](https://sometimes-n.tistory.com/22)

`window.open()` 에서 3번째 매개변수 값으로 `width`, `height`를 설정하면, 위 스크린샷에서 파란색 박스인 `innerWidth`, `innerHeight` 값이 된다.

<br>

### `window.history()`

---

History 객체로의 참조를 반환. History 객체는 브라우저의 세션 기록(현재 페이지를 불러온 탭 혹은 프레임이 방문했던 페이지)을 조작할 때 사용

- `history.back()` : 방문 기록의 뒤로(이전 페이지 버튼)
- `history.forward()` : 방문 기록의 앞으로(다음 페이지 버튼)
- `history.go()` : 세션 기록에서 현재 페이지의 위치를 기준으로, 상대적인 거리에 위치한 특정 지점까지 이동

```jsx
history.go(-1); // back()과 동일)
history.go(1); // forward()와 동일
```

- `history.length` : 방문 기록 스택의 크기 반환
