var github = require('octonode');  //github api interface
const inquirer = require("inquirer");  //cli interface
// const util = require("util");  //bowser node interface
// const genHTML = require("./genHTML");
// var pdf = require('html-pdf');

const fs = require("fs");
const path = require("path");
//remember to npm install
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

//list of color pallets for mdl, deprecated to use bootstrap
// const colors = {
//   green: "https://code.getmdl.io/1.3.0/material.green-orange.min.css",
//   blue: "https://code.getmdl.io/1.3.0/material.blue-teal.min.css",
//   pink: "https://code.getmdl.io/1.3.0/material.pink-deep_purple.min.css",
//   red: "https://code.getmdl.io/1.3.0/material.red-deep_orange.min.css",
//   grey: "https://code.getmdl.io/1.3.0/material.blue_grey-indigo.min.css"
// };

const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};

//formatted date output for filename
function getDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //0 indexed
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  return (dd + mm + yyyy);
  }

  function getStars(repos) {
    let repoArray = [];
    let totalStars = 0;
    repoArray = repos;
    // stargazers_count
    repoArray.forEach( repo => totalStars+= repo.stargazers_count);
    return totalStars;
  }

 async function createPDF(data){
 
      let templateHtml = fs.readFileSync(path.join(process.cwd(), 'temp.html'), 'utf8');
      let template = handlebars.compile(templateHtml);
      let html = template(data);
    
      let stamp = getDate();
      // console.log("Report generated on ", stamp);
      let pdfPath = path.join( 'output', `${data.name}-${stamp}.pdf`);
      let htmlPath = path.join( 'output', `${data.name}-${stamp}.html`);

      let options = {
        // width: '1230px',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
          top: "10px",
          bottom: "30px"
        },
        printBackground: true,
        path: pdfPath,
        format: "A4"
      }
      //  var optionsPdfHtml = { format: 'Letter' };

      // await pdf.create(html, optionsPdfHtml).toFile(pdfPath, function (err, res) {
      //   if (err) return console.log(err);
      //   console.log("Report saved to :", pdfPath);

      // });

    fs.writeFile(htmlPath, html, 'utf8', function (err) {
     if (err)
       return console.log(err);
     console.log("HTML saved to :", htmlPath);
   });

      const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
      });
    
      let page = await browser.newPage();
      
      await page.setContent(html, {
        waitUntil: 'networkidle0'
      });
    
      await page.pdf(options);
      await browser.close();
      console.log("Report saved to :", pdfPath);


    }

async function init() {
  console.log("Welcome...")
  try {
    let answers = await inquirer.prompt([
      {
        name: "userID",
        message: "Please enter a Github user ID:",
        type: "input"
      },
      {
        name: "color",
        message: "Pick a color",
        type: "list",
        choices: Object.keys( colors )
      } //Object.keys(genHTML.colors)
    ]);

    const client = github.client();
    const githubUser = '/users/' + answers.userID; // add /repos for repo info, /events for push events
    const githubRepos = '/users/'+ answers.userID + '/repos'; 
    client.get(githubUser, {}, function (err, status, body) {
      console.log("Getting user info ...", status);
      let data = body;
      client.get(githubRepos, {}, function (err, status, body) {
        console.log("Getting repo info...", status);
        data.stars = getStars(body);
        //adding color pallet to data to send to styles in template
        data.color = colors[answers.color];
        data.wrapperBackground =  colors[answers.color].wrapperBackground;
        data.headerBackground =  colors[answers.color].headerBackground;
        data.headerColor =  colors[answers.color].headerColor;
        data.photoBorderColor =  colors[answers.color].photoBorderColor;

        // console.log("System info collected...", data);
        createPDF(data);
        
      if (err) {
        console.log('Error hitting api-', err);
      }
    });
      // var html = genHTML.generateHTML(body, answers.color);
      // console.log(html);
      // var options = { format: 'Letter' };

      // pdf.create(html, options).toFile("/output/"+ answers.userID + "Profile.pdf", function (err, res) {
      //   if (err) return console.log(err);
      //   console.log(res); // { filename: '/app/businesscard.pdf' }
      //});
    });

  } catch (err) {
    console.log("Something went wrong when fetching that info...", err);
    
  }
}

init();




//function to use handlebars to compile and then puppeteer to mock render and print to pdf

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
//    login: 'JonoAugustine',
//   id: 33637179,
//   node_id: 'MDQ6VXNlcjMzNjM3MTc5',
//    avatar_url: 'https://avatars3.githubusercontent.com/u/33637179?v=4',
//   gravatar_id: '',
//   url: 'https://api.github.com/users/JonoAugustine',
//    html_url: 'https://github.com/JonoAugustine',
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
//    name: 'Jono',
//   company: 'Aquatic Mastery Productions',
//   blog: 'JonoAugustine.com',
//    location: 'United States of America',
//   email: null,
//   hireable: true,
//    bio: 'Student, developer, Kotlin Fanboy.\r\n\r\nMakeshift Perfection.',
//    public_repos: 20,
//   public_gists: 0,
//    followers: 13,
//    following: 7,
//   created_at: '2017-11-13T19:21:51Z',
//   updated_at: '2019-12-15T04:48:50Z'
// }
