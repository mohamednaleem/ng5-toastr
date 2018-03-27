import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng5-toastr/ng5-toastr';
export declare class AppComponent {
    private toastr;
    constructor(toastr: ToastsManager, containerRef: ViewContainerRef);
    showSuccess(): void;
    showError(): void;
    showWarning(): void;
    showInfo(): void;
    showClickToDismiss(): void;
    showCustomLife(): void;
    showCustomHTML(): void;
}
