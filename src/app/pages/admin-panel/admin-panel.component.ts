import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

// Interface for API error responses
interface ApiError {
  detail: Array<{
    loc: Array<string | number>;
    msg: string;
    type: string;
  }> | string;
}

interface UserData {
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

interface ProfileData {
  idprofil: number;
  nameprofil: string;
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent implements OnInit {
  // Users data
  users: UserData[] = [];
  profiles: ProfileData[] = [];
  selectedUser: UserData | null = null;

  // New user form data
  newUser = {
    pseudouser: '',
    emailuser: '',
    password: '',
    idprofile: 3 // Default to regular user
  };

  // Update user form data
  updateUserData = {
    pseudouser: '',
    emailuser: '',
    idprofile: 0,
    verifiedusers: false
  };

  // Reset password form data
  resetPasswordData = {
    new_password: ''
  };

  // Change password form data
  changePasswordData = {
    current_password: '',
    new_password: ''
  };

  // UI state
  loading = {
    users: false,
    profiles: false,
    createUser: false,
    updateUser: false,
    deleteUser: false,
    resetPassword: false,
    changePassword: false
  };

  error: {
    users: ApiError | null,
    profiles: ApiError | null,
    createUser: ApiError | null,
    updateUser: ApiError | null,
    deleteUser: ApiError | null,
    resetPassword: ApiError | null,
    changePassword: ApiError | null
  } = {
    users: null,
    profiles: null,
    createUser: null,
    updateUser: null,
    deleteUser: null,
    resetPassword: null,
    changePassword: null
  };

  success = {
    createUser: false,
    updateUser: false,
    deleteUser: false,
    resetPassword: false,
    changePassword: false
  };

  // Active tab
  activeTab = 'users'; // 'users', 'create', 'profile'

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadProfiles();
  }

  /**
   * Load all users
   */
  loadUsers(): void {
    this.loading.users = true;
    this.error.users = null;

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading.users = false;
      },
      error: (err) => {
        this.error.users = err;
        this.loading.users = false;
      }
    });
  }

  /**
   * Load all profiles
   */
  loadProfiles(): void {
    this.loading.profiles = true;
    this.error.profiles = null;

    this.userService.getProfiles().subscribe({
      next: (profiles) => {
        this.profiles = profiles;
        this.loading.profiles = false;
      },
      error: (err) => {
        this.error.profiles = err;
        this.loading.profiles = false;
      }
    });
  }

  /**
   * Select a user for editing
   */
  selectUser(user: UserData): void {
    this.selectedUser = user;
    this.updateUserData = {
      pseudouser: user.pseudouser,
      emailuser: user.emailuser,
      idprofile: user.idprofile,
      verifiedusers: user.verifiedusers
    };
    this.activeTab = 'edit';
  }

  /**
   * Create a new user
   */
  createUser(): void {
    this.loading.createUser = true;
    this.error.createUser = null;
    this.success.createUser = false;

    this.userService.adminCreateUser(this.newUser).subscribe({
      next: (user) => {
        this.loading.createUser = false;
        this.success.createUser = true;
        this.loadUsers(); // Reload users list

        // Reset form
        this.newUser = {
          pseudouser: '',
          emailuser: '',
          password: '',
          idprofile: 3
        };
      },
      error: (err) => {
        this.error.createUser = err;
        this.loading.createUser = false;
      }
    });
  }

  /**
   * Update a user
   */
  updateUser(): void {
    if (!this.selectedUser) return;

    this.loading.updateUser = true;
    this.error.updateUser = null;
    this.success.updateUser = false;

    this.userService.updateUser(this.selectedUser.iduser, this.updateUserData).subscribe({
      next: (user) => {
        this.loading.updateUser = false;
        this.success.updateUser = true;
        this.loadUsers(); // Reload users list

        // Update selected user
        this.selectedUser = user;
      },
      error: (err) => {
        this.error.updateUser = err;
        this.loading.updateUser = false;
      }
    });
  }

  /**
   * Delete a user
   */
  deleteUser(userId: number): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    this.loading.deleteUser = true;
    this.error.deleteUser = null;
    this.success.deleteUser = false;

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.loading.deleteUser = false;
        this.success.deleteUser = true;
        this.loadUsers(); // Reload users list

        // Reset selected user if it was deleted
        if (this.selectedUser && this.selectedUser.iduser === userId) {
          this.selectedUser = null;
          this.activeTab = 'users';
        }
      },
      error: (err) => {
        this.error.deleteUser = err;
        this.loading.deleteUser = false;
      }
    });
  }

  /**
   * Reset a user's password
   */
  resetPassword(): void {
    if (!this.selectedUser) return;

    this.loading.resetPassword = true;
    this.error.resetPassword = null;
    this.success.resetPassword = false;

    this.userService.resetPassword(this.selectedUser.iduser, this.resetPasswordData).subscribe({
      next: () => {
        this.loading.resetPassword = false;
        this.success.resetPassword = true;

        // Reset form
        this.resetPasswordData = {
          new_password: ''
        };
      },
      error: (err) => {
        this.error.resetPassword = err;
        this.loading.resetPassword = false;
      }
    });
  }

  /**
   * Change current user's password
   */
  changePassword(): void {
    this.loading.changePassword = true;
    this.error.changePassword = null;
    this.success.changePassword = false;

    this.userService.changePassword(this.changePasswordData).subscribe({
      next: () => {
        this.loading.changePassword = false;
        this.success.changePassword = true;

        // Reset form
        this.changePasswordData = {
          current_password: '',
          new_password: ''
        };
      },
      error: (err) => {
        this.error.changePassword = err;
        this.loading.changePassword = false;
      }
    });
  }

  /**
   * Get profile name by ID
   */
  getProfileName(profileId: number): string {
    const profile = this.profiles.find(p => p.idprofil === profileId);
    return profile ? profile.nameprofil : 'Inconnu';
  }

  /**
   * Set active tab
   */
  setActiveTab(tab: string): void {
    this.activeTab = tab;

    // Reset forms and selected user when changing tabs
    if (tab === 'users') {
      this.selectedUser = null;
    } else if (tab === 'create') {
      this.newUser = {
        pseudouser: '',
        emailuser: '',
        password: '',
        idprofile: 3
      };
      this.success.createUser = false;
      this.error.createUser = null;
    } else if (tab === 'profile') {
      this.changePasswordData = {
        current_password: '',
        new_password: ''
      };
      this.success.changePassword = false;
      this.error.changePassword = null;
    }
  }
}
