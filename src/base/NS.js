(function(global) {

   "use strict";
   
   global["base"] = {};
   
   /**
    * Create a namespace (if not exisitng) from a dot separate kinda string.
    * 
    * @param {String} namespace
    * @returns {Object}
    */
   global.base.NS = function(namespace) {
      var o = window,
      i, j, d;
      d = namespace.split(".");
      for (j = 0; j < d.length; j = j + 1) {
         o[d[j]] = o[d[j]] || {};
         o = o[d[j]];
      }
      return o;
   };

})(window);