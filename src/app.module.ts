import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './configValidation.schema';
import { UserModule } from './user/user.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      cache: true,
      validationSchema: configValidationSchema,
    }),
    DatabaseModule,
    UserModule,
    ConversationModule,
    MessageModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
