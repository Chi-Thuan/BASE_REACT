import toastr from "toastr";
import "toastr/build/toastr.min.css";

class ToastComponent {
    createContainer() {
        toastr.options = {
            "closeButton": true,
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    }

    error(message, title = "") {
        return toastr.error(message, title);
    }


    info(message, title) {
        return toastr.info(message, title);
    }

    warning(message, title) {
        return toastr.warning(message, title);
    }

    success(message, title) {
        return toastr.success(message, title);
    }
}

export default new ToastComponent