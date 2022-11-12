import * as React from 'react';
import s from "./Dashboard.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { chartsColors } from 'const';

type Props = {
  title: string;
  name: 'ethnicity' | 'age';
  data: {
    label: string;
    value: number;
  }[]
};

export const ChartBlock = ({title, name, data}: Props) => {
  ChartJS.register(ArcElement, Tooltip);

  const values = data.map(({ value }) => value);

  const labels = data.map(({ label }) => label);

  const colors = chartsColors[name];


  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: "#ffffff",
        borderWidth: 1,
      },
    ],
  };

  const fullData = data.map((item, idx) => {
    return {
      ...item,
      color: colors[idx],
    };
  });

  return (
    <section className={s.chartBlock}>
      <h3>{title}</h3>
      <div className={s.chartWrap}>
        <div className={s.chart}>
          <Pie
            data={chartData}
            height="100%"
          />
        </div>
        <ul className={s.labels}>
          {fullData.map(({ label, color }) => {
            return (
              <li key={label} className={s.label}>
                <span
                  className={s.marker}
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                ></span>
                <span className={s.text}>{label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};