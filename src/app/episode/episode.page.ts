import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.page.html',
  styleUrls: ['./episode.page.scss'],
})
export class EpisodePage implements OnInit {
  episode: any = {};
  characters: any[] = [];
  characterVisible: boolean = false;
  
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const episodeId = this.activatedRoute.snapshot.paramMap.get('id');
    // Obtener detalles del episodio
    this.http.get<any>(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .subscribe(episodeResponse => {
        this.episode = episodeResponse;
        // Obtener personajes asociados al episodio
        this.getCharacters(this.episode.characters);
      });
  }

  // Obtener detalles de los personajes
  getCharacters(characterUrls: string[]) {
    characterUrls.forEach(url => {
      this.http.get<any>(url)
        .subscribe(characterResponse => {
          this.characters.push(characterResponse);
        });
    });
  }

  toggleCharacterVisibility() {
    this.characterVisible = !this.characterVisible;
  }
}
