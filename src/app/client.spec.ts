import { Client } from './client';

describe('Client', () => {
  it('should create an instance', () => {
    expect(new Client()).toBeTruthy();
  });
	it('should accept values in the constructor', () => {
		let client = new Client({
			servId: 1,
			complete: false
		});
		expect(client.servId).toEqual(1);
		expect(client.servComplete).toEqual(false);
	});
});
