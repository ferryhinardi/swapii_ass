/* eslint-disable */
describe('Testing Film Page', function () {
	it('should be there is a text', function () {
		let isFilled = true;
		browser.url('/films');
		browser.waitForVisible('[data-test="films-list"]');
		const items = browser.getText('[data-test="films-list"]>div>div>li>span>span');

		for (let i = 0; i < items.length - 1; i++) {
			if (items[i] == "") {
				isFilled = false;
				break;
			}
		}

		expect(isFilled).to.be.true;
	});
});