import { Transaction } from './transaction';

describe('Transaction', () => {
  it('should create an instance', () => {
    expect(new Transaction()).toBeTruthy();
  });
	it('should accept values in the constructor', () => {
		let trans = new Transaction({
			clientId: 1,
			servId: 22
		});
		expect(trans.clientId).toEqual(1);
		expect(trans.servId).toEqual(22);
	});
});
