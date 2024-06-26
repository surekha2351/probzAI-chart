import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import * as domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import "./App.css";

interface DataPoint {
  timestamp: string;
  value: number;
}

const Chart: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<string>('daily');

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const handleZoom = (zoomLevel: string) => {
    setTimeframe(zoomLevel);
  };

  const exportChart = () => {
    const chart = document.getElementById('chart');
    if (chart) {
      domtoimage.toPng(chart)
        .then((dataUrl: string) => {
          saveAs(dataUrl, 'chart.png');
        })
        .catch((error: any) => {
          console.error('Failed to export chart', error);
        });
    }
  };

  const handleClick = (e: any) => {
    if (e && e.activePayload && e.activePayload.length > 0) {
      const payload = e.activePayload[0].payload;
      alert(`Timestamp: ${payload.timestamp}, Value: ${payload.value}`);
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleZoom('daily')} className='but'>Daily</button>
        <button onClick={() => handleZoom('weekly')} className='but'>Weekly</button>
        <button onClick={() => handleZoom('monthly')} className='but'>Monthly</button>
        <button onClick={exportChart} className='but1'>Export as PNG</button>
      </div>
      <ResponsiveContainer width="100%" height={400} id="chart">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            onClick={handleClick}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
