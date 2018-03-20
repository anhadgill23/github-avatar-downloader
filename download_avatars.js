var request = require('request');
var secret = require('./secrets');

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

getRepoContributors("jquery", "jquery", function(err, result) {
    // console.log("Errors:", err);
    // console.log("Result:", result);
    result.forEach(element => {
        console.log(element.avatar_url)
    });
  });


