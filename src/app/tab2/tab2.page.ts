import { Component } from '@angular/core';
import {  IonContent, ModalController } from '@ionic/angular';
import {ChatService} from '../services/chat';
import {GlobalEventService} from '../services/chaevents';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	messages = [];
	messageHandleWrap = null;

  constructor(private globalEventService: GlobalEventService,
  	private chatService: ChatService) {}

  ngOnInit() {
		
		// watch for incoming chat events and add it to the cleanup queue
		this.messageHandleWrap = (a, b) => {
			//console.log('check check a : ', a);
			//console.log('check check b: ', b);
			this.handleMessage(a,b);
		}
		//this.events.subscribe('chat-message', this.messageHandleWrap);

		//this.chatService.refreshChats();
		//console.log('point:::',JSON.stringify(this.messages));
		//this.globalEventService.getObservable().subscribe((data) => {
        //    console.log('Data received', data);
        //});
	}

	ngOnDestroy() {
		//this.events.unsubscribe('chat-message', this.messageHandleWrap);
	}

  private handleMessage(name, data) {
		//console.debug('new message: ', name, data)
		
			this.addMessage(data);
			
			
		
	}


	addMessage(message) {
		this.messages.push(message);
		

		console.log('messages monitor:', JSON.stringify(this.messages));
	}


}
