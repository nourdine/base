(function(global, $) {

   "use strict";

   global.base.NS("base.ui");

   var duration = 1000000;
   var cookies = base.persistency.Cookies;
   var rootSelector = "warn-once";
   var cookieName = "c_a"; // cookies acceptance... or something
   var initialized = false;

   function setCookie() {
      cookies.create(cookieName, "true", duration, document.domain);
   }

   var K = base.ui.WarnOnce = {};

   K._HTMLtemplate = '<div class="' + rootSelector + '">\n\
                            <div class="wrapper">\n\
                                <span class="text"></span>\n\
                                <span class="close"></span>\n\
                            </div>\n\
                        </div>';

   K._attachEvents = function() {
      var self = this;
      this._$root.find('.close').on('click', function() {
         setCookie();
         self.close();
      });
      this._$root.find('a').on('click', function(e) {
         e.preventDefault();
         setCookie();
         window.location = this.href;
      });
   };

   /**
    * To be executed at page onload event!
    * 
    * @param {string/HTMLElement} message A string or an HTML element containing the message.
    */
   K.init = function(message, closeLabel) {
      if (!initialized && !cookies.has(cookieName)) {
         $('body').prepend(this._HTMLtemplate);
         this._$root = $('.' + rootSelector);
         this._$root.hide();
         this._$root.find(".text").html(message);
         this._$root.find(".close").html(closeLabel);
         this._attachEvents();
         this.open();
         initialized = true;
      }
   };

   /**
    * Open up the warning
    */
   K.open = function() {
      this._$root.slideDown();
   };

   /**
    * Shuts the warning
    */
   K.close = function() {
      this._$root.slideUp();
   };

})(window, jQuery);