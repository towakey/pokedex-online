@echo off

REM �X�N���v�g�̃f�B���N�g�����擾
set "script_dir=%~dp0"

REM ���k�Ώۂ̃f�B���N�g��
set "target_dir=%script_dir%.output\public"

REM �o��ZIP�t�@�C���̃p�X
@REM set "zip_file=%script_dir%pokedex.zip"
set "zip_file=%target_dir%\pokedex.zip"

REM PowerShell���g���ăf�B���N�g�������k
powershell -command "Compress-Archive -Path '%target_dir%\*' -DestinationPath '%zip_file%' -Force"

echo ZIP���k���������܂���: %zip_file%
pause
