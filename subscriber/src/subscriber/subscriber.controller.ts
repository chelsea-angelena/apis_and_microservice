import {
  Controller,
  Param,
  Delete,
  Patch,
  Post,
  Body,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { SubscribersService } from './subscriber.service';
import { UpdateSubscriberDto, CreateSubscriberDto } from './dto/subscriber.dto';

@Controller('subscribers')
@UseInterceptors(ClassSerializerInterceptor)
export class SubscribersController {
  constructor(private subService: SubscribersService) {}

  // Listens to and receives data from the microservice
  @EventPattern('Hello')
  async hello(data) {
    console.log(data);
  }

  //CRUD OPS:

  @Get()
  async getSubscribers() {
    return await this.subService.getAll();
  }
  @Get('id')
  async getSubscriber(@Param('id') id: number) {
    return await this.subService.getOne(id);
  }
  @Patch('id')
  async update(@Param('id') id: number, @Body() data: UpdateSubscriberDto) {
    return await this.update(id, data);
  }

  @Delete('id')
  async delete(@Param('id') id: number) {
    return await this.delete(id);
  }

  @Post()
  async createSubscriber(@Body() data: CreateSubscriberDto) {
    return await this.subService.addSubscriber(data);
  }
}
