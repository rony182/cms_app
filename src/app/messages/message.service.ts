import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangeEvent = new Subject<Message[]>();

  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.http
      .get<Message[]>(
        'https://cms-project-1ccee-default-rtdb.firebaseio.com/messages.json'
      )
      .subscribe((messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        console.log(this.maxMessageId);
        this.messages.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
        this.messageChangeEvent.next(this.messages.slice());
      });
  }
  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: number): Message {
    return this.messages.find((message) => message.id === id) || null;
  }

  getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      if (message.id > maxId) {
        maxId = message.id;
      }
    });
    return maxId;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.maxMessageId = this.getMaxId();
    console.log(this.maxMessageId);

    this.storeMessages();
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        'https://cms-project-1ccee-default-rtdb.firebaseio.com/messages.json',
        messages,
        { headers: headers }
      )
      .subscribe(() => {
        this.messageChangeEvent.next(this.messages.slice());
      });
  }
}
