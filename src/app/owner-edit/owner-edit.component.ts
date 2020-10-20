import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit, OnDestroy {
  owner: any = {};

  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ownerService: OwnerService,
    private carService: CarService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.ownerService.get(id).subscribe((owner: any) => {
          if (owner) {
            this.owner = owner;
            this.owner.href = owner._links.self.href;
          } else {
            console.log(`Owner with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.carService.getAll().subscribe(data => {
      const cars = data;
      const carsWithCurrentOwner = cars.filter((car: any) => this.owner.dni === car.ownerDni);
      this.ownerService.remove(href).subscribe(result => {
        if (carsWithCurrentOwner.length) {
          this.carService.removeCarsOwners(carsWithCurrentOwner).subscribe(() => {}, error => console.error(error))
        }
        this.gotoList();
      }, error => console.error(error));
    })
  }
}

