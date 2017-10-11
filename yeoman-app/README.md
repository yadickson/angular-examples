# Yeoman app example

## Make the basic structure

```
$ yo webapp Yeoman
```

### Select:

- Sass
- Bootstrap 3
- BDD

### Install dependencies

```
$ bower install --save jquery@~1.12.0
$ bower install --save angular@~1.3.20
$ bower install --save angular-ui-router@~0.2.0
```

### Install develop dependencies

```
$ bower install --save-dev mocha@~3.5.3
$ bower install --save-dev angular-mocks@~1.3.20
```

### Prepare application

```
$ bower install && npm install
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
