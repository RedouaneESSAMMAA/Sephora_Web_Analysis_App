//The category1 chart:
fetch('/chart_data')
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      const chart1 = chartData.chart1;

      const lineBreaks = {
        'Bath & Body': ['Bath', '& Body'],
        'Tools & Brushes': ['Tools', '& Brushes']
      };

      const categories = chart1.labels.map(label =>
    lineBreaks[label] || label
);


      if (!chart1 || !chart1.labels || !chart1.values) {
          throw new Error("chart1 is missing labels or values");
      }

      const options = {
          series: [{
              name: 'Products',
              data: chart1.values
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
                  borderRadius: 5
              }
          },
          dataLabels: {
              enabled: false
          },
          xaxis: {
              categories: categories
          },
          yaxis: {
              labels: {
                  formatter: value => value.toLocaleString('en-US')
              }
          },
          fill: {
              opacity: 1,
              colors: ['#00879b']
          },
          tooltip: {
              y: {
                  formatter: value => value.toLocaleString('en-US')
              }
          }
      };

      const chart = new ApexCharts(
          document.querySelector('#category1Chart'),
          options
      );

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
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      const chart2 = chartData.chart2;

      const categories = chart2.labels.map(label =>
    label === 'Hair Styling & Treatments' ? ['Hair', 'Styling'] : label);

      if (!chart2 || !chart2.labels || !chart2.values) {
          throw new Error("chart1 is missing labels or values");
      }

      const options = {
          series: [{
              name: 'Products',
              data: chart2.values
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
                  borderRadius: 5
              }
          },
          dataLabels: {
              enabled: false
          },
          xaxis: {
              categories: categories,
          },
          yaxis: {
              labels: {
                  formatter: value => value.toLocaleString('en-US')
              }
          },
          fill: {
              opacity: 1,
              colors: ['#ff8400']
          },
          tooltip: {
              y: {
                  formatter: value => value.toLocaleString('en-US')
              }
          }
      };

      const chart = new ApexCharts(
          document.querySelector('#category2Chart'),
          options
      );

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
  })
  .then(chartData => {
      console.log("Chart data fetched:", chartData);

      const chart3 = chartData.chart3;

      if (!chart3 || !chart3.labels || !chart3.values) {
          throw new Error("chart3 is missing labels or values");
      }

      const options = {
          series: [{
              name: 'Products',
              data: chart3.values
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
                  borderRadius: 5
              }
          },
          dataLabels: {
              enabled: false
          },
          xaxis: {
              categories: chart3.labels
          },
          yaxis: {
              labels: {
                  formatter: value => value.toLocaleString('en-US')
              }
          },
          fill: {
              opacity: 1,
              colors: ['#701810']
          },
          tooltip: {
              y: {
                  formatter: value => value.toLocaleString('en-US')
              }
          }
      };

      const chart = new ApexCharts(
          document.querySelector('#category3Chart'),
          options
      );

      chart.render();
  })
  .catch(error => {
      console.error('Error fetching or rendering chart data:', error);
  });


// Dougnut chart category 1:

// Shadow plugin for Chart.js
Chart.register({
  id: 'doughnutShadow',
  beforeDraw(chart) {
    const { ctx, chartArea: { top, left, width, height } } = chart;

    ctx.save();

    const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
    const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
    const centerX = (left + width / 2);
    const centerY = (top + height / 2);

    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill('evenodd');

    ctx.restore();
  },
});

const text1= {
    id: 'centerText1',

    afterDraw(chart) {
        const { ctx, chartArea } = chart;

        if (!chartArea) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        const text = 'Products of\nCategory I';

        const lines = text.split('\n');
        const lineHeight = 18;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 18px Segoe UI';
        ctx.fillStyle = 'black';

        const startY = centerY - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            ctx.fillText(line, centerX, startY + index * lineHeight);
        });

        ctx.restore();
    }
};


// Fetch the data:

fetch('/chart_data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(chartData => {
            console.log("Chart data fetched:", chartData);

            // Get chart4 data
            const chart4 = chartData.chart4;

            // Get the canvas element
            const ctx = document.getElementById('donutCategory1').getContext('2d');

            // Create the chart
            new Chart(ctx, {
                type: chart4.type, // 'doughnut'
                data: {
                    labels: chart4.labels, // x-axis labels
                    datasets: [{
                        label: '', // Dataset label
                        data: chart4.values, // y-axis values
                        backgroundColor: [
                          'rgb(255, 99, 132)',
                          'rgb(255, 159, 64)',
                          'rgb(255, 205, 86)',
                          'rgb(75, 192, 192)',
                          'rgb(54, 162, 235)',
                          'rgb(64, 132, 245)',
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                      display: false,
                    },
                    cutout: '65%',
                    plugins:{
                      legend:{
                        display: false,
                      }
                    }
                },
                plugins:['doughnutShadow', text1] // Attach the shadow plugin
            });
});


// Dougnut chart category 2:

const text2= {
    id: 'centerText2',

    afterDraw(chart) {
        const { ctx, chartArea } = chart;

        if (!chartArea) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        const text = 'Products of\nCategory II';

        const lines = text.split('\n');
        const lineHeight = 18;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 18px Segoe UI';
        ctx.fillStyle = 'black';

        const startY = centerY - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            ctx.fillText(line, centerX, startY + index * lineHeight);
        });

        ctx.restore();
    }
};

fetch('/chart_data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(chartData => {
            console.log("Chart data fetched:", chartData);

            // Get chart5 data
            const chart5 = chartData.chart5;

            // Get the canvas element
            const ctx = document.getElementById('donutCategory2').getContext('2d');

            // Create the chart
            new Chart(ctx, {
                type: chart5.type, // 'doughnut'
                data: {
                    labels: chart5.labels, // x-axis labels
                    datasets: [{
                        label: '', // Dataset label
                        data: chart5.values, // y-axis values
                        backgroundColor: [
                          '#4e628d',
                          '#dcf9ff',
                          '#ffdfe2',
                          '#ffb0b8',
                          '#714870'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                      display: false,
                    },
                    cutout: '65%',
                    plugins:{
                      legend:{
                        display: false,
                      }
                    }
                },
                plugins:['doughnutShadow', text2] // Attach the shadow plugin
            });
});




// Dougnut chart category 3:

const text3= {
    id: 'centerText3',

    afterDraw(chart) {
        const { ctx, chartArea } = chart;

        if (!chartArea) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        const text = 'Products of\nCategory III';

        const lines = text.split('\n');
        const lineHeight = 18;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 18px Segoe UI';
        ctx.fillStyle = 'black';

        const startY = centerY - ((lines.length - 1) * lineHeight) / 2;

        lines.forEach((line, index) => {
            ctx.fillText(line, centerX, startY + index * lineHeight);
        });

        ctx.restore();
    }
};

fetch('/chart_data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(chartData => {
            console.log("Chart data fetched:", chartData);

            // Get chart6 data
            const chart6 = chartData.chart6;

            // Get the canvas element
            const ctx = document.getElementById('donutCategory3').getContext('2d');

            // Create the chart
            new Chart(ctx, {
                type: chart6.type, // 'doughnut'
                data: {
                    labels: chart6.labels, // x-axis labels
                    datasets: [{
                        label: '', // Dataset label
                        data: chart6.values, // y-axis values
                        backgroundColor: [
                          '#6b4747',
                          '#b89494',
                          '#559c93',
                          '#004c4c',
                          '#0f1d1d'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                      display: false,
                    },
                    cutout: '65%',
                    plugins:{
                      legend:{
                        display: false,
                      }
                    }
                },
                plugins:['doughnutShadow', text3] // Attach the shadow plugin
            });
});


// Radar Chart cat1:

fetch('/chart_data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(chartData => {
    console.log("Chart data fetched:", chartData);

    // Chart data
    const chart7 = chartData.chart7;

    // Get the canvas element
    const ctx = document.getElementById('category1-radar').getContext('2d');

    const wrappedLabels = chart7.Category1.labels.map(label => 
      label.split(' ').join('\n') // Wrap words by splitting on spaces
    );

    // Create the initial chart
    const radarChart = new Chart(ctx, {
      type: chart7.Category1.type,
      data: {
        labels: wrappedLabels,
        datasets: [{
          label: '', // Dataset label
          data: chart7.Category1.values,
          backgroundColor: 'rgb(153, 102, 255, 0.5)',
          borderColor: 'rgb(153, 102, 255)',
        }],
      },
      options: {
        title: {
          display: false,
        },
        elements: {
          line: {
            tension: 0.000001,
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
            pointLabels: {
              font: {
                size: 12,
                weight: 'bold',
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const rating = tooltipItem.raw;
                const stars = "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
                return "Rating: " + rating + " " + stars;
              },
            },
          },
        },
      },
    });

    // Handle dropdown change
    document.getElementById('category-select').addEventListener('change', function () {
      const selectedCategory = this.value; // Get the selected category (e.g., "Category1")
      const selectedData = chart7[selectedCategory];

      // Update chart data
      radarChart.data.labels = selectedData.labels.map(label => 
        label.split(' ').join('\n') // Wrap words by splitting on spaces
      );
      radarChart.data.datasets[0].data = selectedData.values;

      // Refresh the chart
      radarChart.update();
    });
  })
  .catch(error => {
    console.error("Error fetching chart data:", error);
  });




  // Table brands format

  const tableIds = ['table-brand1', 'table-brand2', 'table-brand3', 'category-1-table', 'category-2-table', 'category-3-table', 'top-brand-1-table', 'top-brand-2-table', 'customer-table-1', 'customer-table-2', 'customer-table-3', 'customer-table-4', 'customer-table-5'];

  for(let i = 0; i < tableIds.length; i++){
    document.addEventListener("DOMContentLoaded", function() {
      const table = document.getElementById(tableIds[i]); // Get the specific table
      const rows = table.querySelectorAll("tbody tr"); // Get all rows in the table body
    
      rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      const reviewCell = cells[cells.length - 1]; // Select the last cell (assuming it's the reviews column)
      
        if (reviewCell) {
          const number = parseFloat(reviewCell.textContent.replace(/ /g, '')); // Parse the cell content as a number
          if (!isNaN(number)) {
            reviewCell.textContent = number.toLocaleString('en').replace(/,/g, ' '); // Format with spaces
          }
        }
      });
    });
  }


  ///   category 1 focus: 

  window.addEventListener('load', function () {
    const targetTableId = window.location.hash.replace('#', '');  // Extract the ID (e.g., "target-table")
    
    // If there is a hash and the table with that ID exists on the page
    if (targetTableId && document.getElementById(targetTableId)) {
      // Get the target table element
      const targetTable = document.getElementById(targetTableId);
      
      // Get the sidenav element (assuming it has an ID 'sidenav-main')
      const sidenav = document.getElementById('sidenav-main');
      
      // Get all elements in the body
      const allElements = document.body.getElementsByTagName('*');
      
      // Loop through all elements and apply blur to those that are not the sidenav or target table
      Array.from(allElements).forEach(function (element) {
          if (element !== sidenav && element !== targetTable && !targetTable.contains(element)) {
              element.classList.add('blurred');  // Apply the blur effect
          }
      });
    }
});
  


// Brand Chart 1:


fetch('/chart_data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(chartData => {
            console.log("Chart data fetched:", chartData);

            // Get chart8 data
            const chart8 = chartData.chart8;

            // Get the canvas element
            const ctx = document.getElementById('brand-chart-1').getContext('2d');

            // Create the chart
            new Chart(ctx, {
                type: chart8.type, // 'bar'
                data: {
                    labels: chart8.labels, // x-axis labels
                    datasets: [{
                        label: '', // Dataset label
                        data: chart8.values, // y-axis values
                        backgroundColor: '#274a6a',
                        borderColor: '#274a6a',
                        borderRadius: 5,
                        barThickness: 10
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                      legend: {
                      display: false
                      },
                      roundedBars: true
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            border: {
                              display: false,
                              dash: [6, 6]
                            },
                            ticks: {
                              color: 'black',
                            },
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                          ticks: {
                            color : 'white',
                            maxRotation: 30,
                            minRotation: 30,
                            callback: function(value, index, ticks) {
                              return `Brand ${index + 1}`;
                            }
                          }
                        },
                    }
                }
            });
});



// Brand Chart 2:


fetch('/chart_data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(chartData => {
            console.log("Chart data fetched:", chartData);

            // Get chart9 data
            const chart9 = chartData.chart9;

            // Get the canvas element
            const ctx = document.getElementById('brand-chart-2').getContext('2d');

            // Create the chart
            new Chart(ctx, {
                type: chart9.type, // 'bar'
                data: {
                    labels: chart9.labels, // x-axis labels
                    datasets: [{
                        label: '', // Dataset label
                        data: chart9.values, // y-axis values
                        backgroundColor: '#a2815e',
                        borderColor: '#a2815e',
                        borderRadius: 5,
                        barThickness: 10
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                      legend: {
                      display: false
                      },
                      roundedBars: true
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            border: {
                              display: false,
                              dash: [6, 6]
                            },
                            ticks: {
                              color: 'black',
                            },
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                          ticks: {
                            color : 'white',
                            maxRotation: 30,
                            minRotation: 30,
                            callback: function(value, index, ticks) {
                              return `Brand ${index + 1}`;
                            }
                          }
                        },
                    }
                }
            });
});

// Brand Chart 3:


fetch('/chart_data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(chartData => {
            console.log("Chart data fetched:", chartData);

            // Get chart10 data
            const chart10 = chartData.chart10;

            // Get the canvas element
            const ctx = document.getElementById('brand-chart-3').getContext('2d');

            // Create the chart
            new Chart(ctx, {
                type: chart10.type, // 'bar'
                data: {
                    labels: chart10.labels, // x-axis labels
                    datasets: [{
                        label: '', // Dataset label
                        data: chart10.values, // y-axis values
                        backgroundColor: '#e45948',
                        borderColor: '#e45948',
                        borderRadius: 5,
                        barThickness: 10
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                      legend: {
                      display: false
                      },
                      roundedBars: true,
                      tooltip: {
                        callbacks: {
                          label: function (context) {
                            const value = context.raw;
                            return `${value}$`;
                          }
                        }
                      }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            border: {
                              display: false,
                              dash: [6, 6]
                            },
                            ticks: {
                              color: 'black',
                            },
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                          ticks: {
                            color : 'white',
                            maxRotation: 30,
                            minRotation: 30,
                            callback: function(value, index, ticks) {
                              return `Brand ${index + 1}`;
                            }
                          }
                        },
                    }
                },
                
            });
});



// Brand Chart rating:


fetch('/chart_data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(chartData => {
            console.log("Chart data fetched:", chartData);

            // Get chart11 data
            const chart11 = chartData.chart11;

            // Get the canvas element
            const ctx = document.getElementById('brand-chart-rating').getContext('2d');

            // Create the chart
            new Chart(ctx, {
                type: chart11.type, // 'bar',
                data: {
                    labels: chart11.labels, // x-axis labels
                    datasets: [{
                        label: '', // Dataset label
                        data: chart11.values, // y-axis values
                        backgroundColor: 'white',
                        borderColor: 'white',
                        borderRadius: 5,
                        barThickness: 10
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                      legend: {
                      display: false
                      },
                      roundedBars: true,
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            border: {
                              display: false,
                              dash: [6, 6]
                            },
                            ticks: {
                              color: 'white',
                            },
                            grid: {
                              color : 'white',
                            }
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                          ticks: {
                            color : 'white',
                            maxRotation: 30,
                            minRotation: 30,
                            callback: function(value, index, ticks) {
                              return `Brand ${index + 1}`;
                            }
                          }
                        },
                    }
                },
                
            });
            
});


////////// Add values on the top of bars in a bar chart : 


// plugins: [
//   {
//     id: 'datalabels', // Custom plugin for data labels
//     afterDatasetsDraw: function(chart) {
//       const ctx = chart.ctx;
//       chart.data.datasets.forEach(function(dataset, i) {
//         const meta = chart.getDatasetMeta(i);
//         meta.data.forEach(function(bar, index) {
//           const value = dataset.data[index];
//           const x = bar.x; // X-coordinate of the bar
//           const y = bar.y - 5; // Y-coordinate, adjust for positioning
//           ctx.save();
//           ctx.fillStyle = 'white'; // Set text color
//           ctx.textAlign = 'center';
//           ctx.font = 'bold 12px Arial';
//           ctx.fillText(`$${value}`, x, y); // Display the value with a $ sign
//           ctx.restore();
//         });
//       });
//     }
//   }
// ]




/* =========================================
   Charts Loader
========================================= */


function hideChartLoader(container) {
    const card = container.closest('.analysis-card');

    if (card) {
        card.classList.add('is-loaded');
    }
}


/* =========================================
   1. RADAR CHART CONFIGURATION
========================================= */

const radarProfiles = [
  {
    elementId: 'radar1cat1',
    dataKey: 'chart17',
    color: 'rgb(153, 102, 255)',
    title: 'Frequent, highly satisfied reviewers',
    description:
      'Customers who write at least 3 reviews and give an average rating of 4 or higher.'
  },
  {
    elementId: 'radar2cat1',
    dataKey: 'chart18',
    color: '#f07167',
    title: 'Occasional or mixed reviewers',
    description:
      'Customers whose review activity or average ratings do not meet the criteria for the other segments.'
  },
  {
    elementId: 'radar3cat1',
    dataKey: 'chart19',
    color: '#386641',
    title: 'Category-focused reviewers',
    description:
      'Customers who concentrate at least 70% of their reviews in a single product category.'
  },
  {
    elementId: 'radar4cat1',
    dataKey: 'chart20',
    color: '#f5087a',
    title: 'Frequent, critical reviewers',
    description:
      'Customers who write at least 3 reviews and give an average rating of 3 or lower.'
  }
];

const radarDescriptions = {
  client_share_pct: 'Number of reviewers',
  review_activity: 'Review activity score',
  satisfaction: 'Customer satisfaction',
  recommendation_pct: 'Recommendation rate',
  featured_product_pct: 'Featured product rate',
  category_focus_pct: 'Category focus rate'
};


/* =========================================
   2. CREATE TITLE AND INFORMATION TOOLTIP
========================================= */

function addRadarHeading(profile) {
  const container = document.getElementById(profile.elementId);

  if (!container) {
    console.warn(`Container not found: #${profile.elementId}`);
    return;
  }

  const card = container.closest('.analysis-card');

  if (!card) {
    console.warn(`.analysis-card not found for #${profile.elementId}`);
    return;
  }

  // Prevent duplicate headings
  if (card.querySelector('.radar-heading')) {
    return;
  }

  const heading = document.createElement('div');
  heading.className = 'radar-heading';

  const title = document.createElement('h3');
  title.textContent = profile.title;

  const infoWrapper = document.createElement('div');
  infoWrapper.className = 'radar-info-wrapper';

  const infoButton = document.createElement('button');
  infoButton.type = 'button';
  infoButton.className = 'radar-info';
  infoButton.setAttribute('aria-label', profile.description);
  infoButton.setAttribute('aria-describedby',
    `${profile.elementId}-description`);

  // Circular information icon
  infoButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9"></circle>
      <path d="M12 11v5"></path>
      <circle cx="12" cy="7.5" r="0.6" class="info-dot"></circle>
    </svg>
  `;

  const description = document.createElement('div');
  description.className = 'radar-description';
  description.id = `${profile.elementId}-description`;
  description.setAttribute('role', 'tooltip');
  description.textContent = profile.description;

  infoWrapper.append(infoButton, description);
  heading.append(title, infoWrapper);

  card.insertBefore(heading, container);
}


/* =========================================
   3. RENDER ONE RADAR CHART
========================================= */

function renderRadarChart(profile, chartData) {
  const container = document.getElementById(profile.elementId);

  if (!container) {
    console.warn(`Container not found: #${profile.elementId}`);
    return;
  }

  if (
    !chartData ||
    !Array.isArray(chartData.labels) ||
    !Array.isArray(chartData.values)
  ) {
    console.error(`Invalid data for ${profile.dataKey}:`, chartData);
    return;
  }

  // Destroy an existing chart before recreating it
  if (container._apexChart) {
    container._apexChart.destroy();
    container._apexChart = null;
  }

  const options = {
    series: [
      {
        name: profile.title,
        data: chartData.values
      }
    ],

    chart: {
      type: 'radar',
      height: 400,
      width: 600,
      toolbar: {
        show: false
      },
      fontFamily: 'Poppins, sans-serif'
    },

    colors: [profile.color],

    xaxis: {
      categories: chartData.labels,
      labels: {
        style: {
          fontSize: '15px',
          fontWeight: 'bold',
          colors: chartData.labels.map(() => '#55505D')
        }
      }
    },

    yaxis: {
      show: false,
      min: 0,
      max: 100
    },

    plotOptions: {
      radar: {
        size: 150,
        polygons: {
          strokeColors: '#EAE5ED',
          connectorColors: '#EAE5ED',
          fill: {
            colors: ['#FFFFFF', '#FCF8FC']
          }
        }
      }
    },

    fill: {
      opacity: 0.3
    },

    stroke: {
      width: 2.5
    },

    markers: {
      size: 5,
      colors: ['#FFFFFF'],
      strokeColors: profile.color,
      strokeWidth: 2,
      hover: {
        size: 7
      }
    },

    dataLabels: {
      enabled: false
    },

    legend: {
      show: false
    },

    // Keep the custom tooltip attached to each radar data point
    tooltip: {
      enabled: true,
      shared: false,

      custom: function ({
        series,
        seriesIndex,
        dataPointIndex
      }) {
        // Protect against invalid hover indexes
        if (
          dataPointIndex == null ||
          dataPointIndex < 0 ||
          !chartData.labels[dataPointIndex]
        ) {
          return '';
        }

        const label = chartData.labels[dataPointIndex];

        let value = series[seriesIndex]?.[dataPointIndex];

        // Show the actual reviewer count for this metric
        if (label === 'client_share_pct') {
          value = chartData.counts;
        }

        const numericValue = Number(value);

        const formattedValue = Number.isFinite(numericValue)
          ? numericValue.toLocaleString('en-US', {
              maximumFractionDigits: 2
            })
          : 'N/A';

        const isCount = label === 'client_share_pct';
        const suffix = isCount ? '' : '%';

        return `
          <div class="radar-tooltip">
            <strong>${label.replace(/_/g, ' ')}</strong>
            <div>${radarDescriptions[label] || 'Metric value'}</div>
            <div>Value: ${formattedValue}${suffix}</div>
          </div>
        `;
      }
    }
  };

  const chart = new ApexCharts(container, options);
  container._apexChart = chart;

  chart.render()
      .then(() => {
          hideChartLoader(container);
      })
      .catch(error => {
          console.error('Error rendering chart:', error);
  });
}

/* =========================================
   4. Loaders Initializer
========================================= */

document.querySelectorAll('.analysis-card').forEach(card => {
    if (card.querySelector('.chart-loader')) {
        card.classList.remove('is-loaded');
    }
});

/* =========================================
   5. FETCH DATA ONCE AND RENDER ALL CHARTS
========================================= */

async function initializeRadarCharts() {
  try {
    const response = await fetch('/chart_data');

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const chartData = await response.json();

    radarProfiles.forEach(profile => {
      const data = chartData[profile.dataKey];

      if (!data) {
        console.error(`Missing ${profile.dataKey} in /chart_data`);
        return;
      }

      addRadarHeading(profile);
      renderRadarChart(profile, data);
    });

  } catch (error) {
    console.error('Error initializing radar charts:', error);
  }
}

initializeRadarCharts();



// // Handle dropdown change
// document.getElementById('category-select').addEventListener('change', function () {
//     const selectedCategory = this.value; // Get the selected category (e.g., "Category1")
//     const selectedData = chart7[selectedCategory];

//     // Update chart data
//     radarChart.data.labels = selectedData.labels.map(label => 
//     label.split(' ').join('\n') // Wrap words by splitting on spaces
//     );
//     radarChart.data.datasets[0].data = selectedData.values;

//     // Refresh the chart
//     radarChart.update();
// });
// })
// .catch(error => {
// console.error("Error fetching chart data:", error);
// });




// Heatmap reviews:

fetch('/chart_data')
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(chartData => {
    console.log("Chart data fetched:", chartData);

    // Get heatmap1 data
    const heatmap1 = chartData.heatmap1;

    const categories = heatmap1.brands;

    const series = [
      {
          name: 'Old Products', // Column 1
          data: heatmap1.data_old
      },
      {
          name: 'New Products', // Column 2
          data: heatmap1.data_new
      }
  ];

    const heatmapSeries = series.map((col, colIndex) => {
      return {
          name: col.name,
          data: col.data.map((value, rowIndex) => {
              return {
                  x: categories[rowIndex],
                  y: value
              };
          })
      };
  });

  // ApexCharts options
  const options = {
    chart: {
        type: 'heatmap',
        height: 400,
        toolbar: {
          show: false,
        }
    },
    series: heatmapSeries,
    dataLabels: {
        enabled: true,
        formatter: function(value) {
          return formatNumberWithSpace(value);
        }
    },
    legend: {
      show: false
    },
    xaxis: {
        type: 'category',
        title: {
            text: ''
        },
        tooltip: {
          enabled: false
        },
        labels: {
          rotate: -35
        }
    },
    yaxis: {
        title: {
            text: ''
        }
    },
    tooltip: {
      enabled: true,
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
          return `<div">
                    <strong>${w.config.series[seriesIndex].name}</strong>: ${formatNumberWithSpace(series[seriesIndex][dataPointIndex])}<br>
                    <strong>Brand:</strong> ${w.globals.labels[dataPointIndex]}
                  </div>`;
      }
    },
    colors: ['#5b394e', '#b9b0da', '#90b2c3', '#499ad7', '#248ede', '#3172c6', '#3368a3', '#274a6a', '#202f53', '#191b2c'],
    plotOptions: {
        heatmap: {
            colorScale: {
            ranges: [
                { from: 7577,   to: 79863,  color: '#1e3a8a', foreColor: '#ffffff' },
                { from: 79863,  to: 152148, color: '#1e40af', foreColor: '#ffffff' },
                { from: 152148, to: 224433, color: '#1d4ed8', foreColor: '#ffffff' },
                { from: 224433, to: 296719, color: '#1e50c5', foreColor: '#ffffff' },
                { from: 296719, to: 369004, color: '#1e5bb8', foreColor: '#ffffff' },
                { from: 369004, to: 441290, color: '#1d4f91', foreColor: '#ffffff' },
                { from: 441290, to: 513575, color: '#173f73', foreColor: '#ffffff' },
                { from: 513575, to: 585861, color: '#12345b', foreColor: '#ffffff' },
                { from: 585861, to: 658146, color: '#0f2947', foreColor: '#ffffff' },
                { from: 658146, to: 730432, color: '#091a2e', foreColor: '#ffffff' }
                ]
            }
        }
    },
    title: {
        text: 'New vs Old Products by Reviews Heatmap',
        align: 'center'
    }
};


// Function to format numbers with space as thousands separator
function formatNumberWithSpace(number) {
  return new Intl.NumberFormat('en-US').format(number).replace(/,/g, ' ');
}

// Render the heatmap
const chart = new ApexCharts(document.querySelector("#new-old-rev"), options);
chart.render();

})

.catch(error => {
  console.error('Error fetching or rendering chart data:', error);
});


// Heatmap rating:

fetch('/chart_data')
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(chartData => {
    console.log("Chart data fetched:", chartData);

    // Get heatmap2 data
    const heatmap2 = chartData.heatmap2;

    const categories = heatmap2.brands;

    const series = [
      {
          name: 'Old Products', // Column 1
          data: heatmap2.data_old
      },
      {
          name: 'New Products', // Column 2
          data: heatmap2.data_new
      }
  ];

    const heatmapSeries = series.map((col, colIndex) => {
      return {
          name: col.name,
          data: col.data.map((value, rowIndex) => {
              return {
                  x: categories[rowIndex],
                  y: value
              };
          })
      };
  });

  // ApexCharts options
  const options = {
    chart: {
        type: 'heatmap',
        height: 390,
        toolbar: {
          show: false,
        }
    },
    series: heatmapSeries,
    dataLabels: {
        enabled: true,
        formatter: function(value) {
          return formatNumberWithSpace(value);
        }
    },
    legend: {
      show: false
    },
    xaxis: {
        type: 'category',
        title: {
            text: ''
        },
        tooltip: {
          enabled: false
        },
        labels: {
          rotate: -35
        }
    },
    yaxis: {
        title: {
            text: ''
        }
    },
    tooltip: {
      enabled: true,
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
          return `<div>
                    <strong>${w.config.series[seriesIndex].name}</strong>: ${formatNumberWithSpace(series[seriesIndex][dataPointIndex])}<br>
                    <strong>Brand:</strong> ${w.globals.labels[dataPointIndex]}
                  </div>`;

      }
    },
    colors: ['#bdb9ab', '#b6966c', '#e45948', '#a2815e', '#8c694c', '#6c5d4f', '#4d3c30', '#383634', '#292827', '#050a0d'], // Adjust the base color for heatmap
    plotOptions: {
        heatmap: {
            colorScale: {
            ranges: [
                  { from: 4.2, to: 4.28, color: '#bdb9ab' },
                  { from: 4.28, to: 4.36, color: '#b6966c' },
                  { from: 4.37, to: 4.44, color: '#e45948' },
                  { from: 4.45, to: 4.52, color: '#a2815e' },
                  { from: 4.53, to: 4.6, color: '#8c694c' },
                  { from: 4.61, to: 4.68, color: '#6c5d4f' },
                  { from: 4.69, to: 4.76, color: '#4d3c30' },
                  { from: 4.77, to: 4.84, color: '#383634' },
                  { from: 4.85, to: 4.92, color: '#292827' },
                  { from: 4.93, to: 5.0, color: '#050a0d' }
              ]
            }
        }
    },

    title: {
        text: 'New vs Old Products by Rating Heatmap',
        align: 'center'
    }
};


// Function to format numbers with space as thousands separator
function formatNumberWithSpace(number) {
  return new Intl.NumberFormat('en-US').format(number).replace(/,/g, ' ');
}

// Render the heatmap
const chart = new ApexCharts(document.querySelector("#new-old-rat"), options);
chart.render();

})

.catch(error => {
  console.error('Error fetching or rendering chart data:', error);
});