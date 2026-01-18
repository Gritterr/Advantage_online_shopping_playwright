const BASE_URL = 'https://www.advantageonlineshopping.com';

export interface AccountCreateParams {
  email: string;
  loginName: string;
  password: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  cityName?: string;
  stateProvince?: string;
  zipcode?: string;
  phoneNumber?: string;
  countryId?: string;
  allowOffersPromotion?: boolean;
}

interface AccountCreateResponse {
  success: boolean;
  accountId?: string;
  message?: string;
  error?: string;
}

function createSoapEnvelope(params: AccountCreateParams): string {
  const {
    email,
    loginName,
    password,
    firstName = '',
    lastName = '',
    address = '',
    cityName = '',
    stateProvince = '',
    zipcode = '',
    phoneNumber = '',
    countryId = '',
    allowOffersPromotion = false,
  } = params;

  return `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <AccountCreateRequest xmlns="com.advantage.online.store.accountservice">
      <accountType>USER</accountType>
      <address>${address}</address>
      <allowOffersPromotion>${allowOffersPromotion}</allowOffersPromotion>
      <cityName>${cityName}</cityName>
      <countryId>${countryId}</countryId>
      <email>${email}</email>
      <firstName>${firstName}</firstName>
      <lastName>${lastName}</lastName>
      <loginName>${loginName}</loginName>
      <password>${password}</password>
      <phoneNumber>${phoneNumber}</phoneNumber>
      <stateProvince>${stateProvince}</stateProvince>
      <zipcode>${zipcode}</zipcode>
    </AccountCreateRequest>
  </soap:Body>
</soap:Envelope>`;
}

async function createAccountViaAPI(
  params: AccountCreateParams
): Promise<AccountCreateResponse> {
  try {
    const soapBody = createSoapEnvelope(params);

    const response = await fetch(
      `${BASE_URL}/accountservice/ws/AccountCreateRequest`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml; charset=UTF-8',
          'soapaction': 'com.advantage.online.store.accountserviceAccountCreateRequest',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: soapBody,
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const responseText = await response.text();

    // Check if response contains error
    if (responseText.includes('fault') || responseText.includes('error')) {
      return {
        success: false,
        error: 'Account creation failed: ' + responseText.substring(0, 200),
      };
    }

    // Parse account ID from response if available
    const accountIdMatch = responseText.match(/<accountId>(\d+)<\/accountId>/);
    const accountId = accountIdMatch ? accountIdMatch[1] : undefined;

    return {
      success: true,
      accountId,
      message: 'Account created successfully',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Account creation error: ${errorMessage}`,
    };
  }
}

export async function createTestAccount(
  overrides?: Partial<AccountCreateParams>
): Promise<AccountCreateParams & { success: boolean }> {
  const timestamp = Date.now();

  const testAccount: AccountCreateParams = {
    email: `testuser${timestamp}@example.com`,
    loginName: `testuser${Math.random().toString(6).substring(2, 8)}`,
    password: 'TestPass123',
    ...overrides,
  };

  const result = await createAccountViaAPI(testAccount);

  return {
    ...testAccount,
    success: result.success,
  };
}
