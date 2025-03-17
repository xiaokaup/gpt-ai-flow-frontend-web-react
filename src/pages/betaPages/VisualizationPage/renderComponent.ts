import { Chart } from 'chart.js';

// ==================== 公司概览组件 ====================
export function createHeader(companyData, style) {
  if (style === 'gradient') {
    return `
        <div class="header-gradient">
          <h1>${companyData.name}</h1>
          <h2>${companyData.tagline}</h2>
          <div class="company-details">
            <span>Founded: ${companyData.founded}</span>
            <span>Parent: ${companyData.parent}</span>
            <span>HQ: ${companyData.headquarters}</span>
          </div>
        </div>
      `;
  } else if (style === 'minimal') {
    return `
        <div class="header-minimal">
          <div class="logo-container">
            <div class="logo-placeholder">${companyData.name.charAt(0)}</div>
          </div>
          <div class="company-info">
            <h1>${companyData.name}</h1>
            <p>${companyData.tagline}</p>
          </div>
        </div>
      `;
  } else if (style === 'bold') {
    return `
        <div class="header-bold">
          <h1 class="company-name-large">${companyData.name}</h1>
          <div class="tagline-highlight">${companyData.tagline}</div>
          <div class="company-meta">
            <div class="meta-item">
              <span class="meta-label">FOUNDED</span>
              <span class="meta-value">${companyData.founded}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">PARENT</span>
              <span class="meta-value">${companyData.parent}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">HEADQUARTERS</span>
              <span class="meta-value">${companyData.headquarters}</span>
            </div>
          </div>
        </div>
      `;
  }
}

// ==================== 关键指标组件 ====================
export function createKeyMetrics(statistics, style) {
  const container = document.createElement('div');

  if (style === 'cards') {
    container.className = 'key-metrics-cards';

    statistics.forEach((stat) => {
      const card = document.createElement('div');
      card.className = 'metric-card';
      card.innerHTML = `
          <div class="metric-value">${stat.value}</div>
          <div class="metric-label">${stat.label}</div>
        `;
      container.appendChild(card);
    });
  } else if (style === 'infographic') {
    container.className = 'key-metrics-infographic';

    statistics.forEach((stat) => {
      const item = document.createElement('div');
      item.className = 'infographic-item';

      // 为不同指标选择不同图标
      let iconClass = 'fa-chart-line'; // 默认图标
      if (stat.label.includes('Products')) iconClass = 'fa-box';
      if (stat.label.includes('order')) iconClass = 'fa-shopping-cart';
      if (stat.label.includes('customers')) iconClass = 'fa-users';
      if (stat.label.includes('Seller')) iconClass = 'fa-store';

      item.innerHTML = `
          <div class="info-icon"><i class="fas ${iconClass}"></i></div>
          <div class="info-content">
            <div class="info-value">${stat.value}</div>
            <div class="info-label">${stat.label}</div>
          </div>
        `;
      container.appendChild(item);
    });
  } else if (style === 'minimal') {
    container.className = 'key-metrics-minimal';

    const table = document.createElement('table');
    statistics.forEach((stat) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td class="metric-label">${stat.label}</td>
          <td class="metric-value">${stat.value}</td>
        `;
      table.appendChild(row);
    });
    container.appendChild(table);
  }

  return container;
}

// ==================== 商业模式组件 ====================
export function createBusinessModel(businessModel, style) {
  const container = document.createElement('div');

  if (style === 'flowchart') {
    container.className = 'business-model-flowchart';

    container.innerHTML = `
        <h2>Business Model</h2>
        <div class="model-type">${businessModel.type}</div>
        <div class="flowchart-container">
          <div class="flow-node start-node">
            <div class="node-icon"><i class="fas fa-industry"></i></div>
            <div class="node-text">Factory</div>
          </div>
          <div class="flow-arrow"><i class="fas fa-long-arrow-alt-right"></i></div>
          <div class="flow-node platform-node">
            <div class="node-icon"><i class="fas fa-shopping-bag"></i></div>
            <div class="node-text">Temu Platform</div>
          </div>
          <div class="flow-arrow"><i class="fas fa-long-arrow-alt-right"></i></div>
          <div class="flow-node end-node">
            <div class="node-icon"><i class="fas fa-user"></i></div>
            <div class="node-text">Consumer</div>
          </div>
        </div>
        <div class="key-features">
          <h3>Key Features</h3>
          <ul>
            ${businessModel.key_features.map((feature) => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        <div class="revenue-model">
          <h3>Revenue Model</h3>
          <p>${businessModel.revenue_model}</p>
        </div>
      `;
  } else if (style === 'circular') {
    container.className = 'business-model-circular';

    container.innerHTML = `
        <div class="circular-model">
          <div class="center-circle">
            <span>${businessModel.type}</span>
          </div>
          <div class="orbit-container">
            ${businessModel.key_features
              .map((feature, index) => {
                const angle = index * (360 / businessModel.key_features.length);
                return `
                <div class="orbit-item" style="transform: rotate(${angle}deg)">
                  <div class="orbit-content" style="transform: rotate(-${angle}deg)">
                    ${feature}
                  </div>
                </div>
              `;
              })
              .join('')}
          </div>
        </div>
        <div class="revenue-badge">
          <span>Revenue: ${businessModel.revenue_model}</span>
        </div>
      `;
  } else if (style === 'cards') {
    container.className = 'business-model-cards';

    container.innerHTML = `
        <div class="model-card main-card">
          <h3>Business Type</h3>
          <p>${businessModel.type}</p>
        </div>
        <div class="features-container">
          ${businessModel.key_features
            .map(
              (feature) => `
            <div class="model-card feature-card">
              <p>${feature}</p>
            </div>
          `,
            )
            .join('')}
        </div>
        <div class="model-card revenue-card">
          <h3>Revenue Model</h3>
          <p>${businessModel.revenue_model}</p>
        </div>
      `;
  }

  return container;
}

// ==================== 市场数据可视化组件 ====================
export function createMarketData(marketData, style) {
  const container = document.createElement('div');

  if (style === 'charts') {
    container.className = 'market-data-charts';

    // 用户数据部分
    const userSection = document.createElement('div');
    userSection.className = 'chart-section';
    userSection.innerHTML = `
        <h3>User Base</h3>
        <div class="user-stats">
          <div class="stat-item">
            <span class="stat-value">${marketData.active_users}</span>
            <span class="stat-label">Active Users</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${marketData.growth_rate}</span>
            <span class="stat-label">Growth Rate</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">${marketData.app_ranking}</span>
            <span class="stat-label">App Ranking</span>
          </div>
        </div>
      `;

    // 市场份额图表
    const marketShareSection = document.createElement('div');
    marketShareSection.className = 'chart-section';
    marketShareSection.innerHTML = `
        <h3>Market Share</h3>
        <div class="market-share-container">
          <div class="donut-chart-container">
            <canvas id="usEcommerceChart" width="150" height="150"></canvas>
            <div class="chart-label">US E-commerce</div>
          </div>
          <div class="donut-chart-container">
            <canvas id="globalMobileChart" width="150" height="150"></canvas>
            <div class="chart-label">Global Mobile</div>
          </div>
        </div>
      `;

    // 国家覆盖地图
    const countriesSection = document.createElement('div');
    countriesSection.className = 'chart-section';
    countriesSection.innerHTML = `
        <h3>Global Presence</h3>
        <div class="countries-grid">
          ${marketData.countries
            .map(
              (country) => `
            <div class="country-badge">${country}</div>
          `,
            )
            .join('')}
        </div>
      `;

    container.appendChild(userSection);
    container.appendChild(marketShareSection);
    container.appendChild(countriesSection);

    // 添加图表渲染逻辑，使用setTimeout确保DOM已经准备好
    setTimeout(() => {
      // 渲染US电商市场份额图表
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const usCtx = document.getElementById('usEcommerceChart').getContext('2d');
      new Chart(usCtx, {
        type: 'doughnut',
        data: {
          labels: ['Temu', 'Others'],
          datasets: [
            {
              data: [
                parseFloat(marketData.market_share.us_ecommerce),
                100 - parseFloat(marketData.market_share.us_ecommerce),
              ],
              backgroundColor: ['#4e73df', '#e0e0e0'],
            },
          ],
        },
        options: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          cutoutPercentage: 70,
          legend: { display: false },
        },
      });

      // 渲染全球移动购物市场份额图表
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const globalCtx = document.getElementById('globalMobileChart').getContext('2d');
      new Chart(globalCtx, {
        type: 'doughnut',
        data: {
          labels: ['Temu', 'Others'],
          datasets: [
            {
              data: [
                parseFloat(marketData.market_share.global_mobile_shopping),
                100 - parseFloat(marketData.market_share.global_mobile_shopping),
              ],
              backgroundColor: ['#36b9cc', '#e0e0e0'],
            },
          ],
        },
        options: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          cutoutPercentage: 70,
          legend: { display: false },
        },
      });
    }, 100);
  } else if (style === 'dashboard') {
    container.className = 'market-data-dashboard';

    // 创建仪表板头部
    const header = document.createElement('div');
    header.className = 'dashboard-header';
    header.innerHTML = `<h2>Market Performance</h2>`;

    // 创建主要指标区域
    const metricsGrid = document.createElement('div');
    metricsGrid.className = 'metrics-grid';
    metricsGrid.innerHTML = `
        <div class="metric-tile users-tile">
          <div class="metric-icon"><i class="fas fa-users"></i></div>
          <div class="metric-content">
            <div class="metric-value">${marketData.active_users}</div>
            <div class="metric-label">Monthly Active Users</div>
          </div>
        </div>
        <div class="metric-tile growth-tile">
          <div class="metric-icon"><i class="fas fa-chart-line"></i></div>
          <div class="metric-content">
            <div class="metric-value">${marketData.growth_rate}</div>
            <div class="metric-label">YoY Growth</div>
          </div>
        </div>
        <div class="metric-tile ranking-tile">
          <div class="metric-icon"><i class="fas fa-trophy"></i></div>
          <div class="metric-content">
            <div class="metric-value">${marketData.app_ranking}</div>
            <div class="metric-label">App Store Ranking</div>
          </div>
        </div>
        <div class="metric-tile countries-tile">
          <div class="metric-icon"><i class="fas fa-globe"></i></div>
          <div class="metric-content">
            <div class="metric-value">${marketData.countries.length}</div>
            <div class="metric-label">Countries</div>
          </div>
        </div>
      `;

    // 创建市场份额区域
    const shareSection = document.createElement('div');
    shareSection.className = 'share-section';
    shareSection.innerHTML = `
        <h3>Market Share</h3>
        <div class="share-bars">
          <div class="share-bar-item">
            <div class="share-label">US E-commerce</div>
            <div class="share-bar-container">
              <div class="share-bar" style="width: ${parseFloat(marketData.market_share.us_ecommerce) * 5}%"></div>
              <div class="share-value">${marketData.market_share.us_ecommerce}</div>
            </div>
          </div>
          <div class="share-bar-item">
            <div class="share-label">Global Mobile Shopping</div>
            <div class="share-bar-container">
              <div class="share-bar" style="width: ${
                parseFloat(marketData.market_share.global_mobile_shopping) * 5
              }%"></div>
              <div class="share-value">${marketData.market_share.global_mobile_shopping}</div>
            </div>
          </div>
        </div>
      `;

    // 创建国家覆盖区域
    const countriesSection = document.createElement('div');
    countriesSection.className = 'countries-section';
    countriesSection.innerHTML = `
        <h3>Global Presence</h3>
        <div class="countries-map">
          ${marketData.countries
            .map((country) => {
              // 为每个国家生成一个位置（这里是简化的随机位置）
              const left = Math.floor(Math.random() * 80) + 10;
              const top = Math.floor(Math.random() * 80) + 10;
              return `<div class="country-pin" style="left: ${left}%; top: ${top}%;" title="${country}">
          <div class="pin-dot"></div>
          <div class="country-name">${country}</div>
        </div>`;
            })
            .join('')}
      <div class="world-map-bg"></div>
    </div>
  `;

    container.appendChild(header);
    container.appendChild(metricsGrid);
    container.appendChild(shareSection);
    container.appendChild(countriesSection);
  } else if (style === 'infographic') {
    container.className = 'market-data-infographic';

    // 创建信息图表头部
    container.innerHTML = `
    <div class="infographic-header">
      <h2>Temu's Market Footprint</h2>
    </div>
    
    <div class="infographic-section user-section">
      <div class="info-icon-large">
        <i class="fas fa-users"></i>
      </div>
      <div class="info-content">
        <div class="info-title">User Base</div>
        <div class="info-value-large">${marketData.active_users}</div>
        <div class="info-subtitle">Growing at ${marketData.growth_rate}</div>
      </div>
    </div>
    
    <div class="infographic-divider">
      <div class="divider-line"></div>
      <div class="divider-icon"><i class="fas fa-shopping-cart"></i></div>
      <div class="divider-line"></div>
    </div>
    
    <div class="infographic-section app-section">
      <div class="app-ranking-visual">
        <div class="ranking-podium">
          <div class="podium-step step-1">1</div>
          <div class="podium-step step-2">2</div>
          <div class="podium-step step-3">3</div>
          <div class="podium-step step-4">4</div>
          <div class="podium-step step-5">5</div>
        </div>
        <div class="temu-position">Temu</div>
      </div>
      <div class="info-content">
        <div class="info-title">App Store Ranking</div>
        <div class="info-value">${marketData.app_ranking}</div>
      </div>
    </div>
    
    <div class="infographic-section market-share-section">
      <div class="info-title">Market Penetration</div>
      <div class="share-circles">
        <div class="share-circle us-circle">
          <div class="circle-inner">
            <div class="share-value">${marketData.market_share.us_ecommerce}</div>
            <div class="share-label">US E-commerce</div>
          </div>
        </div>
        <div class="share-circle global-circle">
          <div class="circle-inner">
            <div class="share-value">${marketData.market_share.global_mobile_shopping}</div>
            <div class="share-label">Global Mobile</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="infographic-section countries-section">
      <div class="info-title">Global Reach</div>
      <div class="countries-flags">
        ${marketData.countries
          .map((country) => {
            return `<div class="country-flag-container" title="${country}">
            <div class="flag-placeholder">${country.substring(0, 2)}</div>
            <div class="country-name-small">${country}</div>
          </div>`;
          })
          .join('')}
      </div>
    </div>
  `;
  }

  return container;
}

// ==================== 挑战与问题组件 ====================
export function createChallenges(challenges, style) {
  const container = document.createElement('div');

  if (style === 'bulletPoints') {
    container.className = 'challenges-bullet-points';

    container.innerHTML = `
    <div class="challenges-header">
      <h2>Challenges & Considerations</h2>
    </div>
    <ul class="challenges-list">
      ${challenges
        .map(
          (challenge) => `
        <li class="challenge-item">
          <div class="bullet-point"></div>
          <div class="challenge-text">${challenge}</div>
        </li>
      `,
        )
        .join('')}
    </ul>
  `;
  } else if (style === 'cards') {
    container.className = 'challenges-cards';

    container.innerHTML = `
    <div class="challenges-header">
      <h2>Key Challenges</h2>
    </div>
    <div class="challenges-card-container">
      ${challenges
        .map((challenge, index) => {
          // 为不同卡片选择不同的图标
          const icons = ['fa-exclamation-triangle', 'fa-truck', 'fa-users', 'fa-balance-scale'];
          const icon = icons[index % icons.length];

          return `
          <div class="challenge-card">
            <div class="card-icon"><i class="fas ${icon}"></i></div>
            <div class="card-content">${challenge}</div>
          </div>
        `;
        })
        .join('')}
    </div>
  `;
  } else if (style === 'matrix') {
    container.className = 'challenges-matrix';

    // 创建2x2矩阵，将挑战分为内部/外部和短期/长期
    const internalShort = challenges.slice(0, 1);
    const internalLong = challenges.slice(1, 2);
    const externalShort = challenges.slice(2, 3);
    const externalLong = challenges.length > 3 ? challenges.slice(3) : [];

    container.innerHTML = `
    <div class="challenges-header">
      <h2>Challenge Matrix</h2>
    </div>
    <div class="matrix-container">
      <div class="matrix-row">
        <div class="matrix-cell header-cell top-left">Internal</div>
        <div class="matrix-cell header-cell top-right">External</div>
      </div>
      <div class="matrix-row">
        <div class="matrix-cell content-cell">
          <div class="cell-label">Short-term</div>
          ${internalShort.map((c) => `<div class="challenge-item">${c}</div>`).join('')}
        </div>
        <div class="matrix-cell content-cell">
          <div class="cell-label">Short-term</div>
          ${externalShort.map((c) => `<div class="challenge-item">${c}</div>`).join('')}
        </div>
      </div>
      <div class="matrix-row">
        <div class="matrix-cell content-cell">
          <div class="cell-label">Long-term</div>
          ${internalLong.map((c) => `<div class="challenge-item">${c}</div>`).join('')}
        </div>
        <div class="matrix-cell content-cell">
          <div class="cell-label">Long-term</div>
          ${externalLong.map((c) => `<div class="challenge-item">${c}</div>`).join('')}
        </div>
      </div>
    </div>
  `;
  }

  return container;
}

// ==================== 未来展望组件 ====================
export function createFutureOutlook(outlookData, style) {
  const container = document.createElement('div');

  if (style === 'roadmap') {
    container.className = 'future-outlook-roadmap';

    container.innerHTML = `
          <div class="outlook-header">
        <h2>Future Outlook</h2>
        <p class="outlook-subtitle">${outlookData.projected_growth}</p>
      </div>
      
      <div class="roadmap-container">
        <div class="timeline-track"></div>
        
        <div class="roadmap-milestone expansion-milestone">
          <div class="milestone-dot"></div>
          <div class="milestone-content">
            <div class="milestone-title">Market Expansion</div>
            <ul class="milestone-details">
              ${outlookData.expansion_plans
                .map(
                  (plan) => `
                <li>${plan}</li>
              `,
                )
                .join('')}
            </ul>
          </div>
        </div>
        
        <div class="roadmap-milestone tech-milestone">
          <div class="milestone-dot"></div>
          <div class="milestone-content">
            <div class="milestone-title">Technology Investment</div>
            <ul class="milestone-details">
              ${outlookData.technology_investments
                .map(
                  (tech) => `
                <li>${tech}</li>
              `,
                )
                .join('')}
            </ul>
          </div>
        </div>
        
        <div class="roadmap-milestone growth-milestone">
          <div class="milestone-dot"></div>
          <div class="milestone-content">
            <div class="milestone-title">Projected Growth</div>
            <div class="growth-projection">
              <div class="projection-chart">
                <div class="chart-bar current"></div>
                <div class="chart-bar projected"></div>
              </div>
              <div class="projection-labels">
                <div class="label-current">Current</div>
                <div class="label-projected">Projected</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (style === 'cards') {
    container.className = 'future-outlook-cards';

    container.innerHTML = `
      <div class="outlook-header">
        <h2>Looking Ahead</h2>
      </div>
      
      <div class="outlook-cards-container">
        <div class="outlook-card expansion-card">
          <div class="card-icon"><i class="fas fa-globe-americas"></i></div>
          <div class="card-title">Expansion Plans</div>
          <ul class="card-list">
            ${outlookData.expansion_plans
              .map(
                (plan) => `
              <li>${plan}</li>
            `,
              )
              .join('')}
          </ul>
        </div>
        
        <div class="outlook-card tech-card">
          <div class="card-icon"><i class="fas fa-microchip"></i></div>
          <div class="card-title">Technology Investments</div>
          <ul class="card-list">
            ${outlookData.technology_investments
              .map(
                (tech) => `
              <li>${tech}</li>
            `,
              )
              .join('')}
          </ul>
        </div>
        
        <div class="outlook-card growth-card">
          <div class="card-icon"><i class="fas fa-chart-line"></i></div>
          <div class="card-title">Growth Trajectory</div>
          <div class="growth-statement">${outlookData.projected_growth}</div>
        </div>
      </div>
    `;
  } else if (style === 'infographic') {
    container.className = 'future-outlook-infographic';

    container.innerHTML = `
      <div class="outlook-header">
        <h2>Temu's Future Vision</h2>
      </div>
      
      <div class="vision-container">
        <div class="vision-center">
          <div class="center-circle">
            <div class="circle-content">
              <div class="circle-icon"><i class="fas fa-rocket"></i></div>
              <div class="circle-text">2025 Vision</div>
            </div>
          </div>
        </div>
        
        <div class="vision-branches">
          <div class="vision-branch expansion-branch">
            <div class="branch-line"></div>
            <div class="branch-icon"><i class="fas fa-globe"></i></div>
            <div class="branch-content">
              <div class="branch-title">Global Expansion</div>
              <ul class="branch-list">
                ${outlookData.expansion_plans
                  .map(
                    (plan) => `
                  <li>${plan}</li>
                `,
                  )
                  .join('')}
              </ul>
            </div>
          </div>
          
          <div class="vision-branch tech-branch">
            <div class="branch-line"></div>
            <div class="branch-icon"><i class="fas fa-robot"></i></div>
            <div class="branch-content">
              <div class="branch-title">Technology</div>
              <ul class="branch-list">
                ${outlookData.technology_investments
                  .map(
                    (tech) => `
                  <li>${tech}</li>
                `,
                  )
                  .join('')}
              </ul>
            </div>
          </div>
          
          <div class="vision-branch growth-branch">
            <div class="branch-line"></div>
            <div class="branch-icon"><i class="fas fa-chart-pie"></i></div>
            <div class="branch-content">
              <div class="branch-title">Market Share</div>
              <div class="growth-statement">${outlookData.projected_growth}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return container;
}

// ==================== 页脚组件 ====================
export function createFooter(companyData, style) {
  const container = document.createElement('div');

  if (style === 'minimal') {
    container.className = 'footer-minimal';

    container.innerHTML = `
      <div class="footer-content">
        <div class="company-name">${companyData.name}</div>
        <div class="footer-tagline">${companyData.tagline}</div>
        <div class="footer-copyright">© ${new Date().getFullYear()} ${
          companyData.name
        }. All data is for demonstration purposes.</div>
      </div>
    `;
  } else if (style === 'detailed') {
    container.className = 'footer-detailed';

    container.innerHTML = `
      <div class="footer-grid">
        <div class="footer-company-info">
          <div class="footer-logo">${companyData.name}</div>
          <div class="footer-tagline">${companyData.tagline}</div>
          <div class="footer-details">
            <div>Founded: ${companyData.founded}</div>
            <div>HQ: ${companyData.headquarters}</div>
          </div>
        </div>
        
        <div class="footer-links">
          <div class="links-column">
            <div class="link-header">Resources</div>
            <ul>
              <li>Press Kit</li>
              <li>Investor Relations</li>
              <li>Careers</li>
            </ul>
          </div>
          
          <div class="links-column">
            <div class="link-header">Connect</div>
            <ul>
              <li>Twitter</li>
              <li>LinkedIn</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        
        <div class="footer-copyright-section">
          <div class="footer-copyright">© ${new Date().getFullYear()} ${
            companyData.name
          }. All data is for demonstration purposes.</div>
        </div>
      </div>
    `;
  } else if (style === 'compact') {
    container.className = 'footer-compact';

    container.innerHTML = `
      <div class="compact-footer-content">
        <div class="footer-company">${companyData.name} © ${new Date().getFullYear()}</div>
        <div class="footer-separator">|</div>
                <div class="footer-separator">|</div>
        <div class="footer-tagline">${companyData.tagline}</div>
      </div>
    `;
  }

  return container;
}
