(function(global) {

   "use strict";

   global.base.NS("base.persistency");

   base.persistency.Cookies = {
      create: function(name, value, hours, domain) {
         var expires = "";
         if (domain) {
            domain = "; domain=" + domain;
         } else {
            domain = "";
         }
         if (hours) {
            var date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
         }
         var str = name + "=" + value + expires + domain + "; path=/";
         document.cookie = str;
      },
      read: function(name) {
         var nameEQ = name + "=";
         var ca = document.cookie.split(';');
         for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
               c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
               return c.substring(nameEQ.length, c.length);
            }
         }
         return null;
      },
      has: function(name) {
         return this.read(name) !== null;
      },
      erase: function(name, domain) {
         this.create(name, "", -1, domain);
      }
   };

})(window);