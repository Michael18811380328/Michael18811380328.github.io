---
layout:       post
title:        "省市区选择控件(wx)"
subtitle:     "province city district selection control"
date:         2018-09-26 14:55:00
author:       "ZeFeng"
header-img:   "img/china-area.jpg"
header-mask:  0.3
catalog:      true
tags:
    - JS
    - VUE
---

## 前言
现在省市区选择控件，我们可以搜索到就有很多参考了。我之所以写这篇主要是因为想要写一个更加灵活，体验更加好的。（特别是微信端的）<br />
先来看下我们这个控件展示效果<br />
<img src="https://00feng00.github.io/img/pro_city_dis.jpg">
<br />
下面开始讲我们这个控件里面的逻辑
## 正文
我们这个控件是使用VUE来开发的，代码主要包括html、css、js这三块。下面开始讲代码以及逻辑：<br />
html代码<br />
```
  <section class="myAddress">
    <!-- 省市区三级联动选项 -->
    <section class="showChose" v-show="showChose">
      <section class="address">
        <section class="topheader" id="topheader">
          <span>选择您所在的地区</span>
          <span @click="closeAdd()" class="close">×</span>
        </section>
        <section class="title" id="title">
          <div class="area" @click="provinceSelected(0)" :class="tabIndex===0?'active':''">
            {{Province ? Province : '请选择'}}
          </div>
          <div class="area" @click="citySelected(1)" :class="tabIndex===1?'active':''" v-show="Province">
            {{City ? City : '请选择'}}
          </div>
          <div class="area" @click="districtSelected(2)" :class="tabIndex===2?'active':''"
               v-show="City && hasDistrict && option===3">
            {{District ? District : '请选择'}}
          </div>
        </section>
        <ul id="searchBar" @scroll="ProvinceScroll"   v-show="showProvince">
          <!-- 常用城市 -->
          <div v-show="showProvince" class="frequentCity">
             <p class="frequentCityTip" v-show="showFrequentCity">常用城市</p>
              <div class="frequentCityList">
                <span class="cityName" v-for="(frequentCity, index) in frequentCitys" :key="'frequentCity'+index" @click="selectFrequentCity(frequentCity)">{{RegExp(/市/).test(frequentCity.city) ? frequentCity.city.slice(0,frequentCity.city.length-1) : frequentCity.city}}</span>
              </div>
            <div class="frequentCityTip" v-show="showProvince">选择省份</div>
          </div>
          <!-- 省市区列表 -->
          <div style="height: 101%">
          <li class="addList van-hairline--bottom" v-for="(v , k) in info"
              @click="getProvinceId(v.RNUM, v.AREA_NAME, k, v.AREA_CODE)" :class="v.selected ? 'active' : ''">
            {{v.AREA_NAME}}
          </li>
          </div>
        </ul>
        <ul id="cityChangeScroll" @scroll="cityChangeScroll"  v-show="showCity">
          <div style="height: 101%">
          <li class="addList van-hairline--bottom" v-for="(v,k) in showCityList"
              @click="getCityId(v.RNUM, v.AREA_NAME, k, v.AREA_CODE)" :class="v.selected ? 'active' : ''">{{v.AREA_NAME}}
          </li>
          </div>
        </ul>

        <ul id="DistrictChangeScroll"  @scroll="DistrictChangeScroll"
            v-show="showDistrict && option===3">
          <div style="height: 101%">
          <li class="addList van-hairline--bottom" v-for="(v,k) in showDistrictList"
              @click="getDistrictId(v.RNUM, v.AREA_NAME, k, v.AREA_CODE)" :class="v.selected ? 'active' : ''">
            {{v.AREA_NAME}}
          </li>
          </div>
        </ul>
      </section>
    </section>
  </section>
```

css代码:<br />

```
 .myAddress {
   width: 100%;
   background-color: white;
   color: #333;
   height: 100%;
 }
.showChose {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 120;
    background: rgba(77, 82, 113, 0.8);
  }
  .address {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 121;
    background: #fff;
    width: 100%;
    height: 100%;
  }
  .topTip{
    height: 0.88rem;
    font-size: .32rem;
    color: #000;
    line-height: 0.88rem;
    text-align: center;
  }
  .title{
    height: 0.88rem;
  }
  .unactTitle{
    background-color: #ffffff;
  }
  .actTitle{
    background-color: #f6f6f6;
  }
  .scrollDiv{
    height: 6.4rem;
    overflow-y: scroll;
  }
  .title h4 {
    display: inline-block;
    margin-left: 2rem;
    font-size: 0.32rem;
    line-height: 0.88rem;
    font-weight: normal;
    color: #999;
  }
  .title span {
    margin: 0.42rem 0 0 2.2rem;
    font-size: 0.45rem;
    line-height: 0.34rem;
    color: #D8D8D8;
  }
  .area {
    display: inline-block;
    font-size: 0.28rem;
    line-height: 0.64rem;
    height: 0.64rem;
    margin-left: 0.32rem;
    color: #333;
  }
  .addList {
    padding-left: 0.32rem;
    font-size: 0.28rem;
    height: 0.88rem;
    line-height: 0.88rem;
    color: #333;
  }
  /* 修改的格式 */
  .address ul {
    height: 86%;
    overflow-y: scroll;
    -webkit-overflow-scrolling : touch;
  }
  .address .title .active {
    color: #0071B8;
    border-bottom: 0.02rem solid #0071B8;
  }
  .address ul .active {
    color: #0071B8;
  }
  .provinceTip{
    background-color: #fafafa;
    font-size: .24rem;
    color: #262626;
    text-align: left;
    padding-left: .32rem;
    height: 0.64rem;
    line-height: 0.64rem;
  }
  .frequentCity{
    width: 7.5rem;
    height: 1.68rem;
    overflow: hidden;
  }
  .frequentCityTip{
    text-align: left;
    font-size: 0.24rem;
    padding-left: 0.32rem;
    background-color: #f6f6f6;
    height: 0.64rem;
    line-height: 0.64rem;
  }
  .frequentCityList{
    display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */
    display: -moz-box; /* Firefox 17- */
    display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */
    display: -moz-flex; /* Firefox 18+ */
    display: -ms-flexbox; /* IE 10 */
    display: flex; /* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ */
    flex-wrap: wrap;
    margin-right: .32rem;
    padding: 0 0.32rem;
  }
  .cityName{
    letter-spacing: .02rem;
    font-size: .28rem;
    border-radius: .4rem;
    height: 1.04rem;
    line-height: 1.04rem;
    margin-right: 0.24rem;
  }
```

js代码<br />

```
/* 这块是data里面需要的数据参数 */
data () {
    return {
      showChose: false,             // 是否显示省市区弹框
      showProvince: true,           // 显示省份列表
      showCity: false,              // 显示城市列表
      showDistrict: false,          // 显示区列表
      showCityList: false,          // 城市数据列表
      showDistrictList: false,      // 区数据列表
      province: 5,                  // 当前选择的省份index
      city: 3,                      // 当前选择的城市index
      district: 57,                 // 当前选择的区index
      District: false,              // 区名字
      Province: false,              // 省名字
      City: false,                  // 城市名字
      areaProvince: '',
      areaCity: '',
      areaDistrict: '',
      tabIndex: 0,                  // 当前选择的tab下标
      hasDistrict: true,            // 是否有区
      selected: false,              // 是否选中(active)
      info: [],                     // 后台交互的省市区接口数据（数据格式跟frequentCitys这个的数据格式是一样的。）
      frequentCitys: [
        {ProIndex: 19, city: '广州市', cityCode: '440100', cityIndex: 201, cityKey: 0, proKey: 18, province: '广东省', provinceCode: '440000'},
        {ProIndex: 19, city: '深圳市', cityCode: '440300', cityIndex: 203, cityKey: 2, proKey: 18, province: '广东省', provinceCode: '440000'},
        {ProIndex: 30, city: '乌鲁木齐市', cityCode: '650100', cityIndex: 347, cityKey: 0, proKey: 30, province: '新疆维吾尔自治区', provinceCode: '650000'},
        {ProIndex: 12, city: '合肥市', cityCode: '340100', cityIndex: 99, cityKey: 0, proKey: 11, province: '安徽省', provinceCode: '340000'}
      ],                            // 常用城市数据
      saveCityData: [],             // 存储选择的省市区的缓存数据
      showFrequentCity: true,       // 是否显示常用城市
      saveProAdcode: '',            // 保存当前选择的省份的编码
      svaeProIndex: -1,             // 保存当前选择的省份的索引
      saveProKey: -1,               // 保存当前选择的省份的下标
      saveCityCode: '',             // 保存当前选择的城市的编码
      svaeCityIndex: -1,            // 保存当前选择的城市的索引
      saveCityKey: -1,              // 保存当前选择的城市的下标
      stepProIndex: -1,             // 动态获取省份index
      stepProKey: -1,               // 动态获取城市index
      stepCityKey: -1,              // 动态获取城市key
      firstIsFinshed: false,          // first动态加载完成
      stepIsFinshed: false           // second动态加载完成
    }
  },
  /* 三个tab的点击的方法 */
    // 点击省份tab
     provinceSelected(index) {
       this.tabIndex = index
       // 选项页面的切换
       this.showProvince = true
       this.showCity = false
       this.showDistrict = false
       this.firstShow(1)
     },
    // 点击城市tab
    citySelected(index) {
      this.tabIndex = index
      this.showProvince = false
      this.showCity = true
      this.showDistrict = false
      this.firstShow(2)
     },
    // 点击区tab
    districtSelected(index) {
      this.tabIndex = index
      this.showProvince = false
      this.showCity = false 
      this.showDistrict = true
      this.firstShow(3)
    }
  /* 选择省市区的三个事件 */
    // 选择省份列表
      getProvinceId(code, input, index, adCode) {
        this.tabIndex = 1
        this.province = code
        this.Province = input
        this.showProvince = false
        this.showCity = true
        this.showDistrict = false
        this.saveProAdcode = adCode
        this.svaeProIndex = code
        this.saveProKey = index
        if (!this.City) {
        } else {
          this.City = '请选择'
        }
        if (!this.District) {
        } else {
          this.hasDistrict = false
          this.District = '请选择'
        }
        this.showCityList = this._filter(this.info, 'citys', this.province)
        // 点击选择当前
        /* eslint-disable */
        this.info.map(a => a.selected = false)
        /* eslint-enable */
        this.info[index].selected = true
        this.areaProvince = input
        this.firstShow(2)
      },
    // 选择城市列表
      getCityId(code, input, index, adCode) {
        this.tabIndex = 2
        this.city = code
        this.City = input
        this.showProvince = false
        this.showCity = false
        this.showDistrict = true
        this.District = '请选择'
        this.showDistrictList = this._filter(this.showCityList, 'district', this.city)
        // 选择当前添加active
        /* eslint-disable */
        this.showCityList.map(a => a.selected = false)
        /* eslint-enable */
        this.showCityList[index].selected = true
        this.areaCity = input
        // 判断当前选的城市是否有地区
        if (this.showDistrictList.length === 0) {
          this.hasDistrict = false
          this.showDistrict = false
          this.District = false
          this.showChose = false
          // 把选择的省市放入缓存中
          let selectCity = {}
          selectCity.province = this.Province
          selectCity.provinceCode = this.saveProAdcode
          selectCity.proKey = this.saveProKey
          selectCity.cityCode = adCode
          selectCity.cityKey = index
          selectCity.city = this.City
          selectCity.district = ''
          selectCity.districtCode = ''
          selectCity.ProIndex = this.svaeProIndex
          selectCity.cityIndex = adCode
          this.saveCityData = [];
          this.saveCityData.push(selectCity)
        } else {
          this.saveCityCode = adCode
          this.svaeCityIndex = code
          this.saveCityKey = index
          this.hasDistrict = true
          this.showDistrict = true
        }
        this.firstShow(3)
      },
      // 选择区列表
      getDistrictId(code, input, index, adCode) {
        this.district = code
        this.District = input
        // 选择当前添加active
        /* eslint-disable */
        this.showDistrictList.map(a => a.selected = false)
        /* eslint-enable */
        this.showDistrictList[index].selected = true
        // 选取市区选项之后关闭弹层
        this.showChose = false
        this.areaDistrict = input
        // 把选择的数据放入缓存中
        let selectCity = {}
        selectCity.province = this.Province
        selectCity.provinceCode = this.saveProAdcode
        selectCity.proKey = this.saveProKey
        selectCity.cityKey = this.saveCityKey
        selectCity.city = this.City
        selectCity.cityCode = this.saveCityCode
        selectCity.district = this.District
        selectCity.districtCode = adCode
        selectCity.ProIndex = this.svaeProIndex
        selectCity.cityIndex = this.svaeCityIndex
        console.log('this.District', this.District)
        this.saveCityData = [];
        this.saveCityData.push(selectCity)
        this.$emit('test', this.saveCityData)
        this.showChose = false
      },
      /* 省市区分别对应的三个滚动事件 */
      ProvinceScroll() {
        let scrollTop = document.getElementById('searchBar').scrollTop
        let scrollHeight = document.getElementById('searchBar').scrollHeight;
        let offsetHeight = document.getElementById('searchBar').offsetHeight + scrollTop;
        if (scrollTop === 0) {
          document.getElementById('searchBar').scrollTop = 1;
          document.body.addEventListener('touchmove', function (evt) {
            evt.stopPropagation()
          })
        }
        if (offsetHeight === scrollHeight) {
          document.body.addEventListener('touchmove', function (evt) {
            evt.stopPropagation()
          })
        }
        if (offsetHeight <= scrollHeight) {
        }
      },

      cityChangeScroll() {
        let scrollTop = document.getElementById('cityChangeScroll').scrollTop
        let scrollHeight = document.getElementById('cityChangeScroll').scrollHeight;
        let offsetHeight = document.getElementById('cityChangeScroll').offsetHeight + scrollTop;
        if (scrollTop == 0) {
          document.body.addEventListener('touchmove', function (evt) {
            evt.stopPropagation()
          })
        }
        if (offsetHeight == scrollHeight) {
          document.body.addEventListener('touchmove', function (evt) {
            evt.stopPropagation()
          })
        }
        if (scrollHeight <= offsetHeight) {
        }
      },
      DistrictChangeScroll() {
        let scrollTop = document.getElementById('DistrictChangeScroll').scrollTop
        let scrollHeight = document.getElementById('DistrictChangeScroll').scrollHeight;
        let offsetHeight = document.getElementById('DistrictChangeScroll').offsetHeight + scrollTop;
        if (scrollTop == 0) {
          document.body.addEventListener('touchmove', function (evt) {
            evt.stopPropagation()
          })
        }
        if (offsetHeight == scrollHeight) {
          document.body.addEventListener('touchmove', function (evt) {
            evt.stopPropagation()
          })
        }
        if (scrollHeight <= offsetHeight) {
        }
      },
      /* 数据刷选函数 */
     // 对选择当前的数据,进行下一级的数据的筛选
      _filter(add, name, code) {
        let result = []
        for (let i = 0; i < add.length; i++) {
          if (code == add[i].RNUM) {
            result = add[i][name]
          }
        }
        return result
      },
      /* 初始化的时候，防止拖动body滚动条函数 */
      firstShow (index) {
        this.$nextTick(function () {
          if (this.showChose === true) {
            if(index === 1){
              if (document.getElementById('searchBar').scrollTop === 0){
                document.getElementById('searchBar').scrollTop = 1;
              }
            } else if (index === 2) {
              if (document.getElementById('cityChangeScroll').scrollTop === 0){
                document.getElementById('cityChangeScroll').scrollTop = 1;
              }
            } else if (index === 3) {
              if (document.getElementById('DistrictChangeScroll').scrollTop === 0){
                document.getElementById('DistrictChangeScroll').scrollTop = 1;
              }
            }
          }
        })
      },
      /* 关闭弹框函数 */
      // 关闭弹框
      closeAdd() {
        this.District = false
        this.Province = false
        this.City = false
        this.showProvince = true
        this.showCity = false
        this.showDistrict = false
        this.tabIndex = 0
        this.showChose = false
        document.getElementById('se').style.display='block'
      },
      /* 显示弹框函数 */
      choseAdd() {
        this.showChose = true
        this.firstShow(1)
      },
```

## 分析
上面的代码拿到手就可以直接复制黏贴，然后就可以运行了。
这里讲下其中有几个需要注意的点：<br />
1、正常我们使用省市区控件默认都是隐藏的，只有当我们触发后才会显示我们的弹框，choseAdd()这个方法就是显示弹框的方法。<br />
2、当我们选择省市区完后，我们需要关闭弹框，closeAdd()这个方法就是关闭弹框的，需要注意，当我们再次点开的时候，应该显示区。<br />
3、我们拿到数据后，注意是用_filter()这个方法对数据进行过滤。<br />
4、当我们第一次加载这个控件后，为了防止用户下拉，拖动到body滚动条，我们需要用firstShow()这个方法来处理，体验更好。<br />
5、为了让体验更好，我们需要对省市区对应的滚动的事件进行处理。ProvinceScroll()、cityChangeScroll()、DistrictChangeScroll()<br />
6、info这个数据源的格式:<br />
```
[
  {
    AREA_CODE:"110000",
    AREA_NAME:"北京市",
    LV:2,
    P_AREA_CODE:"100000",
    RNUM:1,
    hasNodes:1,
    id:"110100",
    index:0,
    text:"北京市",
    citys:[
      {
        AREA_CODE: "110100", 
        AREA_NAME: "北京市", 
        LV: 3, 
        P_AREA_CODE: "110000", 
        RNUM: 1, 
        hasNodes:1,
        id: "110100",
        index: 0, 
        text: "北京市",
        district:[
          {
            AREA_CODE:"110101",
            AREA_NAME:"东城区",
            LV:4,
            P_AREA_CODE:"110100",
            RNUM:1,
            hasNodes:0,
            id:"110101",
            index:0,
            text:"东城区"
          }
        ],
      }
    ],
  }
]
```
info是一个数组，每个对象里面包含city这个数组，city每个对象里面又包含district这个数组。<br />
说明一下个别属性的含义：<br />
1、hasNodes是否有下一级（对象里面是否有数组）<br />
2、RNUM是当前是第几个（从1开始，省、市、区是分开算的，比如省是从1开始算，市是从1开始，区是从1开始算的。三者是分开的）<br />
3、index是当前下标是第几个(从0开始，当前数据对象所处的数组的第几个)<br />
4、LV可用可不用（可以自己根据需求来考虑）<br />

## 注意
看完上面的分析，应该对整个控件有了一定的理解了。最后需要注意的两点：<br />
1、info这个数据，是用来接收后端返回来的数据的。我们需要自己写一个方法来接收后端返回来的数据的。<br />
2、三个滚动事件主要处理的了滚动的边界，然后停止事件的传播。主要用到event.stoppropagation()<br />
## 后记
  最后说下完成这个控件，个人的一点感受。一般自己写钩子，可以提升自己对数据的处理能力，然后需要考虑到兼容性问题。最后需要对这个钩子进行不断的测试优化，最后上线。
