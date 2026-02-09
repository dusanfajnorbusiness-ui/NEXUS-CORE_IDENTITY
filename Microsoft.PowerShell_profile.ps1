# ===============================================================
#   Powered by AI POWERSHELL PROFILE with Dusan Fajnor
# ===============================================================

# DEKORACIE
function l { Write-Host ("=" * 65) -ForegroundColor Cyan }
function sep { Write-Host ("-" * 65) -ForegroundColor Gray; Write-Host "" }

# ODSADENIE
function indent {
    param([string]$text)
    Write-Host "   $text" -ForegroundColor White
}

# STATS
$Global:SessionStart = Get-Date
$Global:CommandCount = 0

function prompt {
    $Global:CommandCount++
    "PS $($executionContext.SessionState.Path.CurrentLocation)$('>' * ($nestedPromptLevel + 1)) "
}

# ===============================================================
#   Funkcie pre search-files
# ===============================================================
function search-files {
    param([string]$query)
    Get-ChildItem -Recurse -Filter "*$query*" -ErrorAction SilentlyContinue | Select-Object Name, FullName, LastWriteTime
}

function search-files-by-size {
    param([int]$minMB)
    Get-ChildItem -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Length -gt ($minMB * 1MB) } | Select-Object Name, @{Name="Size(MB)";Expression={"{0:N2}" -f ($_.Length / 1MB)}}, FullName
}

function search-files-by-date {
    param([int]$days)
    $refDate = (Get-Date).AddDays(-$days)
    Get-ChildItem -Recurse -ErrorAction SilentlyContinue | Where-Object { $_.LastWriteTime -gt $refDate } | Select-Object Name, LastWriteTime, FullName
}

# ===============================================================
#   Funkcie pre správu priečinkov
# ===============================================================
function show-directory-structure {
    tree /f
}

function show-directory-structure-unique {
    Get-ChildItem -Directory -Recurse | Select-Object FullName -Unique
}

function Get-UniqueFileExtensions {
    Get-ChildItem -Recurse -File | Select-Object -ExpandProperty Extension -Unique | Sort-Object
}

function Show-DirectoryStructureWithFilter {
    param([string]$filter)
    Get-ChildItem -Recurse -Filter $filter | Select-Object FullName
}

# ===============================================================
#   Funkcie pre zálohovanie
# ===============================================================
function backup-files {
    param([string]$source, [string]$destination)
    if (!(Test-Path $destination)) { New-Item -ItemType Directory -Path $destination }
    Copy-Item -Path "$source\*" -Destination $destination -Recurse -Force
    Write-Host "Záloha dokončená: $source -> $destination" -ForegroundColor Green
}

# ===============================================================
#   Funkcie pre systémový status a históriu
# ===============================================================
function Get-FolderInfo {
    $files = Get-ChildItem -File
    $dirs = Get-ChildItem -Directory
    Write-Host "Súbory: $($files.Count) | Priečinky: $($dirs.Count)" -ForegroundColor Cyan
}

function stats {
    $uptime = (Get-Date) - $Global:SessionStart
    l
    Write-Host " SESSION STATS" -ForegroundColor Yellow
    sep
    Write-Host " Start:    $Global:SessionStart"
    Write-Host " Uptime:   $($uptime.Minutes)m $($uptime.Seconds)s"
    Write-Host " Príkazy:  $Global:CommandCount"
    l
}

function history { Get-History | Select-Object -Last 20 CommandLine }

function status {
    l
    Write-Host " SYSTEM STATUS - NEXUS CORE" -ForegroundColor Green
    sep
    Write-Host " User:      $env:USERNAME"
    Write-Host " Machine:   $env:COMPUTERNAME"
    Write-Host " OS:        $((Get-WmiObject Win32_OperatingSystem).Caption)"
    Write-Host " Date:      $(Get-Date -Format 'dd.MM.yyyy HH:mm')"
    l
}

# ===============================================================
#   NAVIGACIA
# ===============================================================
function proj.v2 { Set-Location "$env:USERPROFILE\OneDrive\Dokumenty\GitHub\Projekt-Nexus_v2"; indent "Switched to Project Nexus" }
function proj.dash { Set-Location "$env:USERPROFILE\OneDrive\Dokumenty\GitHub\Projekt-Nexus_v2\1-DASHBOARD-NEXUS"; indent "Switched to Dashboard" }
function proj.dash.v2 { Set-Location "$env:USERPROFILE\OneDrive\Dokumenty\GitHub\Projekt-Nexus_v2\1-DASHBOARD-NEXUS-v2"; indent "Switched to Dashboard v2" }
function proj.app { Set-Location "$env:USERPROFILE\OneDrive\Dokumenty\GitHub\Projekt-Nexus_v2\2-APP-MiniHabitTracker"; indent "Switched to App Folder" }
function proj.web { Set-Location "$env:USERPROFILE\OneDrive\Dokumenty\GitHub\Projekt-Nexus_v2\3-WEB-UISpace"; indent "Switched to Web Folder" }
function proj.YT { Set-Location "$env:USERPROFILE\OneDrive\Dokumenty\GitHub\Projekt-Nexus_v2\4-YOUTUBE-Gaming"; indent "Switched to YT Folder" }
function proj.desk { Set-Location "$env:USERPROFILE\OneDrive\Dokumenty\GitHub\Projekt-Nexus_v2\5-DESKTOP"; indent "Switched to Desktop Project" }
function github { Set-Location "$env:USERPROFILE\OneDrive\Dokumenty\GitHub"; indent "Switched to GitHub Root" }
function doc { Set-Location "$env:USERPROFILE\OneDrive\Dokumenty"; indent "Switched to Documents" }
function desk { Set-Location "$env:USERPROFILE\Desktop"; indent "Desktop" }

# ===============================================================
#   GIT ALIASY
# ===============================================================
function Get-GitStatus { git status }
function Add-GitAll { git add . }
function Push-Git { git push }
function Get-GitPull { git pull }
function gcm { param($msg) git commit -m $msg }
function glog { git log --oneline -10 }

Set-Alias -Name gst -Value Get-GitStatus
Set-Alias -Name ga -Value Add-GitAll
Set-Alias -Name gp -Value Push-Git
Set-Alias -Name gpl -Value Get-GitPull

# ===============================================================
#   Funkcia pre zobrazenie dostupných prikazov
# ===============================================================
function zoznamPrikazov {
    l
    Write-Host " AI POWERSHELL PROFILE - COMMAND CENTER " -ForegroundColor Cyan
    sep
    Write-Host " treeDefault       - Zobrazí strom súborov" -ForegroundColor White
    Write-Host " search-files      - Vyhľadá súbory" -ForegroundColor Yellow
    Write-Host " status            - Systémový status" -ForegroundColor Magenta
    Write-Host " stats             - Štatistiky relácie" -ForegroundColor Magenta
    Write-Host " proj.v2 / proj.YT - Rýchla navigácia" -ForegroundColor Green
    Write-Host " ga / gcm / gp     - Git automatizácia" -ForegroundColor Blue
    l
}

# INIT MESSAGE
Clear-Host
Write-Host "NEXUS-CORE POWERSHELL PROFILE LOADED" -ForegroundColor Green
Write-Host "Zadajte 'zoznamPrikazov' pre zoznam funkcii." -ForegroundColor Cyan
l