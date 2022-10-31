import { Controller } from '@nestjs/common';
import { CreateGroupService } from './create_group.service';

@Controller('create-group')
export class CreateGroupController {
  constructor(private readonly createGroupService: CreateGroupService) {}
}
