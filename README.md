# Github-Profile-Generator
### A basic node app to create a pdf from a github portfolio

This is a basic cli-app using node to construct an engineering team profile as an html file. Additionally, it is a way to practice test-driven development.

# Design Notes

Inputs and Outputs -
The app prompts the user to build an engineering team, which consists of a manager, and any number of engineers and interns. Then the app generates a team.html page in the output directory with the team roster.

The format for the constructors was set by the given test conditions, listed in the /test folder. Each employee has a name, id, title, and a special property given the role.

## Viewing and using the website

Download the repo.

Install the node dependencies:
`npm instal`
* inquirer _for cli interface_
* jest _for testing constructors_

 and then initalize the app by running:
`node app.js`

Here is an example of the html formatted output created as /output/team.html:
![Mainpage Screenshot Demo](/assets/Team_Profile_Demo.png)


The 'High Scores' button toggles the display card of scores.

All website assets are contained within the repo (https://github.com/anzook/Engineering-Team-Profile)


## Acknowledgements and Credits

Website created as an assignment for the Johns Hopkins full-stack web development bootcamp (in partnership with Trilogy Education Services).
Guidance and assistance provided by:
* Stetson Lewis (Instructor)
* Donald Hesler (TA)
* Dan Thareja (Inspiration)
