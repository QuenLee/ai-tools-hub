export default function PrivacyPage() {
  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px', maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16 }}>隐私政策</h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 12 }}>最后更新：2026年4月23日</p>

        <div style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--text2)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>一、我们收集哪些信息</h2>
          <p>AI工具箱（ai.quen.us.kg）是一个工具型网站，我们尽可能少地收集用户数据：</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li><strong>不要求注册</strong>：使用工具无需注册账号，不收集姓名、邮箱、手机号等个人信息</li>
            <li><strong>本地存储</strong>：工具使用次数存储在您浏览器的 localStorage 中，不会上传到我们的服务器</li>
            <li><strong>工具输入内容</strong>：您输入的文本内容仅用于生成结果，不会被存储、记录或用于其他目的。API请求处理完毕后，服务器不保留您的输入内容</li>
          </ul>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>二、Cookie 和类似技术</h2>
          <p>我们使用以下技术：</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li><strong>localStorage</strong>：存储工具使用次数、主题偏好（深色/浅色模式），数据仅存在您的浏览器中</li>
            <li><strong>Google Analytics</strong>：匿名化的访问统计，帮助我们了解网站使用情况（见下方第三方部分）</li>
            <li><strong>Google AdSense</strong>：展示广告服务，可能使用Cookie来展示相关广告（见下方第三方部分）</li>
          </ul>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>三、第三方服务</h2>
          <p><strong>Google Analytics</strong>：我们使用 Google Analytics 收集匿名化的网站访问数据（页面浏览量、访问来源、设备类型等）。该服务使用 Cookie 收集数据，您可以通过安装 <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>Google Analytics Opt-out Browser Add-on</a> 来 opt out。</p>
          <p><strong>Google AdSense</strong>：我们使用 Google AdSense 展示广告。Google 可能使用 Cookie 和 Web Beacon 根据您过往访问本站及/或其他网站的信息展示广告。您可以通过访问 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>Google 广告设置</a> 来选择停用个性化广告。</p>
          <p><strong>NVIDIA AI API</strong>：AI工具的后端调用 NVIDIA 的 API 进行文本生成。您输入的内容会发送至 NVIDIA 服务器进行处理，受 NVIDIA 的隐私政策约束。我们不存储这些请求内容。</p>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>四、数据安全</h2>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>网站通过 HTTPS 加密传输所有数据</li>
            <li>不存储用户密码、邮箱等敏感信息</li>
            <li>工具输入内容在API处理后不保留</li>
            <li>使用次数数据仅存在本地浏览器中</li>
          </ul>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>五、儿童隐私</h2>
          <p>本站不针对13岁以下儿童，不 knowingly 收集儿童个人信息。</p>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>六、政策变更</h2>
          <p>我们可能不时更新本隐私政策，更新后会在本页面发布新版本日期。</p>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>七、联系我们</h2>
          <p>如有隐私相关问题，请通过 GitHub 联系我们：<a href="https://github.com/QuenLee" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>github.com/QuenLee</a></p>
        </div>
      </div>
    </div>
  );
}
