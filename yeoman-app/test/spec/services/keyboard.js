'use strict';

describe('Service: Keyboard', function () {

  // load the service's module
  beforeEach(module('yeomanAppApp'));

  // instantiate service
  var Keyboard;
  beforeEach(inject(function (_Keyboard_) {
    Keyboard = _Keyboard_;
  }));

  it('should do something', function () {
    expect(!!Keyboard).toBe(true);
  });

});
