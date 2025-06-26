import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importer l'interface partagée depuis le service
import { Comment } from '../../../../services/comment.service';

@Component({
  selector: 'app-comment-zone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-zone.component.html',
  styleUrl: './comment-zone.component.scss'
})
export class CommentZoneComponent {
  @Input() comments: Comment[] = []; // <-- Maintenant, ceci utilise la bonne interface

  getStars(rating: number): string[] {
    // Amélioration : on arrondit la note pour afficher le bon nombre d'étoiles pleines
    return Array(5).fill('').map((_, i) => i < Math.round(rating) ? '★' : '☆');
  }
}
