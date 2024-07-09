<script setup lang="ts">
const props = defineProps(["wazaData"])

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

let val: any[]

val = []

if('waza' in props.wazaData){
  flag = true

  for(let waza in props.wazaData.waza[""])
  {
    val.push({
      'type': '基本',
      'name': props.wazaData.waza[""][waza]
    })
  }
  for(let waza in props.wazaData.waza["思い出し"])
  {
    val.push({
      'type': '思い出し',
      'name': props.wazaData.waza["思い出し"][waza]
    })
  }
  for(let waza in props.wazaData.waza["進化時"])
  {
    val.push({
      'type': '進化時',
      'name': props.wazaData.waza["進化時"][waza]
    })
  }
  let lvup = []
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
  val.push(...lvup)
  // console.log(val)

}

</script>
<template>
  <div
  v-if="flag"
  >
  <v-card
  variant="outlined"
  style="margin-top: 20px;"
  >
    <v-data-table
    :headers="header"
    :items="val"
    :items-per-page="100"
    >
    </v-data-table>
  </v-card>
  <!-- {{ props.wazaData.waza }} -->
  </div>
</template>