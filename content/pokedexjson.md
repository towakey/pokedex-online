---
title: pokedex.jsonについて
---

# pokedex.jsonについて

ポケモン情報のデータセットを作っています。   
Githubリポジトリはこちら => https://github.com/towakey/pokedex  
連絡はTwitterID @kyoswin7までよろしくお願い致します。  

### pokedex.json
```
{
  "update": "20250313",
  "pokedex": [
    {
      "no": [全国図鑑No],
      "name": {
        "jpn": "日本語名",
        "eng": "英語名",
        "ger": "ドイツ語名",
        "fra": "フランス語名",
        "kor": "韓国語名",
        "chs": "中国語名(簡体字)",
        "cht": "中国語名(繁體字)"
      },
      "form": [
        {
          "form": "フォルム名",
          "region": "リージョン名",
          "mega_evolution": "メガシンカ名",
          "gigantamax": "キョダイマックス名",
          "classification": "分類",
          "height": "高さ",
          "weight": "重さ"
        }
      ]
    },
    ...
  ]
}
```

### バージョン名/バージョン名.json
```
{
  "update": "20250107",
  "game_version": "Red_Green_Blue_Yellow",
  "pokedex": {
    "カントー図鑑": [
      {
        "no": "図鑑No",
        "globalNo": "全国図鑑No",
        "status": [
          {
            "form": "フォルム名",
            "region": "リージョン名",
            "mega_evolution": "メガシンカ名",
            "gigantamax": "キョダイマックス名",
            "type1": "タイプ1",
            "type2": "タイプ2",
            "hp": "HP",
            "attack": "こうげき",
            "defense": "ぼうぎょ",
            "special_attack": "とくこう",
            "special_defense": "とくぼう",
            "speed": "すばやさ",
            "ability1": "とくせい1",
            "ability2": "とくせい2",
            "dream_ability": "ゆめとくせい",
            "description": {
                "red": "図鑑説明",
                "green": "図鑑説明",
                "blue": "図鑑説明",
                "pikachu": "図鑑説明"
            }
          }
        ]
      },
      ...
    ]
  }
}
```

### type.json
```
[
    {
        "game_version" 
        [
            "バージョン名"
            ...
        ]
        "type" => 
            "タイプ1"
            {
                "タイプA" => タイプ1とタイプAとの相性
                "タイプB" => タイプ1とタイプBとの相性
                ...
            }
            "タイプ2"
            {
                "タイプA" => タイプ2とタイプAとの相性
                "タイプB" => タイプ2とタイプBとの相性
                ...
            }
            ...
    }
]
```

### ability.json
```
{
    "とくせい名" => 
    {
        "バージョン名" => とくせい説明
    }
}
```

### バージョン名/waza.json
```
{
  "update": "202501041252",
  "game_version": "Red_Green_Blue_Yellow",
  "waza": {
    "red": {
      "1": {
        "globalNo": "1",
        "": {
          "": [
            "たいあたり",
            "なきごえ"
          ],
          "思い出し": [
          ],
          "進化時": [
          ],
          "7": [
            "やどぎりのタネ"
          ],
          ...
          "わざマシン": [
            "わざマシン1",
            "わざマシン2"
            ...
          ]
        }
      },
      ...
    }
  }
}
```

### バージョン名/waza_mashin.json
```
{
  "version": "2.0.0",
  "update": "202503162311",
  "game_version": "Red_Green_Blue_Yellow",
  "waza_machine": {
    "わざマシン1": "メガトンパンチ",
    "わざマシン2": "かまいたち",
    "わざマシン3": "つるぎのまい",
    "わざマシン4": "ふきとばし",
    "わざマシン5": "メガトンキック",
    ...
  }
}
```

### バージョン名/evolve.json
```
{
  "update": "202407032326",
  "game_version": "Red_Green_Blue_Yellow",
  "evolve": {
    "kanto": {
      "進化先": {
        "1": {
          "globalNo": "1",
          "": [
            {
              "2": "LV16"
            }
          ]
        },
        ...
      }
    }
  }
}
```