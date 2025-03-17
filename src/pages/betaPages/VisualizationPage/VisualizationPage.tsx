import { templates } from './templates';
import { dataToVisualization } from './dataToVisualization';
import {
  createHeader,
  createKeyMetrics,
  createBusinessModel,
  createMarketData,
  createChallenges,
  createFutureOutlook,
} from './renderComponent';
import { useEffect, useState } from 'react';

const css_v1 = `
body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
  color: #333;
  line-height: 1.6;
}

/* 容器样式 */
.visualization-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 头部样式 */
.header-gradient {
  background: linear-gradient(135deg, #1a73e8, #34a853);
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.header-bold h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

/* 卡片样式 */
.key-metrics-cards .metric-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 16px;
  margin: 12px;
  display: inline-block;
  width: calc(25% - 24px);
  box-sizing: border-box;
  text-align: center;
}

.key-metrics-cards .metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a73e8;
}

.key-metrics-cards .metric-label {
  font-size: 0.9rem;
  color: #555;
}

/* 图表样式 */
.market-data-charts .chart-section h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #1a73e8;
}

/* 列表样式 */
.challenges-bullet-points {
  margin: 20px 0;
}

.challenges-bullet-points .challenge-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.challenges-bullet-points .bullet-point {
  width: 10px;
  height: 10px;
  background-color: #1a73e8;
  border-radius: 50%;
  margin-right: 10px;
}

/* 路线图样式 */
.future-outlook-roadmap {
  position: relative;
  padding: 20px;
}

.roadmap-container .milestone-dot {
  width: 12px;
  height: 12px;
  background-color: #34a853;
  border-radius: 50%;
  position: absolute;
  left: 0;
}

.roadmap-container .milestone-content {
  margin-left: 20px;
}

.growth-projection .chart-bar {
  height: 20px;
  margin-bottom: 5px;
}

.growth-projection .current {
  background-color: #4e73df;
  width: 40%;
}

.growth-projection .projected {
  background-color: #f6c23e;
  width: 80%;
}

/* 页脚样式 */
.footer-minimal {
  text-align: center;
  padding: 10px 0;
  background-color: #e0e0e0;
  color: #666;
}

.footer-minimal .footer-content {
  font-size: 0.9rem;
}`;

// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
const css_v2 = `/* 通用样式 */
body {
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fff;
  color: #333;
}

.visualization-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

/* 头部样式 */
.header-gradient {
  background: linear-gradient(135deg, #ff6f61, #d7263d);
  color: #fff;
  padding: 40px 20px;
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  border-bottom: 5px solid #d7263d;
  transition: background 0.5s ease-in-out;
}

.header-gradient:hover {
  background: linear-gradient(135deg, #d7263d, #ff6f61);
}

/* 关键指标样式 */
.key-metrics-cards {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  background-color: #f7f7f7;
  border-bottom: 5px solid #d7263d;
}

.key-metrics-cards .metric-card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 15px;
  width: 22%;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.key-metrics-cards .metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.key-metrics-cards .metric-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #d7263d;
}

.key-metrics-cards .metric-label {
  font-size: 1rem;
  color: #555;
}

/* 业务模型样式 */
.business-model-flowchart {
  padding: 30px;
  text-align: center;
  background-color: #fff;
  border-bottom: 5px solid #d7263d;
  position: relative;
}

.business-model-flowchart .model-type {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #d7263d;
}

.business-model-flowchart .flowchart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.flow-node {
  display: inline-block;
  text-align: center;
  margin: 0 20px;
  position: relative;
}

.flow-node .node-icon {
  font-size: 3rem;
  color: #d7263d;
}

.flow-arrow {
  font-size: 2rem;
  color: #333;
}

.key-features {
  margin-top: 20px;
  color: #444;
}

.key-features h3 {
  text-transform: uppercase;
  color: #d7263d;
}

/* 市场数据样式 */
.market-data-charts {
  padding: 30px;
  background-color: #f7f7f7;
  border-bottom: 5px solid #d7263d;
}

.market-data-charts h3 {
  font-size: 1.5rem;
  color: #d7263d;
}

/* 挑战列表样式 */
.challenges-bullet-points {
  padding: 30px;
  background-color: #fff;
  text-align: center;
  border-bottom: 5px solid #d7263d;
  position: relative;
}

.challenges-bullet-points .challenges-header h2 {
  font-size: 1.5rem;
  color: #d7263d;
  margin-bottom: 20px;
}

.challenges-bullet-points .challenge-item {
  margin: 10px 0;
  font-size: 1.2rem;
  color: #333;
}

.challenges-bullet-points .bullet-point {
  width: 10px;
  height: 10px;
  background-color: #ff6f61;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}

/* 页脚样式 */
.footer-minimal {
  text-align: center;
  padding: 20px;
  background-color: #d7263d;
  color: #fff;
}

.footer-minimal .footer-content {
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .key-metrics-cards {
    flex-direction: column;
    align-items: center;
  }
  
  .key-metrics-cards .metric-card {
    width: 90%;
    margin: 10px 0;
  }
}
`;

export const VisualizationPage = () => {
  // 主渲染函数
  function renderVisualization(data, templateId = 'corporate') {
    const template = templates[templateId];

    // 创建根容器
    const container = document.createElement('div');
    container.className = `visualization-container template-${templateId}`;
    container.style.fontFamily = template.typography.body;

    // 应用模板组件
    template.components.forEach((component) => {
      const componentElement = createComponent(component, data);
      componentElement.className = `component ${component.type} position-${component.position} style-${component.style}`;
      container.appendChild(componentElement);
    });

    return container;
  }

  function injectCSS(cssText) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(cssText));
    document.head.appendChild(style);
  }

  // 组件创建函数
  function createComponent(componentConfig, data) {
    const { type, style } = componentConfig;
    const element = document.createElement('div');

    switch (type) {
      case 'header':
        element.innerHTML = createHeader(data.company, style);
        break;
      case 'keyMetrics':
        element.appendChild(createKeyMetrics(data.key_statistics, style));
        break;
      case 'businessModel':
        element.appendChild(createBusinessModel(data.business_model, style));
        break;
      case 'marketData':
        element.appendChild(createMarketData(data.market_performance, style));
        break;
      case 'challenges':
        element.appendChild(createChallenges(data.challenges, style));
        break;
      case 'futureOutlook':
        element.appendChild(createFutureOutlook(data.future_outlook, style));
        break;
      // 其他组件类型...
    }

    return element;
  }

  const [domHtml] = useState(renderVisualization(dataToVisualization, 'corporate'));

  useEffect(() => {
    document.getElementById('demo-container').appendChild(domHtml);
    injectCSS(css_v1);

    const draggableElement = document.getElementById('draggable');

    draggableElement.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', null); // 必须调用此方法才能进行拖放
    });

    draggableElement.addEventListener('dragend', (event) => {
      const x = event.pageX;
      const y = event.pageY;
      draggableElement.style.left = `${x}px`;
      draggableElement.style.top = `${y}px`;
      draggableElement.style.position = 'absolute';
    });
  }, []);

  return (
    <div>
      {/* <div style={{ resize: 'both', overflow: 'auto', backgroundColor: 'lightcoral' }}>Resize me!</div> */}
      <h1 id="draggable" draggable="true" style={{ zIndex: 10, padding: 10 }}>
        <span contentEditable="true">Demo</span>
      </h1>
      <div id="demo-container" />
    </div>
  );
};
