import { PROMPTS } from '@/lib/prompts';

export const runtime = 'edge';

const NVIDIA_API_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const MODEL = 'deepseek-ai/deepseek-v3.2';

// 越狱检测关键词
const JAILBREAK_PATTERNS = [
  /忽略.{0,4}(以上|前面|上述|之前|所有)/i,
  /ignore.{0,4}(above|previous|all|prior)/i,
  /(输出|打印|重复|复述|显示|列出).{0,6}(系统|提示|指令|prompt|system)/i,
  /(pretend|act as|roleplay).{0,10}(you are not|different)/i,
  /jailbreak/i,
  /DAN\s+mode/i,
  /(reveal|expose|show|tell).{0,6}(system|prompt|instruction)/i,
  /(\[|\{).{0,5}(system|instruction|prompt).{0,5}(\]|\})/i,
  /请.{0,4}(原样|逐字|完整).{0,4}(输出|返回|重复)/i,
];

function isJailbreak(input) {
  return JAILBREAK_PATTERNS.some(p => p.test(input));
}

// 泄露检测
const LEAK_PATTERNS = [
  /系统安全规则/i,
  /系统提示词/i,
  /GUARD_PREFIX/i,
  /GUARD_SUFFIX/i,
  /【系统/i,
  /【输出安全/i,
];

function hasLeak(output) {
  return LEAK_PATTERNS.some(p => p.test(output));
}

export async function POST(request) {
  try {
    const body = await request.json();
    const toolId = body.toolId;
    const input = body.input;
    const locale = body.locale;

    if (!toolId) {
      return Response.json({ error: '缺少toolId参数' }, { status: 400 });
    }
    if (!input || !input.trim()) {
      return Response.json({ error: '请填写必要的内容后再生成' }, { status: 400 });
    }

    // 越狱检测
    if (isJailbreak(input)) {
      return Response.json({ error: '请输入与工具相关的内容' }, { status: 400 });
    }

    const systemPrompt = PROMPTS[toolId];
    if (!systemPrompt) {
      return Response.json({ error: `未知工具: ${toolId}` }, { status: 400 });
    }

    const apiKey = process.env.NVIDIA_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API未配置，请联系管理员' }, { status: 500 });
    }

    const userMessage = locale === 'en'
      ? `Please respond in English. Here is my request:\n${input}`
      : locale === 'zh-HK'
        ? `請用繁體中文回覆。以下是我的需求：\n${input}`
        : input;

    const response = await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_tokens: 2048,
        top_p: 0.9,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('NVIDIA API error:', response.status, err);
      return Response.json({ error: 'AI服务暂时不可用，请稍后重试' }, { status: 502 });
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || '生成失败，请重试';

    // 泄露检测
    if (hasLeak(content)) {
      content = content.replace(/【系统.*?】[\s\S]*?===/g, '');
      content = content.replace(/【输出安全.*?字样/g, '');
    }

    return Response.json({ content });
  } catch (err) {
    console.error('Generate API error:', err);
    return Response.json({ error: `服务器错误: ${err.message}` }, { status: 500 });
  }
}
