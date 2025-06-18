import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Recipe {
    idRecipe: number;
    nameRecipe: string;
    preparationTimeRecipe: number;
    cookingTimeRecipe: number;
    portionsRecipe: number;
    descriptionRecipe: string;
    userName: string;
    averageRating: number;
    ingredients: RecipeIngredient[];
}

export interface RecipeIngredient {
    ingredient: Ingredient;
    quantity: string;
}

export interface Ingredient {
    id_ingredients: number;
    name_ingredients: string;
    id_categorie: number;
}

export interface SearchResult {
    recipes: Recipe[];
    total: number;
}

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private apiUrl = `${environment.apiUrl}/recipe`;

    constructor(private http: HttpClient) {}

    getAllRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/allrecipe`);
    }

    getRecipeById(id: number): Observable<Recipe | null> {
        return this.http.get<Recipe>(`${this.apiUrl}/${id}`).pipe(
            catchError(() => of(null))
        );
    }

    /**
     * Search recipes by query string
     * @param query The search query
     * @param limit Optional limit for number of results
     * @returns Observable of SearchResult
     */
    searchRecipes(query: string, limit: number = 10): Observable<SearchResult> {
        // If query is empty, return empty result
        if (!query.trim()) {
            return of({ recipes: [], total: 0 });
        }

        // Set up query parameters
        let params = new HttpParams()
            .set('query', query.trim())
            .set('limit', limit.toString());

        // Make the API call
        return this.http.get<Recipe[]>(`${this.apiUrl}/search`, { params })
            .pipe(
                map((recipes: Recipe[]) => ({
                    recipes: recipes,
                    total: recipes.length
                })),
                catchError(error => {
                    console.error('Error searching recipes:', error);
                    return of({ recipes: [], total: 0 });
                })
            );
    }
}
