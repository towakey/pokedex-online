<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
ChartJS.register(ChartDataLabels)

const props = defineProps(["statusData"])

let chartOptions = {
  responsive: true,
  title: {
  },
  indexAxis: 'y',
  scales: {
    x: {
      max: 260,
    }
  },
  plugins: {
    legend: {
      display: false,
      labels: {
        color: 'rgb(255, 99, 132)',
      }
    },
    tooltip: {
      enabled: false,
    },
  },
}

let chartData = {
  labels: [ 'HP', 'こうげき', 'ぼうぎょ', 'とくこう', 'とくぼう', 'すばやさ' ],
  datasets: [
    {
      data: [
        props.statusData.hp, 
        props.statusData.attack,
        props.statusData.defense,
        props.statusData.special_attack,
        props.statusData.special_defense,
        props.statusData.speed
      ]
    }
  ],
}

</script>
<template>
<v-card>
  <v-card-text>
    <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
    />
  </v-card-text>
</v-card>
</template>