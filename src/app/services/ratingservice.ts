import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

// Interface front adaptée à la réponse API
export interface Comment {
    id: number;
    author: string;
    content: string | null;
    rating: number;
    user_id: number;
    date?: string;
}

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private apiUrl = 'http://localhost:8000';

    constructor(private http: HttpClient, private authService: AuthService) { }

    getComments(recipeId: number): Observable<Comment[]> {
        return this.http.get<any[]>(`${this.apiUrl}/recipe/${recipeId}/ratings`)
            .pipe(
                map(apiComments => apiComments.map(apiComment => ({
                    id: apiComment.id_rating,
                    author: apiComment.author,
                    content: apiComment.comment_rating,
                    rating: apiComment.rating_rating,
                    user_id: apiComment.id_users,
                    date: apiComment.created_at
                }))),

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

        // Adapter le body pour l'API (comment -> comment)
        const body = {
            rating: commentData.rating,
            comment: commentData.content
        };

        return this.http.post<any>(`${this.apiUrl}/recipe/${recipeId}/ratings`, body, { headers })
            .pipe(
                map(apiComment => ({
                    id: apiComment.id_rating,
                    author: apiComment.author,
                    content: apiComment.comment_rating,
                    rating: apiComment.rating_rating,
                    user_id: apiComment.id_users,
                    date: apiComment.created_at
                })),
                catchError(this.handleError)
            );
    }

    updateComment(recipeId: number, commentData: { content: string; rating: number }): Observable<Comment> {
        const token = this.authService.getToken();
        if (!token) {
            return throwError(() => new Error('User not authenticated. Cannot update comment.'));
        }

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        });

        const body = {
            rating: commentData.rating,
            comment: commentData.content
        };

        return this.http.put<any>(`${this.apiUrl}/recipe/${recipeId}/ratings`, body, { headers })
            .pipe(
                map(apiComment => ({
                    id: apiComment.id_rating,
                    author: apiComment.author,
                    content: apiComment.comment_rating,
                    rating: apiComment.rating_rating,
                    user_id: apiComment.id_users,
                    date: apiComment.created_at
                })),
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