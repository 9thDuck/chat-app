import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CONVERSATION_MODEL } from 'src/constants';
import { conversationSchema } from './conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CONVERSATION_MODEL, schema: conversationSchema },
    ]),
  ],
  providers: [ConversationService],
  controllers: [ConversationController],
})
export class ConversationModule {}
