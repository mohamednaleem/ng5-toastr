import {ToastOptions} from 'ng5-toastr';

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can pass any options to override defaults
  newestOnTop = false;
  showCloseButton = true;
  dismiss = 'auto';
}

