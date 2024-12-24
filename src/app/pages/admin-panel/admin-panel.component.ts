import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule, MatDividerModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit{
  constructor(private dataService: DataService) {}

  ngOnInit() {
    console.dir(this.dataService.getCurrentUser())
  }
}
