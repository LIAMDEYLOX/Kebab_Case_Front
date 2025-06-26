import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-input.component.html',
  styleUrl: './comment-input.component.scss'
})
export class CommentInputComponent {
  @Output() commentSubmitted = new EventEmitter<{ content: string; rating: number }>();
  
  newComment = {
    content: '',
    rating: 5
  };

  submitComment(): void {
    if (!this.newComment.content.trim()) {
      return;
    }

    this.commentSubmitted.emit({
      content: this.newComment.content,
      rating: this.newComment.rating
    });

    // Reset du formulaire
    this.newComment = {
      content: '',
      rating: 5
    };
  }
}
