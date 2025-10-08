const dataset = [
  { country: "Finland", data: [7.8, 7.9, 8.0, 8.1, 8.2], years: [2018, 2019, 2020, 2021, 2022] },
  { country: "Denmark", data: [7.6, 7.7, 7.8, 7.9, 8.0], years: [2018, 2019, 2020, 2021, 2022] },
  { country: "Switzerland", data: [7.5, 7.6, 7.7, 7.8, 7.9], years: [2018, 2019, 2020, 2021, 2022] },
  { country: "Iceland", data: [7.4, 7.5, 7.6, 7.7, 7.8], years: [2018, 2019, 2020, 2021, 2022] },
  // Add more data as needed
];

// Populate dropdown
const countrySelect = document.getElementById('countrySelect');
dataset.forEach(item => {
  const option = document.createElement('option');
  option.value = item.country;
  option.textContent = item.country;
  countrySelect.appendChild(option);
});

// Initialize chart
const ctx = document.getElementById('happyChart').getContext('2d');
let chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Happiness Score',
      data: [],
      borderColor: 'blue',
      fill: false,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 10,
        title: {
          display: true,
          text: 'Score'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  }
});

// Function to update chart and score
function updateDisplay(countryName) {
  const countryData = dataset.find(c => c.country === countryName);
  if (!countryData) return;

  // Update chart
  chart.data.labels = countryData.years;
  chart.data.datasets[0].data = countryData.data;
  chart.update();

  // Update current score
  const currentScore = countryData.data[countryData.data.length - 1];
  document.getElementById('score').textContent = currentScore.toFixed(2);

  // Update score card color based on score
  const scoreCard = document.getElementById('scoreCard');
  scoreCard.classList.remove('high', 'low');
  if (currentScore >= 7.8) {
    scoreCard.classList.add('high');
  } else if (currentScore <= 5.0) {
    scoreCard.classList.add('low');
  }
}

// Event listener
countrySelect.addEventListener('change', (e) => {
  updateDisplay(e.target.value);
});

// Initialize with first country
if (dataset.length > 0) {
  countrySelect.value = dataset[0].country;
  updateDisplay(dataset[0].country);
}