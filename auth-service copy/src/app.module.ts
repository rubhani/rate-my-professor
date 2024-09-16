import { Module } from '@nestjs/common';
import { ProfModule } from './auth/prof.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModule } from './auth/review.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/rmpReviews'),
    ProfModule,
    ReviewModule, // Register the review module
  ],
})
export class AppModule {}
