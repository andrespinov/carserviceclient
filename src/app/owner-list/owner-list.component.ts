import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  tableColumns: string[] = ['dni', 'name', 'profession', 'actions'];
  owners: Array<any> = [];
  checkedOwners: Array<any> = [];

  constructor(
    private ownerService: OwnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      console.log(data)
      this.owners = data._embedded.owners.map(_owner => {
        const href = _owner._links.self.href
        const hrefSplit = href.split('/');
        _owner.id = hrefSplit[hrefSplit.length - 1];
        _owner.href = href
        return _owner;
      });
    });
  }

  isOwnerChecked(owner: any) {
    return this.checkedOwners.filter(_owner => _owner.id === owner.id).length > 0
  }

  checkOwner(owner: any, checked: boolean) {
    if (checked) {
      this.checkedOwners.push(owner)
    } else {
      this.checkedOwners.filter(_owner => _owner.id !== owner.id)
    }
  }

  deleteCheckedOwners() {
    console.log('deleteee')
    this.ownerService.removeMultiple(this.checkedOwners.map(owner => owner.href)).subscribe(result => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/owner-list']);
    }, error => console.error(error));
  }
}
