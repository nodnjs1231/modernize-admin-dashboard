// This code executes in its own worker or thread
self.addEventListener("install", event => {
    console.log("서비스 워커 installed");
 });
 self.addEventListener("activate", event => {
    console.log("서비스 워커 activated");
 });
 self.addEventListner('fetch', event => {
     console.log('데이터 요청(fetch)!', event.request);
 });