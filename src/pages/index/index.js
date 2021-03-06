import Taro, { Component } from '@tarojs/taro'
import { View, Text,Image} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtButton ,AtInput,AtIcon} from 'taro-ui'
// import {BSTSlider}from '../../common/BST-trao-components/index'
import {TzHeader, Date} from "../../common"
import config from "../../config/index"

import './index.less'

@connect(({globle}) => ({
    ...globle,
}))
class Index extends Component {

  config = {
        "navigationBarTextStyle": "black",
  }
  constructor(props){
      super(props);
      this.state={
        hotelKeyWord:"",
        sliderScale:[
          {label:"10块",value:10},
          {label:"50块",value:50},
          {label:"70块",value:70},
          {label:"100块",value:100}
        ],
         dateShow: false,
         initDate:["2018-11-19", '2018-11-25']
      }
  }

  componentWillReceiveProps (nextProps) {
    //console.log(this.props, nextProps)
  }

  componentDidMount() {
      this.props.dispatch({
          type:'globle/load'
      })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  queryHotel(){
    Taro.navigateTo({
      url: '/pages/hotellist/index'
    })
  }
  goOrderList(e){
    // 跳转到目的页面，打开新页面
    Taro.navigateTo({
        url: '/pages/orderlist/index'
    })
  }
  hotelInputChange(value){
    // this.setState({hotelKeyWord:value});
  }

  //选择城市
  chooseCity(){
     Taro.navigateTo({
         url: '/pages/city/index'
     })
  }
  //日期的显示
    onDateStatus(status){
      this.setState({
          "dateShow": status
      })
    }
    //获取日期
    onGetDate(date){
        this.setState({
           "initDate": date,
            dateShow: false
        },()=>{
            console.log("initDate", this.state.initDate);
        })
    }

    showphoto(){
        Taro.navigateTo({
            url: '/pages/photoshow/index'
        })
    }

  render () {
    let { dateShow,initDate } =  this.state;
    return (
      <View className='container'>
       {/*  <TzHeader  mode='white' type={process.env.TARO_ENV} >首页</TzHeader>*/}
        <Image className="index-banner" mode="aspectFill" src={config.imgDomain+"/images/hotel_banner_01.png"} onClick={this.showphoto.bind(this)}/>
        <View className="pd-15">
          <View className="index-form">
            <View  className="bst-flex-box index-form-line">
              <View className="index-address bst-flex-box1" onClick={this.chooseCity.bind(this)}>
                <View className="index-address-name">{"久宜祥酒店附近"}</View>
                <View className="second-line">{"成都市武侯区锦城大道附近"}</View>
              </View>
              <View className="index-location index-line-end bst-flex-box2">
                <View>
                  <Image mode="aspectFill" src={config.imgDomain+"/images/location-icon.png"}/>
                  <View>我的位置</View>
                </View>
              </View>
            </View>
            <View   className="bst-flex-box index-form-line" onClick={this.onDateStatus.bind(this, true)}>
              <View className="text-ellipsis  bst-flex-box1">
                <View className="index-time-start">
                  <View><Text className="line-date-number">9.14</Text><Text>今天</Text></View>
                  <View className="second-line second-line-icon-left">入住时间</View>
                </View>
                <View className="index-time-end">
                  <View><Text className="line-date-number">9.15</Text><Text>明天</Text></View>
                  <View  className="second-line second-line-icon-right">离店时间</View>
                </View>
              </View>
              <View className="line-date-end  bst-flex-box2 text-r"><Text>共1晚</Text></View>
            </View>
            <AtInput
              className="index-form-line index-hotel-name"
              clear
              placeholder={"酒店/关键词"}
              value={this.state.hotelKeyWord}
              onChange={this.hotelInputChange.bind(this)}
            />
            <AtInput className="index-form-line index-hotel-start" clear placeholder={"价格/星级"}/>
            <AtButton circle className="hotel-button index-submit" onClick={this.queryHotel.bind(this)}>查找酒店</AtButton>
            <AtButton circle onClick={this.goOrderList.bind(this)}>进入订单列表</AtButton>
          </View>
        </View>
        <Image className="index-logo" mode="aspectFill" src={config.imgDomain+"/images/tz-logo.png"}/>
        <Date onHiddenClick={this.onDateStatus.bind(this)} dateShow={dateShow} initDate={initDate} onGetDate={this.onGetDate.bind(this)}/>
      </View>
    )
  }
}

export default Index
