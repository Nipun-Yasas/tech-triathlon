// Client-side authentication utilities

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'farmer' | 'officer';
}

export const authClient = {
  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  // Get auth token
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!(authClient.getCurrentUser() && authClient.getToken());
  },

  // Check if user has specific role
  hasRole: (role: 'farmer' | 'officer'): boolean => {
    const user = authClient.getCurrentUser();
    return user?.userType === role;
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      // Call logout API
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local storage regardless of API call result
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/auth/signin';
    }
  },

  // Make authenticated API request
  fetchWithAuth: async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = authClient.getToken();
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, {
      ...options,
      credentials: 'include',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });
  },

  // Refresh user data
  refreshUser: async (): Promise<User | null> => {
    try {
      const response = await authClient.fetchWithAuth('/api/profile');
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        return data.user;
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
    return null;
  }
};

// Hook for checking authentication in components
export const useAuth = () => {
  const user = authClient.getCurrentUser();
  const isAuthenticated = authClient.isAuthenticated();
  
  return {
    user,
    isAuthenticated,
    hasRole: authClient.hasRole,
    logout: authClient.logout,
    fetchWithAuth: authClient.fetchWithAuth
  };
};
