var request = require('request');
var secret = require('./secrets');
var fs = require('fs');

// // console.log('Welcome to the GitHub Avatar Downloader!');
// //Go ahead and add an Authorization header to your request call in getRepoContributors.

// function getRepoContributors(repoOwner, repoName, cb) {
//   var options = {
//     url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
//     json: true,
//     headers: {
//       'User-Agent': 'request',
//       'Authentication': secret.GITHUB_TOKEN
//     }
//   };

//   request(options, function(err, res, body) {
//     cb(err, body);
//   });
// }

// getRepoContributors("jquery", "jquery", function(err, result) {
//     // console.log("Errors:", err);
//     // console.log("Result:", result);
//     result.forEach(element => {
//         console.log(element.avatar_url)
//     });
//   });

// What we need now is a generic function which is given two parameters:

// url: A remote image URL to fetch
// filePath: A local path for where to persist the file
// The function will make a request to a given url, saving the resulting image file to a specified filePath.


function downloadImageByURL(url, filePath) {
    request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Downloading...')
       })
       .on('end', function (end) {
        console.log('Download complete.')
       })
       .pipe(fs.createWriteStream(filePath));
}



downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")



