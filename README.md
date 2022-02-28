# Google-Slides-Generate-Video
How to quickly generate videos with narration from google slides.

This tutorial will step you through how to compile a video from your google slides.  

This tutorial assumes:

1. You have a completed Google Slides Presentation
2. You have recorded mp3 audio narrations for each slide.

To complete the process you will need to:

* **Download Each Slide as a JPG image** 
You can download each slide manually by going to File->Download->JPG Image

    or to save time you can do it automatically with a script.

* **Create a Corresponding MP3 Audio File for Each Slide**
* **Execute the Compile Shell Script to Generate Video**


# Download Each Slide as a JPG image (Script)


## Step 1: Setup Slides for Best Resolution

In order to ensure your slides are exported at a high resolution you may need to update your Page setup.

Go to File->Page Setup

Select “Custom” and ensure that the setting are 1280x720 pixels


## Step 2: Add the Script

Go to Tools->Script Editor

Paste the script from [generateScreenshots.js](https://github.com/jazmy/Google-Slides-Generate-Video/blob/main/generateScreenshots.js)


## Step 3: Add the Services

In the script editor, on the left side bar, you need to add the Google Slide and the Google Drive Service.

![alt text](https://github.com/jazmy/Google-Slides-Generate-Video/blob/main/Adding_Services_Google_Scripts.jpg?raw=true)


## Step 4: Customize the Script

There are two variables you will need to change


```
var presentationId = "193gYnPOJQwJAZ0NyAZU9OvlL2Eu38AW63O9Tk72dDM";
```

You can get the ID of your presentation from the Slide URL

Example:

https://docs.google.com/presentation/d/193gYnPOJQwJAZ0NyAZU9OvlL2Eu38AW63O9Tk72dDM/edit#slide=id.g86489a34a8_0_7

it is the long jibberish string in the URL


```
var presentationname = "astrid-ep01-slide";
```


The presentation name will end up being the filename that your images are saved. The slides images will be saved with a numeric value appended to the file name.

**_Example:_** 

* myslides01.jpg
* myslides02.jpg
* myslides03.jpg


# Create a Corresponding MP3 Audio File for Each Slide

Once you have the screenshot images you need to ensure you have a corresponding audio file with the same name.

**_Example:_** 

* myslides01.mp3
* myslides02.mp3
* Myslides03.mp3

_Note: When recording your audio file ensure the audio files are tightly cropped to the narration. If you have several seconds recorded before you start talking or after you finish talking then those moments in the video may result in awkward pauses._


## Step 4: Organize Files into Folder

Place all your screenshot JPG images and your mp3 audio files into the same folder.

**Example:**

* Myslides01.jpg
* myslides01.mp3
* Myslides02.jpg
* myslides02.mp3
* Myslides03.jpg
* Myslides03.mp3

_Note: The script will crash if every image does not have a corresponding audio file. You may just want no narration on a slide in which case record a couple seconds of silence as an mp3._


## Step 5: Run the Script

The first time you run the script you will need to grant it permissions to your google drive so it can save the images. Popup windows will appear requesting permission.


# Execute the Compile Shell Script to Generate Video


## Step 6: Install FFmpeg

If not already Installed then install Homebrew

[https://brew.sh/](https://brew.sh/)

_Note: Don’t forget the extra steps it tells you at the end_

Run these two commands in your terminal to add Homebrew to your PATH:

```sh
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/your_directory/.zprofile
```

```sh
eval "$(/opt/homebrew/bin/brew shellenv)"
```

The brew command to install FFmpeg is on this page

[https://formulae.brew.sh/formula/ffmpeg](https://formulae.brew.sh/formula/ffmpeg)


## Step 7: Execute the Compile.sh

* Create a copy of the compile.sh file and place it in the same folder as your images and audio.
* Open your terminal window and navigate to the folder with all your files.
* Run this shell script in the terminal window: 

```sh
sh compilevideo.sh
```

* When complete it will create a video file output.mp4 
