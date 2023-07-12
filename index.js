const xLabels = [];
const yTemps = [];
chartIt();

async function chartIt() {
    await fetchData();
    const ctx = document.getElementById('chart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: xLabels,
        datasets: [{
          label: 'Global Avg Temp',
          data: yTemps,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  
}

async function fetchData() {
    const response = await fetch('ZonAnn.Ts+dSST.csv');

    const data = await response.text();


    const table = data.split('\n').slice(1);

    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        xLabels.push(year);
        const temp = columns[1];
        yTemps.push(parseFloat(temp) + 14);

        console.log(year, temp);
    })
}

