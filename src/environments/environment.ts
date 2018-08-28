// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyAuMPNhmMA3czxi4W5X7GQSmscv3dhJDA0",
    authDomain: "sosfirebase-bc120.firebaseapp.com",
    databaseURL: "https://sosfirebase-bc120.firebaseio.com",
    projectId: "sosfirebase-bc120",
    storageBucket: "sosfirebase-bc120.appspot.com",
    messagingSenderId: "1049609704512"
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
