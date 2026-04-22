export default function PrivacyPage() {
  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px', maxWidth: 700 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16 }}>隐私政策</h1>
        <div style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.8 }}>
          <p>最后更新：2026年4月22日</p>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 20, marginBottom: 8 }}>1. 信息收集</h2>
          <p>我们收集以下信息：</p>
          <ul style={{ paddingLeft: 20 }}>
            <li><strong>注册信息</strong>：邮箱地址（用于账号登录）</li>
            <li><strong>使用数据</strong>：工具使用次数（用于免费额度计数）</li>
            <li><strong>自动收集</strong>：访问日志（通过Vercel Analytics，不收集个人身份信息）</li>
          </ul>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 20, marginBottom: 8 }}>2. 信息使用</h2>
          <p>您的信息仅用于：提供工具服务、使用次数计数、改进网站体验。我们不会出售或分享您的个人信息给第三方。</p>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 20, marginBottom: 8 }}>3. Cookie</h2>
          <p>我们使用localStorage存储登录状态和使用次数，不使用第三方跟踪Cookie。</p>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 20, marginBottom: 8 }}>4. 数据安全</h2>
          <p>所有数据通过HTTPS加密传输。密码以加密形式存储。我们采用行业标准安全措施保护您的数据。</p>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 20, marginBottom: 8 }}>5. 您的权利</h2>
          <p>您可以随时：查看您的数据、删除您的账号、导出您的数据。请联系 quen@ai.tools。</p>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: 20, marginBottom: 8 }}>6. 联系方式</h2>
          <p>隐私相关问题请联系：quen@ai.tools</p>
        </div>
      </div>
    </div>
  );
}
