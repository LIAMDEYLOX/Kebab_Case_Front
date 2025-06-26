import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommentInputComponent } from '../../../atoms/recipe-content-atoms/comment-input/comment-input.component';
import { CommentZoneComponent } from '../../../atoms/recipe-content-atoms/comment-zone/comment-zone.component';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommentService, Comment } from '../../../../services/comment.service';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    CommonModule,
    CommentInputComponent,
    CommentZoneComponent
  ],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent implements OnInit, OnDestroy {
  @Input() recipeId!: number;
  isAuthenticated = false;
  comments: Comment[] = [];
  private authSubscription?: Subscription;

  // Propriétés manquantes à ajouter
  isLoading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService // Assurez-vous que ce service est injecté
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
    });

    if (this.recipeId) {
      this.loadComments();
    }
  }

  // Méthode pour charger les commentaires
  loadComments(): void {
    this.isLoading = true;
    this.error = null;
    this.commentService.getComments(this.recipeId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load comments', err);
        this.error = 'Impossible de charger les avis.';
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Méthode pour soumettre un commentaire
  onCommentSubmitted(commentData: { content: string; rating: number }): void {
    if (!this.recipeId) return;

    this.commentService.addComment(this.recipeId, commentData).subscribe({
      next: (newComment) => {
        this.comments.unshift(newComment);
      },
      error: (err) => {
        console.error('Failed to submit comment', err);
        alert(err.message || 'Erreur lors de la publication de votre avis.');
      }
    });
  }
}