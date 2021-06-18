'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var VimrcPlugin = /** @class */ (function (_super) {
    __extends(VimrcPlugin, _super);
    function VimrcPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastYankBuffer = new Array(0);
        _this.lastSystemClipboard = "";
        _this.yankToSystemClipboard = false;
        return _this;
    }
    VimrcPlugin.prototype.onload = function () {
        var _this = this;
        console.log('loading Vimrc plugin');
        this.registerEvent(this.app.workspace.on('file-open', function (file) {
            var VIMRC_FILE_NAME = '.obsidian.vimrc';
            _this.app.vault.adapter.read(VIMRC_FILE_NAME).
                then(function (lines) { return _this.readVimInit(lines); }).
                catch(function (error) { console.log('Error loading vimrc file', VIMRC_FILE_NAME, 'from the vault root'); });
        }));
        this.registerDomEvent(document, 'click', function () {
            _this.captureYankBuffer();
        });
        this.registerDomEvent(document, 'keyup', function () {
            _this.captureYankBuffer();
        });
        this.registerDomEvent(document, 'focusin', function () {
            _this.captureYankBuffer();
        });
    };
    VimrcPlugin.prototype.onunload = function () {
        console.log('unloading Vimrc plugin (but Vim commands that were already loaded will still work)');
    };
    VimrcPlugin.prototype.readVimInit = function (vimCommands) {
        var _this = this;
        var view = this.app.workspace.activeLeaf.view;
        if (view.getViewType() == 'markdown') {
            var markdownView = view;
            var cmEditor = markdownView.sourceMode.cmEditor;
            if (cmEditor && !CodeMirror.Vim.loadedVimrc) {
                CodeMirror.Vim.defineOption('clipboard', '', 'string', ['clip'], function (value, cm) {
                    if (value) {
                        if (value.trim() == 'unnamed' || value.trim() == 'unnamedplus') {
                            if (!_this.yankToSystemClipboard) {
                                _this.yankToSystemClipboard = true;
                                console.log("Vim is now set to yank to system clipboard.");
                            }
                        }
                        else {
                            throw new Error("Unrecognized clipboard option, supported are 'unnamed' and 'unnamedplus' (and they do the same)");
                        }
                    }
                });
                CodeMirror.Vim.defineOption('tabstop', 4, 'number', [], function (value, cm) {
                    if (value) {
                        cmEditor.setOption('tabSize', value);
                    }
                });
                CodeMirror.Vim.defineEx('iunmap', '', function (cm, params) {
                    if (params.argString.trim()) {
                        CodeMirror.Vim.unmap(params.argString.trim(), 'insert');
                    }
                });
                CodeMirror.Vim.defineEx('noremap', '', function (cm, params) {
                    var _a;
                    if (!((_a = params === null || params === void 0 ? void 0 : params.args) === null || _a === void 0 ? void 0 : _a.length)) {
                        throw new Error('Invalid mapping: noremap');
                    }
                    if (params.argString.trim()) {
                        CodeMirror.Vim.noremap.apply(CodeMirror.Vim, params.args);
                    }
                });
                vimCommands.split("\n").forEach(function (line, index, arr) {
                    if (line.trim().length > 0 && line.trim()[0] != '"') {
                        CodeMirror.Vim.handleEx(cmEditor, line);
                    }
                });
                // Make sure that we load it just once per CodeMirror instance.
                // This is supposed to work because the Vim state is kept at the keymap level, hopefully
                // there will not be bugs caused by operations that are kept at the object level instead
                CodeMirror.Vim.loadedVimrc = true;
            }
        }
    };
    VimrcPlugin.prototype.captureYankBuffer = function () {
        var _this = this;
        if (this.yankToSystemClipboard) {
            var currentBuffer = CodeMirror.Vim.getRegisterController().getRegister('yank').keyBuffer;
            if (currentBuffer != this.lastYankBuffer) {
                if (this.lastYankBuffer.length > 0 && currentBuffer.length > 0 && currentBuffer[0]) {
                    navigator.clipboard.writeText(currentBuffer[0]);
                    navigator.clipboard.readText().then(function (value) { _this.lastSystemClipboard = value; });
                    console.log("Yank captured");
                }
                this.lastYankBuffer = currentBuffer;
                return;
            }
            var currentClipboard = navigator.clipboard.readText().then(function (value) {
                if (value != _this.lastSystemClipboard) {
                    console.log("Clipboard change captured");
                    var yankRegister = CodeMirror.Vim.getRegisterController().getRegister('yank');
                    yankRegister.setText(value);
                    _this.lastYankBuffer = yankRegister.keyBuffer;
                    _this.lastSystemClipboard = value;
                }
            });
        }
    };
    return VimrcPlugin;
}(obsidian.Plugin));

module.exports = VimrcPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBQbHVnaW4sIFRGaWxlLCBNYXJrZG93blZpZXcgfSBmcm9tICdvYnNpZGlhbic7XHJcbmRlY2xhcmUgY29uc3QgQ29kZU1pcnJvcjogYW55O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmltcmNQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHByaXZhdGUgbGFzdFlhbmtCdWZmZXIgPSBuZXcgQXJyYXk8c3RyaW5nPigwKTtcclxuXHRwcml2YXRlIGxhc3RTeXN0ZW1DbGlwYm9hcmQgPSBcIlwiO1xyXG5cdHByaXZhdGUgeWFua1RvU3lzdGVtQ2xpcGJvYXJkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdG9ubG9hZCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdsb2FkaW5nIFZpbXJjIHBsdWdpbicpO1xyXG5cclxuXHRcdHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2ZpbGUtb3BlbicsIChmaWxlOiBURmlsZSkgPT4ge1xyXG5cdFx0XHRjb25zdCBWSU1SQ19GSUxFX05BTUUgPSAnLm9ic2lkaWFuLnZpbXJjJztcclxuXHRcdFx0dGhpcy5hcHAudmF1bHQuYWRhcHRlci5yZWFkKFZJTVJDX0ZJTEVfTkFNRSkuXHJcblx0XHRcdFx0dGhlbigobGluZXMpID0+IHRoaXMucmVhZFZpbUluaXQobGluZXMpKS5cclxuXHRcdFx0XHRjYXRjaChlcnJvciA9PiB7IGNvbnNvbGUubG9nKCdFcnJvciBsb2FkaW5nIHZpbXJjIGZpbGUnLCBWSU1SQ19GSUxFX05BTUUsICdmcm9tIHRoZSB2YXVsdCByb290JykgfSk7XHJcblx0XHR9KSk7XHJcblxyXG5cdFx0dGhpcy5yZWdpc3RlckRvbUV2ZW50KGRvY3VtZW50LCAnY2xpY2snLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMuY2FwdHVyZVlhbmtCdWZmZXIoKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5yZWdpc3RlckRvbUV2ZW50KGRvY3VtZW50LCAna2V5dXAnLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMuY2FwdHVyZVlhbmtCdWZmZXIoKTtcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5yZWdpc3RlckRvbUV2ZW50KGRvY3VtZW50LCAnZm9jdXNpbicsICgpID0+IHtcclxuXHRcdFx0dGhpcy5jYXB0dXJlWWFua0J1ZmZlcigpO1xyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdG9udW5sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ3VubG9hZGluZyBWaW1yYyBwbHVnaW4gKGJ1dCBWaW0gY29tbWFuZHMgdGhhdCB3ZXJlIGFscmVhZHkgbG9hZGVkIHdpbGwgc3RpbGwgd29yayknKTtcclxuXHR9XHJcblxyXG5cdHJlYWRWaW1Jbml0KHZpbUNvbW1hbmRzOiBzdHJpbmcpIHtcclxuXHRcdHZhciB2aWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldztcclxuXHRcdGlmICh2aWV3LmdldFZpZXdUeXBlKCkgPT0gJ21hcmtkb3duJykge1xyXG5cdFx0XHR2YXIgbWFya2Rvd25WaWV3ID0gdmlldyBhcyBNYXJrZG93blZpZXc7XHJcblx0XHRcdHZhciBjbUVkaXRvciA9IG1hcmtkb3duVmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0XHRpZiAoY21FZGl0b3IgJiYgIUNvZGVNaXJyb3IuVmltLmxvYWRlZFZpbXJjKSB7XHJcblx0XHRcdFx0Q29kZU1pcnJvci5WaW0uZGVmaW5lT3B0aW9uKCdjbGlwYm9hcmQnLCAnJywgJ3N0cmluZycsIFsnY2xpcCddLCAodmFsdWUsIGNtKSA9PiB7XHJcblx0XHRcdFx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKHZhbHVlLnRyaW0oKSA9PSAndW5uYW1lZCcgfHwgdmFsdWUudHJpbSgpID09ICd1bm5hbWVkcGx1cycpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAoIXRoaXMueWFua1RvU3lzdGVtQ2xpcGJvYXJkKSB7XHJcblx0XHRcdFx0XHRcdFx0XHR0aGlzLnlhbmtUb1N5c3RlbUNsaXBib2FyZCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIlZpbSBpcyBub3cgc2V0IHRvIHlhbmsgdG8gc3lzdGVtIGNsaXBib2FyZC5cIik7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVucmVjb2duaXplZCBjbGlwYm9hcmQgb3B0aW9uLCBzdXBwb3J0ZWQgYXJlICd1bm5hbWVkJyBhbmQgJ3VubmFtZWRwbHVzJyAoYW5kIHRoZXkgZG8gdGhlIHNhbWUpXCIpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRDb2RlTWlycm9yLlZpbS5kZWZpbmVPcHRpb24oJ3RhYnN0b3AnLCA0LCAnbnVtYmVyJywgW10sICh2YWx1ZSwgY20pID0+IHtcclxuXHRcdFx0XHRcdGlmICh2YWx1ZSkge1xyXG5cdFx0XHRcdFx0XHRjbUVkaXRvci5zZXRPcHRpb24oJ3RhYlNpemUnLCB2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdENvZGVNaXJyb3IuVmltLmRlZmluZUV4KCdpdW5tYXAnLCAnJywgKGNtLCBwYXJhbXMpID0+IHtcclxuXHRcdFx0XHRcdGlmIChwYXJhbXMuYXJnU3RyaW5nLnRyaW0oKSkge1xyXG5cdFx0XHRcdFx0XHRDb2RlTWlycm9yLlZpbS51bm1hcChwYXJhbXMuYXJnU3RyaW5nLnRyaW0oKSwgJ2luc2VydCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRDb2RlTWlycm9yLlZpbS5kZWZpbmVFeCgnbm9yZW1hcCcsICcnLCAoY20sIHBhcmFtcykgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCFwYXJhbXM/LmFyZ3M/Lmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWFwcGluZzogbm9yZW1hcCcpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFx0aWYgKHBhcmFtcy5hcmdTdHJpbmcudHJpbSgpKSB7XHJcblx0XHRcdFx0XHRcdENvZGVNaXJyb3IuVmltLm5vcmVtYXAuYXBwbHkoQ29kZU1pcnJvci5WaW0sIHBhcmFtcy5hcmdzKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0dmltQ29tbWFuZHMuc3BsaXQoXCJcXG5cIikuZm9yRWFjaChcclxuXHRcdFx0XHRcdGZ1bmN0aW9uKGxpbmUsIGluZGV4LCBhcnIpIHtcclxuXHRcdFx0XHRcdFx0aWYgKGxpbmUudHJpbSgpLmxlbmd0aCA+IDAgJiYgbGluZS50cmltKClbMF0gIT0gJ1wiJykge1xyXG5cdFx0XHRcdFx0XHRcdENvZGVNaXJyb3IuVmltLmhhbmRsZUV4KGNtRWRpdG9yLCBsaW5lKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdClcclxuXHJcblx0XHRcdFx0Ly8gTWFrZSBzdXJlIHRoYXQgd2UgbG9hZCBpdCBqdXN0IG9uY2UgcGVyIENvZGVNaXJyb3IgaW5zdGFuY2UuXHJcblx0XHRcdFx0Ly8gVGhpcyBpcyBzdXBwb3NlZCB0byB3b3JrIGJlY2F1c2UgdGhlIFZpbSBzdGF0ZSBpcyBrZXB0IGF0IHRoZSBrZXltYXAgbGV2ZWwsIGhvcGVmdWxseVxyXG5cdFx0XHRcdC8vIHRoZXJlIHdpbGwgbm90IGJlIGJ1Z3MgY2F1c2VkIGJ5IG9wZXJhdGlvbnMgdGhhdCBhcmUga2VwdCBhdCB0aGUgb2JqZWN0IGxldmVsIGluc3RlYWRcclxuXHRcdFx0XHRDb2RlTWlycm9yLlZpbS5sb2FkZWRWaW1yYyA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNhcHR1cmVZYW5rQnVmZmVyKCkge1xyXG5cdFx0aWYgKHRoaXMueWFua1RvU3lzdGVtQ2xpcGJvYXJkKSB7XHJcblx0XHRcdGxldCBjdXJyZW50QnVmZmVyID0gQ29kZU1pcnJvci5WaW0uZ2V0UmVnaXN0ZXJDb250cm9sbGVyKCkuZ2V0UmVnaXN0ZXIoJ3lhbmsnKS5rZXlCdWZmZXI7XHJcblx0XHRcdGlmIChjdXJyZW50QnVmZmVyICE9IHRoaXMubGFzdFlhbmtCdWZmZXIpIHtcclxuXHRcdFx0XHRpZiAodGhpcy5sYXN0WWFua0J1ZmZlci5sZW5ndGggPiAwICYmIGN1cnJlbnRCdWZmZXIubGVuZ3RoID4gMCAmJiBjdXJyZW50QnVmZmVyWzBdKSB7XHJcblx0XHRcdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChjdXJyZW50QnVmZmVyWzBdKTtcclxuXHRcdFx0XHRcdG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKS50aGVuKCh2YWx1ZSkgPT4geyB0aGlzLmxhc3RTeXN0ZW1DbGlwYm9hcmQgPSB2YWx1ZTsgfSk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIllhbmsgY2FwdHVyZWRcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMubGFzdFlhbmtCdWZmZXIgPSBjdXJyZW50QnVmZmVyO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgY3VycmVudENsaXBib2FyZCA9IG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdGlmICh2YWx1ZSAhPSB0aGlzLmxhc3RTeXN0ZW1DbGlwYm9hcmQpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiQ2xpcGJvYXJkIGNoYW5nZSBjYXB0dXJlZFwiKTtcclxuXHRcdFx0XHRcdGxldCB5YW5rUmVnaXN0ZXIgPSBDb2RlTWlycm9yLlZpbS5nZXRSZWdpc3RlckNvbnRyb2xsZXIoKS5nZXRSZWdpc3RlcigneWFuaycpXHJcblx0XHRcdFx0XHR5YW5rUmVnaXN0ZXIuc2V0VGV4dCh2YWx1ZSk7XHJcblx0XHRcdFx0XHR0aGlzLmxhc3RZYW5rQnVmZmVyID0geWFua1JlZ2lzdGVyLmtleUJ1ZmZlcjtcclxuXHRcdFx0XHRcdHRoaXMubGFzdFN5c3RlbUNsaXBib2FyZCA9IHZhbHVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZ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