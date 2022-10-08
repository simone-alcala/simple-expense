import Joi from 'joi';
import { ControllerApprovalType } from './../types/approvalType';

export const createApproval = Joi.object<ControllerApprovalType>({
  comment: Joi.string().trim().required(),
  status: Joi.string().trim().uppercase().valid('APPROVED', 'REJECTED', 'REVIEW').required(),
});

