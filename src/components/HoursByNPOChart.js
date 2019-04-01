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
    HoursByNPO() {
      return this.$store.state.HoursByNPO;
    },
    fetchingVolReport() {
      return this.$store.state.fetchingVolReport;
    },
    hoursByNPOArray() {
      let arrayOfData = Object.keys(this.HoursByNPO).map(NPOID => {
        return this.HoursByNPO[NPOID];
      });
      return arrayOfData;
    },
    npos() {
      return this.hoursByNPOArray.map(npoData => {
        return npoData.NPOName
      })
    },
    npoData() {
      return this.hoursByNPOArray.map(npoData => {
        return npoData.HoursWorked
      })
    },
  }
}