import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { LoggerModule } from 'configs/logger/logger.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './configs/app/config.module';
import { DatabaseModule } from './configs/database/database.module';
import { UserModule } from './models/user/user.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { TodoModule } from './models/todo/todo.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    LoggerModule,
    UserModule,
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
