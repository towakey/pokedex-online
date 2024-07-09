export default defineEventHandler(async (event) => {
  const appConfig = useAppConfig()
  const global: any = (await import('~/assets/pokedex/v1/pokedex/pokedex.json')).default.pokedex

  const ability: any = (await import('~/assets/pokedex/v1/ability/ability.json')).default.ability
  
  const type_json: any = (await import('~/assets/pokedex/v1/type/type.json')).default.type


  const query: any = getQuery(event)
  let id: number = Number(query.id)
  const area: string = String(query.area)
  const mode: string = String(query.mode)

  let flag = true


  let type: []

  let pokedex: any
  let ver: any
  let type_list: any
  let waza: any
  let evolve: any
  waza = {}
  evolve = []
  switch(area)
  {
    case "global":
      break
    case "kanto":
      ver = "Red_Green_Blue_Yellow"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Red_Green_Blue_Yellow/Red_Green_Blue_Yellow.json')).default.pokedex
      type_list = appConfig.type_list['1']
      break
    case "johto":
      ver = "Gold_Silver_Crystal"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Gold_Silver_Crystal/Gold_Silver_Crystal.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "hoenn":
      ver = "Ruby_Sapphire_Emerald"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Ruby_Sapphire_Emerald/Ruby_Sapphire_Emerald.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "sinnoh":
      ver = "Diamond_Pearl_Platinum"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Diamond_Pearl_Platinum/Diamond_Pearl_Platinum.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "unova_bw":
      ver = "Black_White"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Black_White/Black_White.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "unova_b2w2":
      ver = "Black2_White2"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Black2_White2/Black2_White2.json')).default.pokedex
      type_list = appConfig.type_list['2']
      break
    case "central_kalos":
      ver = "X_Y"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/X_Y/X_Y.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "coast_kalos":
      ver = "X_Y"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/X_Y/X_Y.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "mountain_kalos":
      ver = "X_Y"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/X_Y/X_Y.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "alola_sm":
      ver = "Sun_Moon"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Sun_Moon/Sun_Moon.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "alola_usum":
      ver = "UltraSun_UltraMoon"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/UltraSun_UltraMoon/UltraSun_UltraMoon.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "galar":
      ver = "Sword_Shield"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Sword_Shield/Sword_Shield.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "crown_tundra":
      ver = "Sword_Shield"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Sword_Shield/Sword_Shield.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "isle_of_armor":
      ver = "Sword_Shield"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Sword_Shield/Sword_Shield.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "hisui":
      ver = "LegendsArceus"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/LegendsArceus/LegendsArceus.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "paldea":
      ver = "Scarlet_Violet"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Scarlet_Violet/Scarlet_Violet.json')).default.pokedex
      type_list = appConfig.type_list['3']
      try {
        waza = (await import('~/assets/pokedex/v1/pokedex/Scarlet_Violet/waza.json')).default.waza.paldea
      }catch(e){
        waza = {}
      }
      try {
        // console.log("evolve found")

        // evolve = {}
        evolve = (await import('~/assets/pokedex/v1/pokedex/Scarlet_Violet/evolve.json')).default.evolve.paldea
      }catch(e){
        // console.log("evolve not found")
        evolve = []
      }
      break
    case "kitakami":
      ver = "Scarlet_Violet"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Scarlet_Violet/Scarlet_Violet.json')).default.pokedex
      type_list = appConfig.type_list['3']
      break
    case "blueberry":
      ver = "Scarlet_Violet"
      pokedex = (await import('~/assets/pokedex/v1/pokedex/Scarlet_Violet/Scarlet_Violet.json')).default.pokedex
      type_list = appConfig.type_list['3']
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
      result.forEach(pokemon => {
        pokemon["no"] = pokemon["id"]
        pokemon["globalNo"] = pokemon["id"]
        pokemon["status"] = []
        pokemon["status"].push({"name": pokemon["name"]})
      });
    }
    else
    {
      result = pokedex[appConfig.pokedex_eng2jpn[area]]
      result.forEach(pokemon => {
        pokemon["status"].forEach(status => {
          global[pokemon["globalNo"] - 1][""].forEach(normal => {
            if(status.form == normal.form)
            {
              status["name"] = global[pokemon["globalNo"] - 1].name
              Object.keys(normal).forEach((key) => {
                status[key] = normal[key]
              })
            }
          })
          if(global[pokemon["globalNo"] - 1].mega_evolution)
          {
            global[pokemon["globalNo"] - 1]["mega_evolution"].forEach(normal => {
              if(status.form == normal.name.jpn)
              {
                Object.keys(normal).forEach((key) => {
                  status[key] = normal[key]
                })
              }
            })
          }
          if(global[pokemon["globalNo"] - 1].gigantamax)
          {
            global[pokemon["globalNo"] - 1]["gigantamax"].forEach(normal => {
              status["name"] = global[pokemon["globalNo"] - 1].name
              if(status.form == normal.form)
              {
                Object.keys(normal).forEach((key) => {
                  status[key] = normal[key]
                })
              }
            })
          }
          if(global[pokemon["globalNo"] - 1].region_form)
          {
            global[pokemon["globalNo"] - 1]["region_form"].forEach(normal => {
              status["name"] = global[pokemon["globalNo"] - 1].name
              if(status.form == normal.form)
              {
                Object.keys(normal).forEach((key) => {
                  status[key] = normal[key]
                })
              }
            })
          }
  
        })
      })
    }
  }else if(mode == 'details'){
    if(flag)
    {
      if(area == 'global')
      {
        // console.log(area+'=>'+String(id))
        if( 0 <= id && id < global.length)
        {
          result = global[id]
          result["no"] = id+1
          result["globalNo"] = id+1
        }
        // result["status"] = []
        // result["status"].push(
        //   {
        //     "name": pokemon["name"]
        //     "classification": 
        //   }
        // )
  
      }
      else
      {
        result = pokedex[appConfig.pokedex_eng2jpn[area]][id]
        result["name"] = global[result["globalNo"] - 1]["name"]

        result["status"].forEach(status => {
          status["type_compatibility"] = {}
          type_list.forEach(val => {
            if(status["type2"] == "")
            {
              status["type_compatibility"][val] = String(Number(type[val][status["type1"]]))
            }
            else
            {
              status["type_compatibility"][val] = String(Number(type[val][status["type1"]])) * String(Number(type[val][status["type2"]]))
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

          global[result["globalNo"] - 1][""].forEach(normal => {
            if(status.form == normal.form)
            {
              status["name"] = global[result["globalNo"] - 1].name
              Object.keys(normal).forEach((key) => {
                status[key] = normal[key]
              })
            }
          })
          if(global[result["globalNo"] - 1].mega_evolution)
          {
            global[result["globalNo"] - 1]["mega_evolution"].forEach(normal => {
              if(status.form == normal.name.jpn)
              {
                Object.keys(normal).forEach((key) => {
                  status[key] = normal[key]
                })
              }
            })
          }
          if(global[result["globalNo"] - 1].gigantamax)
          {
            global[result["globalNo"] - 1]["gigantamax"].forEach(normal => {
              if(status.form == normal.form)
              {
                Object.keys(normal).forEach((key) => {
                  status[key] = normal[key]
                })
              }
            })
          }
          if(global[result["globalNo"] - 1].region_form)
          {
            global[result["globalNo"] - 1]["region_form"].forEach(normal => {
              status["name"] = global[result["globalNo"] - 1].name
              if(status.form == normal.form)
              {
                Object.keys(normal).forEach((key) => {
                  status[key] = normal[key]
                })
              }
            })
          }

          if(Object.keys(waza).length > 0){
            // console.log(Object.keys(waza).length)
            // status["waza"] = waza[id]
            // console.log(id+1)
            status["waza"] = waza[id+1][status.form]
          }

          // status["evolve"] = {}
          if(Object.keys(evolve).length > 0){
            if(Object.keys(evolve["進化先"][id+1][status.form]).length > 0){
              status["evolve"] = evolve["進化先"][id+1][status.form]
              // console.log(Object.keys(status["evolve"]))
              // for(let val in evolve["進化先"][id+1][status.form]){
              for(let val in Object.keys(status["evolve"])){
                status["evolve"][val]["globalNo"] = pokedex[appConfig.pokedex_eng2jpn[area]][Number(Object.keys(evolve["進化先"][id+1][status.form][val])[0]) - 1]["globalNo"]
                status["evolve"][val]["name"] = global[status["evolve"][val]["globalNo"]-1]["name"]
                // console.log(Object.keys(evolve["進化先"][id+1][status.form][val])[0])
              }
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
    // console.log(pokedex[appConfig.pokedex_eng2jpn[area]])
    // console.log(area+'=>'+String(id))
    // result = false
    result = 0
    pokedex[appConfig.pokedex_eng2jpn[area]].forEach(pokemon => {
      // if(pokemon[id]["globalNo"] == id) result = true
      // if(pokemon.globalNo == id + 1) console.log(pokemon)
      if(pokemon.globalNo == id + 1){
        // result = true
        result = pokemon.no
      }
    });
  }
  return{
    "query": query,
    "result": result,
  }
})