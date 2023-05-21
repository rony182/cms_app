import { OnInit, Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  currentSender: number = 1;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }
  onSendMessage() {
    const subjectValue = this.subjectRef.nativeElement.value;
    const msgTextValue = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(1, subjectValue, msgTextValue, this.currentSender);
    this.messageService.addMessage(newMessage);

  }

  onClear() {
    //assign blank values to the subject and msgText
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
