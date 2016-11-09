<# Get current directory path #>
$src = (Get-Item -Path ".\" -Verbose).FullName;

<# Iterate all directories present in the current directory path #>
Get-ChildItem $src -directory | where {$_.PsIsContainer} | Select-Object -Property Name | ForEach-Object {
    $cdProjectDir = [string]::Format("cd /d {0}\{1}",$src, $_.Name);

    <# Get project's Web.config file path #>    
    $projectDir = [string]::Format("{0}\{1}\web.config",$src, $_.Name); 
    $fileExists = Test-Path $projectDir;
    
    <# Check project having web.config file #>
    if($fileExists -eq $true){
        <# Start cmd process and execute 'dotnet run' #>
        $params=@("/C"; $cdProjectDir; " && dotnet run"; )
        Start-Process -Verb runas "cmd.exe" $params;
    }
} 