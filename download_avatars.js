var request = require('request');
var secret = require('./secrets');
var fs = require('fs');
var params = process.argv.slice(2);

// console.log('Welcome to the GitHub Avatar Downloader!');
//Go ahead and add an Authorization header to your request call in getRepoContributors.

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    json: true,
    headers: {
      'User-Agent': 'request',
      'Authentication': secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}

getRepoContributors(params[0],params[1], function(err, result) {
    if (params.length == 2) {
        result.forEach(element => {
            console.log(element.avatar_url);
            downloadImageByURL(element.avatar_url, 'avatars/' + element.login)
        });
    }
    else {
        console.log('Error: Please specify two arguments.');
    }
  });
// passing in avatar_url from your callback function into downloadImageByURL.

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
       .pipe(fs.createWriteStream(filePath + '.jpg'));
}



//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")



