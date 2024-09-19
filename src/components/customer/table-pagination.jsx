"use client";

import React from "react";

export default function TablePagination({
  customersPerPage,
  totalCustomers,
  paginate,
  currentPage,
}) {
  // Toplam sayfa sayısını hesaplıyor
  const pageNumbers = [];

  // Sayfa numaralarını oluşturuyor
  for (let i = 1; i <= Math.ceil(totalCustomers / customersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {/* Her sayfa numarası için bir liste öğesi oluşturuyor */}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a 
            // Sayfa numarasına tıklandığında paginate fonksiyonunu çağırıyor
            onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
