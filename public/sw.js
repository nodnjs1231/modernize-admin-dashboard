/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}

/* Workbox */
// 루트 경로('/')는 NetWorkFirst 전략, 그 외 모든요청은 NetworkOnly 전략.
// 개발 환경에서 자주 사용하는 설정으로 캐싱으로 인한 문제를 방지하면서 루트 경로에 대해서는 오프라인 지원을 제공함.
define(['./workbox-e43f5367'], (function (workbox) { 'use strict'; //AMD(Asynchronouse Module Define) 으로 Workbox 모듈 로드
  importScripts(); // 추가 스크립트 가져오는 함수. but 비어있어 아무작업도 안함.
  self.skipWaiting(); // 새 서비스 워커가 즉시 활성화 되도록 함.
  workbox.clientsClaim(); // 활성화 즉시 모든 클라이언트를 제어하도록 함.
  workbox.registerRoute("/", new workbox.NetworkFirst({ // 특정 경로에 대한 라우트를 등록하는데 NetworkFirst 전략을 사용.
    "cacheName": "start-url", // 'start-url' 이 라우트에 대한 캐시 이름을 지정.
    plugins: [{ // 캐시 동작을 수정하는 plugin을 정의함.
      cacheWillUpdate: async ({ // 응답을 캐시하기 전에 수정할 수 있는 콜백 함수.
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') { // 'opaqueredirect' 응답을 일반 응답으로 변환하는 로직.
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({ // 모든경로(/.*/i)에 대해 NetworkOnly 전략을 사용하는 라우트를 등록.
    "cacheName": "dev", // 이 라우트에 대한 캐시 이름을 dev로 지정.
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map