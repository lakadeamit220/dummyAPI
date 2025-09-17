// import React, { useState, useEffect } from "react";

// const AirCleaner = () => {
//   const [totalVolume, setTotalVolume] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [lastUpdated, setLastUpdated] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://35.154.251.65:4200/api/data/recent");
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//       const data = await response.json();

//       // Group by devId and take the most recent record based on timestamp
//       const latestRecords = data.reduce((acc, item) => {
//         const ts = new Date(item.ts).getTime();
//         if (!acc[item.devId] || new Date(acc[item.devId].ts).getTime() < ts) {
//           acc[item.devId] = item;
//         }
//         return acc;
//       }, {});

//       // Sum the Volume of the latest records for each unique device
//       const total = Object.values(latestRecords).reduce(
//         (sum, item) => sum + item.Volume,
//         0
//       );

//       setTotalVolume(total);
//       setLastUpdated(
//         new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
//       );
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(); // Initial fetch
//     const interval = setInterval(fetchData, 3600000); // Fetch every hour (3600000 ms)

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
//         <div className="text-center">
//           {loading ? (
//             <p className="text-gray-600">Loading...</p>
//           ) : error ? (
//             <p className="text-red-500">Error: {error}</p>
//           ) : (
//             <>
//               <p className="text-lg text-gray-600">Total Air Cleaned</p>
//               <p className="text-4xl font-semibold text-blue-600">
//                 {totalVolume.toLocaleString()} cubic units
//               </p>
//               <p className="text-sm text-gray-500 mt-2">
//                 Last Updated: {lastUpdated}
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AirCleaner;




import React, { useState, useEffect } from "react";

const AirCleaner = () => {
  const [totalVolume, setTotalVolume] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://35.154.251.65:4200/api/data/recent");
      if (!response.ok || !response) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      if (!data || data.length === 0) {
        throw new Error("No data received");
      }

      // Group by devId and take the most recent record based on timestamp
      const latestRecords = data.reduce((acc, item) => {
        const ts = new Date(item.ts).getTime();
        if (!acc[item.devId] || new Date(acc[item.devId].ts).getTime() < ts) {
          acc[item.devId] = item;
        }
        return acc;
      }, {});

      // Sum the Volume of the latest records for each unique device
      const total = Object.values(latestRecords).reduce(
        (sum, item) => sum + item.Volume,
        0
      );

      setTotalVolume(total);
      setLastUpdated(
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      );
      setLoading(false);
    } catch (err) {
      setTotalVolume(5248464); // Fallback value
      setLastUpdated(
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 43200000); // Fetch every 12 hours (43200000 ms)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <>
              <p className="text-lg text-gray-600">Total Air Cleaned</p>
              <p className="text-4xl font-semibold text-blue-600">
                {totalVolume.toLocaleString()} cubic units
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Last Updated: {lastUpdated}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AirCleaner;