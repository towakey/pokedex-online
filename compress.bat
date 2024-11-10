@echo off

REM スクリプトのディレクトリを取得
set "script_dir=%~dp0"

REM 圧縮対象のディレクトリ
set "target_dir=%script_dir%.output\public"

REM 出力ZIPファイルのパス
@REM set "zip_file=%script_dir%pokedex.zip"
set "zip_file=%target_dir%\pokedex.zip"

REM PowerShellを使ってディレクトリを圧縮
powershell -command "Compress-Archive -Path '%target_dir%\*' -DestinationPath '%zip_file%' -Force"

echo ZIP圧縮が完了しました: %zip_file%
pause
