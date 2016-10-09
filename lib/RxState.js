(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("rxjs"));
	else if(typeof define === 'function' && define.amd)
		define("RxState", ["react", "rxjs"], factory);
	else if(typeof exports === 'object')
		exports["RxState"] = factory(require("react"), require("rxjs"));
	else
		root["RxState"] = factory(root["react"], root["rxjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RxStateProvider = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.createAction = createAction;
	exports.createActions = createActions;
	exports.createState = createState;
	exports.connect = connect;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rxjs = __webpack_require__(2);
	
	var _rxjs2 = _interopRequireDefault(_rxjs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function createAction() {
	  return new _rxjs2.default.Subject();
	}
	
	function createActions(actionNames) {
	  return actionNames.reduce(function (akk, name) {
	    return _extends({}, akk, _defineProperty({}, name, createAction()));
	  }, {});
	}
	
	function createState(reducer$) {
	  var initialState$ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _rxjs2.default.Observable.of({});
	
	  return initialState$.merge(reducer$).scan(function (state, _ref) {
	    var _ref2 = _slicedToArray(_ref, 2);
	
	    var scope = _ref2[0];
	    var reducer = _ref2[1];
	    return _extends({}, state, _defineProperty({}, scope, reducer(state[scope])));
	  }).publishReplay(1).refCount();
	}
	
	function connect() {
	  var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (state) {
	    return state;
	  };
	
	  return function wrapWithConnect(WrappedComponent) {
	    var _class, _temp;
	
	    return _temp = _class = function (_Component) {
	      _inherits(Connect, _Component);
	
	      function Connect() {
	        _classCallCheck(this, Connect);
	
	        return _possibleConstructorReturn(this, (Connect.__proto__ || Object.getPrototypeOf(Connect)).apply(this, arguments));
	      }
	
	      _createClass(Connect, [{
	        key: "componentWillMount",
	        value: function componentWillMount() {
	          this.subscription = this.context.state$.map(selector).subscribe(this.setState.bind(this));
	        }
	      }, {
	        key: "componentWillUnmount",
	        value: function componentWillUnmount() {
	          this.subscription.unsubscribe();
	        }
	      }, {
	        key: "render",
	        value: function render() {
	          return _react2.default.createElement(WrappedComponent, _extends({}, this.state, this.props));
	        }
	      }]);
	
	      return Connect;
	    }(_react.Component), _class.contextTypes = {
	      state$: _react.PropTypes.object.isRequired
	    }, _temp;
	  };
	}
	
	var RxStateProvider = exports.RxStateProvider = function (_Component2) {
	  _inherits(RxStateProvider, _Component2);
	
	  function RxStateProvider() {
	    _classCallCheck(this, RxStateProvider);
	
	    return _possibleConstructorReturn(this, (RxStateProvider.__proto__ || Object.getPrototypeOf(RxStateProvider)).apply(this, arguments));
	  }
	
	  _createClass(RxStateProvider, [{
	    key: "getChildContext",
	    value: function getChildContext() {
	      return { state$: this.props.state$ };
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return this.props.children;
	    }
	  }]);
	
	  return RxStateProvider;
	}(_react.Component);
	
	RxStateProvider.propTypes = {
	  state$: _react.PropTypes.object.isRequired
	};
	RxStateProvider.childContextTypes = {
	  state$: _react.PropTypes.object.isRequired
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=RxState.js.map