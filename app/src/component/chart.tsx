import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const Chart = ({ data }: any) => (
  <ResponsiveContainer width="100%" height={500}>
    <BarChart
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="UserNFT" stackId="a" fill="#8884d8" />
      <Bar dataKey="BaseNFT" stackId="a" fill="#82ca9d" />
    </BarChart>
  </ResponsiveContainer>
);