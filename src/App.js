import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const IS_MAINTENANCE_MODE = true; // 🔧 Toggle this to false when ready
function App() {
  if (IS_MAINTENANCE_MODE) {
    return (
      <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-xl text-center">
          <h1 className="text-3xl font-bold text-yellow-600 mb-4">🚧 SmartStoxVest is Undergoing an Upgrade</h1>
          <p className="text-gray-700 text-lg">
            We’re adding new features and enhancements to make your investing journey even smarter.
          </p>
          <p className="mt-4 text-gray-600">
            Please check back soon. Thanks for your patience! 🙏
          </p>
        </div>
      </div>
    );
  }
  const [stock, setStock] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);

  const handlePredict = async () => {
    if (!stock) return;
    setLoading(true);
    setPrediction(null);

    try {
      const response = await fetch(
        `https://smartstoxvest-backend.onrender.com/api/predict?stock=${stock}`
      );
      const data = await response.json();
      setPrediction(data.predicted_price);

      // Fake data for chart
      const fakeChart = [
        { name: 'Day -3', price: data.predicted_price - 5 },
        { name: 'Day -2', price: data.predicted_price - 2 },
        { name: 'Day -1', price: data.predicted_price - 1 },
        { name: 'Today', price: data.predicted_price },
        { name: 'Tomorrow', price: data.predicted_price + 2 },
        { name: 'Future', price: data.predicted_price + 4 },
      ];
      setChartData(fakeChart);

    } catch (err) {
      console.error('Prediction error:', err);
      setPrediction('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-4 flex items-center justify-center gap-2">
          📈 SmartStoxVest <span className="text-gray-600">- AI Stock Predictor</span>
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter stock symbol (e.g. TSLA)"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handlePredict}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
          >
            Predict
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-600 text-lg">⏳ Getting prediction...</p>
        )}

        {prediction && (
          <div className="text-center mb-8">
            <p className="text-green-600 text-lg font-semibold">
              ✅ Predicted Price for <span className="font-bold">{stock.toUpperCase()}</span>:
            </p>
            <p className="text-2xl font-bold text-gray-800 mt-2">£{prediction}</p>
          </div>
        )}

        {chartData.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default App;
