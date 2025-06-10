import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import API from '../../API';
import * as qs from 'qs';

// Interface for the user data returned by the API
interface UserResponse {
  pseudouser: string;
  emailuser: string;
  iduser: number;
  idprofile: number;
  verifiedusers: boolean;
  profile?: {
    idprofil: number;
    nameprofil: string;
  };
}

// Interface for the profile data returned by the API
interface ProfileResponse {
  idprofil: number;
  nameprofil: string;
}

// Interface for the login response
interface LoginResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
}

// Interface for the change password request
interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

// Interface for the reset password request
interface ResetPasswordRequest {
  new_password: string;
}

// Interface for the admin create user request
interface AdminCreateUserRequest {
  pseudouser: string;
  emailuser: string;
  password: string;
  idprofile: number;
}

// Interface for the update user request
interface UpdateUserRequest {
  pseudouser?: string;
  emailuser?: string;
  idprofile?: number;
  verifiedusers?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Observable with the registered user data
   */
  register(userData: {
    pseudouser: string,
    emailuser: string,
    password: string
  }): Observable<UserResponse> {
    return new Observable<UserResponse>((observer) => {
      API.post('/users/register', userData)
        .then((response: AxiosResponse<UserResponse>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Login a user
   * @param email User email
   * @param password User password
   * @returns Observable with the login response (access token)
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const data = {
      grant_type: 'password',
      username: email, // API expects email in the username field
      password: password
    };

    // Format data as form-urlencoded
    const formData = qs.stringify(data);

    return new Observable<LoginResponse>((observer) => {
      API.post('/users/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response: AxiosResponse<LoginResponse>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Refresh the access token using a refresh token
   *
   * This method implements token rotation, a security mechanism where each time
   * a refresh token is used, a new refresh token is issued along with a new access token.
   * The old refresh token becomes invalid after use, which enhances security by
   * limiting the window of opportunity for a stolen refresh token to be used.
   *
   * @param refreshToken The refresh token to use (will be invalidated after use)
   * @returns Observable with the new access and refresh tokens
   */
  refreshToken(refreshToken: string): Observable<LoginResponse> {
    const data = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    // Format data as form-urlencoded
    const formData = qs.stringify(data);

    return new Observable<LoginResponse>((observer) => {
      API.post('/refresh-token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response: AxiosResponse<LoginResponse>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Get the current user's information
   * @param retryCount Number of retries if the request fails (default: 1)
   * @returns Observable with the user data
   */
  getCurrentUser(retryCount: number = 1): Observable<UserResponse> {
    return new Observable<UserResponse>((observer) => {
      const makeRequest = (retriesLeft: number) => {
        API.get('/users/me')
          .then((response: AxiosResponse<UserResponse>) => {
            observer.next(response.data);
            observer.complete();
          })
          .catch((error: AxiosError<any>) => {
            // If we have retries left and it's a network error or 401/403, retry
            if (
              retriesLeft > 0 &&
              (
                !error.response ||
                error.response.status === 401 ||
                error.response.status === 403
              )
            ) {
              console.warn(`Error fetching user info, retrying (${retriesLeft} retries left)`, error);
              // Wait a bit before retrying
              setTimeout(() => makeRequest(retriesLeft - 1), 500);
            } else {
              observer.error(error.response ? error.response.data : error);
              observer.complete();
            }
          });
      };

      makeRequest(retryCount);
    });
  }

  /**
   * Get all available profiles
   * @returns Observable with the profiles data
   */
  getProfiles(): Observable<ProfileResponse[]> {
    return new Observable<ProfileResponse[]>((observer) => {
      API.get('/users/profiles')
        .then((response: AxiosResponse<ProfileResponse[]>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Get all users
   * @returns Observable with the users data
   */
  getAllUsers(): Observable<UserResponse[]> {
    return new Observable<UserResponse[]>((observer) => {
      API.get('/users/all')
        .then((response: AxiosResponse<UserResponse[]>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Get a user by ID
   * @param userId The ID of the user to get
   * @returns Observable with the user data
   */
  getUserById(userId: number): Observable<UserResponse> {
    return new Observable<UserResponse>((observer) => {
      API.get(`/users/${userId}`)
        .then((response: AxiosResponse<UserResponse>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Update a user
   * @param userId The ID of the user to update
   * @param userData The data to update
   * @returns Observable with the updated user data
   */
  updateUser(userId: number, userData: UpdateUserRequest): Observable<UserResponse> {
    return new Observable<UserResponse>((observer) => {
      API.put(`/users/${userId}`, userData)
        .then((response: AxiosResponse<UserResponse>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Delete a user
   * @param userId The ID of the user to delete
   * @returns Observable with the response
   */
  deleteUser(userId: number): Observable<void> {
    return new Observable<void>((observer) => {
      API.delete(`/users/${userId}`)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Change the current user's password
   * @param passwordData The password data
   * @returns Observable with the response
   */
  changePassword(passwordData: ChangePasswordRequest): Observable<string> {
    return new Observable<string>((observer) => {
      API.post('/users/change-password', passwordData)
        .then((response: AxiosResponse<string>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Create a new user as an admin
   * @param userData The user data
   * @returns Observable with the created user data
   */
  adminCreateUser(userData: AdminCreateUserRequest): Observable<UserResponse> {
    return new Observable<UserResponse>((observer) => {
      API.post('/users/admin/create', userData)
        .then((response: AxiosResponse<UserResponse>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }

  /**
   * Reset a user's password
   * @param userId The ID of the user
   * @param passwordData The new password data
   * @returns Observable with the response
   */
  resetPassword(userId: number, passwordData: ResetPasswordRequest): Observable<string> {
    return new Observable<string>((observer) => {
      API.post(`/users/${userId}/reset-password`, passwordData)
        .then((response: AxiosResponse<string>) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error: AxiosError<any>) => {
          observer.error(error.response ? error.response.data : error);
          observer.complete();
        });
    });
  }
}
