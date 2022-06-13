import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, AxesDirective, AxisDirective, SeriesDirective, Inject, LineSeries, ChartAnnotation, ColumnSeries, AnnotationsDirective, AnnotationDirective, Category, Tooltip } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { useEffect, useState } from "react";
import { formatCurrency } from "helpers/base_helper";

const index = (props) => {

    const [dataTiepNhan_line, setDataTiepNhan_line] = useState([])
    const [dataXacNhan_line, setDataXacNhan_line] = useState([])
    const [dataVanChuyen_line, setDataVanChuyen_line] = useState([])
    const [dataGiaoHang_line, setDataGiaoHang_line] = useState([])
    const [dataHuy_line, setDataHuy_line] = useState([])
    const [dataDoanhThu, setDataDoanhThu] = useState([])

    useEffect(() => {
        let dataChartSale = {};
        if(props.dataSale && props.dataSale.length > 0) {
            props.dataSale.forEach(e => {
                if(!Object.keys(dataChartSale).includes(e.dateBuy)) dataChartSale[e.dateBuy] = {}
            });

            Object.keys(dataChartSale).forEach((e, i) => {
                props.dataSale.forEach(el => {
                    // CHECK DATE SAME DATE
                    if(e != el.dateBuy) return;

                    // clone data
                    let dataTiepNhanTemp = [...dataChartSale[e].dataTiepNhan || [] ]
                    let dataXacNhanTemp = [...dataChartSale[e].dataXacNhan || [] ]
                    let dataVanChuyenTemp = [...dataChartSale[e].dataVanChuyen || [] ]
                    let dataGiaoHangTemp = [...dataChartSale[e].dataGiaoHang || [] ]
                    let dataHuyTemp = [...dataChartSale[e].dataHuy || [] ]
                    let dataDoanhThuTemp = dataChartSale[e].dataDoanhThu || 0

                    if(el.status == "0") dataTiepNhanTemp.push(el)
                    if(el.status == "1") dataXacNhanTemp.push(el)
                    if(el.status == "2") dataVanChuyenTemp.push(el)
                    if(el.status == "3") {
                        dataDoanhThuTemp += parseFloat(el.price)
                        dataGiaoHangTemp.push(el)
                    }
                    if(el.status == "4") dataHuyTemp.push(el)

                    dataChartSale[e]['dataTiepNhan'] = dataTiepNhanTemp
                    dataChartSale[e]['dataXacNhan'] = dataXacNhanTemp
                    dataChartSale[e]['dataVanChuyen'] = dataVanChuyenTemp
                    dataChartSale[e]['dataGiaoHang'] = dataGiaoHangTemp
                    dataChartSale[e]['dataHuy'] = dataHuyTemp
                    dataChartSale[e]['dataDoanhThu'] = dataDoanhThuTemp
                })
            })

            let ordered = Object.keys(dataChartSale).sort((a, b) => {
                if(new Date(a) < new Date(b)) return 1
                else return -1
            }).reduce(
                (obj, key, currentIndex) => { 
                    if(currentIndex + 1 >= 10) return obj
                    obj[key] = dataChartSale[key]; 
                    return obj;
                }, 
                {}
            );

            ordered = Object.keys(ordered).sort((a, b) => {
                if(new Date(a) < new Date(b)) return -1
                else return 1
            }).reduce(
                (obj, key) => { 
                    obj[key] = dataChartSale[key]; 
                    return obj;
                }, 
                {}
            );

            console.log('ordered== ', ordered)
            
            let dataTiepNhan_lineTemp = []
            let dataXacNhan_lineTemp = []
            let dataVanChuyen_lineTemp = []
            let dataGiaoHang_lineTemp = []
            let dataHuy_lineTemp = []
            let dataDoanhThu_columnTemp = []
            Object.keys(ordered).forEach(date => {
                console.log('date== ', date)
                dataTiepNhan_lineTemp.push({
                    x : date,
                    y : ordered[date].dataTiepNhan.length
                })
                dataXacNhan_lineTemp.push({
                    x : date,
                    y : ordered[date].dataXacNhan.length
                })
                dataVanChuyen_lineTemp.push({
                    x : date,
                    y : ordered[date].dataVanChuyen.length
                })
                dataGiaoHang_lineTemp.push({
                    x : date,
                    y : ordered[date].dataGiaoHang.length
                })
                dataHuy_lineTemp.push({
                    x : date,
                    y : ordered[date].dataHuy.length
                })
                dataDoanhThu_columnTemp.push({
                    x : date,
                    y : ordered[date].dataDoanhThu || 0
                })
            })

            setDataTiepNhan_line(dataTiepNhan_lineTemp)
            setDataXacNhan_line(dataXacNhan_lineTemp)
            setDataVanChuyen_line(dataVanChuyen_lineTemp)
            setDataGiaoHang_line(dataGiaoHang_lineTemp)
            setDataHuy_line(dataHuy_lineTemp)
            setDataDoanhThu(dataDoanhThu_columnTemp)

        }
    }, [props.dataSale])
    
    let data1 = [
        { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
        { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
        { x: 'Sat', y: 50 }
    ];


    return (
        dataDoanhThu && dataDoanhThu.length > 0 ?
        <ChartComponent 
            palettes={["#f1b44c", "#556ee6", "#50a5f1", "#34c38f", "#f46a6a"]}
            id='charts' 
            style={{ textAlign: "center" }} 
            primaryXAxis={{
                valueType: 'Category',
                interval: 1,
                labelIntersectAction: 'Rotate90',
                majorGridLines: { width: 0 }
            }} 
            primaryYAxis={{
                minimum: 0, maximum: 5000000, interval: 500000,
                lineStyle: { width: 0 },
                labelFormat: '{value}k'
            }} 
            width={'100%'} 
            chartArea={{ border: { width: 0 } }} 
            legendSettings={{ visible: false }} 
            title='Biểu đồ thống kê đơn hàng'  
            tooltip={{ enable: true }} >
                <Inject services={[LineSeries, ColumnSeries, Category, Tooltip, ChartAnnotation]}/>
                    <AxesDirective>
                        <AxisDirective 
                            majorGridLines={{ width: 0 }} 
                            rowIndex={0} 
                            opposedPosition={true} 
                            lineStyle={{ width: 0 }} 
                            minimum={0} 
                            maximum={10} 
                            interval={1} 
                            majorTickLines={{ width: 0 }} 
                            name='yAxis1' 
                            labelFormat='{value} Đơn hàng'>
                        </AxisDirective>
                    </AxesDirective>
                    <SeriesCollectionDirective>
                        <SeriesDirective 
                            dataSource={dataDoanhThu} 
                            xName='x' 
                            yName='y' 
                            width={2} 
                            name='Doanh thu' 
                            type='Column'
                            >
                        </SeriesDirective>
                        <SeriesDirective 
                            dataSource={dataTiepNhan_line} 
                            xName='x' 
                            yName='y' 
                            name='Đã tiếp nhận' 
                            type='Line' 
                            marker={{
                                visible: true, width: 10, height: 10, fill : '#f1b44c', border: { width: 2, color: '#f1b44c' }
                            }} 
                            yAxisName='yAxis1' 
                            width={2}
                            >
                        </SeriesDirective>
                        <SeriesDirective 
                            dataSource={dataXacNhan_line} 
                            xName='x' 
                            yName='y' 
                            name='Đã xác nhận' 
                            type='Line' 
                            marker={{
                                visible: true,  width: 10, height: 10, fill : '#556ee6', border: { width: 2, color: '#556ee6' }
                            }} 
                            yAxisName='yAxis1' 
                            width={2}
                            >
                        </SeriesDirective>
                        <SeriesDirective 
                            dataSource={dataVanChuyen_line} 
                            xName='x' 
                            yName='y' 
                            name='Đang vận chuyển' 
                            type='Line' 
                            marker={{
                                visible: true,  width: 10, height: 10, fill : '#50a5f1', border: { width: 2, color: '#50a5f1' }
                            }} 
                            yAxisName='yAxis1' 
                            width={2}
                            >
                        </SeriesDirective>
                        <SeriesDirective 
                            dataSource={dataGiaoHang_line} 
                            xName='x' 
                            yName='y' 
                            name='Đã giao hàng' 
                            type='Line' 
                            marker={{
                                visible: true,  width: 10, height: 10, fill : '#34c38f', border: { width: 2, color: '#34c38f' }
                            }} 
                            yAxisName='yAxis1' 
                            width={2}
                            >
                        </SeriesDirective>
                        <SeriesDirective 
                            dataSource={dataHuy_line} 
                            xName='x' 
                            yName='y' 
                            name='Hủy đơn hàng' 
                            type='Line' 
                            marker={{
                                visible: true,  width: 10, height: 10, fill : '#f46a6a', border: { width: 2, color: '#f46a6a' }
                            }} 
                            yAxisName='yAxis1' 
                            width={2}
                            >
                        </SeriesDirective>
                    </SeriesCollectionDirective>
        </ChartComponent>
        : <div></div>
    )
}

export default index