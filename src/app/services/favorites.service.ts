import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface Favorite {
  id_favorites: number;
  id_recipe: number;
  id_users: number;
  created_at: string;
  recipe?: {
    id_recipe: number;
    nom_recipe: string;
    image_recipe: string;
    preparation_time_recipe?: number;
    cooking_time_recipe?: number;
    portions_recipe?: number;
    description_recipe?: string;
    average_rating?: number;
  };
}

export interface FavoriteCreate {
  id_recipe: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiUrl = `${environment.apiUrl}/favorites`;
  private favoritesSubject = new BehaviorSubject<number[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFavorites();
  }

  private getAuthHeaders(): HttpHeaders {
    // Récupérer le token depuis sessionStorage comme dans AuthService
    const tokenStr = sessionStorage.getItem('auth_token');

    if (!tokenStr) {
      console.error('No access token found in sessionStorage');
      this.router.navigate(['/login']);
      throw new Error('No access token');
    }

    try {
      // Parser le token JSON
      const tokenData = JSON.parse(tokenStr);
      const token = tokenData.access_token;

      if (!token) {
        console.error('No access_token in stored data');
        this.router.navigate(['/login']);
        throw new Error('No access token');
      }

      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    } catch (error) {
      console.error('Error parsing token:', error);
      this.router.navigate(['/login']);
      throw new Error('Invalid token format');
    }
  }

  private handleAuthError = (error: any): Observable<never> => {
    console.error('Auth error in favorites service:', error);
    if (error.status === 401) {
      // Nettoyer le bon emplacement du token
      sessionStorage.removeItem('auth_token');
      this.router.navigate(['/login']);
    }
    return throwError(() => error);
  };

  // Charger tous les favoris de l'utilisateur
  getUserFavorites(): Observable<Favorite[]> {
    try {
      return this.http.get<Favorite[]>(`${this.apiUrl}/`, {
        headers: this.getAuthHeaders()
      }).pipe(
        catchError(this.handleAuthError)
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Charger et mettre à jour la liste locale des favoris
  loadUserFavorites(): void {
    // Vérifier le token dans sessionStorage au lieu de localStorage
    const tokenStr = sessionStorage.getItem('auth_token');
    if (!tokenStr) {
      console.log('No token found in sessionStorage, skipping favorites loading');
      return;
    }

    try {
      const tokenData = JSON.parse(tokenStr);
      if (!tokenData.access_token) {
        console.log('No access_token in stored data, skipping favorites loading');
        return;
      }
    } catch (error) {
      console.log('Invalid token format, skipping favorites loading');
      return;
    }

    this.getUserFavorites().subscribe({
      next: (favorites) => {
        const favoriteIds = favorites.map(fav => fav.id_recipe);
        this.favoritesSubject.next(favoriteIds);
        console.log('Favoris chargés:', favoriteIds);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des favoris:', error);
        this.favoritesSubject.next([]);
      }
    });
  }

  // Ajouter une recette aux favoris
  addToFavorites(recipeId: number): Observable<any> {
    const favoriteData: FavoriteCreate = { id_recipe: recipeId };

    try {
      return this.http.post<any>(`${this.apiUrl}/`, favoriteData, {
        headers: this.getAuthHeaders()
      }).pipe(
        tap((response) => {
          const currentFavorites = this.favoritesSubject.value;
          if (!currentFavorites.includes(recipeId)) {
            this.favoritesSubject.next([...currentFavorites, recipeId]);
          }
        }),
        catchError((error) => {
          console.error('Error in addToFavorites:', error);
          return this.handleAuthError(error);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Supprimer une recette des favoris
  removeFromFavorites(recipeId: number): Observable<{ message: string }> {
    try {
      return this.http.delete<{ message: string }>(`${this.apiUrl}/${recipeId}`, {
        headers: this.getAuthHeaders()
      }).pipe(
        tap(() => {
          const currentFavorites = this.favoritesSubject.value;
          const updatedFavorites = currentFavorites.filter(id => id !== recipeId);
          this.favoritesSubject.next(updatedFavorites);
        }),
        catchError(this.handleAuthError)
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  // Vérifier si une recette est en favoris
  isFavorite(recipeId: number): boolean {
    return this.favoritesSubject.value.includes(recipeId);
  }

  // Toggle favori (ajouter ou supprimer)
  toggleFavorite(recipeId: number): Observable<any> {
    if (this.isFavorite(recipeId)) {
      return this.removeFromFavorites(recipeId);
    } else {
      return this.addToFavorites(recipeId);
    }
  }

  // Vérifier le statut favori depuis le serveur
  checkFavoriteStatus(recipeId: number): Observable<{ is_favorite: boolean }> {
    return this.http.get<{ is_favorite: boolean }>(`${this.apiUrl}/check/${recipeId}`, {
      headers: this.getAuthHeaders()
    });
  }
}
