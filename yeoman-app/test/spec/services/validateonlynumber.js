(function() {
  'use strict';

  describe('Service: ValidateOnlyNumber', function() {

    beforeEach(angular.mock.module('yeomanApp'));

    var ValidateOnlyNumber;
    beforeEach(inject(function(_ValidateOnlyNumber_) {
      ValidateOnlyNumber = _ValidateOnlyNumber_;
    }));

    it('Validate null input', function() {
      expect(ValidateOnlyNumber.validateNumber(null)).to.empty;
    });

    it('Validate empty input', function() {
      expect(ValidateOnlyNumber.validateNumber('')).to.empty;
    });

    it('Validate not number input', function() {
      expect(ValidateOnlyNumber.validateNumber('abcd')).to.empty;
    });

    it('Validate alphanumeric input', function() {
      expect(ValidateOnlyNumber.validateNumber('abcd123abcd456')).to.equal('123456');
    });

  });
})();
