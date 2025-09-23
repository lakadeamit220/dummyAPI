const AirCleaningDashboard = () => {
  const clients = [
    {
      name: "CEAT",
      machines: 3,
      installDate: "26-02-2024",
      days: 576,
      totalAirCleaned: 57148416,
    },
    {
      name: "NTT",
      machines: 3,
      installDate: "04-03-2024",
      days: 569,
      totalAirCleaned: 56331000,
    },
    {
      name: "SION",
      machines: 7,
      installDate: "09-09-2024",
      days: 380,
      totalAirCleaned: 87780000,
    },
    {
      name: "GISSPL",
      machines: 6,
      installDate: "14-02-2025",
      days: 222,
      totalAirCleaned: 44083872,
    },
    {
      name: "NMMC",
      machines: 2,
      installDate: "19-12-2024",
      days: 279,
      totalAirCleaned: 18454176,
    },
  ];

  const totalAirCleanedLitres = clients.reduce((sum, client) => sum + client.totalAirCleaned, 0);
  const totalAirCleanedBillions = (totalAirCleanedLitres / 1000000).toFixed(6);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Yuka Yantra Air Cleaning Dashboard
      </h1>
      <table className="w-full table-auto border-collapse mb-6">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2 border">Client</th>
            <th className="px-4 py-2 border">Machines</th>
            <th className="px-4 py-2 border">Install Date</th>
            <th className="px-4 py-2 border">Days Active</th>
            <th className="px-4 py-2 border">Air Cleaned (m³)</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index} className="text-center hover:bg-gray-50">
              <td className="px-4 py-2 border">{client.name}</td>
              <td className="px-4 py-2 border">{client.machines}</td>
              <td className="px-4 py-2 border">{client.installDate}</td>
              <td className="px-4 py-2 border">{client.days}</td>
              <td className="px-4 py-2 border">
                {client.totalAirCleaned.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-800">
          Total Air Cleaned (All Sites):{" "}
          <span className="text-blue-600">
            {totalAirCleanedLitres.toLocaleString()} m³
          </span>
        </p>
        <p className="text-xl font-semibold text-gray-800">
          Total Air Cleaned (Billions of Litres):{" "}
          <span className="text-blue-600">{totalAirCleanedBillions} Billion Litres</span>
        </p>
      </div>
    </div>
  );
};

export default AirCleaningDashboard;