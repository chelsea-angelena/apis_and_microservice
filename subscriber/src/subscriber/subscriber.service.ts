import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './entity/subscriber.entity';
import { UpdateSubscriberDto, CreateSubscriberDto } from './dto/subscriber.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subRepository: Repository<Subscriber>,
  ) {}

  async getAll() {
    return await this.subRepository.find();
  }

  async getOne(id: number) {
    return await this.subRepository.findOne(id);
  }

  async update(id: number, data: UpdateSubscriberDto) {
    return await this.subRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.subRepository.delete(id);
  }

  async addSubscriber(data: CreateSubscriberDto) {
    return await this.subRepository.save(this.subRepository.create(data));
  }
}
