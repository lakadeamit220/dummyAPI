import React from "react";

// Helper function: calculate days difference
const daysSince = (installDate) => {
  const today = new Date();
  const installed = new Date(installDate);
  const diffTime = today - installed;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // days
};

// Each site info
const clients = [
  { name: "CEAT", machines: 3, installDate: "2024-02-26" },
  { name: "NTT", machines: 3, installDate: "2024-03-04" },
  { name: "SION", machines: 7, installDate: "2024-09-09" },
  { name: "GISSPL", machines: 6, installDate: "2025-02-14" },
  { name: "NMMC", machines: 2, installDate: "2024-12-19" },
];

const YukaYantraReport = () => {
  // Calculate total air cleaned for each client
  const results = clients.map((client) => {
    const days = daysSince(client.installDate);
    const hours = days * 24 * client.machines;
    // Random value between 1375–1380 (like RANDBETWEEN)
    const efficiency = Math.floor(Math.random() * (1380 - 1375 + 1)) + 1375;
    const totalAir = hours * efficiency; // m3
    return { ...client, days, efficiency, totalAir };
  });

  // Total sum across all sites
  const totalSum = results.reduce((acc, c) => acc + c.totalAir, 0);
  const totalBillionLitre = totalSum / 1e6; // Convert to Billion Litres

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* <h1 className="text-2xl font-bold mb-6">🌿 Yuka Yantra Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {results.map((site) => (
          <div
            key={site.name}
            className="p-4 rounded-2xl shadow bg-white border flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2">{site.name}</h2>
            <p>📅 Installed on: {site.installDate}</p>
            <p>⚙️ Machines: {site.machines}</p>
            <p>📊 Days since install: {site.days}</p>
            <p>⏱ Efficiency: {site.efficiency} m³/hr</p>
            <p className="font-bold text-green-600 mt-2">
              🌍 Total Cleaned: {site.totalAir.toLocaleString()} m³
            </p>
          </div>
        ))}
      </div> */}

      <div className="mt-8 p-6 rounded-2xl shadow bg-green-100 border max-w-2xl w-full text-center">
        {/* <h2 className="text-xl font-bold text-green-700 mb-2">
          ✅ Total Air Cleaned @ All Sites
        </h2> */}
        {/* <p className="text-2xl font-bold text-green-800">
          {totalSum.toLocaleString()} m³
        </p> */}
        <p className="text-lg text-gray-700">
          ≈ {totalBillionLitre.toFixed(2)} Billion Litres
        </p>
      </div>
    </div>
  );
};

export default YukaYantraReport;
