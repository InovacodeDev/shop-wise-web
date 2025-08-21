import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiService } from './api';

describe('ApiService.refreshAuthToken', () => {
  let svc: ApiService;

  beforeEach(() => {
    svc = new ApiService();
    // Ensure no persisted tokens
    (svc as any).persistTokens = false;
  });

  it('uses backend refresh when refresh token present', async () => {
    // Provide an in-memory backend refresh token
    (svc as any).inMemoryBackendRefreshToken = 'fake-refresh';

    // Stub makeRequest to assert it's called with /auth/refresh
    const makeRequestSpy = vi.spyOn(svc as any, 'makeRequest').mockImplementation(async (endpoint: string) => {
      expect(endpoint).toBe('/auth/refresh');
      return { token: 'new-jwt', refresh: 'new-refresh' } as any;
    });

    const token = await svc.refreshAuthToken();
    expect(token).toBe('new-jwt');
    expect((svc as any).inMemoryBackendRefreshToken).toBe('new-refresh');
    makeRequestSpy.mockRestore();
  });
});
