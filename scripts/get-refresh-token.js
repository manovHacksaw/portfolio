/**
 * Spotify Refresh Token Generator
 * 
 * This script helps you get a refresh token with the required scopes.
 * 
 * Usage:
 * 1. Make sure your Spotify app has redirect URI: https://maybe-manov.vercel.app/callback
 * 2. Run: node scripts/get-refresh-token.js
 * 3. Follow the instructions to authorize and get the code
 */
const readline = require('readline');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'https://maybe-manov.vercel.app/callback';
const SCOPES = [
  'playlist-modify-private',
  'user-read-private',
  'user-top-read',
  'user-read-currently-playing',
  'user-read-recently-played'
].join(' ');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Note: Since we're using a production redirect URI, we don't need a local server.
// The user will copy the code from their browser after authorization.

async function exchangeCodeForToken(code) {
  const https = require('https');
  const querystring = require('querystring');

  const postData = querystring.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'accounts.spotify.com',
      path: '/api/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Token exchange failed: ${res.statusCode} ${data}`));
          return;
        }

        try {
          const tokenData = JSON.parse(data);
          resolve(tokenData);
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

async function main() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('❌ Error: Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET');
    console.error('   Please set these in your .env.local file or export them:');
    console.error('   export SPOTIFY_CLIENT_ID=your_client_id');
    console.error('   export SPOTIFY_CLIENT_SECRET=your_client_secret');
    process.exit(1);
  }

  console.log('\n=== Spotify Refresh Token Generator ===\n');
  console.log('This script will help you get a refresh token with the required scopes.\n');
  console.log('Required scopes:');
  SCOPES.split(' ').forEach(scope => console.log(`  - ${scope}`));
  console.log('\n');
  console.log(`📍 Using redirect URI: ${REDIRECT_URI}\n`);

  // Generate authorization URL
  const authUrl = `https://accounts.spotify.com/authorize?` +
    `client_id=${CLIENT_ID}&` +
    `response_type=code&` +
    `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
    `scope=${encodeURIComponent(SCOPES)}`;

  console.log('📋 Step 1: Open this URL in your browser:');
  console.log(`\n${authUrl}\n`);
  console.log('📋 Step 2: Authorize the application');
  console.log('📋 Step 3: After authorization, you will be redirected to:');
  console.log(`   ${REDIRECT_URI}?code=YOUR_CODE\n`);
  console.log('📋 Step 4: Copy the "code" parameter from the URL');
  console.log('📋 Step 5: Paste it below when prompted\n');

  // Get code from user input
  const codeInput = await question('Enter the authorization code from the URL: ');
  
  if (!codeInput || codeInput.trim() === '') {
    console.error('\n❌ No code provided');
    rl.close();
    process.exit(1);
  }

  const code = codeInput.trim();

  if (!code) {
    console.error('\n❌ No authorization code provided');
    rl.close();
    process.exit(1);
  }

  console.log('✅ Authorization code received!');
  console.log('🔄 Exchanging code for tokens...\n');

  // Step 4: Exchange code for tokens
  try {
    const tokenData = await exchangeCodeForToken(code);

    console.log('\n✅ Success! Here are your tokens:\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📝 Add this to your .env.local file:\n');
    console.log(`SPOTIFY_REFRESH_TOKEN=${tokenData.refresh_token}`);
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Scopes granted:', tokenData.scope || 'N/A');
    console.log('✅ Access token expires in:', tokenData.expires_in, 'seconds');
    console.log('\n⚠️  IMPORTANT: Keep your refresh token secure!');
    console.log('   Never commit it to git. It\'s already in .gitignore.\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }

  rl.close();
}

main().catch(error => {
  console.error('Fatal error:', error);
  rl.close();
  process.exit(1);
});

