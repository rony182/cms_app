import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document(
      1,
      'Document 1',
      'This is the first document',
      'https://www.google.com',
      null
    ),
    new Document(
      2,
      'Document 2',
      'This is the second document',
      'https://www.google.com',
      null
    ),
    new Document(
      3,
      'Document 3',
      'This is the third document',
      'https://www.google.com',
      null
    ),
    new Document(
      4,
      'Document 4',
      'This is the fourth document',
      'https://www.google.com',
      null
    ),
    new Document(
      5,
      'Document 5',
      'This is the fifth document',
      'https://www.google.com',
      null
    ),
    new Document(
      6,
      'Document 6',
      'This is the sixth document',
      'https://www.google.com',
      null
    ),
  ];
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  constructor() {}
}
