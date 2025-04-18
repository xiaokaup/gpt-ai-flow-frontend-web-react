import { useState } from 'react';
import { searchHtsCodes } from '../services/htsService';
import HTSResultCard from './HTSResultCard';
import './HTSQueryModule.css';
import { IHTSCodeItem } from '../interface';

const HTSQueryModule = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // 处理查询提交
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchInput.trim()) {
      setError('请输入至少一个 HTS 编码');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 分割输入文本，获取多个 HTS 编码
      const htsCodes = searchInput
        .split('\n')
        .map((code) => code.trim())
        .filter((code) => code.length > 0);

      // 验证 HTS 编码格式
      const invalidCodes = htsCodes.filter((code) => !/^\d{4,10}$/.test(code));
      if (invalidCodes.length > 0) {
        setError(`以下编码格式不正确: ${invalidCodes.join(', ')}`);
        setIsLoading(false);
        return;
      }

      // 调用 API 查询服务
      const results: IHTSCodeItem[] = await searchHtsCodes(htsCodes);
      setSearchResults(results);

      // 更新最近搜索记录
      const updatedRecentSearches = [...new Set([...htsCodes, ...recentSearches])].slice(0, 10);
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem('recentHtsSearches', JSON.stringify(updatedRecentSearches));
    } catch (err) {
      setError('查询失败，请稍后重试: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 从最近搜索中添加编码
  const addFromRecentSearch = (code) => {
    const currentCodes = searchInput.split('\n').filter((c) => c.trim());
    if (!currentCodes.includes(code)) {
      setSearchInput((prev) => (prev ? `${prev}\n${code}` : code));
    }
  };

  // 清空搜索结果
  const clearResults = () => {
    setSearchResults([]);
  };

  // 导出结果为 CSV
  const exportToCSV = () => {
    if (searchResults.length === 0) return;

    const headers = 'HTS Code,Description,General Rate,MFN Rate,Section 301 Tariff,Effective Date\n';
    const csvContent = searchResults.reduce((acc, result) => {
      return (
        acc +
        `"${result.htsCode}","${result.description}","${result.generalRate}","${result.mfnRate}","${result.section301Tariff}","${result.effectiveDate}"\n`
      );
    }, headers);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `hts_search_results_${new Date().toISOString().slice(0, 10)}.csv`);
    link.click();
  };

  return (
    <div className="hts-query-container">
      <div className="hts-query-header">
        <h2>HTS 关税查询</h2>
        <p className="hts-query-description">
          查询美国海关关税编码(HTS)的详细信息，包括基本税率、最惠国税率和301条款加征关税等。
          支持批量查询，每行输入一个HTS编码。
        </p>
      </div>

      <div className="hts-query-main">
        <div className="hts-search-panel">
          <form onSubmit={handleSearch}>
            <div className="search-input-container">
              <label htmlFor="htsSearch">HTS 编码查询 (每行一个编码)</label>
              <textarea
                id="htsSearch"
                className="hts-search-input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="输入HTS编码，例如：
8471300100
6104430000
9506910030"
                rows={5}
              />
              <div>
                <p>用于测试:</p>
                <p>
                  8471300100
                  <br />
                  6104430000
                  <br />
                  9506910030
                </p>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="search-actions">
              <button type="submit" className="search-button" disabled={isLoading}>
                {isLoading ? '查询中...' : '查询关税'}
              </button>

              {searchResults.length > 0 && (
                <>
                  <button type="button" className="clear-button" onClick={clearResults}>
                    清空结果
                  </button>
                  <button type="button" className="export-button" onClick={exportToCSV}>
                    导出CSV
                  </button>
                </>
              )}
            </div>
          </form>

          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <h3>最近搜索</h3>
              <div className="recent-search-tags">
                {recentSearches.map((code) => (
                  <span key={code} className="search-tag" onClick={() => addFromRecentSearch(code)}>
                    {code}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="hts-results-panel">
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>正在查询关税信息...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <h3>查询结果 ({searchResults.length})</h3>
              <div className="results-list">
                {searchResults.map((result) => (
                  <HTSResultCard key={result.htsCode} result={result} />
                ))}
              </div>
            </>
          ) : (
            <div className="no-results">
              <p>请输入HTS编码开始查询</p>
              <ul className="search-tips">
                <li>支持8-10位HTS编码</li>
                <li>可同时查询多个编码（每行一个）</li>
                <li>查询结果可导出为CSV文件</li>
                <li>支持查看历史税率变化</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HTSQueryModule;
