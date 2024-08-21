import Swal from 'sweetalert2/dist/sweetalert2.js';

export class ToastUtils {

  static readonly toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  static success(title: string): void {
    ToastUtils.toast.fire({icon: 'success', title: title});
  }

  static error(title?: string): void {
    ToastUtils.toast.fire({icon: 'error', title: title ?? 'Ocorreu um erro inesperado'});
  }

  static warning(title: string): void {
    ToastUtils.toast.fire({icon: 'warning', title: title});
  }

  static question(title: string): void {
    ToastUtils.toast.fire({icon: 'question', title: title});
  }

  static info(title: string): void {
    ToastUtils.toast.fire({icon: 'info', title: title});
  }

  static custom(title: string, icon: 'warning' | 'error' | 'success' | 'question' | 'info', timer: number = 2000): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timer,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
    Toast.fire({icon: icon, title: title});
  }
}
