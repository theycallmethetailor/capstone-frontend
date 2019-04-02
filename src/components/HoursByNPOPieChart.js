import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    name: "HoursByNPOPieChart",
    mounted() {
        this.renderChart({
            labels: this.npos,
            datasets: [
                {
                    label: "Hours By NPO",
                    backgroundColor: this.colorOptions,
                    data: this.npoData,
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
        fetchingVolReport() {
            return this.$store.state.fetchingVolReport;
        },
        npos() {
            return this.$store.getters.hoursNPOs
        },
        npoData() {
            return this.$store.getters.hoursNPOData
        },
        colorOptions() {
            let options = ["#E0F2F1", "#FF8A80", "#B2EBF2"]
            if (options.length < this.npos.length) {
                let newOptions = []
                let colorIndex = 0
                for (let i = 0; i < this.npos.length; i++) {
                    if (colorIndex > options.length - 1) {
                        colorIndex = 0
                    }

                    if (newOptions[i - 1] === options[colorIndex] || (newOptions[0] === options[colorIndex] && i === this.npos.length - 1)) {
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