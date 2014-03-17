# ng-nebraska ui-router presentation #

## Getting Started ##

1. `npm install`
2. `bower install`

Open two terminals
 * In terminal one run `grunt runapp:development`
 * In terminal two run `grunt watch:development`

Hit http://localhost:3000 with your browser

## Build Tasks ##

* `grunt development`

  * Cleans the project
  * Runs JSHint
  * Compiles the LESS files
  * Concatinates the CSS files
  * Concatinates the application javascript dependencies (for the unit and e2e tests)
  * Stages the vendor and application development files

* `grunt debug`

  * Runs the development build
  * Runs ngtemplates to concatenate the applciation template files into javascript
  * Concatenates the JavaScript dependencies, application source, and templates in a single file
  * Compiles the Jade templates in debug mode
  * Stages the application debug files

* `grunt production`

  * Runs the debug build
  * Minifies CSS files
  * Minifies JavaScript files
  * Compiles the Jade templates in production mode
  * Stages the application production files

* `grunt test`

  * Runs the production build
  * Forks the current process and starts the application server (for e2e testing)
  * Runs the karma unit tests `karma:unitci`
  * On completion, the forked node server shuts down
