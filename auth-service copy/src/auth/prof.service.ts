import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prof } from './schemas/prof.schema';

@Injectable()
export class ProfService {
  constructor(
    @InjectModel(Prof.name) private profModel: Model<Prof>
  ) { }

  async addProf(name: string, institution: string): Promise<any> {
    try {
      const newProf = new this.profModel({ name, institution });
      return newProf.save();
    } catch (e) {
      throw (e)
    }
  }
  async getProfs(limit: number) {
    return this.profModel.find().limit(limit).exec();
  }
  async findProf(id: string): Promise<Prof> {
    const professor = await this.profModel.findById(id).exec();
    if (!professor) {
      throw new NotFoundException(`Professor with ID ${id} not found`);
    }
    return professor;
  }
}
