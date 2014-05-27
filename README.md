# Project setup

From the original [angular-seed](https://github.com/angular/angular-seed#angular-seed--the-seed-for-angularjs-apps):

> This project is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.

> The seed contains a sample AngularJS application and is preconfigured to install the Angular framework and a bunch of development and testing tools for instant web development gratification.

> The seed app doesn't do much, just shows how to wire two controllers and views together.

This project skeleton was generated with [generator-angular](https://github.com/yeoman/generator-angular) and got [protractor](https://github.com/angular/protractor), [grunt-interfake](https://github.com/Horsed/grunt-interfake) and [scss-lint](https://github.com/causes/scss-lint) added. It also implements some best practices like [the modular organization](http://blog.safaribooksonline.com/2014/03/27/13-step-guide-angularjs-modularization/) and [SMACSS+BEM](https://medium.com/objects-in-space/f6f404727).

## Installation

Stuff to install:

* [Node.js](http://nodejs.org)
* [Python 2.7.x](https://www.python.org/downloads/)
* [Ruby](https://www.ruby-lang.org/en/downloads/)
* [rubygems](https://rubygems.org/)
* [compass](https://rubygems.org/gems/compass)
* [scss-lint](https://rubygems.org/gems/scss-lint)
* On Windows 7: [Microsoft Visual Studio C++ 2012 for Windows Desktop Express](http://go.microsoft.com/?linkid=9816758)

With Node and npm ready you can install the following:

    $ npm install yeoman -g                   # for scaffolding
    $ npm install protractor -g               # for e2e tests based on Selenium WebDriverJS
    $ webdriver-manager update --standalone   # downloads the selenium server and chromedriver

Now clone this repository or [download](https://github.com/Horsed/angular-seed/archive/master.zip) the zip and install it:

    $ cd angular-seed/
    $ npm install                             # installs frontend and backend dependencies

## Development environment

The frontend can be served by a local webserver that supports livereload. This also includes a fake backend server. There also is a unit test and e2e test config set up so you can run tests from the beginning.

### Server with livereload and faked backend

```$ grunt serve``` starts a ```connect``` server at ```localhost:8080``` that serves the frontend with livereload capability. To start this server along with the fake backend execute ```$ grunt serve:withFakeBackend```. A proxy will forward all requests going to ```localhost:8080``` that start with ```/rest/``` to the fake backend server running at ```localhost:9000```. To change this url pattern go to ```config/custom-grunt.js```. Note that the fake backend will not be started with livereload capability.

### Unit tests

```$ grunt test``` executes unit tests with autowatch (re-executes the tests whenever a unit or unit test changes).

```$ grunt test:singleRun``` runs the unit tests just once.

Unit tests are executed with [karma](https://github.com/karma-runner/karma) which is configured to run the tests in [PhantomJS](http://phantomjs.org/). See ```karma.conf.js``` to change this. Karma will launch a server at ```localhost:7070```.

### E2E tests

Run ```webdriver-manager start``` in a separate terminal and then ```$ grunt e2e:test/local.js```. Of course you can provide you own test config file.

E2E tests are based on [protractor](https://github.com/angular/protractor) which is based on [WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs). Don't worry, protractor will setup Selenium for you :-)

The webdriver-manager will setup a local Selenium server at ```localhost:4444```.

## Build

```$ grunt build``` builds the project. Take a look at ```Gruntfile.js``` to see what is included in the build.

The built frontend will be writted to ```dist/``` and this folder will be zipped to ```dist.zip```.

```$ grunt serve:dist``` builds the project and then serves the built frontend at ```localhost:8080``` (without the fake backend).

## Best practices

Here you can find some conventions I chose for my AngularJS projects. It's all about modularization. If you want to learn AngularJS, take look at [this collection of tutorials](http://www.thinkster.io/angularjs/GtaQ0oMGIl/a-better-way-to-learn-angularjs) (by thinkster.io).

### Modular AngularJS organization

See [13 Steps to AngularJS Modularization](http://blog.safaribooksonline.com/2014/03/27/13-step-guide-angularjs-modularization/) (by Christopher Hiller)

A modular file structure:

    app
    |--scripts
    |  |--homepage
    |  |  |--homepage.config.js
    |  |  |--homepage.ctrl.js
    |  |  |--homepage.directive.js
    |  |  |--homepage.module.js
    |  |  |--...
    |  |--common
    |  |  |--directives
    |  |  |--services
    |  |  |--filters
    |  |  |--...
    |  |--myapp.module.js
    |  |--myapp.config.js
    |--index.html

### SMACSS+BEM

For a modular CSS/SASS file structure see [cheat sheet for smacss with sass and bem](http://horsed.github.io/smacss-with-sass-and-bem-cheat-sheet/) (by me).

### E2E tests with page objects

The protractor doc [recommends](https://github.com/angular/protractor/blob/master/docs/getting-started.md#organizing-real-tests-page-objects) that you should make use of the Page Object pattern in your E2E tests to make them more readable. Take a loook at [the sample test](https://github.com/Horsed/angular-seed/blob/master/test/e2e/homepage.test.js) provided in this project. It uses a Page Object so you can get started with that.
