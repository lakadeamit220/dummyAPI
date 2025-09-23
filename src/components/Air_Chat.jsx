import React from "react";

// Helper function: calculate days difference
const daysSince = (installDate) => {
  const today = new Date();
  const installed = new Date(installDate);
  const diffTime = today - installed;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // days
};

// Client details
const clients = [
  { name: "CEAT", machines: 3, installDate: "2024-02-26" },
  { name: "NTT", machines: 3, installDate: "2024-03-04" },
  { name: "SION", machines: 7, installDate: "2024-09-09" },
  { name: "GISSPL", machines: 6, installDate: "2025-02-14" },
  { name: "NMMC", machines: 2, installDate: "2024-12-19" },
];

const YukaYantraReport = () => {
  const results = clients.map((client) => {
    const days = daysSince(client.installDate);
    const hours = days * 24 * client.machines;
    const efficiency = Math.floor(Math.random() * (1380 - 1375 + 1)) + 1375;
    const totalAir = hours * efficiency; // m3
    return { ...client, days, efficiency, totalAir };
  });

  const totalSum = results.reduce((acc, c) => acc + c.totalAir, 0);
  const totalBillionLitre = totalSum / 1e6;

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        Yuka Yantra Air Cleaning Report
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {results.map((site) => (
          <div
            key={site.name}
            className="p-6 rounded-xl shadow-md bg-white border border-gray-200 flex flex-col"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {site.name}
            </h2>
            <div className="space-y-2 text-gray-700 text-sm">
              <p>Installed on: <span className="font-medium">{site.installDate}</span></p>
              <p>Machines: <span className="font-medium">{site.machines}</span></p>
              <p>Days since install: <span className="font-medium">{site.days}</span></p>
              <p>Efficiency: <span className="font-medium">{site.efficiency} m³/hr</span></p>
            </div>
            <p className="font-bold text-lg text-green-700 mt-4">
              Total Cleaned: {site.totalAir.toLocaleString()} m³
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 rounded-xl shadow-md bg-green-50 border border-green-200 max-w-3xl w-full text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Total Air Cleaned at All Sites
        </h2>
        <p className="text-3xl font-bold text-gray-900">
          {totalSum.toLocaleString()} m³
        </p>
        <p className="text-lg text-gray-600 mt-2">
          ≈ {totalBillionLitre.toFixed(2)} Billion Litres
        </p>
      </div>
    </div>
  );
};

export default YukaYantraReport;
