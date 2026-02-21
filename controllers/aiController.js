// AI builder - proxy to Grok via OpenAI REST
const axios = require('axios');

async function callGrok(prompt) {
  const key = process.env.GROK_API_KEY;
  if (!key) throw new Error('Missing GROK_API_KEY');
  const resp = await axios.post('https://api.openai.com/v1/responses', {
    model: 'grok',
    input: prompt
  }, {
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json'
    }
  });
  return resp.data;
}

exports.generateLayout = async (req, res, next) => {
  try {
    const input = req.body;
    const prompt = `Generate website layout JSON for the following specification:\n${JSON.stringify(input)}`;
    const result = await callGrok(prompt);
    // assume result.output[0].content contains JSON
    res.json({ success: true, data: { layout: result.output, tokensUsed: result.usage?.total_tokens || 0 } });
  } catch (err) {
    next(err);
  }
};

exports.generateContent = async (req, res, next) => {
  try {
    const input = req.body;
    const prompt = `Generate content for component using spec:\n${JSON.stringify(input)}`;
    const result = await callGrok(prompt);
    res.json({ success: true, data: { content: result.output, tokensUsed: result.usage?.total_tokens || 0 } });
  } catch (err) {
    next(err);
  }
};

exports.improveContent = async (req, res, next) => {
  try {
    const input = req.body;
    const prompt = `Improve content as requested:\n${JSON.stringify(input)}`;
    const result = await callGrok(prompt);
    res.json({ success: true, data: { improved: result.output, tokensUsed: result.usage?.total_tokens || 0 } });
  } catch (err) {
    next(err);
  }
};
