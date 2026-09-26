import { Injectable } from '@angular/core';
import { UserAuthService } from './api/user/user-auth.service';

/** Must match auth_id values in system_authentications (see schema.sql). */
export const AuthIds = {
  // Generic buttons (optional shared IDs)
  BUTTON_SAVE: 7,
  BUTTON_DELETE: 8,

  // Student module
  STUDENT_VIEW: 10,
  STUDENT_CREATE: 11,
  STUDENT_UPDATE: 12,
  STUDENT_DELETE: 13,

  // Course module
  COURSE_VIEW: 20,
  COURSE_CREATE: 21,
  COURSE_UPDATE: 22,
  COURSE_DELETE: 23,

  // Teacher module
  TEACHER_VIEW: 30,
  TEACHER_CREATE: 31,
  TEACHER_UPDATE: 32,
  TEACHER_DELETE: 33,

//Agent module
  AGENT_VIEW: 40,
  AGENT_CREATE: 41,
  AGENT_UPDATE: 42,
  AGENT_DELETE: 43,

//Landlord module
  LANDLORD_VIEW: 50,
  LANDLORD_CREATE: 51,
  LANDLORD_UPDATE: 52,
  LANDLORD_DELETE: 53,

//Tenant module
  TENANT_VIEW: 60,
  TENANT_CREATE: 61,
  TENANT_UPDATE: 62,
  TENANT_DELETE: 63,

//Property module
  PROPERTY_VIEW: 70,  
  PROPERTY_CREATE: 71,
  PROPERTY_UPDATE: 72,
  PROPERTY_DELETE: 73,


} as const;

@Injectable({ providedIn: 'root' })
export class PermissionHelperService {

  constructor(private userAuthService: UserAuthService) { }

  /** True if the logged-in user has this privilege auth_id. */
  has(authId: number): boolean {
    return this.userAuthService.getAuthIds().includes(authId);
  }

  hasAny(...authIds: number[]): boolean {
    const mine = this.userAuthService.getAuthIds();
    return authIds.some(id => mine.includes(id));
  }
}
