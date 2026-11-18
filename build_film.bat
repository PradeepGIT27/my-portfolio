@echo off
setlocal
echo === Preparing Cinematic Portfolio Film ===

if exist "clips\clip1.mp4" (
  echo Concatenating clips from clips\ folder...
  (for %%i in (clips\clip*.mp4) do @echo file '%%i') > clips_list.txt
  ffmpeg -y -f concat -safe 0 -i clips_list.txt -c copy raw_film.mp4
  del clips_list.txt
)

if not exist "raw_film.mp4" (
  echo ERROR: Put your combined video in this folder as raw_film.mp4 or put clip1.mp4, clip2.mp4... in clips\
  pause
  exit /b 1
)

if not exist "site\media" mkdir "site\media"

echo [1/4] Removing bottom-right watermark and crushing dark greys to pure black...
ffmpeg -y -i raw_film.mp4 -vf "drawbox=x=iw-240:y=ih-240:w=240:h=240:color=black:t=fill,colorlevels=rimin=0.045:gimin=0.045:bimin=0.045" -c:v libx264 -crf 17 -an film_master.mp4

echo [2/4] Building desktop web video (1080p crisp, every frame keyframe)...
ffmpeg -y -i film_master.mp4 -vf "scale=1920:-2:flags=lanczos" -c:v libx264 -g 1 -crf 19 -pix_fmt yuv420p -movflags +faststart -an site\media\film.mp4

echo [3/4] Building mobile web video (854px, every frame keyframe)...
ffmpeg -y -i film_master.mp4 -vf "scale=854:-2" -c:v libx264 -g 1 -crf 27 -pix_fmt yuv420p -movflags +faststart -an site\media\film_mobile.mp4

echo [4/4] Extracting poster frame...
ffmpeg -y -i film_master.mp4 -frames:v 1 -q:v 2 site\media\poster.jpg

echo.
echo DONE! Now run: npx serve site
pause
