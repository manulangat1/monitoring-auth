import { Controller } from '@nestjs/common';
import { MagicLinksService } from './magic-links.service';

@Controller('magic-links')
export class MagicLinksController {
  constructor(private readonly magicLinksService: MagicLinksService) {}
}
