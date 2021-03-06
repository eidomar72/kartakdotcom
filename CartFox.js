var Cartfox =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if (installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if (!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 52);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if (typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(2)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(30)
  , hide      = __webpack_require__(34)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if (IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if (this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if (typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(21);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if (it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(29);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(27)
  , IE8_DOM_DEFINE = __webpack_require__(35)
  , toPrimitive    = __webpack_require__(46)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if ('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if ('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(38)
  , enumBugKeys = __webpack_require__(32);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(9)
  , defined = __webpack_require__(8);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(8);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cart = __webpack_require__(17).Cart;

var VERSION = '2.0.7';
module.exports = {
  VERSION: VERSION,
  Cart: Cart
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cart = undefined;

var _keys = __webpack_require__(22);

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__(20);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Currency = __webpack_require__(18);
var Handlebars = __webpack_require__(51);
var Queue = __webpack_require__(19).Queue;
var jQuery = __webpack_require__(15);

window.Currency = window.Currency || {};

/** Class representing a cart */

var Cart = function () {
  /**
   * Build a new cart. Also creates a new queue.
   * Default selectors are:
   * cart: '.cart',
   * cartItemCount: "#CartItemCount",
   * cartTotal: ".cartTotal",
   * decreaseQuantity: "#minusOne",
   * increaseQuantity: "#plusOne",
   * addItem: '.addItem',
   * removeItem: '.removeItem',
   * updateItem: '.updateItem'
   * @param {object} cart - The json of the cart for the initial data. Can be set using liquid tags
   * with the json filter. {{ cart | json }}
   * @param {object} selectors - The selectors to update information and for events to listen to.
   */

  function Cart() {
    var cart = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var selectors = arguments[1];
    var options = arguments[2];
    (0, _classCallCheck3.default)(this, Cart);

    this.queue = new Queue();
    this.cart = cart;
    this.selectors = (0, _assign2.default)({}, {
      cart: '.cart',
      cartItemCount: '#CartItemCount',
      cartTotal: '.cartTotal',
      decreaseQuantity: '#minusOne',
      increaseQuantity: '#plusOne',
      itemQuantity: '.item-qty',
      addItem: '.addItem',
      removeItem: '.removeItem',
      updateItem: '.updateItem',
      emptyTemplate: '',
      itemsContainer: ''
    }, selectors);

    this.options = (0, _assign2.default)({}, {
      'moneyFormat': '{{amount}}'
    }, options);

    //  Non Data API keys
    this.createItemArray = this.createItemArray.bind(this);
    this.getItemArray = this.getItemArray.bind(this);
    this.removeStrayCompanions = this.removeStrayCompanions.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateItemById = this.updateItemById.bind(this);
    this.updateItemsByLine = this.updateItemsByLine.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.buildSelectors = this.buildSelectors.bind(this);
    this.itemsArray = [];

    this.removeStrayCompanions();
    this.createItemArray();
    this.buildSelectors(this.selectors);
  }

  /**
   * Build the event listeners and DOMElement selectors.
   * @param {object} selectors - An object that includes all the selectors to use.
   */


  (0, _createClass3.default)(Cart, [{
    key: 'buildSelectors',
    value: function buildSelectors(selectors) {
      /**
       * addItem - Event listener for when the additem event is triggered
       */
      function add(e) {
        e.preventDefault();
        var id = jQuery('select[name=id]').val();
        var quantity = Number(jQuery('input[name=quantity]').val());
        var properties = {};
        if (jQuery('input[name*=properties]').length > 0) {
          jQuery('input[name*=properties]').each(function property() {
            var key = jQuery(this).attr('name').split('[')[1].split(']')[0];
            var value = jQuery(this).val();
            properties[key] = value;
          });
        }
        this.addItem(id, quantity, properties);
      }

      function quickAdd(e) {
        e.preventDefault();
        var itemId = Number(jQuery(this).data('quick-add'));
        var qty = Number(jQuery(this).data('quick-add-qty')) || 1;
        var properties = jQuery(this).data('quick-add-properties');
        var popup = jQuery(this).data('popup-product');
        e.data.cart.addItem(itemId, qty, properties, popup);
      }

      // We are now updating item qty by line position, rather than variant id.
      // This helps when different line item props are set on the same variant
      // within one cart instance. Comment/uncomment the preferred method below:

      // Update qty by variant id
      // function decreaseQuantity(e) {
      //   e.preventDefault();
      //   var qty = Number(jQuery(this).next(e.data.cart.selectors.itemQuantity).text()) - 1;
      //   var itemId = Number(jQuery(this).next(e.data.cart.selectors.itemQuantity).data('item-id'));
      //   e.data.cart.updateItemById(itemId, qty);
      //   if (qty >= 1) {
      //     jQuery(this).next(e.data.cart.selectors.itemQuantity).text(qty);
      //   }
      // }
      // function increaseQuantity(e) {
      //   e.preventDefault();
      //   var qty = Number(jQuery(this).prev(e.data.cart.selectors.itemQuantity).text()) + 1;
      //   var itemId = Number(jQuery(this).prev(e.data.cart.selectors.itemQuantity).data('item-id'));
      //   e.data.cart.updateItemById(itemId, qty);
      // }

      // Update qty by line position
      function decreaseQuantity(e) {
        e.preventDefault();
        var qty = Number(jQuery(this).next(e.data.cart.selectors.itemQuantity).text()) - 1;
        var line = Number(jQuery(this).next(e.data.cart.selectors.itemQuantity).data('line'));
        e.data.cart.updateItemByLine(line, qty);
        if (qty >= 1) {
          jQuery(this).next(e.data.cart.selectors.itemQuantity).text(qty);
        }
      }
      function increaseQuantity(e) {
        e.preventDefault();
        var qty = Number(jQuery(this).prev(e.data.cart.selectors.itemQuantity).text()) + 1;
        var line = Number(jQuery(this).prev(e.data.cart.selectors.itemQuantity).data('line'));
        e.data.cart.updateItemByLine(line, qty);
      }

      // We are now removing items by line position, rather than variant id.
      // This helps when different line item props are set on the same variant
      // within one cart instance. Comment/uncomment the preferred method below:

      // Remove by variant id
      // function remove(e) {
      //   e.preventDefault();
      //   var itemId = Number(jQuery(this).data('item-id'));
      //   var companionKey = jQuery(this).data('companion-key');
      //   e.data.cart.removeById(itemId, companionKey);
      // }

      // Remove by line position
      function remove(e) {
        e.preventDefault();
        var line = Number(jQuery(this).data('line'));
        var companionKey = jQuery(this).data('companion-key');
        e.data.cart.removeItem(line, companionKey);
      }

      function update(e) {
        e.preventDefault();
      }
      try {
        jQuery(document).on('click', selectors.addItem, add.bind(this));
        jQuery(document).on('click', selectors.updateItem, { cart: this }, update);
        jQuery(document).on('click', selectors.removeItem, { cart: this }, remove);
        jQuery(document).on('click', selectors.decreaseQuantity, { cart: this }, decreaseQuantity);
        jQuery(document).on('click', selectors.increaseQuantity, { cart: this }, increaseQuantity);
        jQuery(document).on('click', '[data-quick-add]', { cart: this }, quickAdd);
      } catch (e) {
        console.log('No document');
      }
    }
  }, {
    key: 'getItemArray',
    value: function createItemArray() {
      this.itemsArray = [];
      for (var i = 0; i < this.cart.items.length; i++) {
        var item = this.cart.items[i];
        this.itemsArray.push(item.quantity);
      }
      return this.itemsArray;
    }

  }, {
    key: 'createItemArray',
    value: function createItemArray() {
      this.itemsArray = [];
      for (var i = 0; i < this.cart.items.length; i++) {
        var item = this.cart.items[i];
        this.itemsArray.push(item.quantity);
      }
    }

  }, {
    key: 'removeStrayCompanions',

    /**
     * Get the cart
     */
    value: function removeStrayCompanions() {
      // Remove stray companion products
      var foundChildren = [];
      var foundParents = [];
      var removeChildren = [];
      var removeChildrenLines = this.getItemArray();
      var hasChanged = false;
      for (var i = 0; i < this.cart.items.length; i++) {
        var item = this.cart.items[i];
        if (item.properties) {
          if (item.properties._child_product) {
            foundChildren.push(item.properties._child_product);
          }
          if (item.properties._parent_product) {
            foundParents.push(item.properties._parent_product);
          }
        }
      }
      for (var i = 0; i < foundChildren.length; i++) {
        if (foundParents.indexOf(foundChildren[i]) == -1) {
          removeChildren.push(foundChildren[i])
        }
      }
      for (var i = 0; i < this.cart.items.length; i++) {
        var item = this.cart.items[i];
        if (item.properties) {
          if (item.properties._child_product) {
            if (removeChildren.indexOf(item.properties._child_product) != -1) {
              hasChanged = true;
              removeChildrenLines[i] = 0;
            }
          }
        }
      }
      if (hasChanged) {
        this.updateItemsByLine(removeChildrenLines);
      }
    }
  }, {
    key: 'getCart',

    /**
     * Get the cart
     */
    value: function getCart() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var options = {
        updateCart: true,
        success: callback || this.updateCart,
        type: 'GET'
      };
      this.queue.add('/cart.js', {}, options);
    }

    /**
     * Update cart
     * Fires jQuery event 'cartfox:cartUpdated' and passes the cart to the event when it has completed
     * @param {object} cart - Update the cart json in the object. Will also fire events that update
     * the quantity etc.
     */

  }, {
    key: 'updateCart',
    value: function updateCart(cart) {
      var _updateCart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (cart) {
        this.cart = cart;
        this.createItemArray();
      }
      var moneyFormat = '{{amount}}';
      if (window.Currency.format) {
        if (window.Currency.moneyFormats) {
          var format = window.Currency.format;
          moneyFormat = window.Currency.moneyFormats[window.Currency.currentCurrency][format];
        }
      }
      if (!this.selectors.emptyTemplate) {
        jQuery(document).trigger('cartfox:cartUpdated', [this.cart]);
        if (this.cart.item_count == 0) {
          jQuery(this.selectors.cartItemCount).html('&#9679;');
        } else {
          jQuery(this.selectors.cartItemCount).html(this.cart.item_count);
        }
        jQuery(this.selectors.cartTotal).html('<span class="money">' + Currency.formatMoney(this.cart.total_price, moneyFormat) + '</span>');
        return true;
      }
      var template = jQuery(this.selectors.emptyTemplate).html();
      var itemContainer = jQuery(this.selectors.itemsContainer);
      var cartPageContainer = jQuery('#CartItems');
      jQuery(itemContainer).html('');
      jQuery(cartPageContainer).html('');
      if (this.cart.item_count == 0) {
        jQuery(this.selectors.cartItemCount).html('&#9679;');
      } else {
        jQuery(this.selectors.cartItemCount).html(this.cart.item_count);
      }
      jQuery(this.selectors.cartTotal).html('<span class="money">' + Currency.formatMoney(this.cart.total_price, moneyFormat) + '</span>');
      Handlebars.registerHelper('formatMoney', function (amount) {
        return new Handlebars.SafeString('<span class=\'money\'>' + Currency.formatMoney(amount, moneyFormat) + '</span>');
      });
      Handlebars.registerHelper('image', function (src, size) {
        return concrete.Images.getImageUrl(src, size);
      });
      if (_updateCart) {
        var itemTemplate = template;
        var renderedTemplate = Handlebars.compile(itemTemplate);
        var renderedHTML = renderedTemplate(this.cart);
        jQuery(itemContainer).append(renderedHTML);
        jQuery(cartPageContainer).append(renderedHTML);
      }
      Handlebars.unregisterHelper('formatMoney');
      jQuery(document).trigger('cartfox:cartUpdated', [this.cart]);
      if (window.Shopify && Shopify.StorefrontExpressButtons) {
        Shopify.StorefrontExpressButtons.initialize();
      }
      return true;
    }
    /**
     * Add an item to the cart. Fired when the selector for addItem is fired.
     * Fires a jQuery event cartfox:itemAdded.
     * @param {number} id - The variant or product id you want to add to the cart
     * @param {number} quantity - The quantity of the variant you want to add to the cart.
     * Defaults to 1 if set to less than 1.
     * @param {object} properties - The custom properties of the item.
     */

  }, {
    key: 'addItem',
    value: function addItem(id) {
      var quantity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var popup = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (id === undefined) {
        return false;
      }
      var data = {};
      data.id = id;
      data.quantity = quantity;

      if (properties !== {}) {
        data.properties = Cart.wrapKeys(properties);
      }

      this.queue.add('/cart/add.js', data, { success: function success(lineItem) {
        return jQuery(document).trigger({
          type: 'cartfox:itemAdded',
          popup: popup
        }, [lineItem]);
      } });

      return this.getCart();
    }
  }, {
    key: 'removeItem',
    value: function removeItem(line, companionKey) {
      var data = {};
      data.line = line;
      data.quantity = 0;
      this.queue.add('/cart/change.js', data, {});

      if (companionKey != undefined) {
        $('#PopupCart').addClass('disabled');
        jQuery(document).trigger('cartfox:companionRemoved', [this.cart, companionKey]);
      }
      return this.getCart();
    }
  }, {
    key: 'removeById',
    value: function removeById(id, companionKey) {
      var data = { updates: {} };
      data.updates[id] = 0;
      this.queue.add('/cart/update.js', data, {});

      if (companionKey != undefined) {
        $('#PopupCart').addClass('disabled');
        jQuery(document).trigger('cartfox:companionRemoved', [this.cart, companionKey]);
      }
      return this.getCart();
    }
  }, {
    key: 'updateItemById',
    value: function updateItemById(id, quantity) {
      var data = { updates: {} };
      data.updates[id] = quantity;
      var options = {
        updateCart: true,
        success: [this.updateCart]
      };
      this.queue.add('/cart/update.js', data, options);
      return this.getCart();
    }
  }, {
    key: 'updateItemsById',
    value: function updateItemsById(items) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        success: function success(response) {
          // console.log(response);
        }
      };

      var data = {
        updates: items
      };
      this.queue.add('/cart/update.js', data, options);
      return this.getCart();
    }

    /**
     * Set a cart attribute
     * @param {string} name
     * @param {string} value
     * @param {object} options
     * @returns Nothing
     */
  }, {
    key: 'updateItemByLine',
    value: function updateItemById(line, quantity) {
      var data = {
        line: line,
        quantity: quantity,
      }
      var options = {
        updateCart: true,
        success: [this.updateCart]
      };
      this.queue.add('/cart/change.js', data, options);
      return this.getCart();
    }
  }, {
    key: 'updateItemsByLine',
    value: function updateItemsByLine(items) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        success: function success(response) {
          // console.log(response);
        }
      };
      var data = {
        updates: items
      };

      this.queue.add('/cart/update.js', data, options);
      return this.getCart();
    }

    /**
     * Set a cart attribute
     * @param {string} name
     * @param {string} value
     * @param {object} options
     * @returns Nothing
     */
  }, {
    key: 'setAttribute',
    value: function setAttribute(name, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var attribute = {};
      attribute[name] = value;
      return this.setAttributes(attribute, options);
    }

    /**
     * Set multiple cart attributes by passing them in an object.
     * @param {object} attributes
     * @param {object} options
     */
  }, {
    key: 'setAttributes',
    value: function setAttributes() {
      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (attrs !== {}) {
        var attributes = Cart.wrapKeys(attrs, 'attributes');
        this.queue.add('/cart/update.js', attributes, options);
      }
      return this.getCart();
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(attribute) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var attributes = this.cart.attributes;
      return Object.prototype.hasOwnProperty.call(attributes, attribute) ? attributes[attribute] : defaultValue;
    }
  }, {
    key: 'getAttributes',
    value: function getAttributes() {
      return this.cart.attributes;
    }
  }, {
    key: 'clearAttributes',
    value: function clearAttributes() {
      this.queue.add('/cart/update.js', Cart.wrapKeys(this.getAttributes(), 'attributes', ''));
      return this.getCart();
    }
  }, {
    key: 'getNote',
    value: function getNote() {
      return this.cart.note;
    }
  }, {
    key: 'setNote',
    value: function setNote(note) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.queue.add('/cart/update.js', { note: note }, options);
      return this.getCart();
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.queue.add('/cart/clear.js', {}, {});
      return this.getCart();
    }
  }], [{
    key: 'wrapKeys',
    value: function wrapKeys(obj) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var wrapped = {};
      (0, _keys2.default)(obj).forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var value = obj[key];
          if (type === null) {
            wrapped['' + key] = defaultValue === null ? value : defaultValue;
          } else {
            wrapped[type + '[' + key + ']'] = defaultValue === null ? value : defaultValue;
          }
        }
      });
      return wrapped;
    }
  }]);
  return Cart;
}();

exports.Cart = Cart;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Currency = {

  formatWithDelimiters: function formatWithDelimiters(amount) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var thousands = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
    var decimal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';

    if (isNaN(amount) || amount == null) {
      return 0;
    }

    var number = (amount / 100.0).toFixed(precision);

    var parts = number.split('.');
    var dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
    var cents = parts[1] ? decimal + parts[1] : '';

    return dollars + cents;
  },
  formatMoney: function formatMoney(amount, format) {
    var moneyFormat = '${{amount}}';
    var cents = typeof amount === 'string' ? amount.replace('.', '') : amount;
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = format || moneyFormat;

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = Currency.formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = Currency.formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = Currency.formatWithDelimiters(cents, 1, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = Currency.formatWithDelimiters(cents, 0, '.', ',');
        break;
      default:
        value = Currency.formatWithDelimiters(cents, 2);
        break;
    }
    return formatString.replace(placeholderRegex, value);
  }
};

module.exports = Currency;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = undefined;

var _classCallCheck2 = __webpack_require__(6);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(7);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jquery = __webpack_require__(15);
/** Class representing a queue */

var Queue = exports.Queue = function () {
  /**
   * Build a queue.
   */
  function Queue() {
    (0, _classCallCheck3.default)(this, Queue);

    this.queue = [];
    this.processing = false;
    this.add = this.add.bind(this);
    this.process = this.process.bind(this);
  }

  /**
   * Add a request to the queue.
   * Fires a jQuery event 'cartfox:requestStarted'
   * @param {string} url - Url to make the request to (i.e. '/cart.js')
   * @param {object} data - Data to send to the url
   * (i.e. {id: 123453, quantity: 1, properties: {} })
   * @param {object} options - Options for the request.
   * Can include method, success and error functions.
   * @return this.process() - begins processing the queue.
   */
  (0, _createClass3.default)(Queue, [{
    key: 'add',
    value: function add(url, data) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var request = {
        url: url,
        data: data,
        type: options.type || 'POST',
        dataType: 'json',
        statusCode: {
          422: function _(err) {
            /**
             * In case you cannot add the item to the cart this function fires cartfox:cannotAddToCart
             */
            jQuery(document).trigger('cartfox:cannotAddToCart', [err]);
            _this.processing = false;
          },
          400: function _(err) {
            _this.processing = false;
            jQuery(document).trigger('cartfox:cannotAddToCart', [err]);
          }
        },
        success: [options.success],
        error: [function error(_error) {
          console.log(_error);jQuery(document).trigger('cartfox:requestError', [_error]);
        }],
        complete: [options.complete]
      };
      // let request = {};
      this.queue.push(request);

      if (this.processing) {
        return true;
      }

      try {
        jQuery(document).trigger('cartfox:requestStarted');
      } catch (e) {
        console.log('No document');
      }
      this.processing = false;
      this.process();
      return this.processing;
    }

    /**
     * Process through the queue. Prevents synchonous callbacks.
     * Fires a jQuery event 'cartfox:requestComplete'
     */

  }, {
    key: 'process',
    value: function process() {
      if (!this.queue.length) {
        this.processing = false;
        jQuery(document).trigger('cartfox:requestComplete');
        return true;
      }
      this.processing = true;
      var params = this.queue.shift();
      params.success.push(this.process);
      params.error.push(this.process);
      try {
        jQuery.ajax(params);
      } catch (e) {
        console.log(e);
      }
      return params;
    }
  }]);
  return Queue;
}();

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(23), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(24), __esModule: true };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(25), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(48);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function(it){
  if (typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function(it){
  if (!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(13)
  , toLength  = __webpack_require__(45)
  , toIndex   = __webpack_require__(44);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if (IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if (value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if (IS_INCLUDES || index in O){
      if (O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(26);
module.exports = function(fn, that, length){
  aFunction(fn);
  if (that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5)
  , document = __webpack_require__(4).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(10)
  , createDesc = __webpack_require__(41);
module.exports = __webpack_require__(1) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(2)(function(){
  return Object.defineProperty(__webpack_require__(31)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(11)
  , gOPS     = __webpack_require__(37)
  , pIE      = __webpack_require__(39)
  , toObject = __webpack_require__(14)
  , IObject  = __webpack_require__(9)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(2)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if (isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(33)
  , toIObject    = __webpack_require__(13)
  , arrayIndexOf = __webpack_require__(28)(false)
  , IE_PROTO     = __webpack_require__(42)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if (key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if (has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(2);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(43)('keys')
  , uid    = __webpack_require__(47);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(12)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(12)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if (!isObject(it))return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 47 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(36)});

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(3);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1), 'Object', {defineProperty: __webpack_require__(10).f});

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(14)
  , $keys    = __webpack_require__(11);

__webpack_require__(40)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = Handlebars;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ })
/******/ ]);
