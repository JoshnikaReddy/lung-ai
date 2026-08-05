function ProbabilityChart() {
  const probabilities = [
    { disease: "Tuberculosis", value: 98.42, color: "bg-blue-600" },
    { disease: "COVID-19", value: 1.12, color: "bg-green-500" },
    { disease: "Pneumonia", value: 0.31, color: "bg-yellow-500" },
    { disease: "Normal", value: 0.15, color: "bg-gray-500" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        Confidence Scores
      </h2>

      <div className="space-y-6">
        {probabilities.map((item) => (
          <div key={item.disease}>
            <div className="flex justify-between mb-2">
              <span className="font-medium">{item.disease}</span>
              <span>{item.value}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`${item.color} h-4 rounded-full`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProbabilityChart;