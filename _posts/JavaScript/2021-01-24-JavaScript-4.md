---
layout: post
title: JavaScript 현재 위치, 날씨 정보 가져오기
date: 2021-01-24 +0900
categories: JavaScript
sitemap:
  changefreq: daily
  priority: 1.0
---

---

<br>

## 위치 정보 가져오기

---

Navigator - [https://developer.mozilla.org/ko/docs/Web/API/Navigator](https://developer.mozilla.org/ko/docs/Web/API/Navigator)  
Geolocation.getCurrentPosition() - [https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition](https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition)

```jsx
const COORDS = "coords";

function handleGeoSucces(position) {
  console.log(position);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    //
  }
}

function init() {
  loadCoords();
}

init();
```

`navigator.geolocation.getCurrentPosition()` : 현재 위치를 가져와 성공하면 `GeolocationPosition` 객체를 첫 번째 콜백 함수의 매개변수로 전달.

실패하면 두 번째 콜백함수에 `GeolocationPositionError`객체를 매개변수로 전달.

<img src="{{'/public/img/javascript/javascript-4-1.png'}}">

`latitude`: 위도

`longitude`: 경도

위 두 property를 이용해 현재 위치 정보를 얻을 수 있다.

```jsx
// 추가
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// handleGeoSucces 수정
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
}
```

## 날씨 정보 가져오기

---

weather api - [https://openweathermap.org/api](https://openweathermap.org/api)

위 사이트에서 회원가입을 하면 무료로 현재 위치의 날씨 정보를 가져올 수 있는 weather api를 사용할 수 있다.

회원가입을 한 뒤,

<img src="{{'/public/img/javascript/javascript-4-2.png'}}">

API keys 탭에서 Key 값을 복사해 온다.

```jsx
const API_KEY = "";
```

이제 API 탭에 있는 Current Weather Data의 docs를 클릭하면 자세한 api 사용법을 알 수 있다.

[https://openweathermap.org/current](https://openweathermap.org/current)

<img src="{{'/public/img/javascript/javascript-4-3.png'}}">

이전에 위도와 경도 값을 얻었으므로 이를 활용해 위 url에 넣어 요청하면 JSON 형태의 데이터를 reponse 해준다.

자바스크립트를 이용하기 때문에 쉽게 새로고침 없이 request하고 response 받을 수 있다.

이때 사용할 `Fetch API`는 단 한 줄로 http Request나 Response를 비동기 네트워크 통신으로 할 수 있다.

> [https://developer.mozilla.org/ko/docs/Web/API/Fetch*API/Fetch의*사용법](https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Fetch%EC%9D%98_%EC%82%AC%EC%9A%A9%EB%B2%95)

```jsx
// 추가
function getWeather(lat, lon) {
  //  https:// 를 붙여줘야 함
  // 마지막에 &units=metric 를 추가해 주면 미터법으로 단위를 변경해 줌
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
}

// handleGeoSucces 수정
function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude); // 추가
}

// loadCoords 수정
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    // 추가
    const parseCoordes = JSON.parse(loadCoords);
    getWeather(parseCoordes.latitude, parseCoordes.longitude);
  }
}
```

실행한 뒤 Network 탭에 가보면 요청한 url로 response된 걸 확인할 수 있다.

<img src="{{'/public/img/javascript/javascript-4-5.png'}}">

데이터를 활용하기 위해 `fetch`를 수정

```jsx
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);
    });
}
```

<img src="{{'/public/img/javascript/javascript-4-6.png'}}">

이제 이 데이터를 용도에 맞게 쓰면 된다.

### Reference

[https://nomadcoders.co/javascript-for-beginners](https://nomadcoders.co/javascript-for-beginners)
