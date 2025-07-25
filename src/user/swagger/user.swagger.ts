import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionFilterSwagger } from '../../infrastructure/exception.filter';

export class AddEventHolidayResponse {
  @ApiProperty({
    type: Number,
    required: true,
    description: 'number of events added',
  })
  quantity: number;

  @ApiProperty({
    type: String,
    isArray: true,
    required: true,
    description: 'Name of events added',
  })
  events: string;
}

export class AddEventToOtherUserForbiddenResponse extends HttpExceptionFilterSwagger {
  @ApiProperty({
    type: String,
    description:
      'message: "Not allowed to modify or add other user calendar", statusCode: 403, path: /users/:userId/calendar/holidays',
    required: true,
  })
  message: string;
}
