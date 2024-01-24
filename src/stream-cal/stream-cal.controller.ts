import { Controller, Get } from '@nestjs/common';

@Controller('streamcal')
export class StreamCalController {
  @Get('/')
  sendStreamCal() {
    return 'hello world!';
  }
}
