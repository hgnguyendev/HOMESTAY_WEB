
import { Injectable } from "@angular/core";
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class SwalService {
    constructor() { }

    async warning(title: string, text = '', cancelButtonText = 'Hủy', confirmButtonText = '', html = '') {
        try {
            const swalConfig: any = {
                title: title,
                text: text,
                html: html,
                icon: 'warning',
                showCancelButton: true,
                showConfirmButton: true,
                reverseButtons: true,
                cancelButtonText: cancelButtonText || 'Hủy',

            };
            if (confirmButtonText) swalConfig['confirmButtonText'] = confirmButtonText;
            const swalRes = await Swal.fire(swalConfig);
            return !!(swalRes && swalRes['value']);
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async confirmWithValidation(
        func: (inputValue: string) => Promise<boolean> | boolean,
        title: string,
        text = '',
        confirmButtonText = 'Xác nhận',
        cancelButtonText = 'Hủy',
        inputPlaceholder = ''
    ): Promise<boolean> {
        try {
            const result = await Swal.fire({
                title: title,
                text: text,
                input: 'text',
                inputPlaceholder: inputPlaceholder,
                showCancelButton: true,
                confirmButtonText: confirmButtonText,
                cancelButtonText: cancelButtonText,
                reverseButtons: true,
                preConfirm: async (inputValue: string) => {
                    const valid = await func(inputValue);
                    if (!valid) {
                        Swal.showValidationMessage(`Giá trị nhập vào chưa đúng, vui lòng thử lại!`);
                        return false;
                    }
                    return inputValue;
                },
                allowOutsideClick: () => !Swal.isLoading()
            });
            return !!result.isConfirmed;

        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async error(title: string, text = '', html = '') {
        try {
            const swalRes = await Swal.fire({
                title: title,
                text: text,
                html: html,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: true
            });
        } catch (error) {
            console.log(error);
        }
    }

    async success(title: string, text = '', html = '') {
        try {
            const swalRes = await Swal.fire({
                title: title,
                text: text,
                html: html,
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: true
            });
        } catch (error) {
            console.log(error);
        }
    }
}