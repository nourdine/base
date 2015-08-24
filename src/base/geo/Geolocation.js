(function(global) {

   "use strict";

   global.base.NS("base.geo");

   var options = {
      enableHighAccuracy: true,
      maximumAge: 20000,
      timeout: 10000
   };

   function checkSupport() {
      if (!navigator.geolocation) {
         throw Error("No location api supported by this device");
      }
   }

   function execApiMethod(methodName, onSuccess, onError) {
      return navigator.geolocation[methodName](
            function(position) {
               if (typeof onSuccess === "function") {
                  onSuccess(position);
               }
            },
            function(locationErr) {
               if (typeof onError === "function") {
                  onError(locationErr);
               }
            }, options);
   }

   global.base.geo.Geolocation = {
      /**
       * @param {Object} opt
       * @see `options` for possible keys
       */
      setOptions: function(opt) {
         for (var p in opt) {
            if (opt.hasOwnProperty(p)) {
               options[p] = opt[p];
            }
         }
      },
      /**
       * @param {Function} onSuccess
       * @param {Function} onError
       */
      getCurrentPosition: function(onSuccess, onError) {
         checkSupport();
         execApiMethod("getCurrentPosition", onSuccess, onError);
      },
      /**
       * @param {Function} onSuccess
       * @param {Function} onError
       * @return {Number} watchId
       */
      watchPosition: function(onSuccess, onError) {
         checkSupport();
         return execApiMethod("watchPosition", onSuccess, onError);
      },
      /**
       * @param {Number} id The ID of the timer to clear.
       */
      clear: function(id) {
         navigator.geolocation.clearWatch(id);
      }
   };

})(window);