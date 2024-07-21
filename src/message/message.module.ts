import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MESSAGE_MODEL } from 'src/constants';
import { messageSchema } from './message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MESSAGE_MODEL,
        schema: messageSchema,
      },
    ]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
