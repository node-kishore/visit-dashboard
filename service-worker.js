"use strict";var precacheConfig=[["/index.html","9a4eaf801a85324effdbc266b91a42b9"],["/static/css/main.7c0b416a.css","45405421ac2b29c288ab7ef097d87a4a"],["/static/js/main.af2d91ef.js","fbdffa8cf75951eae52f71b636c13cf6"],["/static/media/FontsFreeNetProximaNovaSbold.31aa90f6.ttf","31aa90f6839f31f3bc416a199b02acd6"],["/static/media/FontsFreeNetProximaNovaSbold.5319f23b.svg","5319f23b4553457ca1f7d2a6f7bdcb27"],["/static/media/FontsFreeNetProximaNovaSbold.749c0bd5.eot","749c0bd5f48097dece9d560dc8b40ae9"],["/static/media/FontsFreeNetProximaNovaSbold.e04688ad.woff2","e04688ad43dd3c85cfa42cc7beaf039d"],["/static/media/FontsFreeNetProximaNovaSbold.f842d7c8.woff","f842d7c8b58825aaf92d588c7b3940af"],["/static/media/ProximaNovaRegular.5808a0f1.ttf","5808a0f10c1e5b93fbbdaf151b2565ca"],["/static/media/ProximaNovaRegular.d4516060.woff2","d45160601341aacb08d1109dea56f563"],["/static/media/ProximaNovaRegular.d54c9e44.woff","d54c9e44378204b06bdb23348c1a8cd0"],["/static/media/ProximaNovaRegular.e0a12f68.eot","e0a12f68ccb668ebe5ceb83a2484cbeb"],["/static/media/ProximaNovaRegular.fc406875.svg","fc406875387de30826808279a4888265"],["/static/media/account.f456fa79.svg","f456fa7942eb19bbba326343de28b26e"],["/static/media/calendar.b8c78a46.svg","b8c78a46d6b5a0a41cfd22e6f1bc5ac7"],["/static/media/calendar_mydata.8bef0d8f.svg","8bef0d8feac9cc2f32526c3f0921f911"],["/static/media/check.4174c9b6.svg","4174c9b6a80481db70a08816426c0815"],["/static/media/expand-button.190af4f6.svg","190af4f612f11cbbf95f88caab101cfc"],["/static/media/finger_touching_screen.ad60748b.svg","ad60748b7c848608c9f727d54573f222"],["/static/media/glyphicons-halflings-regular.448c34a5.woff2","448c34a56d699c29117adc64c43affeb"],["/static/media/glyphicons-halflings-regular.89889688.svg","89889688147bd7575d6327160d64e760"],["/static/media/glyphicons-halflings-regular.e18bbf61.ttf","e18bbf611f2a2e43afc071aa2f4e1512"],["/static/media/glyphicons-halflings-regular.f4769f9b.eot","f4769f9bdb7466be65088239c12046d1"],["/static/media/glyphicons-halflings-regular.fa277232.woff","fa2772327f55d8198301fdb8bcfc8158"],["/static/media/house_visiting.36391090.svg","363910903ea5db94fac68053413af3fd"],["/static/media/loader.0836a709.gif","0836a7092d9abdd9cb606306ccee3159"],["/static/media/loading.19596999.svg","1959699937d892ef91f6c8a8ada997f6"],["/static/media/login_bg.4e5efc0c.jpg","4e5efc0ce7722911dd4e1a0c2c6ad2d4"],["/static/media/logo.3da56580.png","3da56580681f5eda76a5c74898918a2f"],["/static/media/search.81131bd5.svg","81131bd5456e2acb8f80af76d4e9e52b"],["/static/media/side_nav_bg_img.4590c2a1.png","4590c2a19b153d01e2d6883b57255eb2"],["/static/media/uncheck.e419aaae.svg","e419aaaee1086f3bed51082284c42765"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,c){var n=new URL(e);return c&&n.pathname.match(c)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],c=new URL(a,self.location),n=createCacheKey(c,hashParamName,t,/\.\w{8}\./);return[c.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(c){return setOfCachedUrls(c).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return c.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),c="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,c),e=urlsToCacheKeys.has(t));var n="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});