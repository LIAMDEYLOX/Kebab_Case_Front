import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CreateRecipeService {
  constructor(private http: HttpClient) {}

  createRecipe(recipe: any): Observable<any> {
    return this.http.post('/api/recipe', recipe);
  }
}
