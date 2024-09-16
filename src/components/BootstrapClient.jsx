"use client";
import { useEffect } from "react";

// Bu bileşen, istemci tarafında Bootstrap JavaScript'in içe aktarılmasından ve yürütülmesinden sorumludur.
export default function BootstrapClient() {
  useEffect(() => {
    // Bileşen monte edildiğinde Bootstrap JavaScript dosyasını içe aktarırız.
    require("bootstrap/dist/js/bootstrap.min.js");

    // Her ikisi de geçerlidir
    // import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  // Bileşenin herhangi bir şey oluşturmasına gerek yok, bu nedenle boş bir fragman döndürürüz.
  return <></>;
}
