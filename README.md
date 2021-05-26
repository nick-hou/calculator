# Calculator App

---

Project #4 of freeCodeCamp's front end certification. Currently hosted on [Github Pages](https://nick-hou.github.io/calculator/)

To run the project locally, simply clone the repo, run "npm build" then "npm start"

This app imitates a basic calculator, with \+, \-, \*, and \/ funcitions. This was a fun exercise with CSS grid, and some more practice with React and Redux.

Biggest takeaway from this project is that there are way more edge cases than expected for such a simple app. Resetting the display after solving equations, overlapping equations and decimals, input verification, and displaying the result are all twists in the logic. 

This app stores the equation as a string in the Redux store, then uses [mathjs](https://mathjs.org/) to parse and evaluate it when the user clicks =. This requires a 3rd party module (also allowing us to avoid eval()), but gives us proper order of operations. The alternative would be to update the store after each user click, with a switch for the operation clicked. However, that would give us i.e. 3+5\*6 = 48, instead of 33.
