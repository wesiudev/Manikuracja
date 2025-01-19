import SearchBar from "@/components/SearchBar";

export default async function Home() {
  return (
    <div>
      {/* Search Section */}

      <SearchBar slugCity="" />

      {/* Highlights Section */}
      <div>
        <div className="mt-6 rounded-lg p-6 py-12 bg-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center text-zinc-800 drop-shadow-sm shadow-black">
              Znajdź ulubionego specjalistę manicure i pedicure
            </h2>
            <p className="text-lg text-center mb-6">
              Wybierz spośród najlepszych specjalistów w Twojej okolicy.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 max-w-6xl mx-auto">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <img
                src="/home/feature1.jpg"
                alt="Profesjonalizm"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Profesjonalizm</h3>
              <p className="text-gray-600">
                Znajdź tylko certyfikowanych specjalistów, którzy oferują usługi
                na najwyższym poziomie.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <img
                src="/home/feature2.jpg"
                alt="Najlepsze narzędzia"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Najlepsze narzędzia
              </h3>
              <p className="text-gray-600">
                Gwarancja korzystania z najwyższej jakości produktów i narzędzi.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <img
                src="/home/feature3.jpg"
                alt="Dogodne lokalizacje"
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">
                Dogodne lokalizacje
              </h3>
              <p className="text-gray-600">
                Znajdź salon blisko swojego miejsca zamieszkania lub pracy.
              </p>
            </div>
          </div>
        </div>

        {/* Popular Services Section */}
        <div className="py-12 bg-pink-50 mt-6 rounded-lg">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-zinc-800 drop-shadow-sm shadow-black mb-6">
              Popularne usługi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white shadow-md rounded-lg">
                <img
                  src="/home/service1.jpg"
                  alt="Manicure klasyczny"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-zinc-700 drop-shadow-sm shadow-black mb-2">
                  Manicure klasyczny
                </h3>
                <p className="text-gray-600">
                  Ciesz się elegancją i prostotą klasycznego manicure.
                </p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <img
                  src="/home/service2.jpg"
                  alt="Manicure hybrydowy"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-zinc-700 drop-shadow-sm shadow-black mb-2">
                  Manicure hybrydowy
                </h3>
                <p className="text-gray-600">
                  Trwałość i styl, który przetrwa tygodnie.
                </p>
              </div>
              <div className="p-6 bg-white shadow-md rounded-lg">
                <img
                  src="/home/service3.jpg"
                  alt="Manicure magnetyczny"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-zinc-700 drop-shadow-sm shadow-black mb-2">
                  Manicure magnetyczny
                </h3>
                <p className="text-gray-600">
                  Innowacyjna technologia, która zachwyca.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-12 bg-pink-400 text-white text-center rounded-lg mt-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Zacznij już dziś
          </h2>
          <p className="text-lg mb-6">
            Odkryj najlepszych specjalistów w swojej okolicy i umów wizytę
            online.
          </p>
          <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Znajdź specjalistę
          </button>
        </div>
      </div>
    </div>
  );
}
