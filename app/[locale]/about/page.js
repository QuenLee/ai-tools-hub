export default function AboutPage() {
  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px', maxWidth: 700 }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16 }}>关于 Quen&apos;s AI</h1>
        <div style={{ color: 'var(--text2)', fontSize: '0.92rem', lineHeight: 1.8 }}>
          <p><strong>Quen&apos;s AI</strong> 是一个专注于AI工具深度评测和推荐的独立平台。</p>
          <p>我们的使命是帮助每一位用户在AI工具的海洋中找到最适合自己的工具——不吹不黑，只说真话。</p>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 24, marginBottom: 8 }}>我们做什么</h2>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li>深度评测34+主流AI工具，提供真实使用体验</li>
            <li>提供12款免费在线工具，帮你提升效率</li>
            <li>AI模型横评对比，帮你选最合适的模型</li>
            <li>AI变现攻略，分享实际可操作的赚钱方法</li>
            <li>免费白嫖指南，汇总各平台免费额度</li>
          </ul>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 24, marginBottom: 8 }}>我们的原则</h2>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li><strong>真实体验</strong> — 每个推荐都经过实际使用验证</li>
            <li><strong>独立客观</strong> — 不接受付费排名，评价不受商业利益影响</li>
            <li><strong>用户优先</strong> — 永远站在用户角度，帮你省钱省时间</li>
          </ul>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 24, marginBottom: 8 }}>透明声明</h2>
          <p>本站部分链接为推广链接（会标注&quot;优惠访问&quot;），通过这些链接注册我们可能获得佣金，但不影响我们的评价。我们只推荐真正好用且经过验证的产品。</p>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: 24, marginBottom: 8 }}>联系我们</h2>
          <p>邮箱：quen@ai.tools</p>
        </div>
      </div>
    </div>
  );
}
