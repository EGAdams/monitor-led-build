/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/accordion-section/accordion-section.observed-attributes.ts":
/*!***********************************************************************************!*\
  !*** ./src/components/accordion-section/accordion-section.observed-attributes.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const observedAttributes = [];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (observedAttributes);


/***/ }),

/***/ "./src/components/hello-world/hello-world.observed-attributes.ts":
/*!***********************************************************************!*\
  !*** ./src/components/hello-world/hello-world.observed-attributes.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const observedAttributes = [];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (observedAttributes);


/***/ }),

/***/ "./src/components/inner-component/inner-component.observed-attributes.ts":
/*!*******************************************************************************!*\
  !*** ./src/components/inner-component/inner-component.observed-attributes.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const observedAttributes = [];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (observedAttributes);


/***/ }),

/***/ "./src/components/log-object/log-object.observed-attributes.ts":
/*!*********************************************************************!*\
  !*** ./src/components/log-object/log-object.observed-attributes.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const observedAttributes = [];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (observedAttributes);


/***/ }),

/***/ "./src/components/log-viewer/log-viewer.observed-attributes.ts":
/*!*********************************************************************!*\
  !*** ./src/components/log-viewer/log-viewer.observed-attributes.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const observedAttributes = [];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (observedAttributes);


/***/ }),

/***/ "./src/components/monitor-led/monitor-led.observed-attributes.ts":
/*!***********************************************************************!*\
  !*** ./src/components/monitor-led/monitor-led.observed-attributes.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const observedAttributes = [];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (observedAttributes);


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component),
/* harmony export */   "wrap": () => (/* binding */ wrap)
/* harmony export */ });
function wrap(importComponent, className, observedAttributes) {
    class CustomComponent extends HTMLElement {
        _newComponentInstance = {};
        _connected = false;
        _componentConstructor = {};
        _changedAttributes = false;
        _attrArr = [];
        static originalObservedAttributes;
        static get observedAttributes() { return observedAttributes; }
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });
            importComponent().then((component) => {
                this._componentConstructor = component[className];
                this._newComponentInstance = new this._componentConstructor(shadow, shadow.host);
                this._componentConstructor.prototype?.properties?.forEach((componentPrototypeProperty) => {
                    Object.defineProperty(this, componentPrototypeProperty, {
                        get: () => { return this._newComponentInstance[componentPrototypeProperty]; },
                        set: (val) => { this._newComponentInstance[componentPrototypeProperty] = val; },
                    });
                });
                shadow.innerHTML = this._newComponentInstance.sourceHtmlText;
                const firstChild = shadow.firstChild;
                const styleTag = document.createElement('style');
                styleTag.innerHTML = this._newComponentInstance?.sourceStyleText;
                shadow.insertBefore(styleTag, firstChild);
                if (this._connected) {
                    this._newComponentInstance.connectedCallback();
                    if (!this._changedAttributes) {
                        this._attrArr.forEach((attr) => this._newComponentInstance?.attributeChangedCallback(attr.name, attr.oldValue, attr.newValue));
                        this._changedAttributes = true;
                    }
                }
                this.dispatchEvent(new Event('ready'));
            });
        }
        connectedCallback() { this._connected = true; }
        disconnectedCallback() { this._newComponentInstance?.disconnectedCallback(); }
        adoptedCallback() { this._newComponentInstance?.adoptedCallback(); }
        attributeChangedCallback(name, oldValue, newValue) {
            if (!this._changedAttributes) {
                this._attrArr.push({ name, oldValue, newValue });
            }
            else {
                this._newComponentInstance?.attributeChangedCallback(name, oldValue, newValue);
            }
        }
    }
    return CustomComponent;
}
function Component(meta) {
    return (target) => {
        target.prototype.sourceHtmlText = meta?.html || '';
        target.prototype.sourceStyleText = meta?.style || '';
        target.prototype.properties = meta?.properties || [];
        // Ref.: https://gist.github.com/remojansen/16c661a7afd68e22ac6e
        // // save a reference to the original constructor
        // var original = target;
        //
        // // a utility function to generate instances of a class
        // const construct = (constructor: Function, args: any) => {
        //     let c : any = function () {
        //         return constructor.apply(this, args);
        //     }
        //     c.prototype = constructor.prototype;
        //     return new c();
        // }
        //
        // // the new constructor behaviour
        // var f : any = function (...args: any) {
        //     console.log("New: " + original.name);
        //     return construct(original, args);
        // }
        //
        // // copy prototype so intanceof operator still works
        // f.prototype = original.prototype;
        //
        // // return new constructor (will override original)
        // return f;
    };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "@egadams/monitor-led:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/dist";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk_egadams_monitor_led"] = self["webpackChunk_egadams_monitor_led"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var _components_monitor_led_monitor_led_observed_attributes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/monitor-led/monitor-led.observed-attributes */ "./src/components/monitor-led/monitor-led.observed-attributes.ts");
/* harmony import */ var _components_hello_world_hello_world_observed_attributes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/hello-world/hello-world.observed-attributes */ "./src/components/hello-world/hello-world.observed-attributes.ts");
/* harmony import */ var _components_log_viewer_log_viewer_observed_attributes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/log-viewer/log-viewer.observed-attributes */ "./src/components/log-viewer/log-viewer.observed-attributes.ts");
/* harmony import */ var _components_log_object_log_object_observed_attributes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/log-object/log-object.observed-attributes */ "./src/components/log-object/log-object.observed-attributes.ts");
/* harmony import */ var _components_inner_component_inner_component_observed_attributes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/inner-component/inner-component.observed-attributes */ "./src/components/inner-component/inner-component.observed-attributes.ts");
/* harmony import */ var _components_accordion_section_accordion_section_observed_attributes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/accordion-section/accordion-section.observed-attributes */ "./src/components/accordion-section/accordion-section.observed-attributes.ts");







customElements.define('monitor-led', (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wrap)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_tslib_tslib_es6_js"), __webpack_require__.e("src_components_monitor-led_monitor-led_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/monitor-led/monitor-led.component */ "./src/components/monitor-led/monitor-led.component.ts")), 'MonitorLed', _components_monitor_led_monitor_led_observed_attributes__WEBPACK_IMPORTED_MODULE_1__["default"]));
customElements.define('hello-world', (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wrap)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_tslib_tslib_es6_js"), __webpack_require__.e("src_components_hello-world_hello-world_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/hello-world/hello-world.component */ "./src/components/hello-world/hello-world.component.ts")), 'HelloWorld', _components_hello_world_hello_world_observed_attributes__WEBPACK_IMPORTED_MODULE_2__["default"]));
customElements.define('log-viewer', (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wrap)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_tslib_tslib_es6_js"), __webpack_require__.e("src_components_log-viewer_log-viewer_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/log-viewer/log-viewer.component */ "./src/components/log-viewer/log-viewer.component.ts")), 'LogViewer', _components_log_viewer_log_viewer_observed_attributes__WEBPACK_IMPORTED_MODULE_3__["default"]));
customElements.define('log-object', (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wrap)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_tslib_tslib_es6_js"), __webpack_require__.e("src_components_log-object_log-object_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/log-object/log-object.component */ "./src/components/log-object/log-object.component.ts")), 'LogObject', _components_log_object_log_object_observed_attributes__WEBPACK_IMPORTED_MODULE_4__["default"]));
customElements.define('inner-component', (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wrap)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_tslib_tslib_es6_js"), __webpack_require__.e("src_components_inner-component_inner-component_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/inner-component/inner-component.component */ "./src/components/inner-component/inner-component.component.ts")), 'InnerComponent', _components_inner_component_inner_component_observed_attributes__WEBPACK_IMPORTED_MODULE_5__["default"]));
customElements.define('accordion-section', (0,_utils__WEBPACK_IMPORTED_MODULE_0__.wrap)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_tslib_tslib_es6_js"), __webpack_require__.e("src_components_accordion-section_accordion-section_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/accordion-section/accordion-section.component */ "./src/components/accordion-section/accordion-section.component.ts")), 'AccordionSection', _components_accordion_section_accordion_section_observed_attributes__WEBPACK_IMPORTED_MODULE_6__["default"]));

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUUsRUFBRSw0WEFBMEQsRUFBRSxZQUFZLEVBQUUsK0ZBQTRCLENBQUUsQ0FBQyxDQUFDO0FBQzFKLGNBQWMsQ0FBQyxNQUFNLENBQUUsWUFBWSxFQUFJLDRDQUFJLENBQUMsR0FBRSxFQUFFLHNYQUEwRCxFQUFFLFdBQVcsRUFBRyw2RkFBMkIsQ0FBRyxDQUFDLENBQUM7QUFDMUosY0FBYyxDQUFDLE1BQU0sQ0FBRSxZQUFZLEVBQUksNENBQUksQ0FBQyxHQUFFLEVBQUUsc1hBQTBELEVBQUUsV0FBVyxFQUFHLDZGQUEyQixDQUFHLENBQUMsQ0FBQztBQUMxSixjQUFjLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLDRDQUFJLENBQUMsR0FBRSxFQUFFLG9aQUFnRSxFQUFFLGdCQUFnQixFQUFFLHVHQUFnQyxDQUFDLENBQUMsQ0FBQztBQUN6SyxjQUFjLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLDRDQUFJLENBQUMsR0FBRSxFQUFFLGdhQUFvRSxFQUFFLGtCQUFrQixFQUFFLDJHQUFrQyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0BlZ2FkYW1zL21vbml0b3ItbGVkLy4vc3JjL2NvbXBvbmVudHMvYWNjb3JkaW9uLXNlY3Rpb24vYWNjb3JkaW9uLXNlY3Rpb24ub2JzZXJ2ZWQtYXR0cmlidXRlcy50cyIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC8uL3NyYy9jb21wb25lbnRzL2hlbGxvLXdvcmxkL2hlbGxvLXdvcmxkLm9ic2VydmVkLWF0dHJpYnV0ZXMudHMiLCJ3ZWJwYWNrOi8vQGVnYWRhbXMvbW9uaXRvci1sZWQvLi9zcmMvY29tcG9uZW50cy9pbm5lci1jb21wb25lbnQvaW5uZXItY29tcG9uZW50Lm9ic2VydmVkLWF0dHJpYnV0ZXMudHMiLCJ3ZWJwYWNrOi8vQGVnYWRhbXMvbW9uaXRvci1sZWQvLi9zcmMvY29tcG9uZW50cy9sb2ctb2JqZWN0L2xvZy1vYmplY3Qub2JzZXJ2ZWQtYXR0cmlidXRlcy50cyIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC8uL3NyYy9jb21wb25lbnRzL2xvZy12aWV3ZXIvbG9nLXZpZXdlci5vYnNlcnZlZC1hdHRyaWJ1dGVzLnRzIiwid2VicGFjazovL0BlZ2FkYW1zL21vbml0b3ItbGVkLy4vc3JjL2NvbXBvbmVudHMvbW9uaXRvci1sZWQvbW9uaXRvci1sZWQub2JzZXJ2ZWQtYXR0cmlidXRlcy50cyIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQGVnYWRhbXMvbW9uaXRvci1sZWQvd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vQGVnYWRhbXMvbW9uaXRvci1sZWQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vQGVnYWRhbXMvbW9uaXRvci1sZWQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9AZWdhZGFtcy9tb25pdG9yLWxlZC8uL3NyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG9ic2VydmVkQXR0cmlidXRlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5leHBvcnQgZGVmYXVsdCBvYnNlcnZlZEF0dHJpYnV0ZXM7IiwiY29uc3Qgb2JzZXJ2ZWRBdHRyaWJ1dGVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbmV4cG9ydCBkZWZhdWx0IG9ic2VydmVkQXR0cmlidXRlczsiLCJjb25zdCBvYnNlcnZlZEF0dHJpYnV0ZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuZXhwb3J0IGRlZmF1bHQgb2JzZXJ2ZWRBdHRyaWJ1dGVzOyIsImNvbnN0IG9ic2VydmVkQXR0cmlidXRlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5leHBvcnQgZGVmYXVsdCBvYnNlcnZlZEF0dHJpYnV0ZXM7IiwiY29uc3Qgb2JzZXJ2ZWRBdHRyaWJ1dGVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcbmV4cG9ydCBkZWZhdWx0IG9ic2VydmVkQXR0cmlidXRlczsiLCJjb25zdCBvYnNlcnZlZEF0dHJpYnV0ZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuZXhwb3J0IGRlZmF1bHQgb2JzZXJ2ZWRBdHRyaWJ1dGVzOyIsImludGVyZmFjZSBJV2ViQ29tcG9uZW50RGVjb3JhdGVkIGV4dGVuZHMgSVdlYkNvbXBvbmVudCB7IHNvdXJjZUh0bWxUZXh0IDogc3RyaW5nLCBzb3VyY2VTdHlsZVRleHQ6IHN0cmluZyB9XHJcbmludGVyZmFjZSBPcmlnaW5hbENvbXBvbmVudENsYXNzVHlwZSB7IG9ic2VydmVkQXR0cmlidXRlczogQXJyYXk8IHN0cmluZyA+OyBuZXcoIC4uLmFyZ3M6IGFueVtdICk6IElXZWJDb21wb25lbnREZWNvcmF0ZWQgfVxyXG5pbnRlcmZhY2UgQXR0cmlidXRlVmFsdWUgeyBuYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcgfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHdyYXAgKCBpbXBvcnRDb21wb25lbnQ6ICgpID0+IFByb21pc2U8YW55PiwgY2xhc3NOYW1lOiBzdHJpbmcsIG9ic2VydmVkQXR0cmlidXRlczogQXJyYXk8IHN0cmluZyA+ICkge1xyXG4gICAgXHJcbiAgICBjbGFzcyBDdXN0b21Db21wb25lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgX25ld0NvbXBvbmVudEluc3RhbmNlOiBJV2ViQ29tcG9uZW50RGVjb3JhdGVkID0ge30gYXMgSVdlYkNvbXBvbmVudERlY29yYXRlZDtcclxuICAgICAgICBwcml2YXRlIF9jb25uZWN0ZWQgPSBmYWxzZTtcclxuICAgICAgICBwcml2YXRlIF9jb21wb25lbnRDb25zdHJ1Y3RvcjogT3JpZ2luYWxDb21wb25lbnRDbGFzc1R5cGUgPSB7fSBhcyBPcmlnaW5hbENvbXBvbmVudENsYXNzVHlwZTtcclxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VkQXR0cmlidXRlcyA9IGZhbHNlO1xyXG4gICAgICAgIHByaXZhdGUgX2F0dHJBcnI6IEFycmF5PCBBdHRyaWJ1dGVWYWx1ZSA+ID0gW107XHJcblxyXG4gICAgICAgIHN0YXRpYyBvcmlnaW5hbE9ic2VydmVkQXR0cmlidXRlczogYW55O1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcyAoKTogQXJyYXk8IHN0cmluZyA+IHsgcmV0dXJuIG9ic2VydmVkQXR0cmlidXRlczsgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2hhZG93ID0gdGhpcy5hdHRhY2hTaGFkb3coeyBtb2RlOiAnb3BlbicgfSk7XHJcbiAgICAgICAgICAgIGltcG9ydENvbXBvbmVudCgpLnRoZW4oKCBjb21wb25lbnQgKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb21wb25lbnRDb25zdHJ1Y3RvciA9IGNvbXBvbmVudFsgY2xhc3NOYW1lIF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXdDb21wb25lbnRJbnN0YW5jZSA9IG5ldyB0aGlzLl9jb21wb25lbnRDb25zdHJ1Y3Rvciggc2hhZG93LCBzaGFkb3cuaG9zdCApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29tcG9uZW50Q29uc3RydWN0b3IucHJvdG90eXBlPy5wcm9wZXJ0aWVzPy5mb3JFYWNoKCggY29tcG9uZW50UHJvdG90eXBlUHJvcGVydHk6IHN0cmluZyApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoIHRoaXMsIGNvbXBvbmVudFByb3RvdHlwZVByb3BlcnR5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogKCAgICAgKSA9PiB7IHJldHVybiAoIHRoaXMuX25ld0NvbXBvbmVudEluc3RhbmNlIGFzIGFueSApWyBjb21wb25lbnRQcm90b3R5cGVQcm9wZXJ0eSBdICAgICAgOyB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQ6ICggdmFsICkgPT4geyAoICAgICAgICB0aGlzLl9uZXdDb21wb25lbnRJbnN0YW5jZSBhcyBhbnkgKVsgY29tcG9uZW50UHJvdG90eXBlUHJvcGVydHkgXSA9IHZhbDsgfSxcclxuICAgICAgICAgICAgICAgICAgICB9KTsgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2hhZG93LmlubmVySFRNTCA9IHRoaXMuX25ld0NvbXBvbmVudEluc3RhbmNlIS5zb3VyY2VIdG1sVGV4dDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0Q2hpbGQgPSBzaGFkb3cuZmlyc3RDaGlsZDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoICdzdHlsZScgKSA7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVRhZy5pbm5lckhUTUwgPSB0aGlzLl9uZXdDb21wb25lbnRJbnN0YW5jZT8uc291cmNlU3R5bGVUZXh0O1xyXG5cclxuICAgICAgICAgICAgICAgIHNoYWRvdy5pbnNlcnRCZWZvcmUoIHN0eWxlVGFnLCBmaXJzdENoaWxkICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLl9jb25uZWN0ZWQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmV3Q29tcG9uZW50SW5zdGFuY2UuY29ubmVjdGVkQ2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoICF0aGlzLl9jaGFuZ2VkQXR0cmlidXRlcyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXR0ckFyci5mb3JFYWNoKCggYXR0cjogQXR0cmlidXRlVmFsdWUgKSA9PiB0aGlzLl9uZXdDb21wb25lbnRJbnN0YW5jZT8uYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCBhdHRyLm5hbWUsIGF0dHIub2xkVmFsdWUsIGF0dHIubmV3VmFsdWUgKSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VkQXR0cmlidXRlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KCBuZXcgRXZlbnQoICdyZWFkeScgKSApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbm5lY3RlZENhbGxiYWNrKCkgeyAgICB0aGlzLl9jb25uZWN0ZWQgPSB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkgeyB0aGlzLl9uZXdDb21wb25lbnRJbnN0YW5jZT8uZGlzY29ubmVjdGVkQ2FsbGJhY2soKTsgfVxyXG4gICAgICAgIGFkb3B0ZWRDYWxsYmFjayAoKSB7ICAgICB0aGlzLl9uZXdDb21wb25lbnRJbnN0YW5jZT8uYWRvcHRlZENhbGxiYWNrKCk7ICAgICAgfVxyXG5cclxuICAgICAgICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgKCBuYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkgKSB7XHJcbiAgICAgICAgICAgIGlmICggIXRoaXMuX2NoYW5nZWRBdHRyaWJ1dGVzICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYXR0ckFyci5wdXNoKHsgbmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmV3Q29tcG9uZW50SW5zdGFuY2U/LmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayggbmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gQ3VzdG9tQ29tcG9uZW50OyB9XHJcblxyXG50eXBlIE1ldGFEYXRhQ29tcG9uZW50ID0geyBodG1sPzogc3RyaW5nLCBzdHlsZT86IHN0cmluZywgcHJvcGVydGllcz86IEFycmF5PCBzdHJpbmcgPiB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENvbXBvbmVudCAoIG1ldGE6IE1ldGFEYXRhQ29tcG9uZW50ICkge1xyXG4gICAgcmV0dXJuICggdGFyZ2V0OiBGdW5jdGlvbiApID0+IHtcclxuICAgICAgICB0YXJnZXQucHJvdG90eXBlLnNvdXJjZUh0bWxUZXh0ICA9IG1ldGE/Lmh0bWwgIHx8ICcnO1xyXG4gICAgICAgIHRhcmdldC5wcm90b3R5cGUuc291cmNlU3R5bGVUZXh0ID0gbWV0YT8uc3R5bGUgfHwgJyc7XHJcbiAgICAgICAgdGFyZ2V0LnByb3RvdHlwZS5wcm9wZXJ0aWVzID0gbWV0YT8ucHJvcGVydGllcyB8fCBbXTtcclxuXHJcbiAgICAgICAgLy8gUmVmLjogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcmVtb2phbnNlbi8xNmM2NjFhN2FmZDY4ZTIyYWM2ZVxyXG5cclxuICAgICAgICAvLyAvLyBzYXZlIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCBjb25zdHJ1Y3RvclxyXG4gICAgICAgIC8vIHZhciBvcmlnaW5hbCA9IHRhcmdldDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIC8vIGEgdXRpbGl0eSBmdW5jdGlvbiB0byBnZW5lcmF0ZSBpbnN0YW5jZXMgb2YgYSBjbGFzc1xyXG4gICAgICAgIC8vIGNvbnN0IGNvbnN0cnVjdCA9IChjb25zdHJ1Y3RvcjogRnVuY3Rpb24sIGFyZ3M6IGFueSkgPT4ge1xyXG4gICAgICAgIC8vICAgICBsZXQgYyA6IGFueSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBjb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgICBjLnByb3RvdHlwZSA9IGNvbnN0cnVjdG9yLnByb3RvdHlwZTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIG5ldyBjKCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gLy8gdGhlIG5ldyBjb25zdHJ1Y3RvciBiZWhhdmlvdXJcclxuICAgICAgICAvLyB2YXIgZiA6IGFueSA9IGZ1bmN0aW9uICguLi5hcmdzOiBhbnkpIHtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJOZXc6IFwiICsgb3JpZ2luYWwubmFtZSk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBjb25zdHJ1Y3Qob3JpZ2luYWwsIGFyZ3MpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIC8vIGNvcHkgcHJvdG90eXBlIHNvIGludGFuY2VvZiBvcGVyYXRvciBzdGlsbCB3b3Jrc1xyXG4gICAgICAgIC8vIGYucHJvdG90eXBlID0gb3JpZ2luYWwucHJvdG90eXBlO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gLy8gcmV0dXJuIG5ldyBjb25zdHJ1Y3RvciAod2lsbCBvdmVycmlkZSBvcmlnaW5hbClcclxuICAgICAgICAvLyByZXR1cm4gZjtcclxuICAgIH07XHJcbn1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18udSA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gXCJcIiArIGNodW5rSWQgKyBcIi5idW5kbGUuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsInZhciBpblByb2dyZXNzID0ge307XG52YXIgZGF0YVdlYnBhY2tQcmVmaXggPSBcIkBlZ2FkYW1zL21vbml0b3ItbGVkOlwiO1xuLy8gbG9hZFNjcmlwdCBmdW5jdGlvbiB0byBsb2FkIGEgc2NyaXB0IHZpYSBzY3JpcHQgdGFnXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmwgPSAodXJsLCBkb25lLCBrZXksIGNodW5rSWQpID0+IHtcblx0aWYoaW5Qcm9ncmVzc1t1cmxdKSB7IGluUHJvZ3Jlc3NbdXJsXS5wdXNoKGRvbmUpOyByZXR1cm47IH1cblx0dmFyIHNjcmlwdCwgbmVlZEF0dGFjaDtcblx0aWYoa2V5ICE9PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzY3JpcHRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgcyA9IHNjcmlwdHNbaV07XG5cdFx0XHRpZihzLmdldEF0dHJpYnV0ZShcInNyY1wiKSA9PSB1cmwgfHwgcy5nZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIikgPT0gZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpIHsgc2NyaXB0ID0gczsgYnJlYWs7IH1cblx0XHR9XG5cdH1cblx0aWYoIXNjcmlwdCkge1xuXHRcdG5lZWRBdHRhY2ggPSB0cnVlO1xuXHRcdHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG5cdFx0c2NyaXB0LmNoYXJzZXQgPSAndXRmLTgnO1xuXHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuXHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgX193ZWJwYWNrX3JlcXVpcmVfXy5uYyk7XG5cdFx0fVxuXHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXdlYnBhY2tcIiwgZGF0YVdlYnBhY2tQcmVmaXggKyBrZXkpO1xuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdDtcblx0dmFyIHRpbWVvdXQgPSBzZXRUaW1lb3V0KG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCB1bmRlZmluZWQsIHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KSwgMTIwMDAwKTtcblx0c2NyaXB0Lm9uZXJyb3IgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9uZXJyb3IpO1xuXHRzY3JpcHQub25sb2FkID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmxvYWQpO1xuXHRuZWVkQXR0YWNoICYmIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbn07IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdFwiOyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5mLmogPSAoY2h1bmtJZCwgcHJvbWlzZXMpID0+IHtcblx0XHQvLyBKU09OUCBjaHVuayBsb2FkaW5nIGZvciBqYXZhc2NyaXB0XG5cdFx0dmFyIGluc3RhbGxlZENodW5rRGF0YSA9IF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpID8gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdIDogdW5kZWZpbmVkO1xuXHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSAhPT0gMCkgeyAvLyAwIG1lYW5zIFwiYWxyZWFkeSBpbnN0YWxsZWRcIi5cblxuXHRcdFx0Ly8gYSBQcm9taXNlIG1lYW5zIFwiY3VycmVudGx5IGxvYWRpbmdcIi5cblx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuXHRcdFx0XHRwcm9taXNlcy5wdXNoKGluc3RhbGxlZENodW5rRGF0YVsyXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZih0cnVlKSB7IC8vIGFsbCBjaHVua3MgaGF2ZSBKU1xuXHRcdFx0XHRcdC8vIHNldHVwIFByb21pc2UgaW4gY2h1bmsgY2FjaGVcblx0XHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IChpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XSkpO1xuXHRcdFx0XHRcdHByb21pc2VzLnB1c2goaW5zdGFsbGVkQ2h1bmtEYXRhWzJdID0gcHJvbWlzZSk7XG5cblx0XHRcdFx0XHQvLyBzdGFydCBjaHVuayBsb2FkaW5nXG5cdFx0XHRcdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKTtcblx0XHRcdFx0XHQvLyBjcmVhdGUgZXJyb3IgYmVmb3JlIHN0YWNrIHVud291bmQgdG8gZ2V0IHVzZWZ1bCBzdGFja3RyYWNlIGxhdGVyXG5cdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cdFx0XHRcdFx0dmFyIGxvYWRpbmdFbmRlZCA9IChldmVudCkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkpIHtcblx0XHRcdFx0XHRcdFx0aW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0XHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtEYXRhKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuXHRcdFx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBjaHVuayAnICsgY2h1bmtJZCArICcgZmFpbGVkLlxcbignICsgZXJyb3JUeXBlICsgJzogJyArIHJlYWxTcmMgKyAnKSc7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvci5yZXF1ZXN0ID0gcmVhbFNyYztcblx0XHRcdFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGFbMV0oZXJyb3IpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQsIFwiY2h1bmstXCIgKyBjaHVua0lkLCBjaHVua0lkKTtcblx0XHRcdFx0fSBlbHNlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdFx0XHR9XG5cdFx0fVxufTtcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbnZhciB3ZWJwYWNrSnNvbnBDYWxsYmFjayA9IChwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiwgZGF0YSkgPT4ge1xuXHR2YXIgW2NodW5rSWRzLCBtb3JlTW9kdWxlcywgcnVudGltZV0gPSBkYXRhO1xuXHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcblx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG5cdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDA7XG5cdGlmKGNodW5rSWRzLnNvbWUoKGlkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2lkXSAhPT0gMCkpKSB7XG5cdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihydW50aW1lKSB2YXIgcmVzdWx0ID0gcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0fVxuXHRpZihwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbikgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24oZGF0YSk7XG5cdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhpbnN0YWxsZWRDaHVua3MsIGNodW5rSWQpICYmIGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdWzBdKCk7XG5cdFx0fVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG5cdH1cblxufVxuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua19lZ2FkYW1zX21vbml0b3JfbGVkXCJdID0gc2VsZltcIndlYnBhY2tDaHVua19lZ2FkYW1zX21vbml0b3JfbGVkXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCJpbXBvcnQgeyB3cmFwIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCBvYnNlcnZlZEF0dHJpYnV0ZXNNb25pdG9yTGVkIGZyb20gJy4vY29tcG9uZW50cy9tb25pdG9yLWxlZC9tb25pdG9yLWxlZC5vYnNlcnZlZC1hdHRyaWJ1dGVzJztcclxuaW1wb3J0IG9ic2VydmVkQXR0cmlidXRlc0hlbGxvV29ybGQgZnJvbSAnLi9jb21wb25lbnRzL2hlbGxvLXdvcmxkL2hlbGxvLXdvcmxkLm9ic2VydmVkLWF0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgb2JzZXJ2ZWRBdHRyaWJ1dGVzTG9nVmlld2VyIGZyb20gJy4vY29tcG9uZW50cy9sb2ctdmlld2VyL2xvZy12aWV3ZXIub2JzZXJ2ZWQtYXR0cmlidXRlcyc7XHJcbmltcG9ydCBvYnNlcnZlZEF0dHJpYnV0ZXNMb2dPYmplY3QgZnJvbSAnLi9jb21wb25lbnRzL2xvZy1vYmplY3QvbG9nLW9iamVjdC5vYnNlcnZlZC1hdHRyaWJ1dGVzJztcclxuaW1wb3J0IG9ic2VydmVkQXR0cmlidXRlc0lubmVyQ29tcG9uZW50IGZyb20gJy4vY29tcG9uZW50cy9pbm5lci1jb21wb25lbnQvaW5uZXItY29tcG9uZW50Lm9ic2VydmVkLWF0dHJpYnV0ZXMnO1xyXG5pbXBvcnQgb2JzZXJ2ZWRBdHRyaWJ1dGVzQWNjb3JkaW9uU2VjdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvYWNjb3JkaW9uLXNlY3Rpb24vYWNjb3JkaW9uLXNlY3Rpb24ub2JzZXJ2ZWQtYXR0cmlidXRlcyc7XHJcblxyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoICdtb25pdG9yLWxlZCcgLCB3cmFwKCgpPT5pbXBvcnQoICcuL2NvbXBvbmVudHMvbW9uaXRvci1sZWQvbW9uaXRvci1sZWQuY29tcG9uZW50JyApLCAnTW9uaXRvckxlZCcsIG9ic2VydmVkQXR0cmlidXRlc01vbml0b3JMZWQgKSk7XHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSggJ2hlbGxvLXdvcmxkJyAsIHdyYXAoKCk9PmltcG9ydCggJy4vY29tcG9uZW50cy9oZWxsby13b3JsZC9oZWxsby13b3JsZC5jb21wb25lbnQnICksICdIZWxsb1dvcmxkJywgb2JzZXJ2ZWRBdHRyaWJ1dGVzSGVsbG9Xb3JsZCApKTtcclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCAnbG9nLXZpZXdlcicgICwgd3JhcCgoKT0+aW1wb3J0KCAnLi9jb21wb25lbnRzL2xvZy12aWV3ZXIvbG9nLXZpZXdlci5jb21wb25lbnQnICAgKSwgJ0xvZ1ZpZXdlcicgLCBvYnNlcnZlZEF0dHJpYnV0ZXNMb2dWaWV3ZXIgICkpO1xyXG5jdXN0b21FbGVtZW50cy5kZWZpbmUoICdsb2ctb2JqZWN0JyAgLCB3cmFwKCgpPT5pbXBvcnQoICcuL2NvbXBvbmVudHMvbG9nLW9iamVjdC9sb2ctb2JqZWN0LmNvbXBvbmVudCcgICApLCAnTG9nT2JqZWN0JyAsIG9ic2VydmVkQXR0cmlidXRlc0xvZ09iamVjdCAgKSk7XHJcbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnaW5uZXItY29tcG9uZW50Jywgd3JhcCgoKT0+aW1wb3J0KCcuL2NvbXBvbmVudHMvaW5uZXItY29tcG9uZW50L2lubmVyLWNvbXBvbmVudC5jb21wb25lbnQnKSwgJ0lubmVyQ29tcG9uZW50Jywgb2JzZXJ2ZWRBdHRyaWJ1dGVzSW5uZXJDb21wb25lbnQpKTtcclxuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdhY2NvcmRpb24tc2VjdGlvbicsIHdyYXAoKCk9PmltcG9ydCgnLi9jb21wb25lbnRzL2FjY29yZGlvbi1zZWN0aW9uL2FjY29yZGlvbi1zZWN0aW9uLmNvbXBvbmVudCcpLCAnQWNjb3JkaW9uU2VjdGlvbicsIG9ic2VydmVkQXR0cmlidXRlc0FjY29yZGlvblNlY3Rpb24pKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9