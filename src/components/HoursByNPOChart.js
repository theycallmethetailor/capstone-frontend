import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  name: "HoursByNPOChart",
  mounted() {
    this.renderChart({
      labels: this.npos,
      datasets: [
        {
          label: "Hours By NPO",
          backgroundColor: "#FF8A80",
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
  }
}