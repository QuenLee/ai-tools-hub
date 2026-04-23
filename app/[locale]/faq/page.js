export default function FAQPage() {
  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px', maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16 }}>常见问题</h1>

        <div style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--text2)' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>AI工具箱是什么？</h2>
          <p>AI工具箱是一个免费的在线工具集合，提供60款工具，其中34款由AI驱动。涵盖自媒体文案、职场办公、SEO优化、代码审查、翻译等多种场景，即开即用，无需注册。</p>

          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>免费吗？真的完全免费？</h2>
          <p>是的，所有工具都免费使用。AI驱动工具每日可免费使用3次，前端工具（开发者工具、免费工具等）无使用次数限制，每天0点自动重置次数。</p>

          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>需要注册账号吗？</h2>
          <p>不需要。所有工具直接使用，无需注册、登录或提供任何个人信息。使用次数基于浏览器本地存储。</p>

          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>我的数据安全吗？</h2>
          <p>您输入的文本仅用于生成结果，不会被存储或记录。API请求处理完毕后，服务器不保留您的内容。使用次数数据仅存储在您的浏览器本地。</p>

          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>AI生成的内容准确吗？</h2>
          <p>AI生成的内容仅供参考。AI可能偶尔产生不准确或不适当的内容，建议您在发布或使用前进行审核。特别是合同审查和代码审查工具，不能替代专业服务。</p>

          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>为什么AI工具有每日使用限制？</h2>
          <p>AI工具每次调用都需要消耗服务器API资源，为了保证所有用户都能正常使用，我们设置了每日免费次数限制。前端工具不涉及AI调用，因此无限制。次数每天0点自动重置。</p>

          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>生成失败会扣除次数吗？</h2>
          <p>不会。如果AI生成过程中出现错误或超时，不会扣除您的免费次数。只有成功生成结果时才会计数。</p>

          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>支持哪些语言？</h2>
          <p>网站界面支持简体中文、繁体中文（香港）和英语。AI工具可以处理多种语言的输入和输出。</p>

          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>网站有广告吗？</h2>
          <p>为了维持免费运营，本站展示广告。广告内容由广告服务商提供，您可以通过相关设置管理广告偏好。详见<a href="/zh/privacy" style={{ color: 'var(--accent)' }}>隐私政策</a>。</p>

          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '24px 0 8px' }}>如何联系我们？</h2>
          <p>如有问题或建议，欢迎通过 GitHub 联系我们：<a href="https://github.com/QuenLee" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>github.com/QuenLee</a></p>
        </div>
      </div>
    </div>
  );
}
