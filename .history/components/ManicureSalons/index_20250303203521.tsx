/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const ManicureSalons = async ({ search, data }: { search: any; data: any }) => {
  return (
    <>
      <div className="p-4 max-h-[80vh] fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 overflow-y-auto bg-white z-[125] rounded-lg">
        <ul>
          {data.salons.map((salon: any) => (
            <li
              key={salon.place_id}
              className="mb-4 p-4 border rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold">{salon.name}</h3>
              <p>{salon.vicinity}</p>
              {salon.rating && <p>⭐ {salon.rating} / 5</p>}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ManicureSalons;
