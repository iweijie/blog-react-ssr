module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./web/layout/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./web/assets/common.less":
/*!********************************!*\
  !*** ./web/assets/common.less ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvYXNzZXRzL2NvbW1vbi5sZXNzP2VkNDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxPQUFPLEtBQVUsRUFBRSxrQkFLZCIsImZpbGUiOiIuL3dlYi9hc3NldHMvY29tbW9uLmxlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbiAgICBpZihtb2R1bGUuaG90KSB7XG4gICAgICAvLyAxNTkwMjUwOTQ4NjMxXG4gICAgICB2YXIgY3NzUmVsb2FkID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWhvdC1sb2FkZXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanNcIikobW9kdWxlLmlkLCB7XCJmaWxlTWFwXCI6XCJ7ZmlsZU5hbWV9XCJ9KTtcbiAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZShjc3NSZWxvYWQpO1xuICAgICAgbW9kdWxlLmhvdC5hY2NlcHQodW5kZWZpbmVkLCBjc3NSZWxvYWQpOztcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./web/assets/common.less\n");

/***/ }),

/***/ "./web/layout/index.js":
/*!*****************************!*\
  !*** ./web/layout/index.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _assets_common_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/assets/common.less */ \"./web/assets/common.less\");\n/* harmony import */ var _assets_common_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_assets_common_less__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.less */ \"./web/layout/index.less\");\n/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! serialize-javascript */ \"serialize-javascript\");\n/* harmony import */ var serialize_javascript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(serialize_javascript__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nvar commonNode = function commonNode(props) {\n  return (// 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ? <div>{ props.children }</div> : ''\n    // props.children ? <div className='normal'><h1 className='title'><Link to='/'>Egg + React + SSR</Link><div className='author'>by ykfe</div></h1>{props.children}</div>\n    //   : ''\n    props.children ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, props.children) : ''\n  );\n};\n\nvar Layout = function Layout(props) {\n  if (false) {} else {\n    var serverData = props.layoutData.serverData;\n    var _props$layoutData$app = props.layoutData.app.config,\n        injectCss = _props$layoutData$app.injectCss,\n        injectScript = _props$layoutData$app.injectScript;\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"html\", {\n      lang: \"en\"\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"head\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"meta\", {\n      charSet: \"utf-8\"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"meta\", {\n      name: \"viewport\",\n      content: \"width=device-width, initial-scale=1, shrink-to-fit=no\"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"meta\", {\n      name: \"theme-color\",\n      content: \"#000000\"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"link\", {\n      rel: \"shortcut icon\",\n      href: \"/favicon.ico\"\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"title\", null, \"weijie \\u2764 feng\"), injectCss && injectCss.map(function (item) {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"link\", {\n        rel: \"stylesheet\",\n        href: item,\n        key: item\n      });\n    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"body\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      id: \"app\"\n    }, commonNode(props)), serverData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"script\", {\n      dangerouslySetInnerHTML: {\n        __html: \"window.__USE_SSR__=true; window.__INITIAL_DATA__ =\".concat(serialize_javascript__WEBPACK_IMPORTED_MODULE_4___default()(serverData))\n      }\n    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n      dangerouslySetInnerHTML: {\n        __html: injectScript && injectScript.join('')\n      }\n    })));\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Layout);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvbGF5b3V0L2luZGV4LmpzP2JjNGIiXSwibmFtZXMiOlsiY29tbW9uTm9kZSIsInByb3BzIiwiTGF5b3V0Iiwic2VydmVyRGF0YSIsImluamVjdENzcyIsImluamVjdFNjcmlwdCIsIml0ZW0iLCJfX2h0bWwiLCJzZXJpYWxpemUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU1BLFVBQVUsR0FBRyxTQUFiQSxVQUFhO0FBQUEsU0FDakI7QUFDQTtBQUNBO0FBQ0FDLFNBQUssQ0FBTEEsd0JBQWlCLHdFQUFNQSxLQUFLLENBQTVCQSxRQUFpQixDQUFqQkEsR0FBK0M7QUFKOUI7QUFBbkI7O0FBTUEsSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsUUFBVztBQUN4QixhQUFtQixFQUFuQixNQUVPO0FBQUEsUUFDR0MsVUFESCxHQUNrQkYsS0FBSyxDQUR2QixVQUNrQkEsQ0FEbEI7QUFBQSxnQ0FFK0JBLEtBQUssQ0FBTEEsZUFGL0I7QUFBQSxRQUVHRyxTQUZIO0FBQUEsUUFFY0MsWUFGZDtBQUdMLHdCQUNFO0FBQU0sVUFBSSxFQUFDO0FBQVgsb0JBQ0Usc0ZBQ0U7QUFBTSxhQUFPLEVBQUM7QUFBZCxNQURGLGVBRUU7QUFBTSxVQUFJLEVBQVY7QUFBc0IsYUFBTyxFQUFDO0FBQTlCLE1BRkYsZUFHRTtBQUFNLFVBQUksRUFBVjtBQUF5QixhQUFPLEVBQUM7QUFBakMsTUFIRixlQUlFO0FBQU0sU0FBRyxFQUFUO0FBQTBCLFVBQUksRUFBQztBQUEvQixNQUpGLGVBS0UsMEVBTEYsb0JBS0UsQ0FMRixFQU1HRCxTQUFTLElBQUksU0FBUyxDQUFULElBQWM7QUFBQSwwQkFBVTtBQUFNLFdBQUcsRUFBVDtBQUF1QixZQUFJLEVBQTNCO0FBQW1DLFdBQUcsRUFBRUU7QUFBeEMsUUFBVjtBQVBoQyxLQU9rQixDQU5oQixDQURGLGVBU0Usc0ZBQ0U7QUFBSyxRQUFFLEVBQUM7QUFBUixPQUFlTixVQUFVLENBRDNCLEtBQzJCLENBQXpCLENBREYsRUFFR0csVUFBVSxpQkFDVDtBQUNFLDZCQUF1QixFQUFFO0FBQ3ZCSSxjQUFNLDhEQUF1REMsMkRBQVMsQ0FBaEUsVUFBZ0UsQ0FBaEU7QUFEaUI7QUFEM0IsTUFISixlQVNFO0FBQ0UsNkJBQXVCLEVBQUU7QUFDdkJELGNBQU0sRUFBRUYsWUFBWSxJQUFJQSxZQUFZLENBQVpBO0FBREQ7QUFEM0IsTUFURixDQVRGLENBREY7QUEyQkQ7QUFqQ0g7O0FBb0NBIiwiZmlsZSI6Ii4vd2ViL2xheW91dC9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCAnQC9hc3NldHMvY29tbW9uLmxlc3MnO1xyXG5pbXBvcnQgJy4vaW5kZXgubGVzcyc7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHNlcmlhbGl6ZSBmcm9tICdzZXJpYWxpemUtamF2YXNjcmlwdCc7XHJcblxyXG5jb25zdCBjb21tb25Ob2RlID0gKHByb3BzKSA9PlxyXG4gIC8vIOS4uuS6huWQjOaXtuWFvOWuuXNzci9jc3Lor7fkv53nlZnmraTliKTmlq3vvIzlpoLmnpzkvaDnmoRsYXlvdXTmsqHmnInlhoXlrrnor7fkvb/nlKggcHJvcHMuY2hpbGRyZW4gPyA8ZGl2PnsgcHJvcHMuY2hpbGRyZW4gfTwvZGl2PiA6ICcnXHJcbiAgLy8gcHJvcHMuY2hpbGRyZW4gPyA8ZGl2IGNsYXNzTmFtZT0nbm9ybWFsJz48aDEgY2xhc3NOYW1lPSd0aXRsZSc+PExpbmsgdG89Jy8nPkVnZyArIFJlYWN0ICsgU1NSPC9MaW5rPjxkaXYgY2xhc3NOYW1lPSdhdXRob3InPmJ5IHlrZmU8L2Rpdj48L2gxPntwcm9wcy5jaGlsZHJlbn08L2Rpdj5cclxuICAvLyAgIDogJydcclxuICBwcm9wcy5jaGlsZHJlbiA/IDxkaXY+e3Byb3BzLmNoaWxkcmVufTwvZGl2PiA6ICcnO1xyXG5cclxuY29uc3QgTGF5b3V0ID0gKHByb3BzKSA9PiB7XHJcbiAgaWYgKF9faXNCcm93c2VyX18pIHtcclxuICAgIHJldHVybiBjb21tb25Ob2RlKHByb3BzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3QgeyBzZXJ2ZXJEYXRhIH0gPSBwcm9wcy5sYXlvdXREYXRhO1xyXG4gICAgY29uc3QgeyBpbmplY3RDc3MsIGluamVjdFNjcmlwdCB9ID0gcHJvcHMubGF5b3V0RGF0YS5hcHAuY29uZmlnO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPGh0bWwgbGFuZz1cImVuXCI+XHJcbiAgICAgICAgPGhlYWQ+XHJcbiAgICAgICAgICA8bWV0YSBjaGFyU2V0PVwidXRmLThcIiAvPlxyXG4gICAgICAgICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLCBzaHJpbmstdG8tZml0PW5vXCIgLz5cclxuICAgICAgICAgIDxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCIjMDAwMDAwXCIgLz5cclxuICAgICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiBocmVmPVwiL2Zhdmljb24uaWNvXCI+PC9saW5rPlxyXG4gICAgICAgICAgPHRpdGxlPndlaWppZSDinaQgZmVuZzwvdGl0bGU+XHJcbiAgICAgICAgICB7aW5qZWN0Q3NzICYmIGluamVjdENzcy5tYXAoKGl0ZW0pID0+IDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIiBocmVmPXtpdGVtfSBrZXk9e2l0ZW19IC8+KX1cclxuICAgICAgICA8L2hlYWQ+XHJcbiAgICAgICAgPGJvZHk+XHJcbiAgICAgICAgICA8ZGl2IGlkPVwiYXBwXCI+e2NvbW1vbk5vZGUocHJvcHMpfTwvZGl2PlxyXG4gICAgICAgICAge3NlcnZlckRhdGEgJiYgKFxyXG4gICAgICAgICAgICA8c2NyaXB0XHJcbiAgICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcclxuICAgICAgICAgICAgICAgIF9faHRtbDogYHdpbmRvdy5fX1VTRV9TU1JfXz10cnVlOyB3aW5kb3cuX19JTklUSUFMX0RBVEFfXyA9JHtzZXJpYWxpemUoc2VydmVyRGF0YSl9YCxcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcclxuICAgICAgICAgICAgICBfX2h0bWw6IGluamVjdFNjcmlwdCAmJiBpbmplY3RTY3JpcHQuam9pbignJyksXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvYm9keT5cclxuICAgICAgPC9odG1sPlxyXG4gICAgKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYXlvdXQ7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./web/layout/index.js\n");

/***/ }),

/***/ "./web/layout/index.less":
/*!*******************************!*\
  !*** ./web/layout/index.less ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n    if(false) { var cssReload; }\n  //# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi93ZWIvbGF5b3V0L2luZGV4Lmxlc3M/MWM3YyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLE9BQU8sS0FBVSxFQUFFLGtCQUtkIiwiZmlsZSI6Ii4vd2ViL2xheW91dC9pbmRleC5sZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG4gICAgaWYobW9kdWxlLmhvdCkge1xuICAgICAgLy8gMTU5MDI1MDk0ODY1MlxuICAgICAgdmFyIGNzc1JlbG9hZCA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1ob3QtbG9hZGVyL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wiZmlsZU1hcFwiOlwie2ZpbGVOYW1lfVwifSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTs7XG4gICAgfVxuICAiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./web/layout/index.less\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCI/NTNiOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJyZWFjdC1yb3V0ZXItZG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3Qtcm91dGVyLWRvbVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react-router-dom\n");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"serialize-javascript\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzZXJpYWxpemUtamF2YXNjcmlwdFwiPzE2ZjkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic2VyaWFsaXplLWphdmFzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXJpYWxpemUtamF2YXNjcmlwdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///serialize-javascript\n");

/***/ })

/******/ });