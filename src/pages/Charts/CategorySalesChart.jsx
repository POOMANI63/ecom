import { useEffect, useState } from "react";
import api from "../../services/api";

import Box from "@mui/material/Box";

import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function CategorySalesChart() {
  const [chartData, setChartData] = useState([]);

  const fetchChartData = async () => {
    try {
      const response = await api.get("/fetch_category_sales_chart");
      setChartData(response.data.data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };
  useEffect(() => {
    fetchChartData();
  }, []);

  const categories = chartData.map(
    (item) => item.product__category__category_name,
  );

  const sales = chartData.map((item) => item.total_sales);

  const pieData = chartData.map((item, index) => ({
    id: index,
    value: item.total_sales,
    label: item.product__category__category_name,
  }));

  // Free Funnel Alternative Data
  const funnelData = [
    { stage: "Visitors", value: 200 },
    { stage: "Product View", value: 180 },
    { stage: "Add To Cart", value: 90 },
    { stage: "Purchased", value: 50 },
  ];

  const monthlyData = [
    {
      month: "Jan",
      electronics: 20,
      clothes: 15,
      footwear: 5,
    },
    {
      month: "Feb",
      electronics: 30,
      clothes: 10,
      footwear: 8,
    },
    {
      month: "Mar",
      electronics: 25,
      clothes: 18,
      footwear: 12,
    },
    {
      month: "Apr",
      electronics: 40,
      clothes: 22,
      footwear: 15,
    },
    {
      month: "May",
      electronics: 35,
      clothes: 28,
      footwear: 20,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        p: 3,
      }}
    >
      {/* CATEGORY SALES BAR CHART */}
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: categories,
          },
        ]}
        series={[
          {
            data: sales,
            label: "Products Sold",
            highlightScope: {
              highlight: "item",
              fade: "global",
            },
          },
        ]}
        height={450}
        margin={{
          top: 30,
          right: 30,
          bottom: 50,
          left: 50,
        }}
      />

      {/* PIE CHART */}
      <PieChart
        series={[
          {
            data: pieData,
            highlightScope: {
              highlight: "item",
              fade: "global",
            },
          },
        ]}
        height={350}
      />

      {/* FREE FUNNEL STYLE BAR CHART */}
      <BarChart
        dataset={funnelData}
        height={350}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "stage",
          },
        ]}
        series={[
          {
            dataKey: "value",
            label: "Conversion Funnel",
          },
        ]}
      />

      {/* MONTHLY ANIMATED BAR CHART */}
      <BarChart
        dataset={monthlyData}
        width={1500}
        height={450}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
          },
        ]}
        axisHighlight={{
          x: "band",
        }}
        series={[
          {
            dataKey: "electronics",
            label: "Electronics",
            highlightScope: {
              highlight: "series",
              fade: "global",
            },
          },
          {
            dataKey: "clothes",
            label: "Clothes",
            highlightScope: {
              highlight: "series",
              fade: "global",
            },
          },
          {
            dataKey: "footwear",
            label: "Footwear",
            highlightScope: {
              highlight: "series",
              fade: "global",
            },
          },
        ]}
      />
    </Box>
  );
}
