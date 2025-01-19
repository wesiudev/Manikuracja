"use client";
export default function Results({
  results,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any[];
}) {
  return (
    <>
      {!results.length && (
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
      )}
    </>
  );
}
