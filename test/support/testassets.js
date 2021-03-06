// Copyright 2017 Eyevinn Technology. All rights reserved
// Use of this source code is governed by a MIT License
// license that can be found in the LICENSE file.
// Author: Jonas Birme (Eyevinn Technology)

function loadAsset(file) {
  return new Promise((resolve, reject) => {
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(event) {
      const xhr = event.currentTarget;
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          data = xhr.response;
          const view = new Uint8Array(data);
          resolve(view);
        } else {
          reject("Unable to load fixture: " + file)
        }
      }
    };
    const url = "http://localhost:9876/base/test/support/testassets/" + file;
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.send();
  });
}

const TestAssets = function constructor() {
  this.assets = [];
};

TestAssets.prototype.init = function() {
  return new Promise((resolve, reject) => {
    loadAsset("seg-10s.ts").then((data) => {
      this.assets.push({ name: "seg-10s", data: data });
      return loadAsset("seg2-10s.ts");
    }).then((data) => {
      this.assets.push({ name: "seg2-10s", data: data });
      return loadAsset("ysad01.ts");
    }).then((data) => {
      this.assets.push({ name: "ysad01", data: data });
      resolve();
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  });
};

TestAssets.prototype.getAssetByName = function(name) {
  return this.assets.find((n) => {
    return n.name === name;
  });
};

module.exports = TestAssets;