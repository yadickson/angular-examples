# Yeoman app example

## Make the basic structure

```
$ yo webapp Yeoman
```

### Select:

- Sass
- Bootstrap 3
- BDD

### Add dependencies

```
$ yarn add jquery@~1.12.0
$ yarn add angular@~1.3.20
$ yarn add angular-ui-router@~0.2.0
$ yarn add angular-ys-directive-only-number@~1.0.0
```

### Install style dependencies

```
$ yarn add bootstrap@~3.3.0
$ npm install --save bootstrap-sass@~3.3.5
```

### Add develop dependencies

```
$ yarn add --dev mocha@~3.5.3
$ yarn add --dev chai@~4.1.2
$ yarn add --dev angular-mocks@~1.3.20
```

### Add compiler dependencies

```
$ yarn add --dev mkdirp rimraf
$ yarn add --dev babel-cli babel-preset-env
$ yarn add --dev babel-preset-babili
```

### Add unit test/coverage tools

```
$ yarn add --dev karma
$ yarn add --dev chai karma-chai
$ yarn add --dev mocha karma-mocha
$ yarn add --dev karma-bro karma-phantomjs-launcher
$ yarn add --dev karma-coverage karma-istanbul
$ yarn add --dev karma-mocha-reporter karma-junit-reporter
$ yarn add --dev coveralls
```

### Prepare application

```
$ yarn install
```

### Run app

```
$ gulp build
$ gulp serve
$ gulp serve:test
$ gulp serve:dist
```

### Add controller

```
$ yo angular:controller Home
$ yo angular:controller Help
$ yo angular:controller Header
$ yo angular:controller Footer
```

### Add constant

```
$ yo angular:constant Constants
```

### Add view

```
$ yo angular:view Home
$ yo angular:view Help
$ yo angular:view Header
$ yo angular:view Footer
```

### Add directive

```
$ yo angular:directive ngButtonSearch
$ yo angular:directive onlyNumber
```

### Add factory

```
$ yo angular:factory ValidateOnlyNumber
```
