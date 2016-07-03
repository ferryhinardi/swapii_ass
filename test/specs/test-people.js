/* eslint-disable */
describe('Testing People Page', function () {
	it('should be there is a text', function () {
		let isFilled = true;
		browser.url('/people');
		browser.waitForVisible('[data-test="people-list"]');
		const items = browser.getText('[data-test="people-list"]>div>div>li>span>span');
		
		for (let i = 0; i < items.length - 1; i++) {
			if (items[i] == "") {
				isFilled = false;
				break;
			}
		}

		expect(isFilled).to.be.true;
	});
});