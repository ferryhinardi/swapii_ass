/* eslint-disable */
describe('Testing Starship Page', function () {
	it('should be there is a text', function () {
		let isFilled = true;
		browser.url('/starships');
		browser.waitForVisible('[data-test="starships-list"]');
		const items = browser.getText('[data-test="starships-list"]>div>div>li>span>span');
		
		for (let i = 0; i < items.length - 1; i++) {
			if (items[i] == "") {
				isFilled = false;
				break;
			}
		}

		expect(isFilled).to.be.true;
	});
});