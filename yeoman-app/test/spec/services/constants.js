(function() {
  'use strict';

  describe('Check constants', function() {

      // load the controller's module
      beforeEach(module('yeomanApp'));

      // instantiate service
      var contextRoot;
      beforeEach(inject(function(_CONTEXT_ROOT_) {
        contextRoot = _CONTEXT_ROOT_;
      }));

      it('Check CONTEXT_ROOT', function() {
        expect(contextRoot).to.equal('/YeomanApp/');
      });

  });
})();
