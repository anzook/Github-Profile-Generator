# Github-Profile-Generator
### A basic node app to create a pdf from a github portfolio

This is a basic cli-app using node to construct an engineer's GitHub profile as an html and pdf file. Additionally, it is a way for me to get basic experience with Puppeteer and Chromium, as well as using Hnadlebars for templating. 

# Design Notes

Inputs and Outputs -
The app prompts the user for a GirHun username and a color pallet. Then the app generates both a pdf and an html report in the output directory with the users's GitHub info nicely fomratted.


## Viewing and using the website

Download the repo.

Install the node dependencies:
`npm install`
* puppeteer _for mocking output and pdf printing_
* inquirer _for CLI interface
* handlebars _for templating_
* octonode _for GirHub API_
* html-pdf _deprecated, but left in for experiementation. Original option for pdf generation_

 and then initalize the app by running:
`node app.js`

Here is an example of the formatted output created as /output/[name-date].[fileType]:
![Mainpage Screenshot Demo](https://github.com/anzook/Github-Profile-Generator/blob/master/output/OutputExample.jpg)


## Acknowledgements and Credits

Website created as an assignment for the Johns Hopkins full-stack web development bootcamp (in partnership with Trilogy Education Services).
Guidance and assistance provided by:
* Stetson Lewis (Instructor)
* Donald Hesler (TA)
* Dan Thareja (Inspiration)
