/* eslint-disable */
describe('Testing Planet Page', function () {
	it('should be there is a text', function () {
		let isFilled = true;
		browser.url('/planets');
		browser.waitForVisible('[data-test="planets-list"]');
		const items = browser.getText('[data-test="planets-list"]>div>div>li>span>span');

		for (let i = 0; i < items.length - 1; i++) {
			if (items[i] == "") {
				isFilled = false;
				break;
			}
		}

		expect(isFilled).to.be.true;
	});
});