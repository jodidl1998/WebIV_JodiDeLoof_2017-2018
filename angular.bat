echo off
echo frontend opstarten
cd frontend\src\app
ng serve --proxy-config proxy.conf.json
pause