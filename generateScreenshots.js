function generateScreenshots() {
  
  var presentationId = "193gYnPOJQwJAZ0NyAZU9OvlL2Eu38AW63O9Tk72dDM";
  var presentationname = "myslides";
  var presentation = SlidesApp.openById(presentationId);
  var baseUrl =
    "https://slides.googleapis.com/v1/presentations/{presentationId}/pages/{pageObjectId}/thumbnail";
  var parameters = {
    method: "GET",
    headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
    contentType: "application/json",
    muteHttpExceptions: true
  };

  // Log URL of the main thumbnail of the deck
  Logger.log(Drive.Files.get(presentationId).thumbnailLink);

  // For storing the screenshot image URLs
  var screenshots = [];

  var slides = presentation.getSlides().forEach(function(slide, index) {
    var url = baseUrl
      .replace("{presentationId}", presentationId)
      .replace("{pageObjectId}", slide.getObjectId());
    var response = JSON.parse(UrlFetchApp.fetch(url, parameters));

    // Upload Googel Slide image to Google Drive
    var blob = UrlFetchApp.fetch(response.contentUrl).getBlob();
    //var currentslidenumber = ("0" + index + 1).slice(-2);
    var currentslidenumber =leftPad(index + 1, 2) 

    DriveApp.createFile(blob).setName(presentationname + currentslidenumber + ".jpg");

    screenshots.push(response.contentUrl);
  });

  return screenshots;
}

function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}
