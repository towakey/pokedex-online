<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { color } from 'chart.js/helpers';

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
        color: '#000',
      }
    },
    datalabels: {
      color: '#fff',
      font: {
        weight: 'bold',
        size: 14,
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
      ],
      backgroundColor: [
      "#3F88C5",
      "#3F88C5",
      "#3F88C5",
      "#3F88C5",
      "#3F88C5",
      "#3F88C5"
      ]
    }
  ],
}

</script>
<template>
<v-card
variant="outlined"
style="margin-top: 20px;background-color: white;"
:id="`status`"
>
  <v-card-text>
    <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
    />
  </v-card-text>
</v-card>
</template>
<style>
[id] {
  scroll-margin-top: 80px;
}
</style>