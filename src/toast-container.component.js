"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var toast_options_1 = require("./toast-options");
var platform_browser_1 = require("@angular/platform-browser");
require("rxjs/add/operator/first");
var Subject_1 = require("rxjs/Subject");
var ToastContainer = (function () {
    function ToastContainer(sanitizer, cdr, _zone, options) {
        this.sanitizer = sanitizer;
        this.cdr = cdr;
        this._zone = _zone;
        this.position = 'fixed';
        this.toasts = [];
        this._fresh = true;
        this._onEnter = new Subject_1.Subject();
        this._onExit = new Subject_1.Subject();
        Object.assign(this, options);
    }
    ToastContainer.prototype.onEnter = function () {
        return this._onEnter.asObservable();
    };
    ToastContainer.prototype.onExit = function () {
        return this._onExit.asObservable();
    };
    ToastContainer.prototype.addToast = function (toast) {
        if (this.positionClass.indexOf('top') > 0) {
            if (this.newestOnTop) {
                this.toasts.unshift(toast);
            }
            else {
                this.toasts.push(toast);
            }
            if (this.toasts.length > this.maxShown) {
                var diff = this.toasts.length - this.maxShown;
                if (this.newestOnTop) {
                    this.toasts.splice(this.maxShown);
                }
                else {
                    this.toasts.splice(0, diff);
                }
            }
        }
        else {
            this.toasts.unshift(toast);
            if (this.toasts.length > this.maxShown) {
                this.toasts.splice(this.maxShown);
            }
        }
        if (this.animate === null && this._fresh) {
            this._fresh = false;
            this._onEnter.next();
            this._onEnter.complete();
        }
        this.cdr.detectChanges();
    };
    ToastContainer.prototype.removeToast = function (toast) {
        if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
            toast.timeoutId = null;
        }
        this.toasts = this.toasts.filter(function (t) {
            return t.id !== toast.id;
        });
    };
    ToastContainer.prototype.pinToast = function (toast) {
        if (toast.timeoutId) {
            clearTimeout(toast.timeoutId);
        }
    };
    ToastContainer.prototype.removeAllToasts = function () {
        this.toasts = [];
    };
    ToastContainer.prototype.clicked = function (toast) {
        if (this.onToastClicked) {
            this.onToastClicked(toast);
        }
    };
    ToastContainer.prototype.anyToast = function () {
        return this.toasts.length > 0;
    };
    ToastContainer.prototype.findToast = function (toastId) {
        for (var _i = 0, _a = this.toasts; _i < _a.length; _i++) {
            var toast = _a[_i];
            if (toast.id === toastId) {
                return toast;
            }
        }
        return null;
    };
    ToastContainer.prototype.onAnimationEnd = function (event) {
        var _this = this;
        if (event.toState === 'void' && !this.anyToast()) {
            this._ngExit();
        }
        else if (this._fresh && event.fromState === 'void') {
            // notify when first animation is done
            this._fresh = false;
            this._zone.run(function () {
                _this._onEnter.next();
                _this._onEnter.complete();
            });
        }
    };
    ToastContainer.prototype._ngExit = function () {
        var _this = this;
        this._zone.onMicrotaskEmpty.first().subscribe(function () {
            _this._onExit.next();
            _this._onExit.complete();
        });
    };
    ToastContainer.prototype.ngOnDestroy = function () {
        this._ngExit();
    };
    return ToastContainer;
}());
ToastContainer = __decorate([
    core_1.Component({
        selector: 'toast-container',
        template: "\n    <div #toastContainer id=\"toast-container\" [style.position]=\"position\" class=\"{{positionClass}}\">\n      <div *ngFor=\"let toast of toasts\" [@inOut]=\"animate\" (@inOut.done)=\"onAnimationEnd($event)\" class=\"toast toast-{{toast.type}}\" \n      (click)=\"clicked(toast)\">\n        <div class=\"toast-close-button\" *ngIf=\"toast.config.showCloseButton\" (click)=\"removeToast(toast)\">&times;\n        </div> \n        <div class=\"toast-close-button\" *ngIf=\"toast.config.showPinButton\" (click)=\"pinToast(toast)\"><i class='fa fa-thumb-tack' aria-hidden='true' style='font-size: x-small; margin-top: 11px; margin-right: 5px'></i>\n        \n        </div>\n        <div *ngIf=\"toast.title\" class=\"{{toast.config.titleClass || titleClass}}\">{{toast.title}}</div>\n        <div [ngSwitch]=\"toast.config.enableHTML\">\n          <span *ngSwitchCase=\"true\" class=\"{{toast.config.messageClass || messageClass}}\" [innerHTML]=\"sanitizer.bypassSecurityTrustHtml(toast.message)\"></span>\n          <span *ngSwitchDefault class=\"{{toast.config.messageClass || messageClass}}\">{{toast.message}}</span>\n        </div>             \n      </div>\n    </div>\n    ",
        animations: [
            core_1.trigger('inOut', [
                core_1.state('flyRight, flyLeft', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                core_1.state('fade', core_1.style({ opacity: 1 })),
                core_1.state('slideDown, slideUp', core_1.style({ opacity: 1, transform: 'translateY(0)' })),
                core_1.transition('void => flyRight', [
                    core_1.style({
                        opacity: 0,
                        transform: 'translateX(100%)'
                    }),
                    core_1.animate('0.2s ease-in')
                ]),
                core_1.transition('flyRight => void', [
                    core_1.animate('0.2s 10ms ease-out', core_1.style({
                        opacity: 0,
                        transform: 'translateX(100%)'
                    }))
                ]),
                core_1.transition('void => flyLeft', [
                    core_1.style({
                        opacity: 0,
                        transform: 'translateX(-100%)'
                    }),
                    core_1.animate('0.2s ease-in')
                ]),
                core_1.transition('flyLeft => void', [
                    core_1.animate('0.2s 10ms ease-out', core_1.style({
                        opacity: 0,
                        transform: 'translateX(-100%)'
                    }))
                ]),
                core_1.transition('void => fade', [
                    core_1.style({
                        opacity: 0,
                    }),
                    core_1.animate('0.3s ease-in')
                ]),
                core_1.transition('fade => void', [
                    core_1.animate('0.3s 10ms ease-out', core_1.style({
                        opacity: 0,
                    }))
                ]),
                core_1.transition('void => slideDown', [
                    core_1.style({
                        opacity: 0,
                        transform: 'translateY(-200%)'
                    }),
                    core_1.animate('0.3s ease-in')
                ]),
                core_1.transition('slideDown => void', [
                    core_1.animate('0.3s 10ms ease-out', core_1.style({
                        opacity: 0,
                        transform: 'translateY(-200%)'
                    }))
                ]),
                core_1.transition('void => slideUp', [
                    core_1.style({
                        opacity: 0,
                        transform: 'translateY(200%)'
                    }),
                    core_1.animate('0.3s ease-in')
                ]),
                core_1.transition('slideUp => void', [
                    core_1.animate('0.3s 10ms ease-out', core_1.style({
                        opacity: 0,
                        transform: 'translateY(200%)'
                    }))
                ]),
            ]),
        ],
    }),
    __metadata("design:paramtypes", [platform_browser_1.DomSanitizer,
        core_1.ChangeDetectorRef,
        core_1.NgZone,
        toast_options_1.ToastOptions])
], ToastContainer);
exports.ToastContainer = ToastContainer;
//# sourceMappingURL=toast-container.component.js.map