import { isNumber } from 'chart.js/helpers'

export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()


  const query: any = getQuery(event)
  let id: number = typeof query.id === 'string' ? query.id : 0
  const area: string = typeof query.area === 'string' ? query.area : 'null'
  const mode: string = typeof query.mode === 'string' ? query.mode : 'null'

  let flag: boolean = true

  let type: any = []

  let pokedex: any
  let ver: string = ''
  let type_list: any
  let waza: any = {}
  let waza_machine: any
  let evolve: any = []
  
  const global: any = (await import('~/assets/v1/pokedex/pokedex/pokedex.json')).default.pokedex
  const ability: any = (await import('~/assets/v1/pokedex/ability/ability.json')).default.ability
  const type_json: any = (await import('~/assets/v1/pokedex/type/type.json')).default.type
  switch(area)
  {
    case "global":
      break
    case "kanto":
      ver = "Red_Green_Blue_Pikachu"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Red_Green_Blue_Pikachu/Red_Green_Blue_Pikachu.json')).default.pokedex
      type_list = appConfig.type_list['1']
      break
    case "johto":
      ver = "Gold_Silver_Crystal"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Gold_Silver_Crystal/Gold_Silver_Crystal.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "hoenn":
      ver = "Ruby_Sapphire_Emerald"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Ruby_Sapphire_Emerald/Ruby_Sapphire_Emerald.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "kanto_frlg":
      ver = "FireRed_LeafGreen"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/FireRed_LeafGreen/FireRed_LeafGreen.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "sinnoh":
      ver = "Diamond_Pearl_Platinum"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Diamond_Pearl_Platinum/Diamond_Pearl_Platinum.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "johto_hgss":
      ver = "HeartGold_SoulSilver"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/HeartGold_SoulSilver/HeartGold_SoulSilver.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "unova_bw":
      ver = "Black_White"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Black_White/Black_White.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "unova_b2w2":
      ver = "Black2_White2"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Black2_White2/Black2_White2.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "central_kalos":
      ver = "X_Y"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/X_Y/X_Y.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "coast_kalos":
      ver = "X_Y"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/X_Y/X_Y.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "mountain_kalos":
      ver = "X_Y"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/X_Y/X_Y.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "alola_sm":
      ver = "Sun_Moon"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Sun_Moon/Sun_Moon.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "alola_usum":
      ver = "UltraSun_UltraMoon"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/UltraSun_UltraMoon/UltraSun_UltraMoon.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "galar":
      ver = "Sword_Shield"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Sword_Shield/Sword_Shield.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "crown_tundra":
      ver = "Sword_Shield"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Sword_Shield/Sword_Shield.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "isle_of_armor":
      ver = "Sword_Shield"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Sword_Shield/Sword_Shield.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "hisui":
      ver = "LegendsArceus"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/LegendsArceus/LegendsArceus.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "paldea":
      ver = "Scarlet_Violet"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/Scarlet_Violet.json')).default.pokedex
      type_list = appConfig.type_list['3']
      try {
        waza = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza.json')).default.waza.paldea
      }catch(e){
        waza = {}
      }
      try {
        waza_machine = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza_machine.json')).default.waza_machine
      }catch(e){
        waza_machine = {}
      }
      try {
        evolve = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/evolve.json')).default.evolve.paldea
      }catch(e){
        evolve = []
      }
      break
    case "kitakami":
      ver = "Scarlet_Violet"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/Scarlet_Violet.json')).default.pokedex
      type_list = appConfig.type_list['3']
      try {
        waza = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza.json')).default.waza.kitakami
      }catch(e){
        waza = {}
      }
      try {
        waza_machine = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza_machine.json')).default.waza_machine
      }catch(e){
        waza_machine = {}
      }
      break
    case "blueberry":
      ver = "Scarlet_Violet"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/Scarlet_Violet.json')).default.pokedex
      type_list = appConfig.type_list['3']
      try {
        waza = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza.json')).default.waza.blueberry
      }catch(e){
        waza = {}
        console.log(`waza error:${e}`)
      }
      try {
        waza_machine = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/waza_machine.json')).default.waza_machine
      }catch(e){
        waza_machine = {}
        console.log(`machine error:${e}`)
      }
      break
  }

  if(area != 'global')
  {

    for(let game_ver of type_json)
    {
      if(game_ver["geme_version"].includes(ver))
      {
        type = game_ver['type']
      }
    }

    if(area != 'unova_bw' && area != 'unova_b2w2')
    {
      id--
      if( 0 > id || id > (pokedex[appConfig.pokedex_eng2jpn[area]].length - 1) )
      {
        flag = false
      }
    }
    else
    {
      if( 0 > id || id > (pokedex[appConfig.pokedex_eng2jpn[area]].length - 1) )
      {
        flag = false
      }
    }
  }
  else
  {
    id--
  }


  let result: any
  if(mode == 'index'){
    result = []
    if(area == 'global')
    {
      result = global
      result.forEach((pokemon: any) => {
        pokemon["no"] = pokemon["no"]
        pokemon["globalNo"] = pokemon["no"]
        pokemon["status"] = []
        pokemon["status"].push({"name": pokemon["name"]})
      });
    }
    else
    {
      result = pokedex[appConfig.pokedex_eng2jpn[area]]
      result.forEach((pokemon: any) => {
        pokemon["status"].forEach((status: any) => {
          status["name"] = global[pokemon["globalNo"] - 1].name
          global[pokemon["globalNo"] - 1]["form"].forEach((normal: any) => {
            if(status.form == normal.form && status.region == normal.region && status.mega_evolution == normal.mega_evolution && status.gigantamax == normal.gigantamax)
            {
              status["name"] = global[pokemon["globalNo"] - 1].name
              Object.keys(normal).forEach((key) => {
                status[key] = normal[key]
              })
            }
          })
        })
      })
    }
  }else if(mode == 'details'){
    result = []
    if(flag)
    {
      if(area == 'global')
      {
        let arr: any = []
        let name: string = ''
        if( 0 <= id && id < global.length)
        {
          global[id]["form"].forEach((normal: any) => {
            if(normal.name !== undefined) {
              name = normal.name
            } else {
              name = global[id].name
            }
            arr.push({
              "no": id+1,
              "globalNo": id+1,
              "form": normal.form,
              "region": normal.region,
              "mega_evolution": normal.mega_evolution,
              "gigantamax": normal.gigantamax,
              "name": name,
              "classification": normal.classification,
              "height": normal.height,
              "weight": normal.weight
            })
          })
          result = arr
        }
      }
      else
      {
        let arr: any = []

        let name: string = ''
        let classification: string = ''
        let height: string = ''
        let weight: string = ''
        let ability1_description = ''
        let ability2_description = ''
        let dream_ability_description = ''
        let waza_array: any = {}
        let evolve_array: any = {}

        pokedex[appConfig.pokedex_eng2jpn[area]][id]["status"].forEach((status: any) => {
          name = global[pokedex[appConfig.pokedex_eng2jpn[area]][id]["globalNo"] - 1].name
          global[pokedex[appConfig.pokedex_eng2jpn[area]][id]["globalNo"] - 1].form.forEach((normal: any) => {
            normal = JSON.parse(JSON.stringify(normal))
            if(status.form == normal.form && status.region == normal.region && status.mega_evolution == normal.mega_evolution && status.gigantamax == normal.gigantamax)
            {
              if(normal.name !== undefined) {
                name = normal.name
              } else {
                name = global[pokedex[appConfig.pokedex_eng2jpn[area]][id]["globalNo"] - 1].name
              }
              classification = normal.classification
              height = normal.height
              weight = normal.weight
            }
          })
          if(ver == 'Red_Green_Blue_Pikachu' || ver == 'Gold_Silver_Crystal' || ver == 'LegendsArceus')
          {
            // ver = ''
            // console.log(ability[status["ability1"]][ver])
          }
          else
          {
            ability1_description = ability[status["ability1"]][ver]
            if(status["ability2"] && status["ability2"] != '')
            {
              ability2_description = ability[status["ability2"]][ver]
            }
            if(status["dream_ability"] && status["dream_ability"] != '')
            {
              dream_ability_description = ability[status["dream_ability"]][ver]
            }
          }
          let type_compatibility: any = {}
          type_list.forEach((val: any) => {
            if(status["type2"] == "")
            {
              type_compatibility[val] = String(Number(type[val][status["type1"]]))
            }
            else
            {
              type_compatibility[val] = String(Number(type[val][status["type1"]]) * Number(type[val][status["type2"]]))
            }
          })

          // わざ
          if(Object.keys(waza).length > 0 && waza[id+1] !== undefined){
            // 通常フォルム
            if(waza[id+1][status.form] !== undefined){
              if(Array.isArray(waza[id+1][status.form]["わざマシン"])) {
                waza[id+1][status.form]["わざマシン"] = waza[id+1][status.form]["わざマシン"].reduce(
                  (acc: any, key: any) => {
                    acc[key] = waza_machine[key]
                    return acc;
                  },
                  {} as { [key: string]: string }
                )
              }
              
              // lvupキーを初期化
              waza_array = {}
              waza_array["lvup"] = {}
              
              // 数字のキーを持つわざをlvupの下に移動
              Object.entries(waza[id+1][status.form]).forEach(([key, value]) => {
                if(key === "") {
                  // 空の文字列キーの場合は直接waza_arrayに格納
                  waza_array[""] = value
                } else if(!isNaN(Number(key))) {
                  // 数字のキーの場合はlvupの下に格納
                  waza_array["lvup"][key] = value
                } else if(key !== "lvup") {
                  // その他のキー（わざマシンなど）も保持
                  waza_array[key] = value
                }
              })
            }
            // リージョンフォーム
            if(waza[id+1][status.region] !== undefined){
              if(Array.isArray(waza[id+1][status.region]["わざマシン"])) {
                waza[id+1][status.region]["わざマシン"] = waza[id+1][status.region]["わざマシン"].reduce(
                  (acc: any, key: any) => {
                    acc[key] = waza_machine[key]
                    return acc;
                  },
                  {} as { [key: string]: string }
                )
              }
              // lvupキーを初期化
              let waza_region_array: any = {}
              waza_region_array["lvup"] = {}
              // 数字のキーを持つわざをlvupの下に移動
              Object.entries(waza[id+1][status.region]).forEach(([key, value]) => {
                if(key === "") {
                  // 空の文字列キーの場合は直接waza_arrayに格納
                  waza_region_array[""] = value
                } else if(!isNaN(Number(key))) {
                  // 数字のキーの場合はlvupの下に格納
                  waza_region_array["lvup"][key] = value
                } else if(key !== "lvup") {
                  // その他のキー（わざマシンなど）も保持
                  waza_region_array[key] = value
                }
              })
              waza_array = waza_region_array
            }
          }

          // 進化
          if(Object.keys(evolve).length > 0 && evolve["進化先"] && evolve["進化先"][id+1] !== undefined){
            if(status.form && evolve["進化先"][id+1][status.form] && Object.keys(evolve["進化先"][id+1][status.form]).length > 0){
              evolve_array = evolve["進化先"][id+1][status.form]
              Object.keys(evolve_array).forEach(val => {
                if(evolve["進化先"][id+1][status.form][val] && Object.keys(evolve["進化先"][id+1][status.form][val]).length > 0) {
                  evolve_array[val]["globalNo"] = pokedex[appConfig.pokedex_eng2jpn[area]][Number(Object.keys(evolve["進化先"][id+1][status.form][val])[0]) - 1]["globalNo"]
                  evolve_array[val]["name"] = global[evolve_array[val]["globalNo"]-1]["name"]
                }
              })
            }
          }

          arr.push({
            "no": pokedex[appConfig.pokedex_eng2jpn[area]][id]["no"],
            "globalNo": pokedex[appConfig.pokedex_eng2jpn[area]][id]["globalNo"],
            "classification": classification,
            "height": height,
            "weight": weight,
            "form": status["form"],
            "region": status["region"],
            "mega_evolution": status["mega_evolution"],
            "gigantamax": status["gigantamax"],
            "name": name,
            "type1": status["type1"],
            "type2": status["type2"],
            "type_compatibility": type_compatibility,
            "hp": status["hp"],
            "attack": status["attack"],
            "defense": status["defense"],
            "special_attack": status["special_attack"],
            "special_defense": status["special_defense"],
            "speed": status["speed"],
            "ability1": status["ability1"],
            "ability1_description": ability1_description,
            "ability2": status["ability2"],
            "ability2_description": ability2_description,
            "dream_ability": status["dream_ability"],
            "dream_ability_description": dream_ability_description,
            "description": status["description"],
            "waza": waza_array,
            "evolve": evolve_array
          })
          result = arr
        })
      }
    }
    else
    {
      result = false
    }
  }else if(mode == 'exists'){
    result = -1
    pokedex[appConfig.pokedex_eng2jpn[area]].forEach((pokemon: any) => {
      if(area != 'unova_bw' && area != 'unova_b2w2')
      {
        if(pokemon.globalNo == id + 1){
          result = pokemon.no
        }
      }
      else
      {
        if(pokemon.globalNo == id + 1){
          result = pokemon.no - 1
        }
      }
    });
  }else if(mode == 'version'){
    const global_default: any = (await import('~/assets/v1/pokedex/pokedex/pokedex.json')).default
    const ability_default: any = (await import('~/assets/v1/pokedex/ability/ability.json')).default
    const type_default: any = (await import('~/assets/v1/pokedex/type/type.json')).default
    const kanto_default: any = (await import('~/assets/v1/pokedex/pokedex/Red_Green_Blue_Pikachu/Red_Green_Blue_Pikachu.json')).default
    const johto_default: any = (await import('~/assets/v1/pokedex/pokedex/Gold_Silver_Crystal/Gold_Silver_Crystal.json')).default
    const hoenn_default: any = (await import('~/assets/v1/pokedex/pokedex/Ruby_Sapphire_Emerald/Ruby_Sapphire_Emerald.json')).default
    const kanto_frlg_default: any = (await import('~/assets/v1/pokedex/pokedex/FireRed_LeafGreen/FireRed_LeafGreen.json')).default
    const sinnoh_default: any = (await import('~/assets/v1/pokedex/pokedex/Diamond_Pearl_Platinum/Diamond_Pearl_Platinum.json')).default
    const johto_hgss_default: any = (await import('~/assets/v1/pokedex/pokedex/HeartGold_SoulSilver/HeartGold_SoulSilver.json')).default
    const unova_bw_default: any = (await import('~/assets/v1/pokedex/pokedex/Black_White/Black_White.json')).default
    const unova_b2w2_default: any = (await import('~/assets/v1/pokedex/pokedex/Black2_White2/Black2_White2.json')).default
    const central_kalos_default: any = (await import('~/assets/v1/pokedex/pokedex/X_Y/X_Y.json')).default
    const coast_kalos_default: any = (await import('~/assets/v1/pokedex/pokedex/X_Y/X_Y.json')).default
    const mountain_kalos_default: any = (await import('~/assets/v1/pokedex/pokedex/X_Y/X_Y.json')).default
    const alola_sm_default: any = (await import('~/assets/v1/pokedex/pokedex/Sun_Moon/Sun_Moon.json')).default
    const alola_usum_default: any = (await import('~/assets/v1/pokedex/pokedex/UltraSun_UltraMoon/UltraSun_UltraMoon.json')).default
    const galar_default: any = (await import('~/assets/v1/pokedex/pokedex/Sword_Shield/Sword_Shield.json')).default
    const island_default: any = (await import('~/assets/v1/pokedex/pokedex/Sword_Shield/Sword_Shield.json')).default
    const isle_of_armor_default: any = (await import('~/assets/v1/pokedex/pokedex/Sword_Shield/Sword_Shield.json')).default
    const hisui_default: any = (await import('~/assets/v1/pokedex/pokedex/LegendsArceus/LegendsArceus.json')).default
    const paldea_default: any = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/Scarlet_Violet.json')).default
    const kitakami_default: any = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/Scarlet_Violet.json')).default
    const blueberry_default: any = (await import('~/assets/v1/pokedex/pokedex/Scarlet_Violet/Scarlet_Violet.json')).default

    result = [
      {
        "file": "pokedex.json",
        "update": global_default.update
      },
      {
        "file": "ability.json",
        "update": ability_default.update
      },
      {
        "file": "type.json",
        "update": type_default.update
      },
      {
        "file": "Red_Green_Blue_Pikachu.json",
        "update": kanto_default.update
      },
      {
        "file": "Gold_Silver_Crystal.json",
        "update": johto_default.update
      },
      {
        "file": "Ruby_Sapphire_Emerald.json",
        "update": hoenn_default.update
      },
      {
        "file": "FireRed_LeafGreen.json",
        "update": kanto_frlg_default.update
      },
      {
        "file": "Diamond_Pearl_Platinum.json",
        "update": sinnoh_default.update
      },
      {
        "file": "HeartGold_SoulSilver.json",
        "update": johto_hgss_default.update
      },
      {
        "file": "Black_White.json",
        "update": unova_bw_default.update
      },
      {
        "file": "Black2_White2.json",
        "update": unova_b2w2_default.update
      },
      {
        "file": "X_Y.json",
        "update": central_kalos_default.update
      },
      {
        "file": "X_Y.json",
        "update": coast_kalos_default.update
      },
      {
        "file": "X_Y.json",
        "update": mountain_kalos_default.update
      },
      {
        "file": "Sun_Moon.json",
        "update": alola_sm_default.update
      },
      {
        "file": "UltraSun_UltraMoon.json",
        "update": alola_usum_default.update
      },
      {
        "file": "Sword_Shield.json",
        "update": galar_default.update
      },
      {
        "file": "Sword_Shield.json",
        "update": island_default.update
      },
      {
        "file": "Sword_Shield.json",
        "update": isle_of_armor_default.update
      },
      {
        "file": "LegendsArceus.json",
        "update": hisui_default.update
      },
      {
        "file": "Scarlet_Violet.json",
        "update": paldea_default.update
      },
      {
        "file": "Scarlet_Violet.json",
        "update": kitakami_default.update
      },
      {
        "file": "Scarlet_Violet.json",
        "update": blueberry_default.update
      }
    ]
  }
  return{
    "query": query,
    "result": result,
  }
})