import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('summarize')
  async summarize(@Body() reviews: string[]) {
    console.log('in controller')
    return this.aiService.generateSummary(reviews);
  }
}
