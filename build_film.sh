#!/usr/bin/env bash
set -e

if [ -f "clips/clip6_contact.mp4" ]; then
  echo "Building seamless 6-clip master film from clips/ folder..."
  ffmpeg -y -v warning \
    -i "clips/clip1_home.mp4" \
    -i "clips/clip2_about.mp4" \
    -i "clips/clip3_skills.mp4" \
    -i "clips/clip4_work.mp4" \
    -i "clips/clip5_resume.mp4" \
    -i "clips/clip6_contact.mp4" \
    -filter_complex "[0:v]setpts=PTS-STARTPTS,fps=24,format=yuv420p[v0];[1:v]setpts=PTS-STARTPTS,fps=24,format=yuv420p[v1];[2:v]setpts=PTS-STARTPTS,fps=24,format=yuv420p[v2];[3:v]setpts=PTS-STARTPTS,fps=24,format=yuv420p[v3];[4:v]setpts=PTS-STARTPTS,fps=24,format=yuv420p[v4];[5:v]trim=start=0.80:end=3.60,setpts=PTS-STARTPTS,fps=24,format=yuv420p[v5];[v0][v1]xfade=transition=fade:duration=0.12:offset=3.797[x01];[x01][v2]xfade=transition=fadeblack:duration=0.35:offset=7.363[x02];[x02][v3]xfade=transition=fadeblack:duration=0.40:offset=10.800[x03];[x03][v4]xfade=transition=fade:duration=0.20:offset=16.517[x04];[x04][v5]xfade=transition=fadeblack:duration=0.35:offset=20.083,drawbox=x=iw-240:y=ih-240:w=240:h=240:color=black:t=fill,colorlevels=rimin=0.045:gimin=0.045:bimin=0.045[outv]" \
    -map "[outv]" -c:v libx264 -crf 17 -pix_fmt yuv420p -an film_master.mp4
else
  if [ ! -f "raw_film.mp4" ]; then
    echo "ERROR: Put clips in clips/ (clip1_home.mp4 - clip6_contact.mp4) or raw_film.mp4 in root"
    exit 1
  fi
  ffmpeg -y -i raw_film.mp4 \
    -vf "drawbox=x=iw-240:y=ih-240:w=240:h=240:color=black:t=fill,colorlevels=rimin=0.045:gimin=0.045:bimin=0.045" \
    -c:v libx264 -crf 17 -an film_master.mp4
fi

mkdir -p site/media

ffmpeg -y -v warning -i film_master.mp4 -vf "scale=1920:-2:flags=lanczos" -c:v libx264 -g 1 -crf 21 -pix_fmt yuv420p -movflags +faststart -an site/media/film.mp4
ffmpeg -y -v warning -i film_master.mp4 -vf "scale=1440:-2:flags=lanczos" -c:v libx264 -preset slow -g 1 -crf 20 -pix_fmt yuv420p -movflags +faststart -an site/media/film_mobile.mp4
ffmpeg -y -v warning -i film_master.mp4 -frames:v 1 -update 1 -vf "format=yuvj420p" -q:v 2 site/media/poster.jpg

echo "DONE! Run: npx serve site"
