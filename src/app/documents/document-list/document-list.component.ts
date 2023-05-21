import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  @Output() documentSelectedEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.documentService.documentSelectedEvent.emit(document);
  }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  constructor(private documentService: DocumentService) {}
}
