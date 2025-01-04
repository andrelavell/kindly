"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/components/CommunitySpotlight.tsx":
/*!***********************************************!*\
  !*** ./src/components/CommunitySpotlight.tsx ***!
  \***********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CommunitySpotlight: function() { return /* binding */ CommunitySpotlight; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst spotlightDonors = [\n    {\n        id: 1,\n        name: \"Sarah M.\",\n        totalDonated: 47,\n        favoriteCause: \"Environmental Conservation\",\n        impactDescription: \"Supported environmental conservation\",\n        donationsCount: 24\n    },\n    {\n        id: 2,\n        name: \"Michael R.\",\n        totalDonated: 68,\n        favoriteCause: \"Education\",\n        impactDescription: \"Helped fund youth education\",\n        donationsCount: 31\n    },\n    {\n        id: 3,\n        name: \"Emily K.\",\n        totalDonated: 52,\n        favoriteCause: \"Healthcare\",\n        impactDescription: \"Helped provide medical care\",\n        donationsCount: 26\n    },\n    {\n        id: 4,\n        name: \"David L.\",\n        totalDonated: 59,\n        favoriteCause: \"Food Security\",\n        impactDescription: \"Supported local food banks\",\n        donationsCount: 28\n    },\n    {\n        id: 5,\n        name: \"Jessica W.\",\n        totalDonated: 43,\n        favoriteCause: \"Community Development\",\n        impactDescription: \"Supported community development\",\n        donationsCount: 22\n    }\n];\nfunction getAvatarUrl(name) {\n    // Use UI Avatars to generate simple, initial-based avatars\n    const background = \"f43f5e\"; // rose-500\n    const color = \"ffffff\"; // white text\n    const size = 64; // we'll scale down in the UI\n    return \"https://ui-avatars.com/api/?name=\".concat(encodeURIComponent(name), \"&background=\").concat(background, \"&color=\").concat(color, \"&size=\").concat(size, \"&bold=true&format=svg\");\n}\nfunction CommunitySpotlight() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"bg-white rounded-lg shadow-sm border border-gray-200/50 overflow-hidden\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"bg-gradient-to-r from-rose-500 to-rose-400 px-4 py-5 sm:px-6 border-b border-gray-200/50\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center justify-between\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h3\", {\n                                    className: \"text-lg font-semibold leading-6 text-white\",\n                                    children: \"Community Impact Spotlight\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                    lineNumber: 71,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                    className: \"mt-1 text-sm text-rose-100\",\n                                    children: \"Showcasing some of our amazing contributors\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                    lineNumber: 74,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                            lineNumber: 70,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex items-center gap-2\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                className: \"inline-flex items-center rounded-md bg-rose-400/10 px-2 py-1 text-sm font-medium text-rose-100 ring-1 ring-inset ring-rose-400/20\",\n                                children: \"Live Feed\"\n                            }, void 0, false, {\n                                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                lineNumber: 79,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                            lineNumber: 78,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                    lineNumber: 69,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                lineNumber: 68,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"divide-y divide-gray-200/50\",\n                children: spotlightDonors.map((donor)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"flex items-center justify-between\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"flex items-center min-w-0 gap-x-4\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"flex-none\",\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_2___default()), {\n                                                    src: getAvatarUrl(donor.name),\n                                                    alt: \"\",\n                                                    width: 32,\n                                                    height: 32,\n                                                    className: \"rounded-full\",\n                                                    unoptimized: true\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                                    lineNumber: 95,\n                                                    columnNumber: 19\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                                lineNumber: 94,\n                                                columnNumber: 17\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                className: \"min-w-0 flex-auto\",\n                                                children: [\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                        className: \"text-sm font-semibold leading-6 text-gray-900\",\n                                                        children: donor.name\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                                        lineNumber: 105,\n                                                        columnNumber: 19\n                                                    }, this),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                        className: \"mt-1 text-xs leading-5 text-gray-500\",\n                                                        children: donor.favoriteCause\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                                        lineNumber: 108,\n                                                        columnNumber: 19\n                                                    }, this)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                                lineNumber: 104,\n                                                columnNumber: 17\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                        lineNumber: 93,\n                                        columnNumber: 15\n                                    }, this),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                        className: \"text-right\",\n                                        children: [\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: \"text-sm font-medium text-gray-900\",\n                                                children: [\n                                                    \"$\",\n                                                    donor.totalDonated.toLocaleString()\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                                lineNumber: 114,\n                                                columnNumber: 17\n                                            }, this),\n                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                className: \"mt-1 text-xs text-gray-500\",\n                                                children: [\n                                                    donor.donationsCount,\n                                                    \" donations\"\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                                lineNumber: 117,\n                                                columnNumber: 17\n                                            }, this)\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                        lineNumber: 113,\n                                        columnNumber: 15\n                                    }, this)\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                lineNumber: 92,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                className: \"mt-2\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"text-xs text-gray-600 bg-gray-50 rounded-md px-2 py-1 inline-block\",\n                                    children: donor.impactDescription\n                                }, void 0, false, {\n                                    fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                    lineNumber: 123,\n                                    columnNumber: 15\n                                }, this)\n                            }, void 0, false, {\n                                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                                lineNumber: 122,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, donor.id, true, {\n                        fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                        lineNumber: 88,\n                        columnNumber: 11\n                    }, this))\n            }, void 0, false, {\n                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                lineNumber: 86,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200/50\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                    className: \"text-xs text-center text-gray-500\",\n                    children: \"Join our community and make your impact today\"\n                }, void 0, false, {\n                    fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                    lineNumber: 132,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n                lineNumber: 131,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/deandremoore/Desktop/kindly/src/components/CommunitySpotlight.tsx\",\n        lineNumber: 67,\n        columnNumber: 5\n    }, this);\n}\n_c = CommunitySpotlight;\nvar _c;\n$RefreshReg$(_c, \"CommunitySpotlight\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvQ29tbXVuaXR5U3BvdGxpZ2h0LnRzeD9mNDdmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSc7XG5cbmludGVyZmFjZSBTcG90bGlnaHREb25vciB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgdG90YWxEb25hdGVkOiBudW1iZXI7XG4gIGZhdm9yaXRlQ2F1c2U6IHN0cmluZztcbiAgaW1wYWN0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZG9uYXRpb25zQ291bnQ6IG51bWJlcjtcbn1cblxuY29uc3Qgc3BvdGxpZ2h0RG9ub3JzOiBTcG90bGlnaHREb25vcltdID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgbmFtZTogXCJTYXJhaCBNLlwiLFxuICAgIHRvdGFsRG9uYXRlZDogNDcsXG4gICAgZmF2b3JpdGVDYXVzZTogXCJFbnZpcm9ubWVudGFsIENvbnNlcnZhdGlvblwiLFxuICAgIGltcGFjdERlc2NyaXB0aW9uOiBcIlN1cHBvcnRlZCBlbnZpcm9ubWVudGFsIGNvbnNlcnZhdGlvblwiLFxuICAgIGRvbmF0aW9uc0NvdW50OiAyNFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgbmFtZTogXCJNaWNoYWVsIFIuXCIsXG4gICAgdG90YWxEb25hdGVkOiA2OCxcbiAgICBmYXZvcml0ZUNhdXNlOiBcIkVkdWNhdGlvblwiLFxuICAgIGltcGFjdERlc2NyaXB0aW9uOiBcIkhlbHBlZCBmdW5kIHlvdXRoIGVkdWNhdGlvblwiLFxuICAgIGRvbmF0aW9uc0NvdW50OiAzMVxuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgbmFtZTogXCJFbWlseSBLLlwiLFxuICAgIHRvdGFsRG9uYXRlZDogNTIsXG4gICAgZmF2b3JpdGVDYXVzZTogXCJIZWFsdGhjYXJlXCIsXG4gICAgaW1wYWN0RGVzY3JpcHRpb246IFwiSGVscGVkIHByb3ZpZGUgbWVkaWNhbCBjYXJlXCIsXG4gICAgZG9uYXRpb25zQ291bnQ6IDI2XG4gIH0sXG4gIHtcbiAgICBpZDogNCxcbiAgICBuYW1lOiBcIkRhdmlkIEwuXCIsXG4gICAgdG90YWxEb25hdGVkOiA1OSxcbiAgICBmYXZvcml0ZUNhdXNlOiBcIkZvb2QgU2VjdXJpdHlcIixcbiAgICBpbXBhY3REZXNjcmlwdGlvbjogXCJTdXBwb3J0ZWQgbG9jYWwgZm9vZCBiYW5rc1wiLFxuICAgIGRvbmF0aW9uc0NvdW50OiAyOFxuICB9LFxuICB7XG4gICAgaWQ6IDUsXG4gICAgbmFtZTogXCJKZXNzaWNhIFcuXCIsXG4gICAgdG90YWxEb25hdGVkOiA0MyxcbiAgICBmYXZvcml0ZUNhdXNlOiBcIkNvbW11bml0eSBEZXZlbG9wbWVudFwiLFxuICAgIGltcGFjdERlc2NyaXB0aW9uOiBcIlN1cHBvcnRlZCBjb21tdW5pdHkgZGV2ZWxvcG1lbnRcIixcbiAgICBkb25hdGlvbnNDb3VudDogMjJcbiAgfVxuXTtcblxuZnVuY3Rpb24gZ2V0QXZhdGFyVXJsKG5hbWU6IHN0cmluZykge1xuICAvLyBVc2UgVUkgQXZhdGFycyB0byBnZW5lcmF0ZSBzaW1wbGUsIGluaXRpYWwtYmFzZWQgYXZhdGFyc1xuICBjb25zdCBiYWNrZ3JvdW5kID0gJ2Y0M2Y1ZSc7IC8vIHJvc2UtNTAwXG4gIGNvbnN0IGNvbG9yID0gJ2ZmZmZmZic7IC8vIHdoaXRlIHRleHRcbiAgY29uc3Qgc2l6ZSA9IDY0OyAvLyB3ZSdsbCBzY2FsZSBkb3duIGluIHRoZSBVSVxuICBcbiAgcmV0dXJuIGBodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8/bmFtZT0ke2VuY29kZVVSSUNvbXBvbmVudChuYW1lKX0mYmFja2dyb3VuZD0ke2JhY2tncm91bmR9JmNvbG9yPSR7Y29sb3J9JnNpemU9JHtzaXplfSZib2xkPXRydWUmZm9ybWF0PXN2Z2A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDb21tdW5pdHlTcG90bGlnaHQoKSB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy13aGl0ZSByb3VuZGVkLWxnIHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLWdyYXktMjAwLzUwIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tcm9zZS01MDAgdG8tcm9zZS00MDAgcHgtNCBweS01IHNtOnB4LTYgYm9yZGVyLWIgYm9yZGVyLWdyYXktMjAwLzUwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgbGVhZGluZy02IHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgQ29tbXVuaXR5IEltcGFjdCBTcG90bGlnaHRcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1yb3NlLTEwMFwiPlxuICAgICAgICAgICAgICBTaG93Y2FzaW5nIHNvbWUgb2Ygb3VyIGFtYXppbmcgY29udHJpYnV0b3JzXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHJvdW5kZWQtbWQgYmctcm9zZS00MDAvMTAgcHgtMiBweS0xIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1yb3NlLTEwMCByaW5nLTEgcmluZy1pbnNldCByaW5nLXJvc2UtNDAwLzIwXCI+XG4gICAgICAgICAgICAgIExpdmUgRmVlZFxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS1ncmF5LTIwMC81MFwiPlxuICAgICAgICB7c3BvdGxpZ2h0RG9ub3JzLm1hcCgoZG9ub3IpID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2Rvbm9yLmlkfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS00IHNtOnB4LTYgaG92ZXI6YmctZ3JheS01MCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBtaW4tdy0wIGdhcC14LTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICAgICAgICAgIHNyYz17Z2V0QXZhdGFyVXJsKGRvbm9yLm5hbWUpfVxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJcIlxuICAgICAgICAgICAgICAgICAgICB3aWR0aD17MzJ9XG4gICAgICAgICAgICAgICAgICAgIGhlaWdodD17MzJ9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQtZnVsbFwiXG4gICAgICAgICAgICAgICAgICAgIHVub3B0aW1pemVkXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMCBmbGV4LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCBsZWFkaW5nLTYgdGV4dC1ncmF5LTkwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7ZG9ub3IubmFtZX1cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14cyBsZWFkaW5nLTUgdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7ZG9ub3IuZmF2b3JpdGVDYXVzZX1cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTkwMFwiPlxuICAgICAgICAgICAgICAgICAgJHtkb25vci50b3RhbERvbmF0ZWQudG9Mb2NhbGVTdHJpbmcoKX1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXhzIHRleHQtZ3JheS01MDBcIj5cbiAgICAgICAgICAgICAgICAgIHtkb25vci5kb25hdGlvbnNDb3VudH0gZG9uYXRpb25zXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWdyYXktNjAwIGJnLWdyYXktNTAgcm91bmRlZC1tZCBweC0yIHB5LTEgaW5saW5lLWJsb2NrXCI+XG4gICAgICAgICAgICAgICAge2Rvbm9yLmltcGFjdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktNCBzbTpweC02IGJnLWdyYXktNTAgYm9yZGVyLXQgYm9yZGVyLWdyYXktMjAwLzUwXCI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1jZW50ZXIgdGV4dC1ncmF5LTUwMFwiPlxuICAgICAgICAgIEpvaW4gb3VyIGNvbW11bml0eSBhbmQgbWFrZSB5b3VyIGltcGFjdCB0b2RheVxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsIkltYWdlIiwic3BvdGxpZ2h0RG9ub3JzIiwiaWQiLCJuYW1lIiwidG90YWxEb25hdGVkIiwiZmF2b3JpdGVDYXVzZSIsImltcGFjdERlc2NyaXB0aW9uIiwiZG9uYXRpb25zQ291bnQiLCJnZXRBdmF0YXJVcmwiLCJiYWNrZ3JvdW5kIiwiY29sb3IiLCJzaXplIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiQ29tbXVuaXR5U3BvdGxpZ2h0IiwiZGl2IiwiY2xhc3NOYW1lIiwiaDMiLCJwIiwic3BhbiIsIm1hcCIsImRvbm9yIiwic3JjIiwiYWx0Iiwid2lkdGgiLCJoZWlnaHQiLCJ1bm9wdGltaXplZCIsInRvTG9jYWxlU3RyaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/CommunitySpotlight.tsx\n"));

/***/ })

});