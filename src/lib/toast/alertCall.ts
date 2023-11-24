import { Id, toast } from "react-toastify";

// export const alertCall = async (payload: any, id: Id) => {
//   if (payload.success) {
//     alert("update_success", payload.message, id);
//   } else {
//     alert("update_error", payload.error, id);
//   }
// };

export const alertCall = (type: string, message: string, id?: Id) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        rtl: false,
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        rtl: false,
      });
      break;
    case "info":
      toast.info(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      break;
    case "update_success":
      toast.update(id!, {
        render: message,
        type: "success",
        isLoading: false,
        autoClose: 1000,
        theme: "dark",
      });
      break;
    case "update_error":
      toast.update(id!, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 1000,
        theme: "dark",
      });
      break;

    default:
      break;
  }
};
