# Team Three Games

## Description
Welcome to Team Three. We make mini games to challenge your brain and keep you engaged for hours. We are pleased to annouce our first game; Match the Card. This game consists of 5 levels, and players have 3 lives to get past each level. Additionally, players must race against to clock to win!

## Features
✅ Re-designed landing page and a fantastic eye-catching UI/UX

✅ Match the card game

✅ Database Framework for the leaderboard and a custom user experience

✅ Unit Testing

✅ Landing Page with nav link to About page

✅ Description with an image for each team member

✅ CI/CD pipeline

✅ Hover effects for description cards

✅ Dark mode

## Testing 
Tests are created for the following functions of the game:

Navigation Bar
About page
Matching Game Functions
Landing Page
Instructions on How to Play

After running the following command:
$ npm install

You can run the following to execute the tests in the test folder in the team 3 root directory:
$ npm test

This will prompt all of the test files and give you an indication on the tests that pass and fail.

## How to run
Requirements:

Git
XAMPP installed
React installed

Connecting Local Dev Environment to the Schools Remote Back End:


1. Clone our git directory to xampp/htdocs/team_3


2. Start XAMPP, start the MySQL service on port 3306 and Apache Service on ports 80 and 443

3. Connect to school VPN using AnyConnect.

4. Please run "npm install" from xampp/htdocs/team_3

5. Run "npm start" from xampp/htdocs/team_3
- This should start a development deployment on localhost:9000

6. From xampp/htdocs/team_3 run ./scripts/local-dev.sh (refer to wiki for example)

- if this doesn't work you might need to run chmod +x scripts/local-dev.sh
- this should change all the API calls, DB connections and PHP ports to work with XAMPP.
- Running the commit script reverts the changes that local-dev.sh made.
$ ./scripts/local-dev.sh
$ ./scripts/commit.sh

Every time you pull you will have to run ./scripts/local-dev.sh again. The best practice would be also to run ./scripts/commit.sh before you commit to our Gitlab repo but this isn't 100% necessary since the CI/CD will call it when we deploy the project onto the server, not doing it will create a bunch of merge conflicts though.

## Authors
- Aakil Bohra
- Abdullah Saad
- Dipto Biswas
- Hammad Khan
- Jacob Serafin
- Lucas Jarrett

## Secret Page
- Secret link is accessed via team 2's clue: https://cis4250w24-04.socs.uoguelph.ca/team_4/index.php?custom_redirect=40524fa34471d1ffa2c56697a6bf4e4d
-Password (for developers)= gregklotz

- Puzzle instructions: 
You just have to cypher characters left by 6 (a->g) because the 'key' is WEAPON which is 6 
Several hints around the website will suggest the word weapon is the key.

- After solving the puzzle, website will redirect window to group 4's puzzle

