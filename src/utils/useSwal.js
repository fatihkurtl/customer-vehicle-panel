import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

// Sweet Alert kullanımı
export function useSwal() {
  // Onay alert
  const success = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Hata alert
  const error = (title, text) => {
    Swal.fire({
      title: title,
      text: text,
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Soru alert, (Onay, Hayır), Duruma gore deger boolean (true, false) dondurur
  const question = (title, text) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        text: text,
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  // alertleri export ediyor
  return {
    success,
    error,
    question,
  };
}
