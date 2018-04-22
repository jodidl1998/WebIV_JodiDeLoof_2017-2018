echo off
echo frontend opstarten
cd frontend\deadline-front\src\app
ng serve --proxy-config proxy.conf.json
pause