function ProbabilityChart({ prediction }) {
  if (!prediction || !prediction.probabilities) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          Confidence Scores
        </h2>

        <p className="text-gray-500">
          Upload an X-ray to view confidence scores.
        </p>
      </div>
    );
  }

  // Backend returns:
  // [COVID, Normal, Pneumonia, Tuberculosis]

  const probabilities = [
    {
      disease: "COVID-19",
      value: prediction.probabilities[0] * 100,
      color: "bg-green-500",
    },
    {
      disease: "Normal",
      value: prediction.probabilities[1] * 100,
      color: "bg-gray-500",
    },
    {
      disease: "Pneumonia",
      value: prediction.probabilities[2] * 100,
      color: "bg-yellow-500",
    },
    {
      disease: "Tuberculosis",
      value: prediction.probabilities[3] * 100,
      color: "bg-blue-600",
    },
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
              <span>{item.value.toFixed(2)}%</span>
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