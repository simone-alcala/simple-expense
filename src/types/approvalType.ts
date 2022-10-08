import { Approval } from '@prisma/client';

export type CreateApprovalType = Omit<Approval, 'id' | 'createdDate' >;

export type ControllerApprovalType = Omit<CreateApprovalType, 'requestId' | 'approverId'>;

export type ApprovalStatus = 'APPROVED' | 'REJECTED' | 'REVIEW';
