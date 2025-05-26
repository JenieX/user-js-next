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

const isTor = sessionStorage.getItem('isTor') === 'true';

const exposerUUID = sessionStorage.getItem('exposerUUID')?.slice(0, -1);
const isExposed = exposerUUID !== undefined;

let bundleURL = 'http://192.168.0.39:1013/google-play-breaker';

if (isExposed) {
  bundleURL = `${exposerUUID}/google-play-breaker/dist/google-play-breaker.bundle.js`;
}

fetch(bundleURL)
  .then(async (response) => response.text())
  .then(async (code) => {
    if (isExposed) {
      let sourceMapURL = bundleURL.replace('bundle.js', 'source.map');

      const needle = /(MappingURL=)([^?]+)([^\n]+)/;
      let updatedCode;

      if (isTor) {
        sourceMapURL = await createBase64SourceMapURL(sourceMapURL);
        updatedCode = code.replace(needle, `$1${sourceMapURL}`);
      } else {
        updatedCode = code.replace(needle, `$1${sourceMapURL}$3`);
      }

      // eslint-disable-next-line no-eval
      eval(updatedCode);
    } else {
      // eslint-disable-next-line no-eval
      eval(code);
    }
  })
  .catch((exception) => {
    console.error(exception);
  });

/** @param {string} url */
async function createBase64SourceMapURL(url) {
  const response = await fetch(url);
  const blob = await response.blob();

  const jsonBlob = new Blob([blob], { type: 'application/json' });

  const reader = new FileReader();
  await new Promise((resolve, reject) => {
    reader.addEventListener('load', resolve);
    reader.addEventListener('error', reject);
    reader.readAsDataURL(jsonBlob);
  });

  return /** @type {string} */ (reader.result);
}
