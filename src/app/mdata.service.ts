import { Injectable } from '@angular/core';
import { Service } from './service';
import { Client } from './client';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class MDataService {
	transactions: Transaction[] = [];
	clients: Client[] = [];
	services: Service[] = [];
	servicesOnClient: Service[] = [];
	transactionId: number = 0;
	clientId: number = 0;
	serviceId: number = 0;
	servIsComplete: boolean = false; 

  constructor() { }
// ---------------------------------------------------
  addTrans(trans: Transaction) : MDataService {
		if(!trans.id){
			trans.id = ++this.transactionId;
		}
		this.transactions.push(trans);
		return this;
  }
    addTransactions() : MDataService {
		this.clients.filter(cli=>cli.servComplete).map(cli=>this.addTrans(new Transaction({clientId: cli.id, servId: cli.servId})));
		return this;
  }
  addCli(client: Client) : MDataService {
  	if(!client.unicId){
			client.unicId = ++this.clientId;
		}
		if(!client.id && !this.clients.some(cli=>cli.name===client.name)) {
			client.id = ++this.clientId;
		}
		else if (this.clients.some(cli=>cli.name===client.name)) { 
			client.id = this.clients.find(cli=>cli.name===client.name).id;
		}
		client.servicePrice = this.getServById(client.servId).price;
		this.clients.push(client);
		return this;
  }
  addServ(serv: Service) : MDataService {
		if(!serv.id){
			serv.id = ++this.serviceId;
		}
		this.services.push(serv);
		return this;
  }
// -------------------------------------------------
	deleteTransById(id: number): MDataService {
		this.transactions = this.transactions.filter(trans => trans.id !== id);
		return this;
	}
	deleteClientsById(id: number): MDataService {
		this.clients = this.clients.filter(client => client.id !== id);
		return this;
	}
	deleteServById(id: number): MDataService {
		this.services = this.services.filter(serv => serv.id !== id);
		return this;
	}
// -------------------------------------------------
	getTransById(id: number): Transaction {
		return this.transactions.filter(trans => trans.id === id).pop();
	}
	getServById(id: number): Service {
		return this.services.filter(serv => serv.id === id).pop();
	}
	getClientById(id: number): Client {
		return this.clients.filter(client => client.id === id).pop();
	}
// -------------------------------------------------	
	updateTransById(id: number, values: Object={}): MDataService {
		let trans = this.getTransById(id);
		if(!trans){return null;}
		Object.assign(trans, values);
		return this;
	}
	updateServById(id: number, values: Object={}): MDataService {
		let serv = this.getServById(id);
		if(!serv){return null;}
		Object.assign(serv, values);
		return this;
	} 
	updateClientById(id: number, values: Object={}): MDataService {
		let client = this.getClientById(id);
		if(!client){return null;}
		Object.assign(client, values);
		return this;
	} 	 
// -------------------------------------------------			
	getAllTransactions(): Transaction[] {
		return this.transactions;
	}
	getAllClients(): Client[] {
		return this.clients;
	}
	getAllServices(): Service[] {
		return this.services;
	}
	getClientsByClientId(id: number) {
		return this.clients.filter(client => client.id === id);
	}
// -------------------------------------------------
	changeServByClientId(id: number, price: number) {
		this.getClientById(id).servicePrice = price;
	}


	// toggleServComplete(client: Client) {
	// 	let updatedClient = this.updateClientById(this.clientId, {servComplete: !this.servIsComplete});
	// 	return updatedClient;
	// }
}
