import Swal from "sweetalert2";

const ToastCustom = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    container:"z-index-main"
  },
  timerProgressBar: true, 
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
 

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    container:"z-9999",
    confirmButton: "bg-[#e13f32] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2",
    cancelButton: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  },
  buttonsStyling: false
});
export   {ToastCustom,swalWithBootstrapButtons};
