import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  async createReview(
    @Body('professorId') professorId: string,
    @Body('comment') comment: string
  ) {
    return this.reviewService.createReview(professorId, comment);
  }

  @Get('professor/:id')
  async getReviewsByProfessor(@Param('id') professorId: string) {
    return this.reviewService.findReviewsByProfessor(professorId);
  }
}
