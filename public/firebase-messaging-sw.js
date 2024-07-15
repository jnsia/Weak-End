importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

const firebaseConfig = {
    apiKey: 'dummy_value',
    authDomain: 'dummy_value',
    databaseURL: 'dummy_value',
    projectId: 'dummy_value',
    storageBucket: 'dummy_value',
    messagingSenderId: 'dummy_value',
    appId: 'dummy_value'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
    body: payload.body,
    // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
