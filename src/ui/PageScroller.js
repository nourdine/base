(function(global, $) {

   "use strict";

   global.base.ns("base.ui");

   global.base.ui.Navigator = {
      scrollTo: function(pxs, duration, after) {
         duration = duration || 500;
         after = after || function() {
         };
         $("html, body").animate({
            scrollTop: pxs
         }, duration, after);
      }
   };

})(window, jQuery);