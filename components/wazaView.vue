<script setup lang="ts">
const props = defineProps(["wazaData", "area"])

let flag: boolean
flag = false
// console.log(props.wazaData)

const header = [
  {
    title: '条件',
    key: 'type'
  },
  {
    title: '覚える技',
    key: 'name'
  }
]

// let val: any[]
let kihon: any[]
let omoidashi: any[]
let shinka: any[]
let lvup: any[]

// val = []
kihon = []
omoidashi = []
shinka = []
lvup = []

if('waza' in props.wazaData){
  flag = true

  for(let waza in props.wazaData.waza[""])
  {
    kihon.push({
      'type': '基本',
      'name': props.wazaData.waza[""][waza]
    })
  }
  for(let waza in props.wazaData.waza["思い出し"])
  {
    omoidashi.push({
      'type': '思い出し',
      'name': props.wazaData.waza["思い出し"][waza]
    })
  }
  for(let waza in props.wazaData.waza["進化時"])
  {
    shinka.push({
      'type': '進化時',
      'name': props.wazaData.waza["進化時"][waza]
    })
  }
  for(let waza in props.wazaData.waza)
  {
    if(waza != '' && waza != '思い出し' && waza != '進化時'){
      lvup.push({
        'type': waza,
        'name': props.wazaData.waza[waza][0]
      })
    }
  }
  // console.log(lvup)
  // lvup.sort((a, b) => {
  //   if(a.type < b.type)
  //   {
  //     return -1
  //   }
  //   if(a.type > b.type)
  //   {
  //     return 1
  //   }
  //   return 0
  // })
  // console.log(lvup)
  // val.push(...lvup)
  // console.log(val)

}

</script>
<template>
  <div
  v-if="flag"
  >
  <template
  v-if="kihon.length > 0"
  >
    <v-card
    variant="outlined"
    style="margin-top: 20px;"
    >
      <v-data-table
      :headers="[{title: '基本', key: 'type', width: '50%'},{title: '覚える技', key: 'name', width: '50%'}]"
      :items="kihon"
      :items-per-page="100"
      hide-default-footer
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.type }}</td>
            <td><NuxtLink class="nuxtlink" :to="{path: `/waza/${props.area}`, hash: `#${item.name}`}">{{ item.name }}</NuxtLink></td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </template>
  <template
  v-if="omoidashi.length > 0"
  >
    <v-card
    variant="outlined"
    style="margin-top: 20px;"
    >
      <v-data-table
      :headers="[{title: '思い出し技', key: 'type', width: '50%'},{title: '覚える技', key: 'name', width: '50%'}]"
      :items="omoidashi"
      :items-per-page="100"
      hide-default-footer
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.type }}</td>
            <td><NuxtLink class="nuxtlink" :to="{path: `/waza/${props.area}`, hash: `#${item.name}`}">{{ item.name }}</NuxtLink></td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </template>
  <template
  v-if="shinka.length > 0"
  >
    <v-card
    variant="outlined"
    style="margin-top: 20px;"
    >
      <v-data-table
      :headers="[{title: '進化時', key: 'type', width: '50%'},{title: '覚える技', key: 'name', width: '50%'}]"
      :items="shinka"
      :items-per-page="100"
      hide-default-footer
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.type }}</td>
            <td><NuxtLink class="nuxtlink" :to="{path: `/waza/${props.area}`, hash: `#${item.name}`}">{{ item.name }}</NuxtLink></td>
          </tr>
        </template>
    </v-data-table>
    </v-card>
  </template>
  <template
  v-if="lvup.length > 0"
  >
    <v-card
    variant="outlined"
    style="margin-top: 20px;"
    >
      <v-data-table
      :headers="[{title: 'レベルアップ', key: 'type', width: '50%'},{title: '覚える技', key: 'name', width: '50%'}]"
      :items="lvup"
      :items-per-page="100"
      hide-default-footer
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.type }}</td>
            <td><NuxtLink class="nuxtlink" :to="{path: `/waza/${props.area}`, hash: `#${item.name}`}">{{ item.name }}</NuxtLink></td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </template>
  <!-- {{ props.wazaData.waza }} -->
  </div>
</template>