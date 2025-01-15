import { useEffect } from 'react';
import { Chart } from '@antv/g2';

function Chart1() {

  useEffect(() => {
    // 准备数据
    const data = [
      { genre: 'Sports', sold: 275 },
      { genre: 'Strategy', sold: 115 },
      { genre: 'Action', sold: 120 },
      { genre: 'Shooter', sold: 350 },
      { genre: 'Other', sold: 150 },
    ];

    // 初始化图表实例
    const chart = new Chart({
      container: 'container',
    });

    // 声明可视化
    chart
      .interval() // 创建一个 Interval 标记
      .data(data) // 绑定数据
      .encode('x', 'genre') // 编码 x 通道
      .encode('y', 'sold'); // 编码 y 通道

    // 渲染可视化
    chart.render();
  }, []);

  return (
    <div id="container"></div>
  );
}

export default Chart1;
