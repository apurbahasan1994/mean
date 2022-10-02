import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() pagination;
  arr = new Set()
  @Output() paginationButtonClicked = new EventEmitter()
  currentPage = 1;
  constructor() { }

  ngOnInit(): void {
  }
  onClick(index) {
    debugger
    this.currentPage = index
    this.paginationButtonClicked.emit(index)
  }
  ngOnChanges() {
    if (this.pagination) {
      console.log(this.pagination.lastPage)
      for (let i = 0; i < this.pagination.lastPage; i++) {
        this.arr.add(i)
      }
    }
  }
  prevClicked() {
    const index = this.pagination.page - 1
    this.onClick(index)
  }
  nextClicked() {
    const index = this.pagination.page + 1
    this.onClick(index)
  }


}
