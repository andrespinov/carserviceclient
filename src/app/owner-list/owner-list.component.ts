import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { GiphyService } from '../shared/giphy/giphy.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  tableColumns: string[] = ['dni', 'name', 'profession', 'actions'];
  owners: Array<any>;

  constructor(private ownerService: OwnerService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      console.log(data)
      this.owners = data._embedded.owners;
    });
  }
}