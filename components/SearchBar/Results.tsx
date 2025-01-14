"use client";
import Image from "next/image";
import noResultsImage from "../../public/no-results.png";
export default function Results({
  results,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[];
}) {
  return (
    <div className="p-6 w-full bg-gray-200 rounded-lg mt-6">
      {results.length > 0 && (
        <div className="">
          Wszystkie wyniki dla
          <ul
            className="w-full text-center"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "14px",
              color: "#333",
            }}
          >
            <li>{results}</li>
          </ul>
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-6">
        <Image
          src={noResultsImage}
          width={512}
          height={512}
          alt="Malowane Paznokcie"
          className="opacity-10 w-[250px]"
        />
        <h2 className="max-w-sm text-gray-500 text-center">
          Rozpocznij wyszukiwanie aby zobaczyć profile oraz usługi oferowane w
          Twoim mieście
        </h2>
      </div>
    </div>
  );
}
