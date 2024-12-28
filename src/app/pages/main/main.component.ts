import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { CarouselModule } from '@coreui/angular';

@Component({
  selector: 'app-main',
  imports: [RouterLink, CommonModule, MatDividerModule, CarouselModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  items = [
    {
      image: 'action1.jpg',
      title: 'First Slide',
      description: 'This is the first slide',
    },
    {
      image: 'action2.jpg',
      title: 'Second Slide',
      description: 'This is the second slide',
    },
    {
      image: 'action3.jpg',
      title: 'Third Slide',
      description: 'This is the third slide',
    },
  ];
  activeIndex = 0;

  constructor() {}

  ngOnInit() {}

  prev() {
    this.activeIndex =
      this.activeIndex > 0 ? this.activeIndex - 1 : this.items.length - 1;
  }

  next() {
    this.activeIndex =
      this.activeIndex < this.items.length - 1 ? this.activeIndex + 1 : 0;
  }

  goToSlide(index: number) {
    this.activeIndex = index;
  }
}
