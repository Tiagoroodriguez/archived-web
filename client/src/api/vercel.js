import axios from 'axios';

async function getVercelAnalytics() {
  const response = await axios.get(
    'https://api.vercel.com/v1/analytics/YOUR_SITE_ID',
    {
      headers: {
        Authorization: `Bearer YOUR_VERCEL_API_TOKEN`,
      },
    }
  );

  return response.data;
}
