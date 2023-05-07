import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  
  messages = [
    new Message(1, 'A Message', 'This is a message', 'Rony Calderon'),
    new Message(2, 'Another Message', 'This is another message', 'Rony Calderon'),
    new Message(3, 'Yet Another Message', 'This is yet another message', 'Rony Calderon')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

    constructor() { }



}
