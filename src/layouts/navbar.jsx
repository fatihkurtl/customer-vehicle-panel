"use client";
import Link from "next/link";
import Image from "next/image";
import { Users, Car } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-items-center">
          <Car className="me-2" size={24} />
          <span className="fw-bold text-primary">Müşteri ve Araç Yönetimi</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link d-flex align-items-center">
                <Users className="me-2" size={18} />
                Müşteriler
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
