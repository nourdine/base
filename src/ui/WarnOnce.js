(function(global, $, base) {

   "use strict";

   global.base.ns("base.ui");

   var duration = 1000000;
   var cookies = base.persistency.Cookies;
   var rootSelector = "warn-once";
   var cookieName = "c_a"; // cookies acceptance... or something
   var initialized = false;
   var deferred;

   function setCookie() {
      cookies.create(cookieName, "true", duration, document.domain);
   }

   var O = base.ui.WarnOnce = {};

   O._HTMLtemplate = '<div class="' + rootSelector + '">\n\
                            <div class="wrapper">\n\
                                <span class="text"></span>\n\
                                <span class="close"></span>\n\
                            </div>\n\
                        </div>';

   O._attachEvents = function() {
      var self = this;
      this._$root.find('.close').on('click', function() {
         setCookie();
         self.close();
         deferred.resolve();
      });
   };

   /**
    * To be executed at page onload event!
    * 
    * @param {string/HTMLElement} message A string or an HTML element containing the message.
    */
   O.init = function(message, closeLabel) {
      deferred = $.Deferred();
      if (!initialized && !cookies.has(cookieName)) {
         $('body').prepend(this._HTMLtemplate);
         this._$root = $('.' + rootSelector);
         this._$root.hide();
         this._$root.find(".text").html(message);
         this._$root.find(".close").html(closeLabel);
         this._attachEvents();
         this.open();
         initialized = true;
      } else {
         deferred.resolve();
      }
      return deferred;
   };

   /**
    * Open up the warning
    */
   O.open = function() {
      this._$root.slideDown();
   };

   /**
    * Shuts the warning
    */
   O.close = function() {
      this._$root.slideUp();
   };

})(window, jQuery, base);
