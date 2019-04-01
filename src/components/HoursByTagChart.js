import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    name: "HoursByTagChart",
    mounted() {
        this.renderChart({
            labels: this.tags,
            datasets: [
                {
                    label: "Hours By Tag",
                    backgroundColor: "#FF8A80",
                    data: this.tagData,
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
    },
}