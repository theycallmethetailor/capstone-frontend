import { Pie } from 'vue-chartjs'

export default {
    extends: Pie,
    name: "HoursByTagPieChart",
    mounted() {
        this.renderChart({
            labels: this.tags,
            datasets: [
                {
                    label: "Hours By Tag",
                    data: this.tagData,
                    backgroundColor: this.colorOptions
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
        HoursByTag() {
            return this.$store.state.HoursByTag;
        },
        fetchingVolReport() {
            return this.$store.state.fetchingVolReport;
        },
        tags() {
            return this.$store.getters.hoursTags
        },
        tagData() {
            return this.$store.getters.hoursTagsData
        },
        colorOptions() {
            let options = ["#E0F2F1", "#FF8A80", "#B2EBF2"]
            if (options.length < this.tags.length) {
                let newOptions = []
                let colorIndex = 0
                for (let i = 0; i < this.tags.length; i++) {
                    if (colorIndex > options.length - 1) {
                        colorIndex = 0
                    }

                    if (newOptions[i - 1] === options[colorIndex] || (newOptions[0] === options[colorIndex] && i === this.tags.length - 1)) {
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
    },
}