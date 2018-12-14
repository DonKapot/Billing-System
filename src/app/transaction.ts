export class Transaction {
	id: number;
	clientId: number;
	servId: number;
	date = new Date().toLocaleString();

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
