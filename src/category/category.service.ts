import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  async loadChannelByCategory(category: string, period = 7) {
    const string = `Category: ${category} Period: ${period}`;
    return string;
  }
}
