---
title: pokedex.jsonについて
---

# pokedex.jsonについて

ポケモンの基礎情報をプログラムとして使用しやすいようにJSONとしてまとめています。   
編集に協力していただける方を募集しています。  
Githubリポジトリはこちら => https://github.com/towakey/pokedex  
連絡はTwitterID @kyoswin7までよろしくお願い致します。  
現在まとめているのは下記になります。  

### pokedex.json
```
[
    {
        "id" => 全国図鑑No
        "name" =>
        {
            "jpn" => 日本語名
            "eng" => 英語名
            "ger" => ドイツ語名
            "fra" => フランス語名
            "kor" => 韓国語名
            "chs" => 中国語名(簡体字)
            "cht" => 中国語名(繁体字)
        }
        "" =>
        {
            {
                "form": => フォルム等の名前
                "classification" => 分類
                "height" => 高さ
                "weight" => 重さ
            }
        }
        "region_form" =>
        {
            {
                "form": => リージョンフォーム地域名
                "classification" => 分類
                "height" => 高さ
                "weight" => 重さ
            }
        }
        "mega_evolution" =>
        {
            {
                "form": => メガシンカ
                "name" => 
                {
                    "jpn" => メガシンカ日本語名
                    "eng" => メガシンカ英語名
                }
                "classification" => 分類
                "height" => 高さ
                "weight" => 重さ
            }
        }
        "gigantamax" =>
        {
            {
                "form": => キョダイマックス
                "name" => 
                {
                    "jpn" => キョダイマックス日本語名
                    "eng" => キョダイマックス英語名
                }
                "classification" => 分類
                "height" => 高さ
                "weight" => 重さ
            }
        }
    }
]
```

### バージョン名/バージョン名.json
```
[
    {
        "no" => 図鑑No
        "globalNo" => 全国図鑑No
        "status" =>
        {
            "form" => 空白またはフォルム名または(地域名)のすがたまたはメガシンカ名またはキョダイマックス
            "type1" => タイプ1
            "type2" => タイプ2
            "hp" => HP
            "attack" => こうげき
            "defense" => ぼうぎょ
            "special_attack" => とくこう
            "special_defense" => とくぼう
            "speed" => すばやさ
            "ability1" => とくせい1
            "ability1" => とくせい2
            "dream_ability" => ゆめとくせい
            "description" => 
            {
                "バージョン1" => 図鑑説明
                "バージョン2" => 図鑑説明
            }
        }
    }
]
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