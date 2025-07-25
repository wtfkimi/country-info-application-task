import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '../infrastructure/decorators/current-user.decorator';
import { EventUserDto } from './dto/user.dto';
import { AddEventHolidayResponse, AddEventToOtherUserForbiddenResponse } from './swagger/user.swagger';
import { UserId } from './type/user.type';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiParam({ name: 'userId' })
  @ApiBody({
    type: EventUserDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AddEventHolidayResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    type: AddEventToOtherUserForbiddenResponse,
  })
  @Post('/:userId/calendar/holidays')
  async addEventHolidayToUser(
    @Param() param: UserId,
    @Body() eventDto: EventUserDto,
    @CurrentUser('id') userId: number,
  ) {
    return await this.userService.addNationalDayToUser({ idChange: param.userId, userId, eventDto });
  }
}
