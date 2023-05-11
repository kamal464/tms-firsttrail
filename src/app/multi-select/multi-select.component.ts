import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  fruits = ['Apple', 'Banana', 'Cherry', 'Kiwi', 'Orange'];
  selectedFruits = [];
  filteredFruits = this.fruits;
  filterText = '';
  
  filterFruits() {
    this.filteredFruits = this.fruits.filter(fruit => fruit.toLowerCase().includes(this.filterText.toLowerCase()));
  }
  selectAll() {
    this.selectedFruits = [...this.fruits];
  }
  
  unselectAll() {
    this.selectedFruits = [];
  }
  constructor(){}
ngOnInit(): void {
    
}

}
