param(
  [switch]$Install
)

$ErrorActionPreference = "Stop"

if ($Install) {
  npm install
}

Write-Host "Starting Carin API on http://localhost:5000 ..." -ForegroundColor Cyan
$env:PORT = "5000"
$env:CARIN_STORAGE = "memory"
$apiProcess = Start-Process -FilePath "npm.cmd" `
  -ArgumentList "run", "dev", "--workspace=@workspace/api-server" `
  -PassThru -NoNewWindow

Start-Sleep -Seconds 2

try {
  Write-Host "Starting Carin web on http://localhost:5173 ..." -ForegroundColor Green
  $env:PORT = "5173"
  $env:BASE_PATH = "/"
  $env:LOCAL_API_PROXY = "1"
  $env:API_PORT = "5000"
  npm run dev --workspace=@workspace/carin
}
finally {
  if ($apiProcess -and -not $apiProcess.HasExited) {
    Stop-Process -Id $apiProcess.Id -Force
  }
}