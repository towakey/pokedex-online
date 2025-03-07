export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()
  const global: any = (await import('~/assets/v1/pokedex/pokedex/pokedex.json')).default.pokedex

  const ability: any = (await import('~/assets/v1/pokedex/ability/ability.json')).default.ability
  
  const type_json: any = (await import('~/assets/v1/pokedex/type/type.json')).default.type


  const query: any = getQuery(event)
  let id: number = typeof query.id === 'string' ? query.id : 0
  const area: string = typeof query.area === 'string' ? query.area : 'null'
  const mode: string = typeof query.mode === 'string' ? query.mode : 'null'

  let flag = true


  let type: []

  let pokedex: any
  let ver: any
  let type_list: any
  let waza: any
  let waza_machine: any
  let evolve: any
  waza = {}
  evolve = []
  
  switch(area)
  {
    case "global":
      break
    case "kanto":
      ver = "Red_Green_Blue_Yellow"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Red_Green_Blue_Yellow/Red_Green_Blue_Yellow.json')).default.pokedex
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
    case "sinnoh":
      ver = "Diamond_Pearl_Platinum"
      pokedex = (await import('~/assets/v1/pokedex/pokedex/Diamond_Pearl_Platinum/Diamond_Pearl_Platinum.json')).default.pokedex
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
          global[pokemon["globalNo"] - 1]["form"].forEach((normal: any) => {
            if(status.form == normal.form && status.region == normal.region && status.mega_evolution == normal.mega_evolution && status.gigantamax == normal.gigantamax)
              {
              status["name"] = global[pokemon["globalNo"] - 1].name
              Object.keys(normal).forEach((key) => {
                status[key] = normal[key]
              })
            }
          })
          // global[pokemon["globalNo"] - 1][""].forEach(normal => {
          //   if(status.form == normal.form)
          //   {
          //     status["name"] = global[pokemon["globalNo"] - 1].name
          //     Object.keys(normal).forEach((key) => {
          //       status[key] = normal[key]
          //     })
          //   }
          // })
          // if(global[pokemon["globalNo"] - 1].mega_evolution)
          // {
          //   global[pokemon["globalNo"] - 1]["mega_evolution"].forEach(normal => {
          //     if(status.form == normal.name.jpn)
          //     {
          //       Object.keys(normal).forEach((key) => {
          //         status[key] = normal[key]
          //       })
          //     }
          //   })
          // }
          // // if(global[pokemon["globalNo"] - 1].gigantamax)
          // // {
          // //   global[pokemon["globalNo"] - 1]["gigantamax"].forEach(normal => {
          // //     if(status.form == normal.form)
          // //     {
          // //       status["name"] = global[pokemon["globalNo"] - 1].name
          // //       Object.keys(normal).forEach((key) => {
          // //         status[key] = normal[key]
          // //       })
          // //     }
          // //   })
          // // }
          // if(global[pokemon["globalNo"] - 1].region_form)
          // {
          //   global[pokemon["globalNo"] - 1]["region_form"].forEach(normal => {
          //     status["name"] = global[pokemon["globalNo"] - 1].name
          //     if(status.form == normal.form)
          //     {
          //       Object.keys(normal).forEach((key) => {
          //         status[key] = normal[key]
          //       })
          //     }
          //   })
          // }
  
        })
      })
    }
  }else if(mode == 'details'){
    result = []
    if(flag)
    {
      if(area == 'global')
      {
        if( 0 <= id && id < global.length)
        {
          result = global[id]
          result["no"] = id+1
          result["globalNo"] = id+1
        }
      }
      else
      {
        result = pokedex[appConfig.pokedex_eng2jpn[area]][id]
        result["name"] = global[result["globalNo"] - 1]["name"]

        result["status"].forEach((status: any) => {
          status["type_compatibility"] = {}
          type_list.forEach((val: any) => {
            if(status["type2"] == "")
            {
              status["type_compatibility"][val] = String(Number(type[val][status["type1"]]))
            }
            else
            {
              status["type_compatibility"][val] = String(Number(type[val][status["type1"]]) * Number(type[val][status["type2"]]))
            }
          })
          if(status["ability1"] != "")
          {
            status["ability1_description"] = ability[status["ability1"]][ver]
          }
          else
          {
            status["ability1_description"] = ""
          }

          if(status["ability2"] != "")
          {
            status["ability2_description"] = ability[status["ability2"]][ver]
          }
          else
          {
            status["ability2_description"] = ""
          }

          if(status["dream_ability"] != "")
          {
            status["dream_ability_description"] = ability[status["dream_ability"]][ver]
          }
          else
          {
            status["dream_ability_description"] = ""
          }

          global[result["globalNo"] - 1]["form"].forEach((normal: any) => {
            Object.keys(normal).forEach((key: any) => {
              if(status.form == normal.form && status.region == normal.region && status.mega_evolution == normal.mega_evolution && status.gigantamax == normal.gigantamax)
              {
                status[key] = normal[key]
                if(normal.hasOwnProperty("name"))
                  {
                    status["name"] = normal.name
                  }
                  else
                  {
                    status["name"] = global[result["globalNo"] - 1].name
                  }
                  console.log(status["name"])
              }
            })
          })
          // global[result["globalNo"] - 1][""].forEach(normal => {
          //   if(status.form == normal.form)
          //   {
          //     status["name"] = global[result["globalNo"] - 1].name
          //     Object.keys(normal).forEach((key) => {
          //       status[key] = normal[key]
          //     })
          //   }
          // })
          // if(global[result["globalNo"] - 1].mega_evolution)
          // {
          //   global[result["globalNo"] - 1]["mega_evolution"].forEach(normal => {
          //     if(status.form == normal.name.jpn)
          //     {
          //       Object.keys(normal).forEach((key) => {
          //         status[key] = normal[key]
          //       })
          //     }
          //   })
          // }
          // if(global[result["globalNo"] - 1].gigantamax)
          // {
          //   global[result["globalNo"] - 1]["gigantamax"].forEach(normal => {
          //     if(status.form == normal.form)
          //     {
          //       Object.keys(normal).forEach((key) => {
          //         status[key] = normal[key]
          //       })
          //     }
          //   })
          // }
          // if(global[result["globalNo"] - 1].region_form)
          // {
          //   global[result["globalNo"] - 1]["region_form"].forEach(normal => {
          //     status["name"] = global[result["globalNo"] - 1].name
          //     if(status.form == normal.form)
          //     {
          //       Object.keys(normal).forEach((key) => {
          //         status[key] = normal[key]
          //       })
          //     }
          //   })
          // }

          if(Object.keys(waza).length > 0 && waza[id+1] !== undefined){
          // if(Object.keys(waza).length > 0){
            if(waza[id+1][status.form] !== undefined){
              // console.log("status.form")
              if(Array.isArray(waza[id+1][status.form]["わざマシン"])) {
                waza[id+1][status.form]["わざマシン"] = waza[id+1][status.form]["わざマシン"].reduce(
                  (acc: any, key: any) => {
                    acc[key] = waza_machine[key]
                    return acc;
                  },
                  {} as { [key: string]: string }
                )
              }
              status["waza"] = waza[id+1][status.form]
            }
            if(waza[id+1][status.region] !== undefined){
              // console.log("status.region")
              if(Array.isArray(waza[id+1][status.region]["わざマシン"])) {
                waza[id+1][status.region]["わざマシン"] = waza[id+1][status.region]["わざマシン"].reduce(
                  (acc: any, key: any) => {
                    acc[key] = waza_machine[key]
                    return acc;
                  },
                  {} as { [key: string]: string }
                )
              }
              status["waza"] = waza[id+1][status.region]
            }
          }
          // status["evolve"] = {}
          if(Object.keys(evolve).length > 0 && evolve["進化先"] && evolve["進化先"][id+1] !== undefined){
            if(status.form && evolve["進化先"][id+1][status.form] && Object.keys(evolve["進化先"][id+1][status.form]).length > 0){
              console.log(evolve["進化先"][id+1][status.form])
              status["evolve"] = evolve["進化先"][id+1][status.form]
              // Object.keys()は配列を返すので、for...inではなくforEachを使用
              Object.keys(status["evolve"]).forEach(val => {
                  if(evolve["進化先"][id+1][status.form][val] && Object.keys(evolve["進化先"][id+1][status.form][val]).length > 0) {
                      status["evolve"][val]["globalNo"] = pokedex[appConfig.pokedex_eng2jpn[area]][Number(Object.keys(evolve["進化先"][id+1][status.form][val])[0]) - 1]["globalNo"]
                      status["evolve"][val]["name"] = global[status["evolve"][val]["globalNo"]-1]["name"]
                  }
              })
            }
          }
        })
      }
    }
    else
    {
      result = false
    }
  }else if(mode == 'exists'){
    // result = false
    result = -1
    pokedex[appConfig.pokedex_eng2jpn[area]].forEach((pokemon: any) => {
      // if(pokemon[id]["globalNo"] == id) result = true
      if(area != 'unova_bw' && area != 'unova_b2w2')
      {
        if(pokemon.globalNo == id + 1){
          // result = true
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
    const kanto_default: any = (await import('~/assets/v1/pokedex/pokedex/Red_Green_Blue_Yellow/Red_Green_Blue_Yellow.json')).default
    const johto_default: any = (await import('~/assets/v1/pokedex/pokedex/Gold_Silver_Crystal/Gold_Silver_Crystal.json')).default
    const hoenn_default: any = (await import('~/assets/v1/pokedex/pokedex/Ruby_Sapphire_Emerald/Ruby_Sapphire_Emerald.json')).default
    const sinnoh_default: any = (await import('~/assets/v1/pokedex/pokedex/Diamond_Pearl_Platinum/Diamond_Pearl_Platinum.json')).default
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
        "file": "Red_Green_Blue_Yellow.json",
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
        "file": "Diamond_Pearl_Platinum.json",
        "update": sinnoh_default.update
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