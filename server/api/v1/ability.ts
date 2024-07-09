export default defineEventHandler(async (event) => {
  // const appConfig = useAppConfig()
  // const global: any = (await import('~/assets/pokedex/v1/pokedex/pokedex.json')).default.pokedex

  const ability: any = (await import('~/assets/pokedex/v1/ability/ability.json')).default.ability
  

  const query: any = getQuery(event)
  let name: number = Number(query.name)
  const area: string = String(query.area)
  const mode: string = String(query.mode)

  let flag = true



  let ver: any
  switch(area)
  {
    case "global":
      break
    case "kanto":
      ver = "Red_Green_Blue_Yellow"
      break
    case "johto":
      ver = "Gold_Silver_Crystal"
      break
    case "hoenn":
      ver = "Ruby_Sapphire_Emerald"
      break
    case "sinnoh":
      ver = "Diamond_Pearl_Platinum"
      break
    case "unova_bw":
      ver = "Black_White"
      break
    case "unova_b2w2":
      ver = "Black2_White2"
      break
    case "central_kalos":
      ver = "X_Y"
      break
    case "coast_kalos":
      ver = "X_Y"
      break
    case "mountain_kalos":
      ver = "X_Y"
      break
    case "alola_sm":
      ver = "Sun_Moon"
      break
    case "alola_usum":
      ver = "UltraSun_UltraMoon"
      break
    case "galar":
      ver = "Sword_Shield"
      break
    case "crown_tundra":
      ver = "Sword_Shield"
      break
    case "isle_of_armor":
      ver = "Sword_Shield"
      break
    case "hisui":
      ver = "LegendsArceus"
      break
    case "paldea":
      ver = "Scarlet_Violet"
      break
    case "kitakami":
      ver = "Scarlet_Violet"
      break
    case "blueberry":
      ver = "Scarlet_Violet"
      break
  }


  let result: any
  if(mode == 'index'){
    result = ability
  }else if(mode == 'details'){
  }else if(mode == 'exists'){
  }
  return{
    "query": query,
    "result": result,
  }
})