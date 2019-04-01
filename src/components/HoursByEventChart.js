import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    name: "HoursByEventChart",
    mounted() {
        this.renderChart({
            labels: this.events,
            datasets: [
                {
                    label: "Hours By Event",
                    backgroundColor: "#FF8A80",
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
    }
}