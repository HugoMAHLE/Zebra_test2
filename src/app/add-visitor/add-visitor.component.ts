import { Component, OnInit, ViewChild } from '@angular/core';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Visitor } from './visitor.model';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.css']
})
export class AddVisitorComponent implements OnInit {
  displayedColumns: string[] = ['select', 'Name', 'LName', 'Email', 'Phone', 'Company', 'actions'];
  dataSource = new MatTableDataSource([]);
  selectedVisitors: Visitor[] = [];  // Store selected visitors
  totalLength = 0;
  apiURL = environment.api_URL;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit(): void {
    this.fetchVisitors();
  }

  async fetchVisitors() {
    try {
      const response = await axios.get(this.apiURL + "visitor/all");
      if (response.data.ok) {
        const visitors = response.data.msg; // Assuming 'msg' contains the array of visitors
        this.dataSource.data = visitors;
        this.totalLength = visitors.length;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        console.error('Error fetching visitors:', response.data.msg);
      }
    } catch (error) {
      console.error('Error fetching visitors:', error);
    }
  }

  onSelectionChange(row: Visitor, event: MatCheckboxChange): void {
    row.isSelected = event.checked;
    if (row.isSelected) {
      this.selectedVisitors.push(row);  // Add to selected visitors list
    } else {
      this.selectedVisitors = this.selectedVisitors.filter(visitor => visitor !== row); // Remove from selected visitors list
    }
    console.log('Selected visitors:', this.selectedVisitors);
  }

  addSelectedVisitorsToTable() {
    // Here you can pass the selected visitors to the parent component
    console.log('Adding selected visitors to the parent table:', this.selectedVisitors);
    // This is just a log; you will now handle the actual data update in the parent component.
  }
}
