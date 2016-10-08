(function(global) {

   "use strict";

   global.base.ns("base.logger");

   var suppress = false;

   function exec(type, stuffToLog) {
      if (suppress === false &&
            global.console) {
         global.console[type].apply(global.console, stuffToLog);
      }
   }

   global.base.logger.Logger = {
      suppress: function() {
         suppress = true;
      },
      log: function() {
         exec("log", arguments);
      },
      warn: function() {
         exec("warn", arguments);
      }
   };

})(window);