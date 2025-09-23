import React, { useState, useEffect } from 'react';
import { Calendar, Wind, Factory, TrendingUp } from 'lucide-react';

const YukaYantraDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clientData, setClientData] = useState([]);
  const [totalAirCleaned, setTotalAirCleaned] = useState(0);
  const [totalBillionLitres, setTotalBillionLitres] = useState(0);

  const clients = [
    { name: 'CEAT', machines: 3, installDate: new Date('2024-02-26') },
    { name: 'NTT', machines: 3, installDate: new Date('2024-03-04') },
    { name: 'SION', machines: 7, installDate: new Date('2024-09-09') },
    { name: 'GISSPL', machines: 6, installDate: new Date('2025-02-14') },
    { name: 'NMMC', machines: 2, installDate: new Date('2024-12-19') }
  ];

  // Function to generate random value between 1375-1380
  const getRandomEfficiency = () => {
    return Math.floor(Math.random() * 6) + 1375;
  };

  // Calculate days between two dates
  const calculateDays = (installDate, currentDate) => {
    const timeDiff = currentDate.getTime() - installDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // Calculate air cleaned for each client
  const calculateClientData = () => {
    const data = clients.map(client => {
      const days = calculateDays(client.installDate, currentDate);
      const efficiency = getRandomEfficiency();
      const totalHours = days * 24;
      const airCleaned = totalHours * client.machines * efficiency;
      
      return {
        ...client,
        days,
        efficiency,
        airCleaned,
        formattedAirCleaned: airCleaned.toLocaleString('en-IN')
      };
    });

    const total = data.reduce((sum, client) => sum + client.airCleaned, 0);
    const billionLitres = total / 1000000;

    setClientData(data);
    setTotalAirCleaned(total);
    setTotalBillionLitres(billionLitres);
  };

  useEffect(() => {
    calculateClientData();
    
    // Update every minute to keep calculations current
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, [currentDate]);

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN');
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Wind className="text-blue-600" size={40} />
            Yuka Yantra Air Cleaning Dashboard
          </h1>
          <p className="text-gray-600 flex items-center justify-center gap-2">
            <Calendar size={16} />
            Last Updated: {formatDate(currentDate)}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Sites</h3>
                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              </div>
              <Factory className="text-blue-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Machines</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {clients.reduce((sum, client) => sum + client.machines, 0)}
                </p>
              </div>
              <Wind className="text-green-500" size={32} />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Avg Efficiency</h3>
                <p className="text-2xl font-bold text-gray-900">1375-1380 m³/hr</p>
              </div>
              <TrendingUp className="text-purple-500" size={32} />
            </div>
          </div>
        </div>

        {/* Total Air Cleaned - Main Display */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-xl p-8 mb-8">
          <div className="text-center text-white">
            <h2 className="text-2xl font-semibold mb-4">Total Air Cleaned Across All Sites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-2">Cubic Meters (m³)</h3>
                <p className="text-3xl font-bold">{formatNumber(totalAirCleaned)}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-2">Billion Litres</h3>
                <p className="text-3xl font-bold">{totalBillionLitres.toFixed(9)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Client-wise Breakdown */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Client-wise Air Cleaning Data</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Machines
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Install Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Days Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Efficiency (m³/hr)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Air Cleaned (m³)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {clientData.map((client, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.machines}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(client.installDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.days}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{client.efficiency}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{client.formattedAirCleaned}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculation Formula */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Calculation Formula</h4>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Per Client:</strong> Days Active × 24 hours × Number of Machines × Efficiency (1375-1380 m³/hr)</p>
            <p><strong>Total:</strong> Sum of all client calculations</p>
            <p><strong>Billion Litres:</strong> Total m³ ÷ 1,000,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YukaYantraDashboard;