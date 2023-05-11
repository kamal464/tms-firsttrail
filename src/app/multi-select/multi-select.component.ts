import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit {
  names = ['Kamal', 'Adi', 'Varshini', 'Vishal'];
  selectedNames = [];
  filteredNames = this.names;
  filterText = '';

  filterFruits() {
    this.filteredNames = this.names.filter((fruit) =>
      fruit.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }
  selectAll() {
    this.selectedNames = [...this.names];
  }

  unselectAll() {
    this.selectedNames = [];
  }
  constructor() {}
  ngOnInit(): void {}
}
