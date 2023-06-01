import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  private contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(id: number): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }
  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id.toString());
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId;
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
