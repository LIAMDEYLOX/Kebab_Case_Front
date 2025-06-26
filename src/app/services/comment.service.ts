import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

// C'est l'interface partagée que tout le monde doit utiliser.
export interface Comment {
    id: number;
    author: string;
    content: string | null;
    rating: number;
    user_id: number;
    // La date vient de l'API sous forme de chaîne de caractères (string).
    date?: string; 
    }

    @Injectable({
    providedIn: 'root'
    })
    export class CommentService {
    private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getComments(recipeId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.apiUrl}/recipe/${recipeId}/ratings`)
        .pipe(
            catchError(this.handleError)
        );
    }

    addComment(recipeId: number, commentData: { content: string; rating: number }): Observable<Comment> {
        const token = this.authService.getToken();
        if (!token) {
        return throwError(() => new Error('User not authenticated. Cannot add comment.'));
        }

        const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        });

        return this.http.post<Comment>(`${this.apiUrl}/recipe/${recipeId}/ratings`, commentData, { headers })
        .pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        console.error('An error occurred in CommentService:', error);
        let errorMessage = 'Impossible de charger les avis. Veuillez réessayer plus tard.';
        if (error.status === 404) {
        errorMessage = 'La ressource demandée n\'a pas été trouvée.';
        } else if (error.status === 401) {
        errorMessage = 'Vous devez être connecté pour effectuer cette action.';
        }
        return throwError(() => new Error(errorMessage));
    }
}