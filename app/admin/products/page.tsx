/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import moment from "moment";
import "moment/locale/pl";
import Products from "@/components/AdminComponents/Products";
import { useEffect, useState } from "react";
import { collection, onSnapshot, getFirestore } from "firebase/firestore";
import { app, deleteMultipleProducts } from "@/firebase";
export default function Page() {
  moment.locale("pl");
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const ref = collection(getFirestore(app), "products");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      setProducts(snapshotData);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <div className="p-12 w-full ">
      <h2 className="text-white font-bold text-3xl">Wszystkie aktualności</h2>
      <p className="text-white font-light text-lg my-3">
        Tutaj są wszystkie Twoje wpisy. Zapraszamy do tworzenia i publikowania
        nowych treści. Korzystając z tego panelu możesz
        <b className="mx-1">edytować</b>oraz<b className="mx-1">usuwać</b>
        istniejące już wpisy.
      </p>
      <Products
        array={products}
        deleteRows={deleteMultipleProducts}
        place="products"
      />
    </div>
  );
}
