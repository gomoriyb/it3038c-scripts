function getIP{
    (Get-NetIPAddress).IPv4Address | Select-String "192*"
}
function getDayOfWeek{
    (Get-Date).DayOfWeek
}
function getYear{
    (Get-Date).Year
}
function getMonth{
    (Get-Date).Month
}
function getDay{
    (Get-Date).Day
}
$IP = getIP
$User = $env:USERNAME
$Hostname = $env:USERDOMAIN
$PowerShellMajorVersion = $Host.Version.Major
$DayOfWeek = getDayOfWeek
$Year = getYear
$Month = getMonth
$Day = getDay
$Body = "This machine's IP is $IP. User is $User. Hostname is $Hostname. PowerShell Version is $PowerShellMajorVersion. Today's date is $DayOfWeek, $Month/$Day/$Year."
$Body | out-file C:\it3038c-scripts\powershell\script_output.txt
Write-Host($Body)