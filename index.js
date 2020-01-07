var github = require('octonode');  //github api interface
const inquirer = require("inquirer");  //cli interface
const fs = require("fs");   //filesystem interface
const util = require("util");  //bowser node interface

// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }





async function init() {
    console.log("Welcome...")
    try {
      let answers  = await inquirer.prompt([
        {
          name: "userID",
          message: "Please enter a Github user ID:",
          type: "input"
        }
      ]);

      const client = github.client();
      const githubUser = '/users/' + answers.userID;

      client.get(githubUser, {}, function (err, status, body, headers) {
        console.log(body); //json object
        buildReprt(body);
            });

    } catch(err) {
      console.log(err);
    }
  }
  
init();

function buildReprt(body) {
  
}


// The user will be prompted for a favorite color, which will be used as the background color for cards.
// The PDF will be populated with the following:

// Profile image
// User name
// Links to the following:

// User location via Google Maps
// User GitHub profile
// User blog


// User bio
// Number of public repositories
// Number of followers
// Number of GitHub stars
// Number of users following


// RESPONSE
// ? Please enter a Github user ID: JonoAugustine
// {
//   login: 'JonoAugustine',
//   id: 33637179,
//   node_id: 'MDQ6VXNlcjMzNjM3MTc5',
//   avatar_url: 'https://avatars3.githubusercontent.com/u/33637179?v=4',
//   gravatar_id: '',
//   url: 'https://api.github.com/users/JonoAugustine',
//   html_url: 'https://github.com/JonoAugustine',
//   followers_url: 'https://api.github.com/users/JonoAugustine/followers',
//   following_url: 'https://api.github.com/users/JonoAugustine/following{/other_user}',
//   gists_url: 'https://api.github.com/users/JonoAugustine/gists{/gist_id}',
//   starred_url: 'https://api.github.com/users/JonoAugustine/starred{/owner}{/repo}',
//   subscriptions_url: 'https://api.github.com/users/JonoAugustine/subscriptions',
//   organizations_url: 'https://api.github.com/users/JonoAugustine/orgs',
//   repos_url: 'https://api.github.com/users/JonoAugustine/repos',
//   events_url: 'https://api.github.com/users/JonoAugustine/events{/privacy}',
//   received_events_url: 'https://api.github.com/users/JonoAugustine/received_events',
//   type: 'User',
//   site_admin: false,
//   name: 'Jono',
//   company: 'Aquatic Mastery Productions',
//   blog: 'JonoAugustine.com',
//   location: 'United States of America',
//   email: null,
//   hireable: true,
//   bio: 'Student, developer, Kotlin Fanboy.\r\n\r\nMakeshift Perfection.',
//   public_repos: 20,
//   public_gists: 0,
//   followers: 13,
//   following: 7,
//   created_at: '2017-11-13T19:21:51Z',
//   updated_at: '2019-12-15T04:48:50Z'
// }
