import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { ProfService } from './prof.service';

@Controller('prof')
export class ProfController {
  constructor(private profService: ProfService) { }

  @Post('addProf')
  async addProf(@Body() body: { name: string; institution: string }) {
    try {
      return await this.profService.addProf(body.name, body.institution);
    } catch(e){
      return {
        status: 500,
        data: {},
        message: e
      }
    }
  }
  @Get('getProfs')
  async getProfs(@Query('limit') limit: number = 10) {
    return await this.profService.getProfs(limit);
  }
  @Get('getProf/:id')
  async getReviewsByProfessor(@Param('id') professorId: string) {
    return this.profService.findProf(professorId);
  }
}
