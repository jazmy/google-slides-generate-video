# compilevideo.sh
# Shell script to merge images with the corresponding audio files
# Credits: https://stackoverflow.com/questions/61049442/creating-narrated-slideshow-from-multiple-images-and-sound-files
# To use this script create images with names that will allow them to be sorted alphabetically. 
# Example slide01.jpg
# Create corresponding mp3 audio files with the same name
# Example slide01.mp3
# Place the images and audio files in the same folder as this shell script
# Run this shell script in the terminal window: sh compilevideo.sh

# Create one video per slide
for file in *.mp3 
do
    number=$(echo $file | cut -f 1 -d '.')
    ffmpeg -y -loop 1 -i $number.jpg -i $file -c:v libx264 -c:a aac -b:a 192k -vf format=yuv420p -shortest -vf "fade=t=in:st=0:d=1.5" $number.mp4


    echo "file '$number.mp4'" >> files.txt
done

# Merge videos
# Note: This line was altered from the stack overflow version to fix sync issues that occur with audio on ffmpeg concats
ffmpeg -y -f concat -safe 0 -i files.txt -movflags +faststart -af aresample=async=1000 output.mp4

# Clean up
mv output.mp4 output.do_not_delete
rm *.mp4
mv output.do_not_delete output.mp4
rm files.txt
