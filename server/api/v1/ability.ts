export default defineEventHandler(async (event) => {
  // const appConfig = useAppConfig()
  // const global: any = (await import('~/assets/pokedex/v1/pokedex/pokedex.json')).default.pokedex

  const ability: any = (await import('~/assets/v1/pokedex/ability/ability.json')).default.ability
  

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
      ver = "red_green_blue_pikachu"
      break
    case "johto":
      ver = "gold_silver_crystal"
      break
    case "hoenn":
      ver = "ruby_sapphire_emerald"
      break
    case "sinnoh":
      ver = "diamond_pearl_platinum"
      break
    case "unova_bw":
      ver = "black_white"
      break
    case "unova_b2w2":
      ver = "black2_white2"
      break
    case "central_kalos":
      ver = "x_y"
      break
    case "coast_kalos":
      ver = "x_y"
      break
    case "mountain_kalos":
      ver = "x_y"
      break
    case "alola_sm":
      ver = "sun_moon"
      break
    case "alola_usum":
      ver = "ultrasun_ultramoon"
      break
    case "galar":
      ver = "sword_shield"
      break
    case "crown_tundra":
      ver = "sword_shield"
      break
    case "isle_of_armor":
      ver = "sword_shield"
      break
    case "hisui":
      ver = "legendsarceus"
      break
    case "paldea":
      ver = "scarlet_violet"
      break
    case "kitakami":
      ver = "scarlet_violet"
      break
    case "blueberry":
      ver = "scarlet_violet"
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