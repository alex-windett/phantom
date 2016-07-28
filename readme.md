# Phantom Bookmarks

I have chosen to use React as creating an app in Angular, for me, wouldn't have met the objectives of the task in time.

A small app create in React, that allows a user to add, edit and delete bookmarks. The app uses local storage to save the bookmarks.

Pagination is set to a default of three items on page load, but can be edit by entering a desired number.

The app can be found [here](https://mysterious-bastion-41371.herokuapp.com/)

N.B The app require CORS to display a preview of the webpack, (this extension)[https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi] Chrome extension is advised.

## Local development
To run the app locally make sure you have Java JDK and node installed

Clone or fork the repo, then:

`cd phantom`

copy the pacakge.json to rooter

`cp build_tools/package.json package.json`

build

`npm install && bower install && npm run build:dist`

To run with live reload:

`npm start`

## Design

The app was designed around these main prerequisites:

- The user should be able to input a URL on the landing page,
- The user should be able to see saved bookmarks and paginate through
- The URL is validated on the second page by determining if the URL is correct and the page exists
- Once the URL has been validated and the form submitted, a confirmation page appears
- To complete the process, the user is returned to the landing page persisted by a page reload.

The app has been built with one global Redux store and one main React component.

Within the React component, three other main subcomponents have been created - the three stages of the submission process:

- The landing page
- The submission page
- The confirmation page

#### Naming Conventions

At all times the app has attempted to follow Google's HTML and CSS code style.

As for React and Redux, consistency has been followed within the tree structure of a component. The children of directories and prefixed with the parent name and all components are capitalised, e.g.

		Foo
		 ||_ Foobar
		 |__ Foobaz


## Compilation and minification
Webpack was used as a build tool to assist development and production. All assets have been minified for production, with Sass being passed through webpack scss loader and JavaScript with the JS loader. I have attempted to use Google Closure Compiler, however, ran into some issues.

## Hosting
The app is hosted via Heroku as a static index.html page

## Limitations

Below are listed the limitations of the app:

- The user is unable to click on the number for pagination to switch between pages quickly
- Can paginate beyond maximum number of pages
- It is only hosted on github pages - so no server to run build commands from
