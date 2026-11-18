#!/usr/bin/env bash
set -e

if [ -f "clips/clip1.mp4" ]; then
  echo "Concatenating clips from clips/ folder..."
  for f in clips/clip*.mp4; do echo "file '$f'"; done > clips_list.txt
  ffmpeg -y -f concat -safe 0 -i clips_list.txt -c copy raw_film.mp4
  rm clips_list.txt
fi

if [ ! -f "raw_film.mp4" ]; then
  echo "ERROR: Put your combined video in this folder as raw_film.mp4 or put clip1.mp4, clip2.mp4... in clips/"
  exit 1
fi

mkdir -p site/media

ffmpeg -y -i raw_film.mp4 \
  -vf "drawbox=x=iw-240:y=ih-240:w=240:h=240:color=black:t=fill,colorlevels=rimin=0.045:gimin=0.045:bimin=0.045" \
  -c:v libx264 -crf 17 -an film_master.mp4

ffmpeg -y -i film_master.mp4 -vf "scale=1920:-2:flags=lanczos" -c:v libx264 -g 1 -crf 19 -pix_fmt yuv420p -movflags +faststart -an site/media/film.mp4
ffmpeg -y -i film_master.mp4 -vf "scale=854:-2" -c:v libx264 -g 1 -crf 27 -pix_fmt yuv420p -movflags +faststart -an site/media/film_mobile.mp4
ffmpeg -y -i film_master.mp4 -frames:v 1 -q:v 2 site/media/poster.jpg

echo "DONE! Run: npx serve site"
