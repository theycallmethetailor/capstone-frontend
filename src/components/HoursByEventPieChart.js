import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    name: "HoursByEventPieChart",
    mounted() {
        this.renderChart({
            labels: this.events,
            datasets: [
                {
                    label: "Hours By Event",
                    backgroundColor: this.colorOptions,
                    data: this.eventData,
                }
            ]
        }, this.options)
    },
    data() {
        return {
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
    },
    computed: {
        HoursByEvent() {
            return this.$store.state.HoursByEvent;
        },
        fetchingVolReport() {
            return this.$store.state.fetchingVolReport;
        },
        HoursByEventArray() {
            return this.$store.getters.HoursByEventArray
        },
        events() {
            return this.$store.getters.hoursEvents
        },
        eventData() {
            return this.$store.getters.hoursEventData
        },
        colorOptions() {
            let options = ["#E0F2F1", "#FF8A80", "#B2EBF2"]
            if (options.length < this.events.length) {
                let newOptions = []
                let colorIndex = 0
                for (let i = 0; i < this.events.length; i++) {
                    if (colorIndex > options.length - 1) {
                        colorIndex = 0
                    }

                    if (newOptions[i - 1] === options[colorIndex] || (newOptions[0] === options[colorIndex] && i === this.events.length - 1)) {
                        colorIndex++
                        newOptions.push(options[colorIndex])
                    } else {
                        newOptions.push(options[colorIndex])
                        colorIndex++
                    }
                }
                return newOptions
            }

            return options
        }
    }
}