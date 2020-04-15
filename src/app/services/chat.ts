// handles incoming and outgoing text messages

import {  Injectable, ApplicationRef, NgZone } from '@angular/core';

import { SocketService } from './socket';
//import {ContactService} from './contact';
//import { Config } from '../config';
//import { Events } from '@ionic/angular';
//import * as marked from 'marked';
//import {LoginService} from './login';
import {HelperService} from './helper';
import {GlobalEventService} from './chaevents';



@Injectable()
export class ChatService {
	user = null
	chats = []
	messageCount = 0;


	// manages chats
	constructor(
		private zone:NgZone, 
		private ref: ApplicationRef, 
		private socket: SocketService, 
		//private events: Events, 
		//private contactService: ContactService, 
		//private loginService: LoginService,
		private helper:HelperService,
		private globalEventService: GlobalEventService) {

		this.init();
		
	}


	public init(){
		//let evts = this.events;

		/*marked.setOptions({
			sanitize: true,
			gfm: true
		});*/

		// triggered after a successfull login
		/*this.events.subscribe('user.login', data => {
			this.user = data.user;
		});*/

		/*this.loginService.checkIfloggedIn().then((user)=>{
    	 this.user = user ;

    	});*/



		let self = this;

		// broadcast an event when there is a chat mesasage recieved
		// another way to do this would be to forward the message directly
		this.socket.on('chat-message', function(name, message) {
			//console.debug('SOCKET chat-message');
			let have = false;

				for (let chat of self.chats) {
					if (message.chat == chat.id) {
						have = true;
						break;
					}
				}

			// get a new list of chats if we are missing something
			if (!have) {
				//console.debug('getting new chats...');
				self.socket.emit('chats');
			}

			self.updateLastMessage(message.chat, message);
			//evts.publish('chat-message', name, message);
		});

		// triggered where there is an update to the chat data. like adding a user to the chat
		this.socket.on('chat', chat => {
			//zone.run(() => {
				//console.debug('got a new chat update:', chat)
				for (let c of this.chats) {
					if (c.id == chat.id) {
						c.users = chat.users;
						c.lastMessage = chat.lastMessage;
						c.lastDate = chat.lastDate;
						
						this.processChats();
						return;
					}
				}

				this.chats.push(chat);
				this.countMessages(chat.id);
				this.processChats();
			//});
		});

		this.socket.on('chats', chats => {
			this.zone.run(() => {
				//console.debug('Chats: ', chats);

				// merge new chats to the chat array but dont replace the array itself
				for (let chat of chats) {
					let i = true;
					for (let c of this.chats) {
						if (c.id == chat.id) {
							i = false;
							break;
						}
					}
					if (i) {
						this.chats.push(chat);
					}
				}

				

				this.processChats();
			});
		});


		this.socket.on('orders', data => {
			console.log('cok ok ',data)
			this.zone.run(() => {
				//console.debug('Chats: ', chats);

				// merge new chats to the chat array but dont replace the array itself
				
				console.log('check orders: ',data)
				

				this.processChatsb(data);
			});
		});
	}

	public processChatsb(data){
		this.globalEventService.publishSomeData(data);
	}

	private checkAttachment(message){
  	if(message.attachment){
  		if(message.attachment.type){
  			if(message.attachment.type === 'moneyTransfer'){
  				return true;
  			}
  			else{
  				return false;
  			}
  		}
  		else{
  				return false;
  			}
  	}
  	else{
  				return false;
  			}
  }

	private parseMessage(message) {
		if (!message) {
			return null;
		}
		if(this.checkAttachment(message))
		{
			return '[Attachement]';
		}
		//console.debug('parsing ', message)
		let m = '';
		
		//if(message)
		m = m ? m.replace(/\<img.+\">/i, 'Image') : null;
		m = m.replace(/(<([^>]+)>)/ig,'');
		return m;
	}

	private processChats() {
		for (let chat of this.chats) {
			chat.name = this.chatName(chat);
		}
		this.chats.sort(this.sortChats);
		//this.helper.changeChats(this.chats);
		this.ref.tick();
	}

	// update the last message send for the chats view
	public updateLastMessage(id, message, date = new Date) {
		for (let c in this.chats) {
			let chat = this.chats[c];
			if (chat.id == id) {
				chat.lastMessage = message ? message.message : 'Attachment';
				this.helper.changeLastmessage(chat.lastMessage);
				chat.lastDate = date;
				
				break;
			}
		}
		this.chats.sort(this.sortChats);
	}

	public getChatById(id) {
		//console.log('am here: ' + id);
		//console.log(this.chats);
		for (let chat of this.chats) {
			//console.log('id list: ' + chat.id + ' :myid: ' + id );
			if (chat.id == id) {
				//console.log('did i enter?');
				return chat;
			}
		}
		return null;
	}

	public getChatByContact(id) {
		return new Promise((resolve, reject) => {
			for (let chat of this.chats) {
				if (chat.users.length == 2 && chat.users.indexOf(this.user.id) > -1 && chat.users.indexOf(id) > -1) {
					resolve(chat);
					return;
				}
			}

			this.socket.promise('get-contact-chat', {id: id}).then(chat => {
				this.chats.push(chat);
				this.chats.sort(this.sortChats);
				resolve(chat);
			});
		});
	}

	// sort cchats by last message
	private sortChats(a, b) {
		if (!a) {
			return -1;
		}
		if (!b) {
			return 1;
		}
		if (new Date(a.lastDate) > new Date(b.lastDate)) {
			return -1;
		}
		if (new Date(a.lastDate) < new Date(b.lastDate)) {
			return 1;
		}
		return 0;
	};

	get(chatId) {
		let self = this;
		return new Promise((resolve, reject) => {
			this.socket.promise('chat', {
				chat: chatId
			}).then((data: any) => {
				resolve(data);
			});
		});
	}

	addContact(chat, contact) {
		return new Promise((resolve, reject) => {
			this.socket.promise('add-to-chat', {chat: chat.id, contact: contact.id}).then(chat => {
				resolve(chat);
			});
		});
	}

	chatName(chat) {
		let name = '';
		for (let c of chat.users) {
			if (c == this.user.id) {
				continue;
			}
			//name += (name ? ', ' : '') + (this.contactService.get(c).name || this.contactService.get(c).username)
		}
		return name;
	}

	// send a new message to another contact
	send(id, message, attachment) {
		//console.debug('send chatid:', id)
		// @todo: make a promise so we know when it has fully been sent
		this.socket.emit('message', id, message, attachment);
		
		 this.refreshChats().then((data)=>{
		 	console.log('final resolution:',data);

		 	});
	

		//console.log('see an update for chat', this.chats);

	}
	

	// @todo: typing
	typing() {

	}

	countMessages(chat_id){
		let messages = this.getChatById(chat_id);
		//console.log('messages per given chat', messages);
		this.messageCount = this.messageCount + messages.length;

	}

	public refreshChats(){
		// triggered where there is an update to the chat data. like adding a user to the chat
		
		return new Promise((resolve, reject) => {
			this.socket.promise('orders',{}).then((data: any) => {
				//console.log('check chats',data)
				resolve(data);
			});
		});
		

	}
}