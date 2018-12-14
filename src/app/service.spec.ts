import { Service } from './service';

describe('Service', () => {
  it('should create an instance', () => {
    expect(new Service()).toBeTruthy();
  });
	it('should accept values in the constructor', () => {
		let serv = new Service({
		name: 'pay',
		price: 100
		});
		expect(serv.name).toEqual('pay');
		expect(serv.price).toEqual(100);
	});
});
