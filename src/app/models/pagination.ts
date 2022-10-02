class Pagination {
  itemsPerPage: number;
  totalitems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pageNumber: number;
  previousPage: number;
  nextPage: number;
  lastPage: number
  constructor(itemsPerPage,
    totalitems,
    hasNextPage,
    hasPrevPage,
    pageNumber, previousPage, nextPage, lastPage) {
    this.totalitems = totalitems;
    this.hasPrevPage = hasPrevPage;
    this.hasNextPage = hasNextPage;
    this.pageNumber = pageNumber;
    this.itemsPerPage = itemsPerPage;
    this.previousPage = previousPage;
    this.nextPage = nextPage,
      this.lastPage = lastPage
  }
}
