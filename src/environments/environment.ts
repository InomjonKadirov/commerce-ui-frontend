// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiEndPoint: 'http://localhost:8090/',
  firebase: {
    apiKey: 'AIzaSyDLvCYzswnf0YANKJs2bc1qOLpJLnXRtlw',
    authDomain: 'credo-mobile.firebaseapp.com',
    databaseURL: 'https://credo-mobile.firebaseio.com',
    projectId: 'credo-mobile',
    storageBucket: 'credo-mobile.appspot.com',
    messagingSenderId: '382780918747',
    appId: '1:382780918747:web:e7e4ba735beb94296235fe',
    measurementId: 'G-1HRKXQH8C5'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
