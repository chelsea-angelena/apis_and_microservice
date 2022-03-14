import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { SubscribersService } from './subscriber.service';
import { UpdateSubscriberDto, CreateSubscriberDto } from './dto/subscriber.dto';

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export class SubscribersController {
  constructor(private subService: SubscribersService) {}

  @MessagePattern({ cmd: 'get-all-subscribers' })
  async getAllSubscribers(msg) {
    console.log(msg);
    const subs = await this.subService.getAll();
    return subs;
  }

  @MessagePattern({ cmd: 'get-single-subscriber' })
  async getSingleSubscriber(data) {
    return await this.subService.getOne(data.id);
  }
  @MessagePattern({ cmd: 'add-subscriber' })
  async createSubscriber(data: CreateSubscriberDto) {
    const subscriber = await this.subService.addSubscriber({
      email: data.email,
      name: data.name,
    });
    return subscriber;
  }

  @MessagePattern({ cmd: 'update-subscriber' })
  async updateSubscriber(data: { id: number; data: UpdateSubscriberDto }) {
    const updated = await this.subService.update(data.id, data.data);
    return updated;
  }

  @MessagePattern({ cmd: 'delete-subscriber' })
  async deleteSubscriber(data) {
    return await this.subService.delete(data);
  }
}
