"use client";

import { useState, useEffect } from "react";
import { CustomerServices } from "@/helpers/customer";
import { useSwal } from "@/utils/useSwal";

export default function EditCustomerModal({ customer, onUpdated }) {
  const alerts = useSwal();
  const [fullname, setFullname] = useState("");

  useEffect(() => {
    if (customer) {
      setFullname(customer.FullName);
    }
  }, [customer]);

  const handleChange = (e) => {
    setFullname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedCustomer = { ...customer, fullname: fullname };

    const confirmed = await alerts.question(
      "Emin misiniz?",
      "Müşteri güncellenecektir. Onaylıyor musunuz?"
    );

    if (confirmed) {
      await onUpdated(updatedCustomer);
    }
  };

  return (
    <div
      className="modal fade"
      id="editCustomerModal"
      tabIndex="-1"
      aria-labelledby="editCustomerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editCustomerModalLabel">
                Müşteri Düzenle
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
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
