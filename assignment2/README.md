# Assignment 2

## Project Demostration

Application running on [heroku](https://fooglekeep.herokuapp.com/notes)

## Project Objective
- This is a note taking application 
- Frontend is using bootstrap for CSS and responsive handling
- Backend is using expressJS and MongoDB for persistent layer
- User can view / create / delete / update notes

```
This phase has removed all the authenication feature and assume user is logining as "kong.ko@northeaster.edu" accordingly.
```

## Project Folder Structure
├── README.md
├── app.js
├── models
│   └── note.js
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── javascripts
│   │   └── note.js
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── note.js
├── utils
│   └── database.js
└── views
    ├── error.pug
    ├── layout.pug
    └── note.pug



## Project Requirement

Create a web app using node.js and Express that does CRUD (Create, Read, Update and Delete) operations using MongoDB. Example applications: note-taking, recipe collection, movie/book review, blog,... (You could check your topic with us if you are not sure it's suitable)

You can use the tutorial articles in MDN as a guideline, but your web application needs to have a different purpose (i.e. not a library website) https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website

Include pages to
- Show lists of all the existing items in the database
- Show details of each individual item when the user selects
- Give edit and delete option for each item
- Add a new item to the database using a form (with at least 2 fields)
1) https://developer.mozilla.org/en-US/docs/Learn/Forms
2) https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/forms 
3) Make sure you have data validation  
a) https://www.npmjs.com/package/express-validator
Add a proper error handler to render a 404 page.
- Use templates for pages with dynamic content

Write clear, clean, and concise code. Functions should perform only one task. Function and variable names should be meaningful (not x) to let other developers know what they are used for. This should show consideration and problem-solving skills, try to do things as efficiently as you can. All HTML pages will be validated with W3C validator. Your CSS code should not contain any unnecessary and duplicate style

## Submit 

Zip file containing your code (don't include node_modules folder)
Proper folder structure: The app routes are stored in separate modules under the routes/ directory. The templates are stored under the /views directory.  All static resources are stored in the /public directory. 

#### Link to your GitHub repo
- Do all the development work in a branch other than the main branch and have meaningful commits in that branch
- Make sure your TAs are invited as collaborators and send them a pull request when all the work is done
- Include a README file with the basic objective of your app, and setup instructions.
- Don't include node_modules folder in your repo: https://www.atlassian.com/git/tutorials/saving-changes/gitignore (Links to an external site.) 
- Move database information to .env file and don't commit the .env file