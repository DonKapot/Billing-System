
export class Client {
	id: number;
	unicId: number;
	name: string;
	servId: number;
	servicePrice: number;
	isChanged: boolean = false;
	servComplete: boolean = false;
	servSend: boolean = false;
	deposit: number = 100;
	// credit: number = 0;
	toggleRow: boolean;

	tempCredit: number=0;
	tempDeposit: number=this.deposit;

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}
