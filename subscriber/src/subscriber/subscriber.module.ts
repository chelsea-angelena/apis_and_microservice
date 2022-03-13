import { Module } from '@nestjs/common';
import { SubscribersService } from './subscriber.service';
import { SubscribersController } from './subscriber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './entity/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscriberModule {}
