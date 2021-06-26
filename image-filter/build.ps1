Copy-Item package.json -Destination www/package.json; 

If(!(test-path ./tmp))
{
      New-Item -ItemType Directory -Force -Path ./tmp
}

Compress-7Zip -Format Zip -Path ./www -ArchiveFileName ./tmp/archive.zip
Move-Item ./tmp/archive.zip -Destination ./www;