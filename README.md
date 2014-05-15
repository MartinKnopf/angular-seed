# Project setup

This project was generated with [generator-angular](https://github.com/yeoman/generator-angular). I added [protractor](https://github.com/angular/protractor) and [grunt-interfake](https://github.com/Horsed/grunt-interfake).

## Installation

Stuff to install:

* Node.js
* Python 2.7.x
* Ruby
* rubygems
* compass
* On Windows 7: [Microsoft Visual Studio C++ 2012 for Windows Desktop Express](http://go.microsoft.com/?linkid=9816758)

With Node and npm ready you can install the following:

    $ npm install yeoman -g                   # for scaffolding
    $ npm install protractor -g               # for e2e tests based on Selenium WebDriverJS
    $ webdriver-manager update --standalone   # downloads the selenium server and chromedriver

Move into the project folder and execute this to install backend and frontend libs:

    $ npm install

## Development environment

This angular project has some nice features to support the developer. The frontend can be served by a local webserver that supports livereload. This also includes a fake backend server so you don't have to mock data in your frontend code. There also is a unit test and e2e test config setted up so you can run tests easily.

### Server with livereload and faked backend

    $ grunt serve

This starts two servers:
  * a ```connect``` server at ```localhost:8080``` that serves the static frontend files with livereload capability
  * a fake backend server at ```localhost:9000``` that handles requests defined in ```fake-backend.json```

A proxy will forward all requests to ```localhost:8080``` that start with ```/rest/``` to the fake backend server.

### Unit tests

    $ grunt test

Unit tests will be executed with an autowatch (whenever a unit or unit test changes). To run the unit tests once execute:

    $ grunt test:singleRun

Unit tests are executed with [karma](https://github.com/karma-runner/karma) which is configured to run the tests in [PhantomJS](http://phantomjs.org/). Karma will launch a server at ```localhost:7070```.

### E2E tests

    $ webdriver-manager start
    $ grunt e2e:test/local.js

E2E tests are based on [protractor](https://github.com/angular/protractor) which is based on [WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs). Don't worry, protractor will setup Selenium for you :-)

First start the webdriver-manager. This will setup a local Selenium server at ```localhost:4444```. Then execute the e2e test.

## Build

    $ grunt build

Building this project includes:

* clean:dist
* bowerInstall
* useminPrepare
* concurrent:dist
* autoprefixer
* concat
* ngmin
* copy:dist
* cdnify
* cssmin
* uglify
* rev
* usemin
* htmlmin
* compress

The built frontend will be writted to ```dist/``` and this folder will be zipped to ```dist.zip```

## Conventions

### AngularJS

see [13 Steps to AngularJS Modularization](http://blog.safaribooksonline.com/2014/03/27/13-step-guide-angularjs-modularization/)

File structure

    app
    |____nonsense
    | |____nonsense.module.js
    | |____foo.ctrl.js
    | |____bar.ctrl.js
    | |____baz.filter.js
    |____apparel
    | |____apparel.module.js
    | |____hat.filter.js
    | |____pants.service.js
    |____sounds
    | |____sounds.module.js
    | |____arf.service.js
    | |____oink.html
    | |____moo.directive.js
    |____people
    | |____people.module.js
    | |____bob.directive.js
    | |____pat.html
    |____myapp.module.js

### CSS

see [cheat sheet for smacss with sass and bem](http://horsed.github.io/smacss-with-sass-and-bem-cheat-sheet/)
