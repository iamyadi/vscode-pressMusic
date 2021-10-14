/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __webpack_require__(1);
const player_1 = __webpack_require__(3);
const keymMap = {
    q: 1,
    w: 2,
    e: 3,
    r: 4,
    t: 5,
    y: 6,
    u: 7,
    i: 8,
    o: 9,
    p: 10,
    a: 1,
    s: 2,
    d: 3,
    f: 4,
    g: 5,
    h: 6,
    j: 7,
    k: 8,
    l: 9,
    z: 1,
    x: 2,
    c: 3,
    v: 4,
    b: 5,
    n: 6,
    m: 7,
    otherDo: 11,
    otherTi: 12,
};
class PlayCenter {
    constructor(opt) {
        this.opt = opt || 'default';
        this.reminder();
    }
    reminder() {
        const config = vscode.workspace.getConfiguration('pressMusic');
        const reminderTime = config.get('reminderTime', 1);
        const reminderEnabled = config.get('reminderEnabled', true);
        if (!reminderEnabled) {
            return;
        }
        this.timer = setInterval(() => {
            this.play('reminderTime');
            vscode.window.showInformationMessage('是时候休息一下啦啦啦~~~ pressMusic reminder');
        }, reminderTime * 60 * 60 * 1000);
    }
    play(text) {
        if (text === 'reminderTime') {
            player_1.default.play(`./music/test.mp3`, {}, (err) => {
                console.log('err:', err);
            });
            return;
        }
        let keyText = '';
        if (text === '\n') {
            keyText = 'otherDo';
        }
        else if (text.trim() === "") {
            keyText = 'otherTi';
        }
        else {
            keyText = text.trim();
        }
        player_1.default.play(`./music/${keymMap[keyText]}.mp3`, {}, (err) => {
            console.log('err:', err);
        });
    }
    dispose() {
        this.timer && clearInterval(this.timer);
    }
}
exports["default"] = PlayCenter;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var fs = __webpack_require__(8), findExec = __webpack_require__(5), spawn = __webpack_require__(6).spawn, players = [
    'afplay',
    'mplayer',
    'mpg123',
    'mpg321',
    'play',
    'omxplayer',
    'aplay',
    'cmdmp3'
];
const path = __webpack_require__(4);
class Play {
    constructor(opts) {
        this.opts = opts || {};
        this.players = opts.players || players;
        this.player = opts.player || findExec(this.players);
        this.urlRegex = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/i;
    }
    play(what, options, next) {
        next = next || function () { };
        next = typeof options === 'function' ? options : next;
        options = typeof options === 'object' ? options : {};
        options.stdio = 'ignore';
        options.volume = 20;
        var isURL = this.player === 'mplayer' && this.urlRegex.test(what);
        if (!what) {
            return next(new Error("No audio file specified"));
        }
        ;
        if (!this.player) {
            return next(new Error("Couldn't find a suitable audio player"));
        }
        var args = Array.isArray(options[this.player]) ? options[this.player].concat(what) : [what];
        const videoPath = args.map((pathString) => {
            return path.join(__dirname, pathString);
        });
        var process = spawn(this.player, videoPath, options);
        if (!process) {
            next(new Error("Unable to spawn process with " + this.player));
            return null;
        }
        process.on('close', function (err) {
            next(err && !err.killed ? err : null);
        });
        return process;
    }
    ;
    test() {
        this.play('./music/test.mp3', {});
    }
}
const player = new Play({});
exports["default"] = player;


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var exec = __webpack_require__(6).execSync
var platform = __webpack_require__(7).platform()

module.exports = function(){
  var commands = Array.isArray(arguments[0]) ? arguments[0] : Array.prototype.slice.apply(arguments)
  var command = null

  commands.some(function(c){
    if (isExec(findCommand(c))){
      command = c
      return true
    }
  })

  return command
}

function isExec(command){
  try{
    exec(command)
    return true
  }
  catch (_e){
    return false
  }
}

function findCommand(command){
  if (/^win/.test(platform)){
    return "where " + command
  } else {
    return "command -v " + command
  }
}


/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),
/* 7 */
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),
/* 8 */
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })
/******/ 	]);
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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const playCenter_1 = __webpack_require__(2);
let documentChangeListenerDisposer = null;
let statusBarPause;
let statusBarPlay;
let isStop = false;
// config values
let enabled = true;
let playCenter = null;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    vscode.workspace.onDidChangeConfiguration(onDidChangeConfiguration);
    onDidChangeConfiguration();
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
    if (playCenter) {
        playCenter.dispose();
    }
    if (documentChangeListenerDisposer) {
        documentChangeListenerDisposer.dispose();
        documentChangeListenerDisposer = null;
    }
}
exports.deactivate = deactivate;
function onDidChangeConfiguration() {
    const config = vscode.workspace.getConfiguration('pressMusic');
    enabled = config.get('enabled', true);
    if (enabled) {
        init(config);
    }
    else {
        deactivate();
    }
}
function init(config) {
    // clear all
    deactivate();
    // set status bar item
    setVolContraller();
    // set listener
    playCenter = new playCenter_1.default(config.get('type', 'piano'));
    documentChangeListenerDisposer = vscode.workspace.onDidChangeTextDocument(onDidChangeTextDocument);
}
function setVolContraller() {
    const pauseCommandId = 'pressMusic.pause';
    vscode.commands.registerCommand(pauseCommandId, onchangeVolume);
    statusBarPause = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 300);
    statusBarPause.command = pauseCommandId;
    statusBarPause.text = "$(debug-pause) PressMusic";
    statusBarPause.tooltip = "stop press music!";
    statusBarPlay = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 300);
    statusBarPlay.command = pauseCommandId;
    statusBarPlay.text = "$(run) PressMusic";
    statusBarPlay.tooltip = "play press music!";
    statusBarPause.show();
}
function changeVolumeController() {
    if (isStop) {
        statusBarPause.hide();
        statusBarPlay.show();
    }
    else {
        statusBarPlay.hide();
        statusBarPause.show();
    }
}
function onchangeVolume() {
    isStop = !isStop;
    changeVolumeController();
    vscode.window.showInformationMessage(isStop ? 'pressMusic已经暂停!!!' : '已经开启pressMusic，enjoy~~~');
}
function onDidChangeTextDocument(event) {
    const text = event.contentChanges?.[0].text;
    !isStop && playCenter?.play(text);
}

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map