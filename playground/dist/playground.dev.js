// ==UserScript==
// @name           jx-playground-dev
// @version        0.0.0
// @namespace      https://github.com/JenieX/user-js-next
// @description    Awesome script!
// @author         JenieX
// @match          *://*/*
// @match          file:///*
// @run-at         document-start
// @noframes
// @compatible     chrome Violentmonkey
// @compatible     edge Violentmonkey
// @supportURL     https://github.com/JenieX/user-js-next/issues
// @homepageURL    https://github.com/JenieX/user-js-next/tree/main/playground
// @icon           https://violentmonkey.github.io/favicon-32x32.png
// @license        MIT
// ==/UserScript==

let url = 'http://192.168.0.39:1013/playground';

if (navigator.userAgent.includes('Firefox')) {
  const exposerUUID = sessionStorage.getItem('exposerUUID').slice(0, -1);
  url = exposerUUID + '/playground/dist/playground.bundle.js';
}

fetch(url)
  .then((response) => response.text())
  .then((responseText) => eval(responseText))
  .catch((exception) => console.error(exception));
