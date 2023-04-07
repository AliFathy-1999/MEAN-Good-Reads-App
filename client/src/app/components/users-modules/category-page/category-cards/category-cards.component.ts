import { Component } from '@angular/core';

@Component({
  selector: 'app-category-cards',
  templateUrl: './category-cards.component.html',
  styleUrls: ['./category-cards.component.css'],
})
export class CategoryCardsComponent {
  categories = [
    { id: 1, name: 'Science Fiction', icon: 'science' },
    { id: 2, name: 'Fantasy', icon: 'terrain' },
    { id: 3, name: 'Mystery', icon: 'mystery' },
    { id: 4, name: 'Romance', icon: 'favorite' },
    { id: 5, name: 'Thriller', icon: 'dangerous' },
    { id: 6, name: 'Historical Fiction', icon: 'history' },
  ];
}
