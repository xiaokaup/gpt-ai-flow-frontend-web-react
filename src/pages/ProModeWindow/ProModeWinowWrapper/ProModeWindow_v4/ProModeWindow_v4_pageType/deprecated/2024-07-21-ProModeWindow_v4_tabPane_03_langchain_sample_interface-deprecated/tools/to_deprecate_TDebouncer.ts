export class Debouncer {
  private timeoutId: number | undefined;

  constructor(private delay: number) {}

  // 这个方法被调用来处理输入动作，如搜索请求
  debounce(handler: () => void) {
    // 如果已存在一个计时器，则先清除它
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
    }

    // 设置新的计时器
    // 在浏览器环境中，setTimeout 返回的是一个 number
    this.timeoutId = window.setTimeout(() => {
      handler();
      // 执行后清理计时器id
      this.timeoutId = undefined;
    }, this.delay);
  }
}
