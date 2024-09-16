// import { Module } from '@nestjs/common';
// import { GatewayController } from './gateway.controller';

// @Module({
//   controllers: [GatewayController]
// })
// export class GatewayModule {}
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { RouteMiddleware } from '../route.middleware';

@Module({})
export class GatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RouteMiddleware).forRoutes('*');
  }
}
