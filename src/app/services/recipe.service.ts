import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private apiUrl = 'http://localhost:8000/recipe';

    constructor(private http: HttpClient) {}

    getAllRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}/allrecipe`);
    }

    getRecipeById(id: number): Observable<Recipe | null> {
        return this.http.get<Recipe>(`${this.apiUrl}/${id}`).pipe(
            catchError(() => of(null))
        );
    }
}