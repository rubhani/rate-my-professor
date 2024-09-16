import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private reviewModel: Model<Review>) {}

  // Create a new review
  async createReview(professorId: string, comment: string): Promise<Review> {
    const newReview = new this.reviewModel({ professorId, comment });
    return newReview.save();
  }

  // Find all reviews for a professor
  async findReviewsByProfessor(professorId: string): Promise<Review[]> {
    return this.reviewModel.find({ professorId }).exec();
  }
}
