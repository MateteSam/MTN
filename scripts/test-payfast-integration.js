import http from 'http';
import crypto from 'crypto';

console.log('--- Starting PayFast Integration Test ---');

const PORT = 3001;

// Helper to make requests
function makeRequest(path, method, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'x-forwarded-proto': 'http',
        'x-forwarded-host': 'localhost:3000',
        ...headers
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function runTests() {
  let failed = false;

  // TEST 1: Checkout Flow
  console.log('\n[TEST 1] Checkout API (/api/payfast/checkout)');
  try {
    const body = JSON.stringify({ amount: '545', item_name: 'Print First Edition' });
    const res = await makeRequest('/api/payfast/checkout', 'POST', body);
    
    if (res.statusCode === 200) {
      console.log('✅ Status 200 OK');
    } else {
      console.error(`❌ Status Failed: ${res.statusCode}`);
      failed = true;
    }

    if (res.data.includes('action="https://sandbox.payfast.co.za/eng/process"')) {
      console.log('✅ Sandbox URL found');
    } else {
      console.error('❌ Sandbox URL missing');
      failed = true;
    }

    if (res.data.includes('value="10000100"')) {
      console.log('✅ Default Sandbox Merchant ID (10000100) found');
    } else {
      console.error('❌ Merchant ID mismatch');
      failed = true;
    }

    if (res.data.includes('value="545.00"')) {
      console.log('✅ Amount formatted (545.00)');
    } else {
      console.error('❌ Amount mismatch');
      failed = true;
    }

  } catch (e) {
    console.error('❌ Test 1 Exception:', e.message);
    failed = true;
  }

  // TEST 2: IPN Notification
  console.log('\n[TEST 2] IPN Notification (/api/payfast/notify)');
  try {
    // Construct a valid payload
    const payload = {
      m_payment_id: 'test_order_' + Date.now(),
      pf_payment_id: '123456',
      payment_status: 'COMPLETE',
      item_name: 'Print First Edition',
      item_description: 'Test Description',
      amount_gross: '545.00',
      amount_fee: '10.00',
      amount_net: '535.00',
      custom_str1: '',
      custom_str2: '',
      custom_str3: '',
      custom_str4: '',
      custom_str5: '',
      custom_int1: '',
      custom_int2: '',
      custom_int3: '',
      custom_int4: '',
      custom_int5: '',
      name_first: 'Test',
      name_last: 'User',
      email_address: 'test@example.com',
      merchant_id: '10000100'
    };

    // Generate signature (mimic PayFast logic)
    // 1. Filter empty/null/signature
    const keys = Object.keys(payload).filter(k => payload[k] !== '').sort();
    // 2. Build string
    const pieces = keys.map(k => `${k}=${encodeURIComponent(String(payload[k]).trim()).replace(/%20/g, '+')}`);
    let signedString = pieces.join('&');
    // 3. Append passphrase (empty in sandbox default)
    // signedString += `&passphrase=`; // Default dev-api has empty passphrase, so we don't append anything? 
    // Wait, dev-api/server.js line 245: if (passphrase) ...
    // And line 171: const passphrase = process.env.PAYFAST_PASSPHRASE || '';
    // So if no env var, no passphrase appended.

    const signature = crypto.createHash('md5').update(signedString).digest('hex');
    payload.signature = signature;

    const body = new URLSearchParams(payload).toString();
    
    // Send as form-urlencoded which is standard for IPN
    const res = await makeRequest('/api/payfast/notify', 'POST', body, {
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    if (res.statusCode === 200 && res.data === 'OK') {
      console.log('✅ IPN Accepted (OK)');
    } else {
      console.error(`❌ IPN Failed: Status ${res.statusCode}, Body: ${res.data}`);
      console.log('Debug: Sent Signature:', signature);
      console.log('Debug: Signed String:', signedString);
      failed = true;
    }

  } catch (e) {
    console.error('❌ Test 2 Exception:', e.message);
    failed = true;
  }

  if (failed) {
    console.log('\nRESULT: FAIL');
    process.exit(1);
  } else {
    console.log('\nRESULT: PASS');
    process.exit(0);
  }
}

runTests();
