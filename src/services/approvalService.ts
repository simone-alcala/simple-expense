import * as repository from '../repositories/approvalRepository';
import { CreateApprovalType, ControllerApprovalType } from '../types/approvalType';
import { requestStatus } from '../types/requestType';
import * as throwError from './../utils/errorUtils';
import * as requestService from './requestService';

export async function create(data: ControllerApprovalType, currentUserId: number, requestIdString: string) {
  await findRequestOrFail(requestIdString);
  const requestId = Number(requestIdString);
  
  const newApproval : CreateApprovalType = {
    ...data,
    comment: data.comment.toUpperCase(),
    approverId: currentUserId,
    status: data.status.toUpperCase() as requestStatus,
    requestId
  }
  const result = await repository.insert(newApproval);
  return { requestId: result.id };
}

async function findRequestOrFail(requestIdString: string) {
  if (isNaN(Number(requestIdString))) {
    throw throwError.badRequest('Request ID not found');
  }
  const result = await requestService.findById(Number(requestIdString));
  if (!result) {
    throw throwError.badRequest('Request ID not found');
  }
  if (result.status !== 'SENT') {
    throw throwError.badRequest('Request is unavailable');
  }

}
