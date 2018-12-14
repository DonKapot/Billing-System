import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MDataService } from './mdata.service';
import { Transaction } from './transaction';
import { Service } from './service';
import { Client } from './client';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { UniquePipe } from './unique-pipe.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MDataService]
})

export class AppComponent {

   newTransaction: Transaction = new Transaction();
   newClient: Client = new Client();
   newService: Service = new Service();
   currentTrans: Transaction;
   currentService: Service;
   currentClient: Client;
   currentClients: Client[];
   currentServsOnClient: Service[];
   countServ: number = 0;

   // pageTransaction: number = 0;
   // transactionsLength: number;
   // sliceTransactions = this.transactions;

   	constructor(private MDataService: MDataService, private modalService: NgbModal) {
	   	MDataService.addServ(new Service({name: 'Service 1', price: 11}));
	   	MDataService.addServ(new Service({name: 'Service 2', price: 22}));
	   	MDataService.addServ(new Service({name: 'Pay', price: 2224}));
	   	MDataService.addServ(new Service({name: 'Just pay', price: 2}));
	   	MDataService.addServ(new Service({name: "Don't think, just pay", price: 88}));
	   	MDataService.addServ(new Service({name: 'Eat', price: 500}));
	   	MDataService.addServ(new Service({name: 'Love', price: 2010}));
	   	MDataService.addServ(new Service({name: 'Pray', price: 404}));
	   	MDataService.addServ(new Service({name: 'Out of imagination', price: 0}));
	   	MDataService.addServ(new Service({name: 'Service 10 Last', price: 22}));

			MDataService.addCli(new Client({name: 'Client 1', servId: 1, servComplete: true}));
			MDataService.addCli(new Client({name: 'Client 2', servId: 2, servComplete: false}));
			MDataService.addCli(new Client({name: 'Client 1', servId: 8, servComplete: false}));
			MDataService.addCli(new Client({name: 'Sasha', servId: 3, servComplete: false}));
			MDataService.addCli(new Client({name: 'Vasa', servId: 3, servComplete: false}));
			MDataService.addCli(new Client({name: 'Massa', servId: 1, servComplete: false}));
			MDataService.addCli(new Client({name: 'Tom', servId: 6, servComplete: true}));
			MDataService.addCli(new Client({name: 'Sasha', servId: 4, servComplete: false}));
			MDataService.addCli(new Client({name: 'Jerry', servId: 1, servComplete: false}));
			MDataService.addCli(new Client({name: 'Jerry', servId: 2, servComplete: false}));
			MDataService.addCli(new Client({name: 'Jerry', servId: 3, servComplete: false}));
			MDataService.addCli(new Client({name: 'Sector', servId: 9, servComplete: false}));
			MDataService.addCli(new Client({name: 'Lu Cang', servId: 7, servComplete: true}));
			MDataService.addCli(new Client({name: 'Scorpion', servId: 10, servComplete: true}));
			MDataService.addCli(new Client({name: 'Sasha', servId: 4, servComplete: true}));
			MDataService.addCli(new Client({name: 'Sasha', servId: 2, servComplete: true}));
			MDataService.addCli(new Client({name: 'Sasha', servId: 8, servComplete: false}));

			MDataService.addTrans(new Transaction({clientId: 7, servId: 3}));
			MDataService.addTrans(new Transaction({clientId: 4, servId: 7}));

		  this.addTransactions();
   	}
// ---------------------------------------------------
  addTransaction() {
		this.MDataService.addTrans(this.newTransaction);
		this.newTransaction = new Transaction();
	}
 	addTransactions() {
		this.MDataService.addTransactions();
		this.newTransaction = new Transaction();
	}
 //  addService() {
	// 	this.MDataService.addServ(this.newService);
	// 	this.newService = new Service();
	// }
 //  addClient() {
	// 	this.MDataService.addCli(this.newClient);
	// 	this.newClient = new Client();
	// }
// ---------------------------------------------------
 // 	removeTransaction(trans) {
 // 		this.MDataService.deleteTransById(trans.id);
	// }
 // 	removeServices(serv) {
 // 		this.MDataService.deleteServById(serv.id);   		
	// }
 // 	removeClient(client) {
 // 		this.MDataService.deleteClientsById(client.id);
	// }
// ---------------------------------------------------
	get transactions() {
		return this.MDataService.getAllTransactions();
	}
	get services() {
		return this.MDataService.getAllServices();
	}
	get clients() {
		return this.MDataService.getAllClients();
	}

// ---------------------------------------------------
	getTransactionById(id: number): Transaction {
		return this.MDataService.getTransById(id);
	}
	getServiceById(id: number): Service {
		return this.MDataService.getServById(id);
	}
	getClientById(id: number): Client {
		return this.MDataService.getClientById(id);
	}
	getClisByClientId(id: number) {
		return this.MDataService.getClientsByClientId(id);
	}
// ---------------------------------------------------
	// changeServ(id: number, price: number) {
	// 	return this.MDataService.changeServByClientId(id, price);
	// }
// ---------------------------------------------------	
	refreshCurrentClient() {
  	this.currentClients.forEach(cli=>cli.toggleRow = false);	
  	this.currentClients.forEach(cli=>{cli.tempDeposit=cli.deposit; cli.tempCredit=0;});
  	this.countServ = 0;
  	this.currentClients.forEach(cli=>cli.isChanged=false);
	}
// ---------------------------------------------------	

	changeDepositTemp(client: Client) {

	  if(client.tempDeposit!==0){
			client.toggleRow = !client.toggleRow;
			this.currentClients.forEach(cli=>cli.isChanged=true);
		}
		// let currentServs = this.currentClients
		// .filter(cli=>!cli.servComplete)
		// .map(cli=>this.getServiceById(cli.servId));

		let bLogic = () => {
				let maxPrice = this.countServ>0 ? this.currentClients.filter(cli=>cli.toggleRow).map((cli)=>cli.servicePrice).reduce((a,b)=>a+b) : 0;
				let proportion = client.deposit / this.countServ;

				if(client.tempDeposit/2>maxPrice){
					client.tempCredit = client.servicePrice;
					this.currentClients.forEach(cli=>cli.tempDeposit=client.deposit-maxPrice);
				}
				else {
					client.tempCredit = client.tempDeposit;
					this.currentClients.forEach(cli=>cli.tempDeposit=0);
				}
		};

		if(!client.servComplete && client.tempDeposit!==0) {
				if (client.toggleRow) {
					++this.countServ;
					bLogic();
				}
				else {
					--this.countServ;
					if(client.tempDeposit==0){this.refreshCurrentClient();}
					else{bLogic();}
				}
		}
	}
// ---------------------------------------------------

	pay(){
	   this.currentClients
		.filter(cli=>cli.servicePrice-cli.tempCredit==0)
		.forEach(cli=>{
			// cli.servicePrice=cli.servicePrice-cli.tempCredit;
			cli.tempCredit=0;
			cli.servComplete=true;
		});
		this.currentClients
		.filter(cli=>cli.servicePrice-cli.tempCredit!==0)
		.forEach(cli=>{
			cli.servicePrice=cli.servicePrice-cli.tempCredit;
			cli.tempCredit=0;
		});
   	this.currentClients.forEach(cli=>{cli.deposit=cli.tempDeposit;});

   	this.currentClients.forEach(cli=>cli.toggleRow = false);	
  	this.countServ = 0;
	}

	sendTrans() {
		this.currentClients
		.filter(cli=>cli.servicePrice!==this.getServiceById(cli.servId).price)
		.forEach(cli=>{
			this.newTransaction = new Transaction( {clientId: cli.id, servId: cli.servId} );
			this.addTransaction();
		});
	}

  openClientModal(content, clientObj) {
  	this.currentClient = clientObj;
  	this.currentClients = this.getClisByClientId(clientObj.id);
  	this.currentServsOnClient = this.currentClients.map(cli=>this.getServiceById(cli.servId));

    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    	this.pay();
    	this.sendTrans();
    }, (reason) => {
    	this.refreshCurrentClient();
    });
  }
}
