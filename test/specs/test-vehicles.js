/* eslint-disable */
describe('Testing Vehicle Page', function () {
	it('should be there is a text', function () {
		let isFilled = true;
		browser.url('/vehicles');
		browser.waitForVisible('[data-test="vehicles-list"]');
		const items = browser.getText('[data-test="vehicles-list"]>div>div>li>span>span');

		for (let i = 0; i < items.length - 1; i++) {
			if (items[i] == "") {
				isFilled = false;
				break;
			}
		}

		expect(isFilled).to.be.true;
	});
});