// STEP 1 - Include Dependencies
// Include react
import React from 'react'

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts'

// Include the fusioncharts library
import FusionCharts from 'fusioncharts'

// Include the chart type
import Column2D from 'fusioncharts/fusioncharts.charts'

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy'

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: 'doughnut2D',
    height: 400,
    width: '100%',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Stars Per Language',
        theme: 'candy',
        decimals: 0,
        showPercentValues:0,
        pieRadius: '45%',
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default ChartComponent
