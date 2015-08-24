(function(global) {

   "use strict";

   global.base.NS("base.inheritance");

   var F = function() {
   };

   function setProtoSafely(constr, proto) {
      for (var p in proto) {
         if (proto.hasOwnProperty(p)) {
            constr.prototype[p] = proto[p];
         }
      }
   }

   global.base.inheritance.Inherit = {
      /**
       * Classical inheritance model.
       * 
       * @param baseClass     {Function} The constructor to inherit from
       * @param subClass      {Function} The constructor to be extended
       * @param subClassProto {Object}   [OPTIONAL] A literal object containing methods to be added to the subClass prototype
       * 
       * @example
       * 
       * function Human(n) {
       *    this.name = n;
       *    this.getHabitat = function() {
       *       return "planet earth";
       *    }
       * }
       * 
       * Human.prototype.sayHello = function() {
       *    return "hello";
       * }
       * 
       * function FrenchMan() {
       *    Human.call(this, name); // -- foundamental to inherit parent methods like 'getHabitat' defined in-class rather than in the parent's prototype
       * } 
       * 
       * inherit.classically(Human, FrenchMan, {
       *    sayHello: function() {
       *       return "bonjour (" + this.uber.sayHello() + ")";
       *    }
       * });
       * 
       * var laurent = new FrenchMan();
       * laurent.getHabitat();
       * laurent.uber.sayHello();
       * laurent.sayHello();
       */
      classically: function(baseClass, subClass, subClassProto) {
         F.prototype = baseClass.prototype;
         // pass on what's in the prototype of baseClass
         subClass.prototype = new F();
         // a pointer to the prototype of baseClass
         subClass.prototype.uber = baseClass.prototype;
         // set the wiped out constructor reference
         subClass.prototype.constructor = subClass;
         if (subClassProto) {
            setProtoSafely(subClass, subClassProto);
         }
      },
      /**
       * Prototypal inheritance model.
       * 
       * @param  baseObject   {Object} The object to use as model
       * @param  subObject    {Object} [OPTIONAL] The object to augment. If it's not provided the returned object is a simply shallow copy of baseObject
       * @return              {Object} The augmented object
       * 
       * @example
       * 
       * var human = {
       *    walk: function() {
       *       return "I walk";
       *    }
       * };
       * 
       * var italianMan = {
       *    getCockyness: function() {
       *       return "high";  
       *    }
       * };
       * 
       * var frenchMan = inherit.prototypically(human);
       * frenchMan.walk(); // I walk    
       *    
       * inherit.prototypically(human, italianMan);
       * italianMan.walk(); // I walk
       * italianMan.getCockyness(); // high
       */
      prototypically: function(baseObject, subObject) {
         var product = null;
         if (subObject) {
            for (var p in baseObject) {
               if (typeof subObject[p] === "undefined") {
                  subObject[p] = baseObject[p];
               }
            }
            product = subObject;
         } else {
            F.prototype = baseObject;
            product = new F();
         }
         return product;
      },
      /**
       * Prototypal inheritance model applied to a whole list of parent objects.
       * 
       * @param  baseObjects  {Array}  A list of models to emulate.
       * @param  subObject    {Object} [OPTIONAL] The object to augment. If it's not provided the returned object is a simply shallow copy of baseObject
       * @return              {Object} The augmented object
       */
      mixing: function(baseObjects, subObject) {
         var product = subObject || {};
         for (var i = 0, len = baseObjects.length; i < len; i++) {
            product = this.prototypically(baseObjects[i], product);
         }
         return product;
      }
   };

})(window);