# Project setup

This is a basic [AngularJS](http://angularjs.org) project like the original angular-seed. It was generated with [generator-angular](https://github.com/yeoman/generator-angular) and got [protractor](https://github.com/angular/protractor) and [grunt-interfake](https://github.com/Horsed/grunt-interfake) added.

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

Now clone this repository or [download](https://github.com/Horsed/angular-seed/archive/master.zip) the zip and install it:

    $ cd angular-seed/
    $ npm install                             # installs frontend and backend dependencies

## Development environment

The frontend can be served by a local webserver that supports livereload. This also includes a fake backend server so you don't have to mock data in your frontend code. There also is a unit test and e2e test config set up so you can run tests from the beginning. Since the project was generated using generator-angular you can safely scaffold using [generator-angular](https://github.com/yeoman/generator-angular#generators).

### Server with livereload and faked backend

```grunt serve``` starts two servers:
  * a _connect_ server at _localhost:8080_ that serves the static frontend files with livereload capability
  * a fake backend server at _localhost:9000_ that handles requests defined in _fake-backend.json_

A proxy will forward all requests to _localhost:8080_ that start with ```/rest/``` to the fake backend server. To change this pattern go to _Gruntfile.js_. Note that the fake backend will not be started with livereload.

### Unit tests

```grunt test``` executes unit tests with an autowatch (whenever a unit or unit test changes).

```grunt test:singleRun``` runs the unit tests just once.

Unit tests are executed with [karma](https://github.com/karma-runner/karma) which is configured to run the tests in [PhantomJS](http://phantomjs.org/). Karma will launch a server at _localhost:7070_.

### E2E tests

Run ```webdriver-manager start``` in a separate terminal and then ```grunt e2e:test/local.js```. Of course you can provide you own test config file.

E2E tests are based on [protractor](https://github.com/angular/protractor) which is based on [WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs). Don't worry, protractor will setup Selenium for you :-)

The webdriver-manager will setup a local Selenium server at _localhost:4444_.

## Build

```grunt build``` builds the project. Take a look at _Gruntfile.js_ to see what is included in the build.

The built frontend will be writted to _dist/_ and this folder will be zipped to _dist.zip_.

```grunt serve:dist``` builds the project and then serves the built frontend at _localhost:8080_ (without the fake backend).

## Conventions

Here you can find some conventions I chose for my AngularJS projects. It's all about modularization. If you want to learn AngularJS, take look at [this collection of tutorials](http://www.thinkster.io/angularjs/GtaQ0oMGIl/a-better-way-to-learn-angularjs) (by thinkster.io).

### AngularJS

See [13 Steps to AngularJS Modularization](http://blog.safaribooksonline.com/2014/03/27/13-step-guide-angularjs-modularization/) (by Christopher Hiller)

A modular file structure:

    app
    |____scripts
    | |____homepage
    |   |____homepage.ctrl.js
    |   |____homepage.module.js
    |   |____foo.ctrl.js
    |   |____bar.service.js
    |   |____baz.directive.js
    |____myapp.module.js
    |____myapp.config.js

### CSS

For a modular CSS/SASS file structure see [cheat sheet for smacss with sass and bem](http://horsed.github.io/smacss-with-sass-and-bem-cheat-sheet/) (by me).
