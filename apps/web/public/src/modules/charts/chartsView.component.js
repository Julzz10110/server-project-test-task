import template from './chartsView.template';

const chartsView = {
  template: template(),
  controller: [
    'Charts',
        '$filter',
        function (Charts, $filter) {
            this.chartParams = {};
            this.dateSelect = new Date();

            this.updateChart = function () {
                const selected_day = $filter('date')(this.dateSelect, "yyyy-MM-dd");

                this.chart = Charts.get({ day: selected_day });

                this.chart.$promise.then((chart) => {
                    const tasks = chart.tasks;

                    const dataset = () => {
                        const result = [];

                        for (let tasks_list of tasks.complete) {
                            result.push({
                                label: tasks_list.name,
                                data: tasks_list.tasks,
                                backgroundColor: getRGBColor(tasks_list.tasks.length),
                            })
                        }
                        return result;
                    };

                    this.chartParams = {
                        type: 'bar',
                        data: {
                            datasets: dataset(),
                            labels: tasks.labels,
                        },
                        options: {
                            responsive: true,
                            legend: {
                                display: false,
                                position: 'left',
                            },
                            scales: {
                                x: {
                                    stacked: false,
                                    beginAtZero: true,
                                },
                                y: {
                                    stacked: false,
                                    min: 0,
                                },
                            },
                        },
                    };
                })
            }

        }],
};

function getRGBColor(lenght) {
    let color = '#';
    const characters = '0123456789ABCDEF';

    for (let i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * 16)];
    }

    return Array(lenght).fill(color);
}

export {chartsView};