import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { RecipeService, Recipe, SearchResult } from '../../../../services/recipe.service';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss'
})
export class SearchInputComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  searchResults: Recipe[] = [];
  isLoading: boolean = false;
  showResults: boolean = false;
  private searchSubject = new Subject<string>();
  private subscription = new Subscription();

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to search subject with debounce
    const searchSubscription = this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after the last event before emitting
      distinctUntilChanged(), // Only emit if value is different from previous
      switchMap(query => {
        this.isLoading = true;
        return this.recipeService.searchRecipes(query);
      })
    ).subscribe({
      next: (result: SearchResult) => {
        this.searchResults = result.recipes;
        this.isLoading = false;
        this.showResults = true;
      },
      error: (error) => {
        console.error('Error searching recipes:', error);
        this.isLoading = false;
        this.searchResults = [];
      }
    });

    this.subscription.add(searchSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // Method called when user types in the search input
  onSearchInput(): void {
    this.searchSubject.next(this.searchQuery);
    
    // Si il y a une recherche, naviguer vers all-recipes
    if (this.searchQuery.trim()) {
      this.router.navigate(['/all-recipes'], { 
        queryParams: { search: this.searchQuery.trim() } 
      });
    } else {
      // Si la recherche est vide, retourner à home
      this.router.navigate(['/home']);
    }
  }

  // Method to clear search and hide results
  clearSearch(): void {
    this.searchQuery = '';
    this.showResults = false;
    this.searchResults = [];
    // Retourner à la home si on efface la recherche
    this.router.navigate(['/home']);
  }

  // Method to hide results when clicking outside
  hideResults(): void {
    setTimeout(() => {
      this.showResults = false;
    }, 200); // Small delay to allow click on result
  }
}
