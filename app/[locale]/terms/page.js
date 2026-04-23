export default function TermsPage() {
  return (
    <div className="page" style={{ padding: '32px 0 80px' }}>
      <div style={{ padding: '0 24px', maxWidth: 700, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16 }}>服务条款</h1>
        <p style={{ fontSize: '0.82rem', color: 'var(--text2)', marginBottom: 12 }}>最后更新：2026年4月23日</p>

        <div style={{ fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--text2)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>一、服务说明</h2>
          <p>AI工具箱（ai.quen.us.kg）提供免费在线工具服务，包括AI驱动的文本生成工具和前端工具。所有工具均免费提供，每日有使用次数限制。</p>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>二、使用规则</h2>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>不得使用本站工具生成违法、色情、暴力、歧视性内容</li>
            <li>不得利用本站工具进行抄袭、学术造假或欺骗行为</li>
            <li>不得通过技术手段绕过使用次数限制</li>
            <li>不得对本站进行恶意攻击、爬取或滥用API接口</li>
            <li>生成的AI内容仅供参考，用户需自行判断和审核</li>
          </ul>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>三、免责声明</h2>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li><strong>AI生成内容</strong>：AI生成的文本可能存在事实错误、偏见或不当内容，我们不对其准确性、完整性或适用性做任何保证</li>
            <li><strong>代码审查</strong>：AI代码审查工具的结论仅供参考，不替代专业代码审查和安全审计</li>
            <li><strong>合同审查</strong>：AI合同审查工具不构成法律意见，重大合同请咨询专业律师</li>
            <li><strong>服务可用性</strong>：我们不保证服务100%可用，可能因维护、API限制等原因暂停或中断</li>
            <li><strong>数据丢失</strong>：使用次数等数据存储在浏览器本地，清除浏览器数据会导致重置</li>
          </ul>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>四、知识产权</h2>
          <p>您通过本站AI工具生成的内容，您可以自由使用。本站的网站设计、代码和品牌标识归本站所有。</p>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>五、广告</h2>
          <p>本站通过 Google AdSense 展示广告以维持免费运营。广告内容由 Google 提供，我们不对广告内容负责。您可以通过 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>Google 广告设置</a> 管理广告偏好。</p>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>六、使用次数限制</h2>
          <p>AI驱动工具每日免费使用3次，前端工具无限制。次数基于浏览器 localStorage 计算，每日0点自动重置。我们保留调整免费次数的权利。</p>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>七、条款变更</h2>
          <p>我们可能不时修改本服务条款，继续使用本站即表示同意修改后的条款。</p>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '24px 0 8px' }}>八、联系我们</h2>
          <p>如有问题，请通过 GitHub 联系我们：<a href="https://github.com/QuenLee" target="_blank" rel="noopener" style={{ color: 'var(--accent)' }}>github.com/QuenLee</a></p>
        </div>
      </div>
    </div>
  );
}
