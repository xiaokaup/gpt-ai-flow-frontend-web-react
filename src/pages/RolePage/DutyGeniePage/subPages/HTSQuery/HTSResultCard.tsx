import './HTSResultCard.css';
import { useState } from 'react';
import { IHTSCodeItem } from '../../../../../gpt-ai-flow-common/interface-app/5_external/IExternalResources_for_app';
import { IGetT_frontend_output } from '../../../../../gpt-ai-flow-common/i18nProvider/ILocalesFactory';

const HTSResultCard = ({ t, result }: { t: IGetT_frontend_output; result: IHTSCodeItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const { mfnRateList = [] } = result;
  const isMFNRate = !!mfnRateList.find((item) => item.agreement === 'CN');

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // 格式化税率显示
  const formatRate = (rate) => {
    if (!rate) return 'N/A';
    return rate.includes('%') ? rate : `${rate}%`;
  };

  // 获取关税状态类名
  const getTariffStatusClass = () => {
    if (!result.section301Tariff) return '';
    const rate = parseFloat(result.section301Tariff);
    if (rate > 20) return 'high-tariff';
    if (rate > 0) return 'medium-tariff';
    return 'no-tariff';
  };

  return (
    <div className={`hts-result-card ${expanded ? 'expanded' : ''}`}>
      <div className="result-card-header" onClick={toggleExpand}>
        <div className="header-main-info">
          <span className="hts-code">{result.htsCode}</span>
          <span
            className={`tariff-badge ${getTariffStatusClass()} relative ${t.currentLocale === 'zh' ? 'right-10' : 'right-16'}`}
          >
            {result.section301Tariff ? `${t.get('301 关税')}: ${result.section301Tariff}` : t.get('无 301 关税')}
          </span>
        </div>
        <div className="header-description">
          {result.description.length > 100 && !expanded
            ? `${result.description.substring(0, 100)}...`
            : result.description}
        </div>
        <button className="expand-button">{expanded ? t.get('收起') : t.get('展开')}</button>
      </div>

      {expanded && (
        <div className="result-card-details">
          <div className="tabs">
            <button className={`tab ${activeTab === 'basic' ? 'active' : ''}`} onClick={() => setActiveTab('basic')}>
              {t.get('基本信息')}
            </button>
            <button className={`tab ${activeTab === 'rates' ? 'active' : ''}`} onClick={() => setActiveTab('rates')}>
              {t.get('详细税率')}
            </button>
            <button
              className={`tab ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              {t.get('历史变更')}
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'basic' && (
              <div className="basic-info">
                <div className="info-row">
                  <span className="info-label">{t.get('HTS 编码')}:</span>
                  <span className="info-value">{result.htsCode}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">{t.get('商品描述')}:</span>
                  <span className="info-value">{result.description}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">{t.get('章节')}:</span>
                  <span className="info-value">{result.chapter}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">{t.get('生效日期')}:</span>
                  <span className="info-value">{result.effectiveDate}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">{t.get('单位')}:</span>
                  <span className="info-value">{result.unit || 'N/A'}</span>
                </div>
              </div>
            )}

            {activeTab === 'rates' && (
              <div className="rates-info">
                <div className="rates-table">
                  <div className="rates-row header">
                    <div className="rates-cell">{t.get('税率类型')}</div>
                    <div className="rates-cell">{t.get('税率')}</div>
                    <div className="rates-cell">{t.get('适用国家/地区')}</div>
                  </div>
                  <div className="rates-row">
                    <div className="rates-cell">{t.get('一般税率')}</div>
                    <div className="rates-cell">{formatRate(result.generalRate)}</div>
                    <div className="rates-cell">{t.get('非最惠国待遇国家')}</div>
                  </div>
                  <div className="rates-row">
                    <div className="rates-cell">{t.get('最惠国税率')}</div>
                    <div className="rates-cell">{formatRate(result.mfnRate)}</div>
                    <div className="rates-cell">{t.get('WTO 成员国')}</div>
                  </div>
                  <div className="rates-row">
                    <div className="rates-cell">{t.get('301条款加征')}</div>
                    <div className="rates-cell">{formatRate(result.section301Tariff)}</div>
                    <div className="rates-cell">{t.get('中国')}</div>
                  </div>
                  {result.specialPrograms &&
                    result.specialPrograms.map((program, index) => (
                      <div className="rates-row" key={index}>
                        <div className="rates-cell">{program.name}</div>
                        <div className="rates-cell">{formatRate(program.rate)}</div>
                        <div className="rates-cell">{program.countries}</div>
                      </div>
                    ))}
                </div>

                <div className="total-rate-box">
                  <div className="total-rate-title">
                    {t.get('中国输美实际关税总计')}
                    {!isMFNRate && <span>({t.get('一般税率 + 301 条款')})</span>}
                    {isMFNRate && <span>({t.get('最惠国税率 + 301 条款')})</span>}:
                  </div>
                  {!isMFNRate && (
                    <div className="total-rate-value">
                      {formatRate(
                        (
                          parseFloat(result.generalRate === 'Free' ? '0' : result.generalRate) +
                          parseFloat(result.section301Tariff)
                        ).toFixed(1),
                      )}
                    </div>
                  )}
                  {isMFNRate && (
                    <div className="total-rate-value">
                      {formatRate(
                        (
                          parseFloat(result.mfnRate === 'Free' ? '0' : result.mfnRate) +
                          parseFloat(result.section301Tariff)
                        ).toFixed(1),
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="history-info">
                {result.tariffHistory && result.tariffHistory.length > 0 ? (
                  <div className="history-timeline">
                    {result.tariffHistory.map((history, index) => (
                      <div className="timeline-item" key={index}>
                        <div className="timeline-date">{history.date}</div>
                        <div className="timeline-content">
                          <div className="timeline-title">{history.action}</div>
                          <div className="timeline-details">
                            {history.oldRate && (
                              <span className="rate-change">
                                {history.oldRate} → {history.newRate}
                              </span>
                            )}
                            <p>{history.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-history">
                    <p>{t.get('暂无历史变更记录')}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="card-actions">
            <button className="action-button save-button !hidden">
              <i className="icon-bookmark"></i> 收藏
            </button>
            <button className="action-button export-button !hidden">
              <i className="icon-download"></i> 导出PDF
            </button>
            <a
              href={`https://hts.usitc.gov/search?query=${result.htsCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="action-button source-button"
            >
              <i className="icon-external-link"></i> {t.get('查看来源')}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HTSResultCard;
