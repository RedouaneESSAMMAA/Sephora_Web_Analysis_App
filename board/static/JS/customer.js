
fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      // Get chart12 data
      const chart12 = chartData.chart12;

      // Create the chart
      var options = {
        series: [{
        name: '',
        data: chart12.values
        }],
        chart: {
          type: 'bar',
          height: 350,
          width: '100%',
          toolbar: {
              show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '45%',
            borderRadius: 5,
          //   borderRadiusApplication: 'end'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: chart12.labels,
        },
        yaxis: {
          labels: {
              formatter: function (value) {
                  // Add space in thousands
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
              }
          }
        },
        fill: {
          opacity: 1
        }
      };
    
      var chart = new ApexCharts(document.querySelector("#customer-chart1"), options);
      chart.render();
})
.catch(error => {
    console.error('Error fetching or rendering chart data:', error);
});

fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  }).then





/***************************************************************************************************/


fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      // Get chart13 data
      const chart13 = chartData.chart13;

      // Create the chart
      var options = {
        series: [{
        name: '',
        data: chart13.values
        }],
        chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        toolbar: {
            show: false
        }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '45%',
            borderRadius: 5,
          //   borderRadiusApplication: 'end'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: chart13.labels,
          labels:{
            formatter: function (value) {
              // Add space in thousands
              if (value.match(/^\d+to\d+$/)) {
                return value.replace(/(\d+)(to)(\d+)/, '$1 to $3');
              }
              // Format 'over54' → 'over 54'
              if (value.startsWith('over')) {
                return value.replace(/over(\d+)/, 'over $1');
              }
            }
          }
        },
        yaxis: {
          labels: {
              formatter: function (value) {
                  // Add space in thousands
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
              }
          }
        },
        fill: {
          opacity: 1,
          colors: 'green'
        },
      };
    
      var chart = new ApexCharts(document.querySelector("#customer-chart2"), options);
      chart.render();
})
.catch(error => {
    console.error('Error fetching or rendering chart data:', error);
});


/***********************************************************************************************/


fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      // Get chart14 data
      const chart14 = chartData.chart14;

      chart14.labels[0] = ["chemically", "Treated"];

      // Create the chart
      var options = {
        series: [{
        name: '',
        data: chart14.values
        }],
        chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        toolbar: {
          show: false
        }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '45%',
            borderRadius: 5,
          //   borderRadiusApplication: 'end'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: chart14.labels,
          labels: {
              formatter: function (val) {
                // Format "chemically Treated" to improve display
                return val === "chemicallyTreated" ? "Chemically Treated" : val;
              },
              rotate: 0,
          }
        },
        yaxis: {
          labels: {
              formatter: function (value) {
                  // Add space in thousands
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
              }
          }
        },
        fill: {
          opacity: 1,
          colors: '#ff8400'
        },
      };
    
      var chart = new ApexCharts(document.querySelector("#customer-chart3"), options);
      chart.render();
})
.catch(error => {
    console.error('Error fetching or rendering chart data:', error);
});


/**************************************************************************************************/

fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      // Get chart15 data
      const chart15 = chartData.chart15;

      // Create the chart
      var options = {
        series: [{
        name: '',
        data: chart15.values
        }],
        chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        toolbar: {
          show: false
        }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '45%',
            borderRadius: 5,
          //   borderRadiusApplication: 'end'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: chart15.labels,
          // labels: {
          //     formatter: function (val) {
          //       // Format "chemically Treated" to improve display
          //       return val === "chemicallyTreated" ? "Chemically Treated" : val;
          //     },
          //     rotate: 0,
          // }
        },
        yaxis: {
          labels: {
              formatter: function (value) {
                  // Add space in thousands
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
              }
          }
        },
        fill: {
          opacity: 1,
          colors: '#00879b'
        },
      };
    
      var chart = new ApexCharts(document.querySelector("#customer-chart4"), options);
      chart.render();
})
.catch(error => {
    console.error('Error fetching or rendering chart data:', error);
});

/**************************************************************************************************/

fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      // Get chart16 data
      const chart16 = chartData.chart16;

      // Create the chart
      var options = {
        series: [{
        name: '',
        data: chart16.values
        }],
        chart: {
        type: 'bar',
        height: 350,
        width: '100%',
        toolbar: {
            show: false
        }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '45%',
            borderRadius: 5,
          //   borderRadiusApplication: 'end'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: chart16.labels,
        },
        yaxis: {
          labels: {
              formatter: function (value) {
                  // Add space in thousands
                  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
              }
          }
        },
        fill: {
          opacity: 1,
          colors: '#701810'
        },
      };
    
      var chart = new ApexCharts(document.querySelector("#customer-chart5"), options);
      chart.render();
})
.catch(error => {
    console.error('Error fetching or rendering chart data:', error);
});