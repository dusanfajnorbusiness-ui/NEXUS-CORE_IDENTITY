function Show-ColorfulTree {
    param(
        [string]$Path = ".",  # Cesta k zobrazeniu
        [int]$MaxItems = 100   # Maximálny počet položiek na zobrazenie
    )

    # Paleta farieb pre rôzne typy súborov
    $fileColors = @{
        ".txt"    = "White"
        ".odt"    = "White"
        ".py"     = "White"
        ".c"      = "White"
        ".cpp"    = "White"
        ".cs"     = "White"
        ".md"     = "White"
        ".js"     = "Yellow"
        ".json"   = "Yellow"
        ".java"   = "Yellow"
        ".xls"    = "Green"
        ".xlsx"   = "DarkGreen"
        ".rtf"    = "Green"
        ".html"   = "Red"
        ".css"    = "Red"
        ".scss"   = "DarkRed"
        ".ppt"    = "Magenta"
        ".pptx"   = "Magenta"
        ".doc"    = "Blue"
        ".docx"   = "DarkBlue"
        ".csv"    = "Cyan"
        ".xml"    = "Cyan"
        ".yaml"   = "DarkCyan"
        ".yml"    = "Cyan"
        ".pdf"    = "Blue"
        ".jpg"    = "Gray"      # Farba pre JPG
        ".jpeg"   = "Gray"      # Farba pre JPEG
        ".png"    = "DarkGray"
        ".gif"    = "Black"
        ".zip"    = "Gray"
        ".rar"    = "Gray"
        ".tar"    = "Gray"
        ".tar.gz" = "Gray"
        ".mp3"    = "Black"
        ".wav"    = "Black"
        ".flac"   = "Black"
        ".mp4"    = "Black"
        ".avi"    = "Black"
        ".mkv"    = "Black"
        ".m4v"    = "Black"
        ".mov"    = "Black"
        ".mpeg"   = "Black"
        ".mpg"    = "Black"
        ".wma"    = "Black"
        ".flv"    = "Black"
        ".exe"    = "Black"
        ".svg"    = "Magenta"  # Pridaná farba pre SVG súbory
        ".ts"     = "Cyan"      # Pridaná farba pre TypeScript súbory
        ".tsx"    = "Cyan"      # Pridaná farba pre TypeScript JSX súbory
        ".ps1"    = "Green"     # Pridaná farba pre PowerShell skripty
        ".gitignore" = "Gray"   # Pridaná farba pre gitignore súbory
        default   = "Blue"      # Predvolená farba pre súbory bez prípony
    }

    # Získanie súborov a priečinkov
    $items = Get-ChildItem -Path $Path -Recurse | Where-Object { $_.FullName -notlike "*node_modules*" }

    if ($items.Count -eq 0) {
        Write-Host "Žiadne položky na zobrazenie." -ForegroundColor Yellow
        return
    }

    $groupedItems = $items | Group-Object { $_.Directory.FullName }

    foreach ($group in $groupedItems) {
        Write-Host "📁 |-- [$($group.Name)]"

        $fileCount = 0
        foreach ($item in $group.Group) {
            if ($fileCount -ge $MaxItems) {
                break
            }

            $indentation = "    " * ($item.FullName.Split('\').Count - ($Path.Split('\').Count))
            if ($item.PSIsContainer) {
                Write-Host "$($indentation)📁 |-- [$($item.Name)]"
            } else {
                # Získanie farby na základe prípony súboru
                $color = $fileColors[$item.Extension]

                # Kontrola a priradenie predvolenej farby pre súbory bez prípony
                if (-not $color) {
                    $color = $fileColors["default"]
                }

                # Získanie dátumu poslednej úpravy a vlastníka súboru
                $lastModified = $item.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss")
                $owner = (Get-Acl $item.FullName).Owner

                # Formátovanie výstupu
                Write-Host "$($indentation)📄 | -- $($item.Name) (Size: $([math]::Round($item.Length / 1KB, 2)) KB)" -ForegroundColor $color
                Write-Host "$($indentation)    ➜ Last Modified: $lastModified"
                Write-Host "$($indentation)    ➜ Owner: $owner`n"
            }

            $fileCount++
        }
    }
}

function Copy-FilePaths {
    $filePaths = @()
    
    while ($true) {
        Write-Host "Kliknite pravym tlacidlom mysi na subor v Prieskumnikovi a vyberte 'Kopirovat cestu'."
        Write-Host "Potom sa vratte sem a stlacite Enter."

        Read-Host "Stlacite Enter, ked ste skopirovali cestu suboru."
        $filePath = Get-Clipboard

        if (Test-Path $filePath) {
            $filePaths += $filePath
            Write-Host "Cesta suboru: $filePath"
        } else {
            Write-Host "Neplatna cesta suboru." -ForegroundColor Red
        }

        $continue = Read-Host "Chcete pridat dalsi subor? (ano/nie)"
        if ($continue -ne 'ano') { break }
    }

    # Zobrazenie skopirovanych ciest
    Write-Host "Skopirovane cesty:"
    $filePaths | ForEach-Object { Write-Host $_ }
    
    # Zobrazenie farebného stromu pre skopírované cesty
    foreach ($path in $filePaths) {
        Show-ColorfulTree -Path (Split-Path $path)
    }
}

# Hlavná funkcia
function Main {
    $currentPath = Get-Location
    Show-ColorfulTree -Path $currentPath
    Copy-FilePaths
}

# Spustenie hlavnej funkcie
Main