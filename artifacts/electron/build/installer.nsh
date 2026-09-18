; Preserve the database from pre-persistence builds before electron-builder
; removes the previous install directory during an update. The old builds
; stored database.db beside Equinox.exe; the new build stores it here:
; %APPDATA%\Equinox\equinox-data\database.db
!macro customInit
  StrCpy $0 "$APPDATA\Equinox\equinox-data"
  CreateDirectory "$0"

  ; Never overwrite a database already migrated into the persistent location.
  IfFileExists "$0\database.db" done
  IfFileExists "$INSTDIR\database.db" 0 done

  CopyFiles /SILENT "$INSTDIR\database.db" "$0"
  IfFileExists "$INSTDIR\database.db-wal" 0 +2
    CopyFiles /SILENT "$INSTDIR\database.db-wal" "$0"
  IfFileExists "$INSTDIR\database.db-shm" 0 +2
    CopyFiles /SILENT "$INSTDIR\database.db-shm" "$0"

done:
!macroend
