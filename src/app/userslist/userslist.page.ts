import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.page.html',
  styleUrls: ['./userslist.page.scss'],
})
export class UserslistPage implements OnInit {
  characters: any[] = [];
  nextPageUrl: string | null = null;
  previousPageUrl: string | null = null;
  totalPages: number = 0;
  currentPage: number = 1;
  totalCharacters: number = 0;
  charactersPerPage = 10; // El número de caracteres por página

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadCharacters('https://rickandmortyapi.com/api/character');
  }

  loadCharacters(url: string) {
    this.http.get<any>(url).subscribe(response => {
      this.characters = response.results;
      this.nextPageUrl = response.info.next;
      this.previousPageUrl = response.info.prev;
      this.totalPages = response.info.pages;
      this.totalCharacters = response.info.count;
    });
  }

  loadNextPage() {
    if (this.nextPageUrl) {
      this.currentPage++;
      this.loadCharacters(this.nextPageUrl);
    }
  }

  loadPreviousPage() {
    if (this.previousPageUrl) {
      this.currentPage--;
      this.loadCharacters(this.previousPageUrl);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadCharacters(`https://rickandmortyapi.com/api/character?page=${page}`);
    }
  }

  getPageRange(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const visiblePages = 3;
  
    let startPage: number;
    let endPage: number;
  
    if (totalPages <= visiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= Math.floor(visiblePages / 2) + 1) {
        startPage = 1;
        endPage = visiblePages;
      } else if (currentPage + Math.floor(visiblePages / 2) >= totalPages) {
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.floor(visiblePages / 2);
        endPage = currentPage + Math.floor(visiblePages / 2);
      }
    }
  
    const pages: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return pages;
  }
  
}
