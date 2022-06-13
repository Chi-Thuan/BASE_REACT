import React,  { useEffect, useState } from "react"
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, BarSeries, DataLabel, Legend, Tooltip, Category } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import PropTypes from 'prop-types'

const BarChart = (props) => {

  const [dataSold, setDataSold] = useState([])
  const [dataInStock, setDataInStock] = useState([])
  const [maxSold, setMaxSold] = useState(0)

  useEffect(() => {
    let dataSoldTemp = []
    let dataInStockTemp = []
    let { dataDepot = [] } = props
    dataDepot.sort((a, b) => {
      if(parseInt(a.sold) > parseInt(b.sold)) return -1
      else return 1
    })
    dataDepot = dataDepot.slice(0, 10).reverse()

    let arrayQuantityStock = dataDepot.map(e => parseInt(e.inStock))
    setMaxSold(Math.max(...arrayQuantityStock) || 1000)

    dataDepot.forEach((e => {
      dataInStockTemp.push({
        x : e.name,
        y : parseInt(e.inStock),
        tooltipLable : `${parseInt(e.inStock)} sản phẩm`,
        type : 'inStock'
      })

      dataSoldTemp.push({
        x : e.name,
        y : parseInt(e.sold),
        tooltipLable : `Đã bán ${parseInt(e.sold)} sản phẩm`,
        type : 'sold'
      })
    }))

    setDataSold(dataSoldTemp)
    setDataInStock(dataInStockTemp)

  }, [props.dataDepot])

  return (
    <>
      {
        (dataSold && dataInStock) && (dataSold.length > 0 && dataInStock.length > 0) > 0 ?
        <ChartComponent 
        id='charts2' 
        title={'Top 10 sản phẩm bán nhiều nhất'} 
        style={{ textAlign: "center" }} 
        primaryXAxis={{
            title: 'Sản phẩm',
            valueType: 'Category',
            enableTrim: true,
            maximumLabelWidth: 200,
            majorGridLines: { width: 0 },
            labelFormat: '{value}sp',
        }} 
        primaryYAxis={{
            minimum: 0,
            maximum: maxSold,
            labelFormat: '{value} SP',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                color: 'transparent'
            }
        }} 
        palettes={["rgba(85, 110, 230, 0.55)", "#556ee6"]}
        width={'100%'} 
        chartArea={{ border: { width: 0 } }} 
        legendSettings={{ visible: false }} 
        tooltip={{ enable: true, format: '${point.tooltip}' }}>
  
                <Inject services={[BarSeries, Legend, Tooltip, DataLabel, Category]}/>
                <SeriesCollectionDirective>
                    <SeriesDirective 
                      dataSource={dataInStock}
                      xName='x' 
                      yName='y' 
                      type='Bar' 
                      width={2} 
                      tooltipMappingName='tooltipLable' 
                      marker={{
                          dataLabel: {
                              visible: true,
                              position: 'Top', font: {
                                  fontWeight: '600',
                                  color: '#ffffff'
                              }
                          }
                      }} 
                      groupName="USA"
                      name='Trong kho'>
                    </SeriesDirective>
                    <SeriesDirective
                      dataSource={dataSold}
                      xName="x"
                      yName="y"
                      name="Đã bán"
                      type="Bar"
                      groupName="USA"
                      columnWidth={0.5}
                      columnSpacing={0.1}
                      tooltipMappingName='tooltipLable' 
                      marker={{
                        dataLabel: {
                          visible: true,
                          position: 'Top',
                          font: { fontWeight: '600', color: '#ffffff' },
                        },
                      }}
                    ></SeriesDirective>
                </SeriesCollectionDirective>
        </ChartComponent>
        :<div></div>
      }
    </>
  )
}

BarChart.propTypes = {
  dataDepot: PropTypes.any
}


export default BarChart
