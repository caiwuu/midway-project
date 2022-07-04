import { Controller, Get } from '@midwayjs/decorator';
import { ReportMiddleware } from '../middleware/report.middleware';

@Controller('/')
export class HomeController {
  @Get('/', { middleware: [ReportMiddleware] })
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
