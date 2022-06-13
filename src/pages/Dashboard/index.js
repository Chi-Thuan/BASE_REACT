import React, { Component } from "react"
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Filter, Toolbar, Sort, Page, ExcelExport, Group } from '@syncfusion/ej2-react-grids';
import MetaTags from 'react-meta-tags';
import {
  Card,
  CardBody,
  Container,
  Row, Col
} from "reactstrap"
import dataSale from "fakeData/sale";
import { formatCurrency } from "helpers/base_helper";
import Papa from "papaparse";
import toast from 'helpers/toast'
import BarChart from './componens/barChart/index'
import ChartSale from './componens/chartSale/index'

// STATUS DEPOT
// -1: ngưng bán
// 1: còn hàng
// 0: hết hàng


class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataDepot : [],
      dataSale : []
    }
  }

  toolbarClick(args) {
    switch (args.item.text) {
        case 'Excel Export':
            this.gridInstance.excelExport();
            break;
        case 'CSV Export':
            this.gridInstance.csvExport();
            break;
    }
  }

  toolbarClick2(args) {
    switch (args.item.text) {
        case 'Excel Export':
            this.gridInstance2.excelExport();
            break;
        case 'CSV Export':
            this.gridInstance2.csvExport();
            break;
    }
  }

  statusTemplate (props) { 
    return  (
    <div >
      { props.status == 0 && <span className="font-size-12 badge-soft-warning badge" >Đã tiếp nhận</span> }
      { props.status == 1 && <span className="font-size-12 badge-soft-primary badge" >Đã xác nhận</span> }
      { props.status == 2 && <span className="font-size-12 badge-soft-info badge" >Đang vận chuyển</span> }
      { props.status == 3 && <span className="font-size-12 badge-soft-success badge" >Đã giao hàng</span> }
      { props.status == 4 && <span className="font-size-12 badge-soft-danger badge" >Đã Hủy</span> }
    </div>
    )
}

priceTemplate (props) { 
  return  formatCurrency(props.price)
}

trustdetails(props) {
  if(props.status == 0) return <span className="font-size-12 badge-soft-warning badge" >Đã tiếp nhận</span>
  if(props.status == 1) return <span className="font-size-12 badge-soft-primary badge" >Đã xác nhận</span>
  if(props.status == 2) return <span className="font-size-12 badge-soft-info badge" >Đang vận chuyển</span>
  if(props.status == 3) return <span className="font-size-12 badge-soft-success badge" >Đã giao hàng</span>
  if(props.status == 4) return <span className="font-size-12 badge-soft-danger badge" >Đã Hủy</span>
  return <div>{props.status}</div>
}

async handleReadFileCVS(files) {
  let dataResult = []
 

  return dataResult
}

convertDataDepot(data){ 
  if(!data || data.length == 0) {
    this.setState({ dataDepot : [] })
    return toast.error('Lỗi định dạng file CSV')
  }
  
  
  const dataDepot = []
  const keyObj = data[0]

  data.forEach((e, i) => {
    if(i == 0 || e.length !== keyObj.length) return

    let objItem = {}
    keyObj.forEach((el, index_el) => {
      objItem[el] = e[index_el]
    })

    dataDepot.push(objItem)
  })

  this.setState({ dataDepot })
  toast.success('Thành công')
}

convertDataSale(data){ 
  if(!data || data.length == 0) {
    this.setState({ dataSale : [] })
    return toast.error('Lỗi định dạng file CSV')
  }
  
  
  const dataSale = []
  const keyObj = data[0]

  data.forEach((e, i) => {
    if(i == 0 || e.length !== keyObj.length) return

    let objItem = {}
    keyObj.forEach((el, index_el) => {
      objItem[el] = e[index_el]
    })

    dataSale.push(objItem)
  })

  this.setState({ dataSale })
  toast.success('Thành công')
}


render() {

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Tổng quan</title>
        </MetaTags>
        <Container fluid>
     

          <Card>
              <CardBody className="overflow-auto">
                <div className="w-100">
                  <h4 className="card-title mb-4">QUẢN LÝ KHO HÀNG</h4>
                  <div className="d-flex flex-wrap gap-2">
                    <label htmlFor="importCSV" type="button" className="btn btn-secondary">
                      <i className="mdi mdi-download font-size-16 align-middle me-2"></i> 
                        Import CSV
                    </label>
                    <input
                        id="importCSV"
                        hidden
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={ async (e) => {
                          const [files] = e.target.files;
                          if (files) {
                            Papa.parse(files, {
                              complete: (results) => {
                                this.convertDataDepot(results.data || [])
                              }}
                            )
                            
                          }
                        }}
                      />
                  </div>

                  <div className="w-100 mt-2">
                    <BarChart dataDepot={this.state.dataDepot}/>
                  </div>

                  <div className="w-100 mt-2" >
                    <GridComponent 
                      ref={grid => this.gridInstance2 = grid} 
                      dataSource={this.state.dataDepot}
                      allowGrouping={true}
                      allowSorting={true}
                      allowPaging={true} 
                      pageSettings={{ pageSizes: true }}
                      allowExcelExport={true}
                      toolbarClick={this.toolbarClick2.bind(this)}
                      toolbar={['Search', 'ExcelExport', 'CsvExport']}
                      >
                      <ColumnsDirective>
                          <ColumnDirective field='name' headerText="Tên sản phẩm" 
                            textAlign="center"
                            />
                          <ColumnDirective field='category' headerText="Danh mục cha" 
                            textAlign="center"
                          />
                          <ColumnDirective field='subCategory' headerText="Danh mục con" 
                            textAlign="center"
                          />
                          <ColumnDirective field='status' headerText="Trạng thái" 
                            textAlign="center"
                          />
                            <ColumnDirective field='price' headerText="Giá bán" 
                            textAlign="center"
                          />
                          <ColumnDirective field='inStock' headerText="Số lượng"
                            textAlign="center"
                            />
                          <ColumnDirective field="sold" headerText="Đã bán" 
                            textAlign="center"
                            />
                          <ColumnDirective field='dateImport' headerText="Ngày nhập hàng" 
                            textAlign="center"
                          />
                      </ColumnsDirective>
                      <Inject services={[Filter,Sort, Toolbar, Page, ExcelExport, Group]} />
                    </GridComponent>
                  </div>
                </div>
              </CardBody>
          </Card>
          <Card>
              <CardBody className="overflow-auto">
                <div className="w-100">
                    <h4 className="card-title mb-4">BÁO CÁO THEO ĐƠN HÀNG</h4>
                    <div className="d-flex flex-wrap gap-2">
                      <label htmlFor="importCSV_sale" type="button" className="btn btn-secondary">
                        <i className="mdi mdi-download font-size-16 align-middle me-2"></i> 
                          Import CSV
                      </label>
                      <input
                          id="importCSV_sale"
                          hidden
                          type="file"
                          accept=".csv,.xlsx,.xls"
                          onChange={ async (e) => {
                            const [files] = e.target.files;
                            if (files) {
                              Papa.parse(files, {
                                complete: (results) => {
                                  this.convertDataSale(results.data || [])
                                }}
                              )
                              
                            }
                          }}
                        />
                    </div>
                    <div className="d-sm-flex flex-wrap">
                  <div >

                  <div className="w-100 mt-2">
                    <ChartSale dataSale={this.state.dataSale}/>
                  </div>

                  <GridComponent 
                    dataSource={this.state.dataSale}
                    allowSorting={true}
                    allowFiltering={true}
                    filterSettings={{
                      type: 'Menu'
                    }}
                    enableHeaderFocus={true}
                    allowPaging={true} 
                    pageSettings={{ pageSizes: true }}
                    toolbar={['Search', 'ExcelExport', 'CsvExport']}
                    allowExcelExport={true}
                    ref={grid => this.gridInstance = grid} 
                    toolbarClick={this.toolbarClick.bind(this)}
                    >
                    <ColumnsDirective>
                        <ColumnDirective field='dateBuy' headerText="Thời gian mua" 
                          width='200' 
                          textAlign="center"
                          />
                        <ColumnDirective field='code' headerText="Mã đơn hàng" 
                          width='200' 
                          textAlign="center"/>
                        <ColumnDirective field='status' headerText="Trạng thái" 
                          filter={{
                            type: 'CheckBox',
                            itemTemplate: this.trustdetails
                          }} 
                          template={this.statusTemplate} 
                          width='200' 
                          textAlign="center"
                        />
                        <ColumnDirective field='price' headerText="Giá trị đơn hàng" 
                          template={this.priceTemplate} 
                          width='200' 
                          textAlign="center"
                          />
                        <ColumnDirective 
                          field='dateConfirm' 
                          headerText="Ngày duyệt" 
                          width='200' 
                          textAlign="center"
                          />
                        <ColumnDirective field='noteCancel' headerText="Lý do bị hủy" 
                          width='200' 
                          textAlign="center"
                          />
                    </ColumnsDirective>
                    <Inject services={[Filter,Sort, Toolbar, Page, ExcelExport]} />
                  </GridComponent>
                  </div>
                </div>
                </div>
              </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
  }
}

export default Dashboard;
