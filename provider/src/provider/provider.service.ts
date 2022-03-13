import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entity/provider.entity';
import { UpdateProviderDto, CreateProviderDto } from './dto/provider.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private readonly provRepository: Repository<Provider>,
  ) {}

  async getAll() {
    return await this.provRepository.find();
  }

  async getOne(id: number) {
    return await this.provRepository.findOne(id);
  }

  async update(id: number, data: UpdateProviderDto) {
    return await this.provRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.provRepository.delete(id);
  }

  async addSubscriber(data: CreateProviderDto) {
    return await this.provRepository.save(this.provRepository.create(data));
  }
}
