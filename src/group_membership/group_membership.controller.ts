import { Controller } from '@nestjs/common';
import { GroupMembershipService } from './group_membership.service';

@Controller('group-membership')
export class GroupMembershipController {
  constructor(private readonly groupMembershipService: GroupMembershipService) {}
}
