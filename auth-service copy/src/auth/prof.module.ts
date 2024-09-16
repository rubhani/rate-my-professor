import { Module } from '@nestjs/common';
import { ProfService } from './prof.service';
import { ProfController } from './prof.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Prof, ProfSchema } from './schemas/prof.schema';


@Module({
  //nest JwtService is provided by the JwtModule.
  imports: [
    JwtModule.register({
      secret: 'super_key123',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: Prof.name, schema: ProfSchema }]),
  ],
  providers: [ProfService],
  controllers: [ProfController]
})
export class ProfModule {}
