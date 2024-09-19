import { Users } from "lucide-react";

// Toplam musteri sayisini gosteren musteri karti
export default function TotalCustomersCard({ customersCount }) {
  return (
    <div className="col-md-3">
      <div className="card bg-light">
        <div className="card-body d-flex align-items-center">
          <Users size={24} className="text-primary me-3" />
          <div>
            <h5 className="card-title mb-0">Toplam Müşteri</h5>
            <p className="card-text fs-4 fw-bold text-primary mb-0">
              {customersCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
