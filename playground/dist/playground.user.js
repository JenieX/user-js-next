// ==UserScript==
// @name           jx-playground
// @version        1.0.0
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
// @updateURL      https://github.com/JenieX/user-js-next/raw/refs/heads/main/playground/dist/playground.meta.js
// @downloadURL    https://github.com/JenieX/user-js-next/raw/refs/heads/main/playground/dist/playground.user.js
// @icon           https://violentmonkey.github.io/favicon-32x32.png
// @license        MIT
// ==/UserScript==

let infoObject;
if (typeof GM !== 'undefined') {
  infoObject = GM.info;
  // eslint-disable-next-line unicorn/no-negated-condition
}
else if (typeof GM_info === 'undefined') {
  infoObject = { script: { name: document.title } };
}
else {
  infoObject = GM_info;
}

const scriptName = infoObject.script.name;

function alert(message) {
  if (message === undefined) {
    window.alert(`[ ${scriptName} ]`);

    return;
  }

  window.alert(`[ ${scriptName} ]\n\n${message}`);
}

async function main() {
  console.log('Hello world!');
}

main().catch((exception) => {
  alert(exception.message);
});
