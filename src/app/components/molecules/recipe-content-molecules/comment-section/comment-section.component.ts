import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommentInputComponent } from '../../../atoms/recipe-content-atoms/comment-input/comment-input.component';
import { CommentZoneComponent } from '../../../atoms/recipe-content-atoms/comment-zone/comment-zone.component';
import { AuthService } from '../../../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommentService, Comment } from '../../../../services/ratingservice';
import { map } from 'rxjs/operators';

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
  isLoading = true;
  error: string | null = null;

  currentUser: { id: number; pseudouser: string } | null = null;
  private currentUserSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      if (status) {
        // Récupère l'utilisateur connecté via /users/me
        if (this.currentUserSubscription) {
          this.currentUserSubscription.unsubscribe();
        }
        this.currentUserSubscription = this.authService.getCurrentUser().subscribe(user => {
          this.currentUser = user;
        });
      } else {
        this.currentUser = null;
      }
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
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Méthode pour soumettre un commentaire
  onCommentSubmitted(commentData: { content: string; rating: number }): void {
    if (!this.recipeId) return;

    // DEBUG
    console.log('currentUser', this.currentUser);
    console.log('comments', this.comments);

    const existing = this.currentUser
      ? this.comments.find(c => c.user_id === this.currentUser!.id)
      : null;

    if (existing) {
      // Remplacer le commentaire existant (PUT)
      this.commentService.updateComment(this.recipeId, commentData).subscribe({
        next: (updatedComment) => {
          this.comments = this.comments.map(c =>
            c.user_id === updatedComment.user_id ? updatedComment : c
          );
        },
        error: (err) => {
          console.error('Failed to update comment', err);
          alert(err.message || 'Erreur lors de la modification de votre avis.');
        }
      });
    } else {
      // Ajouter un nouveau commentaire (POST)
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
}