import Chart from 'chart.js/auto';

// Sample data for the steamgraph
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2, 3, 9], // Sample data for Dataset 1
      backgroundColor: 'rgba(255, 99, 132, 0.2)', // Sample color for Dataset 1
    },
    {
      label: 'Dataset 2',
      data: [5, 6, 7, 8, 9, 10, 11], // Sample data for Dataset 2
      backgroundColor: 'rgba(54, 162, 235, 0.2)', // Sample color for Dataset 2
    },
    // Add more datasets as needed
  ],
};

// Configuration options
const options = {
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
    },
  },
};

// Create a new Chart instance
const ctx = document.getElementById('steamgraph') as HTMLCanvasElement;
const myChart = new Chart(ctx, {
  type: 'line',
  data: data
});
