// ==UserScript==
// @name           jx-google-play-breaker-dev
// @version        0.0.0
// @namespace      https://github.com/JenieX/user-js-next
// @description    Break the scrips on Google Play store and linkify the screenshot images.
// @author         JenieX
// @match          https://play.google.com/*
// @run-at         document-start
// @noframes
// @compatible     chrome Violentmonkey
// @compatible     edge Violentmonkey
// @supportURL     https://github.com/JenieX/user-js-next/issues
// @homepageURL    https://github.com/JenieX/user-js-next/tree/main/google-play-breaker
// @icon           http://www.google.com/s2/favicons?domain=play.google.com&sz=128
// @license        MIT
// ==/UserScript==

let url = 'http://192.168.0.39:1013/google-play-breaker';

if (navigator.userAgent.includes('Firefox')) {
  const exposerUUID = sessionStorage.getItem('exposerUUID').slice(0, -1);
  url = exposerUUID + '/google-play-breaker/dist/google-play-breaker.bundle.js';
}

fetch(url)
  .then((response) => response.text())
  .then((responseText) => eval(responseText))
  .catch((exception) => console.error(exception));
