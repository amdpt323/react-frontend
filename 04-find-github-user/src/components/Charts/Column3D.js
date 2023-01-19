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
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: 'column3D',
    height: 400,
    width: '100%',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Popular',
        xAxisName: 'Repos',
        yAxisName: 'Stars',
        xAxisFontSize: '16px',
        yAxisFontSize: '16px',
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default ChartComponent