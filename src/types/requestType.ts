import { Request } from '@prisma/client';

export type CreateRequestType = Omit<Request, 'id' | 'createdDate' | 'status' | 'amount'>;

export type ControllerRequestType = Omit<CreateRequestType, 'requesterId'>;

export type requestStatus =
  'OPEN'      |
  'SENT'      |
  'APPROVED'  |
  'REJECTED'  |
  'CANCELED';
