import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../../services/ratingservice';

@Component({
  selector: 'app-comment-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-zone.component.html',
  styleUrl: './comment-zone.component.scss'
})
export class CommentZoneComponent {
  @Input() comments: Comment[] = []; // <-- Maintenant, ceci utilise la bonne interface
  @Input() currentUser: { id: number; pseudouser: string } | null = null;

  getStars(rating: number): string[] {
    // Affiche le bon nombre d'étoiles pleines selon la note (arrondi à l'entier inférieur)
    const fullStars = Math.floor(rating);
    const stars = Array(fullStars).fill('★').concat(Array(5 - fullStars).fill('☆'));
    return stars;
  }
}
