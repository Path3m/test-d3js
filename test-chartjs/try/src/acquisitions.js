import Chart from 'chart.js/auto'

const dataBar = [
  { year: 2010, count: 10 },
  { year: 2011, count: 20 },
  { year: 2012, count: 15 },
  { year: 2013, count: 25 },
  { year: 2014, count: 22 },
  { year: 2015, count: 30 },
  { year: 2016, count: 28 },
];

const cfgBar = {
  type: 'bar',
  data: {
    labels: dataBar.map(row => row.year),
    datasets: [
      {
        label: 'Acquisitions by year',
        data: dataBar.map(row => row.count)
      }
    ]
  }
}

const dataCheese = [
  {id: 'Sales', nested: {value: 1500}}, 
  {id: 'Purchases', nested: {value: 500}}
];

const cfgCheese = {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [{id: 'Sales', nested: {value: 1500}}, {id: 'Purchases', nested: {value: 500}}]
    }]
  },
  options: {
    parsing: {
      key: 'nested.value'
    }
  }
}

const cfg = {
  type: 'bar',
  data: {
    datasets: [{
      data: [{id: 'Sales', nested: {value: 1500}}, {id: 'Purchases', nested: {value: 500}}]
    }]
  },
  options: {
    parsing: {
      xAxisKey: 'id',
      yAxisKey: 'nested.value'
    }
  }
}

const dataArea = [
  {fill: 'origin'},      // 0: fill to 'origin'
  {fill: '+2'},          // 1: fill to dataset 3
  {fill: 1},             // 2: fill to dataset 1
  {fill: false},         // 3: no fill
  {fill: '-2'},          // 4: fill to dataset 2
  {fill: {value: 25}}    // 5: fill to axis value 25
];

const cfgArea = {
  data: dataArea
};


const dataLine = {
  labels: ['j','f','m','a','m','j','j'],
  datasets: [
    {
      label: 'My Second Dataset',
      data: [45, 39, 60, 61, 36, 35, 20],
      fill: true,
      borderColor: '#FFFFFF',
      backgroundColor: 'rgb(0,255,0)',
      tension: 0
    },
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      borderColor: '#FFFFFF',
      backgroundColor: 'rgb(255,0,0)',
      tension: 0
    },
    {
      label: 'My Third Dataset',
      data: [85, 79, 100, 101, 76, 75, 60],
      fill: true,
      borderColor: '#FFFFFF',
      backgroundColor: 'rgb(0,0,255)',
      tension: 0
    }
  ]
};
const configLine = {
  type: 'line',
  data: dataLine,
};


async function drawgraph(canva, config) {
  new Chart(
    document.getElementById(canva),
    config
  );
}


drawgraph('othergraph', configLine);
