"use client";
import { useState } from "react";
import { CustomerServices } from "@/helpers/customer";
import { useSwal } from "@/utils/useSwal";

// CustomerServices sınıfını başlatıyor, bu sınıf müşteri işlemleri için API çağrıları yapıyor
const customerServices = new CustomerServices();

export default function AddCustomerModal({ fetchCustomers }) {
  const [fullname, setFullname] = useState("");

  // Sweet Alert kullanımı utils/useSwal.ts
  const alerts = useSwal();

  // Modal elementi seciliyor
  const modal = document.getElementById("addCustomerModal");
  const backdrops = document.getElementsByClassName("modal-backdrop");

  // Input degeri degistiginde state'i guncelliyor
  const handleChange = (e) => {
    setFullname(e.target.value);
  };

  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Müşteri ekleme API çağrısı
      const response = await customerServices.addCustomer({
        fullname: fullname,
      });
      console.log(response.result.success);
      if (!response.result.success) {
        // Hata durumunda kullanıcıya API'den donen bilgiyi veriyor
        alerts.error("Hata", response.result.message);
      } else {
        // Başarılı durumda kullanıcıya API'den bilgi veriyor
        alerts.success("Başarılı", response.result.message);
        // Musteri listesini yenileniyor
        fetchCustomers();
        // Modal kapatılıyor
        document.getElementById("addCustomerModal").click();
        modal.classList.add("d-none");
        document.body.classList.remove("modal-open");
        while (backdrops.length > 0) {
          backdrops[0].parentNode.removeChild(backdrops[0]);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setFullname("");
    }
  };

  return (
    <div
      className="modal fade"
      id="addCustomerModal"
      tabIndex="-1"
      aria-labelledby="addCustomerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addCustomerModalLabel">
                Yeni Müşteri Ekle
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="fullname" className="col-form-label">
                  Müşteri Adı:
                </label>
                <input
                  type="text"
                  placeholder="Adı Soyadı"
                  className="form-control"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Kapat
              </button>
              <button type="submit" className="btn btn-primary">
                Müşteri Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
