/**
 * Check Spotify Access Token Status
 * 
 * This script tests if your access token is valid and has the required scopes
 */

const https = require('https');

const ACCESS_TOKEN = process.env.SPOTIFY_ACCESS_TOKEN;

function testEndpoint(endpoint, description) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.spotify.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({
            status: res.statusCode,
            success: res.statusCode === 200,
            data: json,
            description,
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            success: false,
            data: data,
            description,
            error: error.message,
          });
        }
      });
    });

    req.on('error', (error) => {
      reject({ description, error: error.message });
    });

    req.end();
  });
}

async function main() {
  if (!ACCESS_TOKEN) {
    console.error('❌ Error: Missing SPOTIFY_ACCESS_TOKEN');
    console.error('   Please set it in your .env.local file or export it:');
    console.error('   export SPOTIFY_ACCESS_TOKEN=your_access_token');
    process.exit(1);
  }

  console.log('\n=== Spotify Access Token Diagnostic ===\n');
  console.log('Testing access token validity and scopes...\n');

  try {
    // Test 1: Get user profile
    console.log('1. Testing user profile access (user-read-private scope)...');
    const profileTest = await testEndpoint('/v1/me', 'Get User Profile');
    if (profileTest.success) {
      console.log('   ✅ User profile access: OK');
      console.log(`   📝 User: ${profileTest.data.display_name || profileTest.data.id}`);
    } else {
      console.log(`   ❌ User profile access: FAILED (${profileTest.status})`);
      if (profileTest.data?.error) {
        console.log(`   Error: ${JSON.stringify(profileTest.data.error)}`);
      }
    }
    console.log('');

    // Test 2: Get top tracks
    console.log('2. Testing top tracks access (user-top-read scope)...');
    const topTracksTest = await testEndpoint('/v1/me/top/tracks?limit=5&time_range=long_term', 'Get Top Tracks');
    if (topTracksTest.success) {
      console.log('   ✅ Top tracks access: OK');
      console.log(`   📝 Found ${topTracksTest.data.items?.length || 0} tracks`);
    } else {
      console.log(`   ❌ Top tracks access: FAILED (${topTracksTest.status})`);
      if (topTracksTest.data?.error) {
        console.log(`   Error: ${JSON.stringify(topTracksTest.data.error)}`);
        if (topTracksTest.status === 403) {
          console.log('   💡 Missing scope: user-top-read');
        }
      }
    }
    console.log('');

    // Test 3: Get currently playing
    console.log('3. Testing currently playing access (user-read-currently-playing scope)...');
    const nowPlayingTest = await testEndpoint('/v1/me/player/currently-playing', 'Get Currently Playing');
    if (nowPlayingTest.status === 204) {
      console.log('   ✅ Currently playing access: OK (no track playing)');
    } else if (nowPlayingTest.success) {
      console.log('   ✅ Currently playing access: OK');
    } else {
      console.log(`   ⚠️  Currently playing access: ${nowPlayingTest.status === 404 ? 'No active device' : 'FAILED'}`);
    }
    console.log('');

    // Summary
    console.log('=== Summary ===');
    if (profileTest.status === 401) {
      console.log('\n❌ Access token is EXPIRED or INVALID');
      console.log('   The token needs to be refreshed or regenerated.');
      console.log('\n💡 Solution:');
      console.log('   1. Get a new access token, OR');
      console.log('   2. Get a refresh token (recommended) so tokens auto-refresh');
      console.log('   3. Run: node scripts/get-refresh-token.js');
    } else if (!topTracksTest.success && topTracksTest.status === 403) {
      console.log('\n⚠️  Access token is valid but missing required scopes');
      console.log('   Missing: user-top-read');
      console.log('\n💡 Solution:');
      console.log('   Regenerate token with scopes: user-top-read playlist-modify-private user-read-private');
    } else if (profileTest.success) {
      console.log('\n✅ Access token is valid!');
      if (topTracksTest.success) {
        console.log('✅ All required scopes are present');
      }
    }

  } catch (error) {
    console.error('\n❌ Error running diagnostics:', error);
  }
}

main();

