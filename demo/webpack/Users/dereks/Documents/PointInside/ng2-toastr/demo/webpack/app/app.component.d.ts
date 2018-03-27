import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng5_-toastr/ng5_-toastr';
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
