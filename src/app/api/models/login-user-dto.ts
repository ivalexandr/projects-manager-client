/* tslint:disable */
/* eslint-disable */
export interface LoginUserDto {
  email: string;

  /**
   * Password must be between 3 and 20 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.
   */
  password: string;
}
