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
        HoursByTagArray() {
            let arrayOfData = Object.keys(this.HoursByTag).map(tagID => {
                return this.HoursByTag[tagID];
            });
            return arrayOfData;
        },
        tags() {
            return this.HoursByTagArray.map(tagData => {
                return tagData.TagName
            })
        },
        tagData() {
            return this.HoursByTagArray.map(tagData => {
                return tagData.HoursWorked
            })
        },
    }
}