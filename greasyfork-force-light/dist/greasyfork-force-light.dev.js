// ==UserScript==
// @name           jx-greasyfork-force-light-dev
// @version        0.0.0
// @namespace      https://github.com/JenieX/user-js-next
// @description    Ignore GreasyFork behavior of matching browser theme and force light theme.
// @author         JenieX
// @match          https://greasyfork.org/*
// @run-at         document-start
// @noframes
// @compatible     chrome Violentmonkey
// @compatible     edge Violentmonkey
// @supportURL     https://github.com/JenieX/user-js-next/issues
// @homepageURL    https://github.com/JenieX/user-js-next/tree/main/greasyfork-force-light
// @icon           https://github.com/JenieX/assets/raw/main/icons/greasyfork.png
// @license        MIT
// ==/UserScript==

const isTor = sessionStorage.getItem('isTor') === 'true';

const exposerUUID = sessionStorage.getItem('exposerUUID')?.slice(0, -1);
const isExposed = exposerUUID !== undefined;

let bundleURL = 'http://192.168.0.39:1013/greasyfork-force-light';

if (isExposed) {
  bundleURL = `${exposerUUID}/greasyfork-force-light/dist/greasyfork-force-light.bundle.js`;
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
