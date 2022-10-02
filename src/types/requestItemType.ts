import { RequestItem } from '@prisma/client';

export type CreateRequestItemType = Omit<RequestItem, 'id'>;

export type ControllerRequestItemType = Omit<RequestItem, 'id' | 'requestId'>;