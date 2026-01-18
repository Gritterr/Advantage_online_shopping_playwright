import { createTestAccount, AccountCreateParams } from './api';

export async function createNewUser(
  overrides?: Partial<AccountCreateParams>
): Promise<AccountCreateParams & { success: boolean }> {
  const timestamp = Date.now();
  const newAccount = await createTestAccount({
    loginName: `Sc${Math.random().toString(4).substring(2, 8)}`,
    email: `testuser${timestamp}@example.com`,
    password: 'TestPass123',
    ...overrides,
  });

  return newAccount;
}
