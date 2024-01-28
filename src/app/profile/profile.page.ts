import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  character: any = {};
  episodes: any[] = [];
  episodeVisible: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const characterId = this.activatedRoute.snapshot.paramMap.get('id');

    // Obtener detalles del personaje
    this.http.get<any>(`https://rickandmortyapi.com/api/character/${characterId}`)
      .subscribe(characterResponse => {
        this.character = characterResponse;

        // Para cada URL de episodio en character.episode, realizar una solicitud HTTP
        this.character.episode.forEach((episodeUrl: string) => {
          this.http.get<any>(episodeUrl)
            .subscribe(episodeResponse => {
              this.episodes.push(episodeResponse);
            });
        });
      });
  }
  
  loadEpisodes() {
    this.character.episode.forEach((episodeUrl: string) => {
      this.http.get<any>(episodeUrl).subscribe((episode) => {
        this.episodes.push(episode);
      });
    });
  }

  getStatusIcon(status: string): string {
    // Implementa la lógica para obtener el nombre del ícono según el estado (Alive, Dead, unknown)
    // Por ejemplo:
    return status === 'Alive' ? 'heart' : status === 'Dead' ? 'skull' : 'help';
  }

  getStatusColor(status: string): string {
    // Implementa la lógica para obtener el color del ícono según el estado (Alive, Dead, unknown)
    // Por ejemplo:
    return status === 'Alive' ? 'success' : status === 'Dead' ? 'danger' : 'warning';
  }

  toggleEpisodeVisibility() {
    this.episodeVisible = !this.episodeVisible;
  }
}

