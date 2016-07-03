/* eslint-disable */
describe('Testing Species Page', function () {
	it('should be there is a text', function () {
		let isFilled = true;
		browser.url('/species');
		browser.waitForVisible('[data-test="species-list"]');
		const items = browser.getText('[data-test="species-list"]>div>div>li>span>span');
		
		for (let i = 0; i < items.length - 1; i++) {
			if (items[i] == "") {
				isFilled = false;
				break;
			}
		}

		expect(isFilled).to.be.true;
	});
});