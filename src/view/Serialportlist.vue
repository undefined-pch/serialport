<template>
    <div class="large-screen" v-if="isShowLarge">
        <v-scale-screen width="1920" height="1080">
            <div class="all-content">
                <div class="screen-title">
                    <h2 style="color: white">表阀监控系统</h2>
                </div>
                <div class="nowtime">{{ nowtime }}</div>
                <div class="close" type="primary" @click="gotolargescreen()"></div>
                <div class="content-box">
                    <div class="left">
                        <div class="left-item">
                            <div class="meter-demo">
                                <div class="title">
                                    <p class="main-title">设备详情</p>
                                </div>
                                <div class="content">
                                    <div class="device-information">
                                        <img class="metericon" src="../assets/metericon.png" alt="" />
                                        <p>#1号表&nbsp;&nbsp;{{ firstmeter.temperature }}℃</p>
                                    </div>
                                    <div class="device-detail">
                                    </div>
                                </div>
                            </div>
                            <div class="cumulative-flow">
                                <p class="cumulative-title">[累计流量](m3)</p>
                                <div class="cumulative-content" id="cumulative-content"></div>
                            </div>
                            <div class="instantaneous-flow">
                                <p class="instantaneous-title">[瞬时流量](m3/h)</p>
                                <div class="instantaneous-content" id="instantaneous-content"></div>
                            </div>
                        </div>
                        <div class="left-item">
                            <div class="meter-demo">
                                <div class="title">
                                    <p class="main-title">设备详情</p>
                                </div>
                                <div class="content">
                                    <div class="device-information">
                                        <img class="metericon" src="../assets/metericon.png" alt="" />
                                        <p>#2号表&nbsp;&nbsp;{{ secondmeter.temperature }}℃</p>
                                    </div>
                                    <div class="device-detail">
                                    </div>
                                </div>
                            </div>
                            <div class="cumulative-flow">
                                <p class="cumulative-title">[累计流量](m3)</p>
                                <div class="cumulative-content" id="metertwocumulative"></div>
                            </div>
                            <div class="instantaneous-flow">
                                <p class="instantaneous-title">[瞬时流量](m3/h)</p>
                                <div class="instantaneous-content" id="metertwoinstantaneous"></div>
                            </div>
                        </div>
                        <div class="left-item">
                            <div class="meter-demo">
                                <div class="title">
                                    <p class="main-title">设备详情</p>
                                </div>
                                <div class="content">
                                    <div class="device-information">
                                        <img class="metericon" src="../assets/metericon.png" alt="" />
                                        <p>#3号表&nbsp;&nbsp;{{ thirdmeter.temperature }}℃</p>
                                    </div>
                                    <div class="device-detail">
                                    </div>
                                </div>
                            </div>
                            <div class="cumulative-flow">
                                <p class="cumulative-title">[累计流量](m3)</p>
                                <div class="cumulative-content" id="meterthreecumulative"></div>
                            </div>
                            <div class="instantaneous-flow">
                                <p class="instantaneous-title">[瞬时流量](m3/h)</p>
                                <div class="instantaneous-content" id="meterthreeinstantaneous"></div>
                            </div>
                        </div>
                        <div class="left-item">
                            <div class="meter-demo">
                                <div class="title">
                                    <p class="main-title">设备详情</p>
                                </div>
                                <div class="content">
                                    <div class="device-information">
                                        <img class="metericon" src="../assets/metericon.png" alt="" />
                                        <p>#4号表&nbsp;&nbsp;{{ fourthmeter.temperature }}℃</p>
                                    </div>
                                    <div class="device-detail">
                                    </div>
                                </div>
                            </div>
                            <div class="cumulative-flow">
                                <p class="cumulative-title">[累计流量](m3)</p>
                                <div class="cumulative-content" id="meterfourcumulative"></div>
                            </div>
                            <div class="instantaneous-flow">
                                <p class="instantaneous-title">[瞬时流量](m3/h)</p>
                                <div class="instantaneous-content" id="meterfourinstantaneous"></div>
                            </div>
                        </div>
                        <div class="left-item">
                            <div class="meter-demo">
                                <div class="title">
                                    <p class="main-title">设备详情</p>
                                </div>
                                <div class="content">
                                    <div class="device-information">
                                        <img class="metericon" src="../assets/metericon.png" alt="" />
                                        <p>#5号表</p>
                                    </div>
                                    <div class="device-detail">
                                    </div>
                                </div>
                            </div>
                            <div class="cumulative-flow">
                                <p class="cumulative-title">[累计流量](m3)</p>
                                <div class="cumulative-content"></div>
                            </div>
                            <div class="instantaneous-flow">
                                <p class="instantaneous-title">[瞬时流量](m3/h)</p>
                                <div class="instantaneous-content"></div>
                            </div>
                        </div>
                        <div class="left-item">
                            <div class="meter-demo">
                                <div class="title">
                                    <p class="main-title">设备详情</p>
                                </div>
                                <div class="content">
                                    <div class="device-information">
                                        <img class="metericon" src="../assets/metericon.png" alt="" />
                                        <p>#6号表</p>
                                    </div>
                                    <div class="device-detail">
                                    </div>
                                </div>
                            </div>
                            <div class="cumulative-flow">
                                <p class="cumulative-title">[累计流量](m3)</p>
                                <div class="cumulative-content"></div>
                            </div>
                            <div class="instantaneous-flow">
                                <p class="instantaneous-title">[瞬时流量](m3/h)</p>
                                <div class="instantaneous-content"></div>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="title">
                            <p class="main-title">监控报警</p>
                        </div>
                        <p class="alarm-title">[报警信息]</p>
                        <div class="alarm-list">
                            <vue3-seamless-scroll :list="alarmList" :step="0.5" class="scroll">
                                <template v-for="(item, index) in alarmList" :key="index">
                                    <div class="alarm-item">
                                        <div class="tip">
                                            <img class="tip-img" src="../assets/tip.png" alt=""
                                                style="width: 30px; height: 30px" />
                                        </div>
                                        <div class="message">
                                            <p>事件类型：{{ item.type }}</p>
                                        </div>
                                    </div>
                                </template>
                            </vue3-seamless-scroll>
                        </div>
                    </div>
                </div>
            </div>
        </v-scale-screen>
    </div>
    <div class="demo-collapse">
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="串口1" name="1">
                <demo @dropDownValueChange="fruitValueChange"></demo>
            </el-collapse-item>
            <el-collapse-item title="串口2" name="2">
                <demo @dropDownValueChange="getTwo"></demo>
            </el-collapse-item>
            <el-collapse-item title="串口3" name="3">
                <demo @dropDownValueChange="getThree"></demo>
            </el-collapse-item>
            <el-collapse-item title="串口4" name="4">
                <demo @dropDownValueChange="getFour"></demo>
            </el-collapse-item>
        </el-collapse>
        <el-button @click="lookLargeScreen">查看大屏</el-button>
    </div>
</template>
  
<script setup>
import VScaleScreen from "v-scale-screen";
import * as echarts from "echarts";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import "animate.css";
import { ref, onMounted, onUnmounted } from 'vue'
import demo from './demo.vue'

const activeNames = ref(['1'])
const handleChange = (val) => {
    console.log(val)
}


// 查看大屏
const lookLargeScreen = () => {
    // console.log('获取子组件中累计流量', portOne.value.driveljYdata );
    isShowLarge.value = !isShowLarge.value;
    setTimeout(() => {
        drivelj(); // 累计流量
        drivels(); // 流速
        drivemeter2lj()
        drivemeter2ls()
        drivemeter3lj()
        drivemeter3ls()
        drivemeter4lj()
        drivemeter4ls()
    }, 1000);
    setInterval(() => {
        setalarmList()
        drivelj()
        drivels()
        drivemeter2lj()
        drivemeter2ls()
        drivemeter3lj()
        drivemeter3ls()
        drivemeter4lj()
        drivemeter4ls()
    }, 3000)
}
const firstmeter = ref({}) // 第一个表
const secondmeter = ref({}) // 第二个表
const thirdmeter = ref({}) // 第三个表
const fourthmeter = ref({}) // 第四个表
// 组件一数据
const fruitValueChange = (e) => {
    // console.log('组件1的数据', e)
    // 将组件1的值赋值
    firstmeter.value = e
    // console.log(firstmeter.value, 'firstmeter的值');
}
// 组件二数据
const getTwo = (e) => {
    secondmeter.value = e
    // console.log('组件2的数据', e)
}
// 组件三数据
const getThree = (e) => {
    thirdmeter.value = e
    // console.log('组件2的数据', e)
}
// 组件四数据
const getFour = (e) => {
    fourthmeter.value = e
    // console.log('组件2的数据', e)
}

// const devicelist = ref([
//     { id: 1, deviceid: "1号表" },
//     { id: 2, deviceid: "2号表" },
//     { id: 3, deviceid: "3号表" },
//     { id: 4, deviceid: "4号表" },
//     { id: 5, deviceid: "5号表" },
//     { id: 6, deviceid: "6号表" },
// ]);

const alarmList = ref([
    // { type: "电池告警", time: "10-1" },
    // { type: "流量告警", time: "10-2" },
    // { type: "电压告警", time: "10-3" },
    // { type: "电压告警", time: "10-3" },
    // { type: "电压告警", time: "10-3" },
]);

// 报警列表
const setalarmList = () => {
    // console.log(firstmeter.value.binaryNumber2,firstmeter.value.binaryNumber1,'报警数字');
    // if (!firstmeter.value.binaryNumber2) {
    //     return
    // }else if(!secondmeter.value.binaryNumber2){
    //     return
    // }else if(!thirdmeter.value.binaryNumber2){
    //     return
    // }else if(!fourthmeter.value.binaryNumber2){
    //     return
    // }
    if (!firstmeter.value.binaryNumber2) {
        return
    }
    // 1号表状态字
    alarmList.value = []
    const firstarr = firstmeter.value.binaryNumber2.split('')
    console.log(firstarr,'firstarr');
    if (firstarr[0] == 1) {
        alarmList.value.push({ type: '1号表水管安装位置反向' })
    } 
    if (firstarr[1] == 1) {
        alarmList.value.push({ type: '1号表传感器故障或空管' })
    } 
    if (firstarr[2] == 1) {
        alarmList.value.push({ type: '1号表温度故障' })
    } 
    if (firstarr[3] == 1) {
        alarmList.value.push({ type: '1号表漏水' })
    } 
    if (firstarr[4] == 1) {
        alarmList.value.push({ type: '1号表爆管' })
    } 
    if (firstarr[5] == 1) {
        alarmList.value.push({ type: '1号表电池电压欠压' })
    } 
    // 808有 modbus没有
    // if (firstarr[6] == 0 && firstarr[7] == 0) {
    //     alarmList.value.push({ type: '阀开' })
    // } 
    // if (firstarr[6] == 0 && firstarr[7] == 2) {
    //     alarmList.value.push({ type: '阀关' })
    // } 
    // if (firstarr[6] == 0 && firstarr[7] == 3) {
    //     alarmList.value.push({ type: '阀门异常' })
    // }
    if (!secondmeter.value.binaryNumber2) {
        return
    }
    // 2号表状态字
    const secondarr = secondmeter.value.binaryNumber2.split('')
    if (secondarr[0] == 1) {
        alarmList.value.push({ type: '2号表水管安装位置反向' })
    } else if (secondarr[1] == 1) {
        alarmList.value.push({ type: '2号表传感器故障或空管' })
    } else if (secondarr[2] == 1) {
        alarmList.value.push({ type: '2号表温度故障' })
    } else if (secondarr[3] == 1) {
        alarmList.value.push({ type: '2号表漏水' })
    } else if (secondarr[4] == 1) {
        alarmList.value.push({ type: '2号表爆管' })
    } else if (secondarr[5] == 1) {
        alarmList.value.push({ type: '2号表电池电压欠压' })
    }
    // 3号表状态字
    if (!thirdmeter.value.binaryNumber2) {
        return
    }
    const thirdarr = thirdmeter.value.binaryNumber2.split('')
    if (thirdarr[0] == 1) {
        alarmList.value.push({ type: '3号表水管安装位置反向' })
    } else if (thirdarr[1] == 1) {
        alarmList.value.push({ type: '3号表传感器故障或空管' })
    } else if (thirdarr[2] == 1) {
        alarmList.value.push({ type: '3号表温度故障' })
    } else if (thirdarr[3] == 1) {
        alarmList.value.push({ type: '3号表漏水' })
    } else if (thirdarr[4] == 1) {
        alarmList.value.push({ type: '3号表爆管' })
    } else if (thirdarr[5] == 1) {
        alarmList.value.push({ type: '3号表电池电压欠压' })
    }
    // 4号表状态字
    if (!fourthmeter.value.binaryNumber2) {
        return
    }
    const fourtharr = fourthmeter.value.binaryNumber2.split('')
    if (fourtharr[0] == 1) {
        alarmList.value.push({ type: '4号表水管安装位置反向' })
    } else if (fourtharr[1] == 1) {
        alarmList.value.push({ type: '4号表传感器故障或空管' })
    } else if (fourtharr[2] == 1) {
        alarmList.value.push({ type: '4号表温度故障' })
    } else if (fourtharr[3] == 1) {
        alarmList.value.push({ type: '4号表漏水' })
    } else if (fourtharr[4] == 1) {
        alarmList.value.push({ type: '4号表爆管' })
    } else if (fourtharr[5] == 1) {
        alarmList.value.push({ type: '4号表电池电压欠压' })
    }
}

const isShowLarge = ref(false); // 是否展示大屏

// 关闭大屏
const gotolargescreen = () => {
    isShowLarge.value = !isShowLarge.value
}

onMounted(() => {
    // setInterval(() => {
    //     setalarmList()
    //     drivelj()
    //     drivels()
    //     drivemeter2lj()
    //     drivemeter2ls()
    //     drivemeter3lj()
    //     drivemeter3ls()
    //     drivemeter4lj()
    //     drivemeter4ls()
    // }, 3000)
    setInterval(() => {
        getnowTime()
    }, 1000)
})

const nowtime = ref('')
// 获取当前时间
const getnowTime = () => {
    const today = new Date()
    // 获取年、月、日、时、分、秒
    var year = today.getFullYear();
    var month = today.getMonth() + 1; // 月份是从 0 开始计数的，需要加1
    var day = today.getDate();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();

    // 格式化输出
    nowtime.value = year + "-" +
        (month < 10 ? "0" : "") + month + "-" +
        (day < 10 ? "0" : "") + day + " " +
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
    // console.log(formattedTime);
}

// 设置表1累计流量的最大值
const setMax = (arr) => {
    const datas = arr
    let newArr = datas.sort((a, b) => b - a);
    // console.log(newArr[0]);
    return newArr[0]
}
// 绘制表1累计流量图
const drivelj = () => {
    // console.log([...firstmeter.value.driveTime],'firstmeter.value.driveTime.value');
    let myChart = echarts.init(document.getElementById("cumulative-content"));
    // console.log(driveljYdata.value,'监听y值');
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3deaff"></span>'
                result += dotHtml + '累计流量：' + params[0].data + 'm3'
                return result
            }
        },
        grid: {
            top: "8%",
            left: "0%",
            right: "6%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "#fff",
                        margin: 15,
                    },
                },
                axisTick: { show: false },
                // data: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
                data: [...firstmeter.value.driveTime],
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: setMax([...firstmeter.value.driveljYdata]),
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: "累计流量",
                type: "line",
                smooth: true, //是否平滑曲线显示
                // symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,
                lineStyle: {
                    normal: {
                        color: "#3deaff", // 线条颜色
                    },
                },
                areaStyle: {
                    //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "rgba(61,234,255, 0.9)" },
                                { offset: 0.9, color: "rgba(61,234,255, 0)" },
                            ],
                            false
                        ),

                        shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: [...firstmeter.value.driveljYdata],
                // data: [111,222,333,121,212,244,400],
            },
        ],
    };
    option && myChart.setOption(option);
    // if (newCumFlowChart.value > 10000) {
    //     myChart.setOption({
    //         yAxis: {
    //             max: 50000
    //         }
    //     })
    // }
};

// 绘制表1瞬时流量
const drivels = () => {
    let myChart = echarts.init(document.getElementById("instantaneous-content"));
    // drivelsYdata.value.push(newFlowChart.value);
    // if (drivelsYdata.value.length == 5) {
    //     drivelsYdata.value.shift();
    // }
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#fda085"></span>'
                result += dotHtml + '瞬时流量：' + params[0].data + 'm3/h'
                return result
            }
        },
        grid: {
            top: "8%",
            left: "0%",
            right: "6%",
            bottom: "2%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "#fff",
                        margin: 15,
                    },
                },
                axisTick: { show: false },
                data: [...firstmeter.value.driveTime],
                // data: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: setMax([...firstmeter.value.drivessYdata]),
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: "瞬时流量",
                type: "line",
                smooth: true, //是否平滑曲线显示
                // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,
                lineStyle: {
                    normal: {
                        color: "#ff9d26", // 线条颜色
                    },
                },
                areaStyle: {
                    //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "#f6d365" },
                                { offset: 0.7, color: "#f6d46500" },
                            ],
                            false
                        ),

                        shadowColor: "#fda085", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: [...firstmeter.value.drivessYdata],
                // data: [33,44,55,77,66,55,88],
            },
        ],
    };
    option && myChart.setOption(option);
};

// 绘制表2累计流量图
const drivemeter2lj = () => {
    let myChart = echarts.init(document.getElementById("metertwocumulative"));
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3deaff"></span>'
                result += dotHtml + '累计流量：' + params[0].data + 'm3'
                return result
            }
        },
        grid: {
            top: "8%",
            left: "0%",
            right: "6%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "#fff",
                        margin: 15,
                    },
                },
                axisTick: { show: false },
                // data: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
                data: [...secondmeter.value.driveTime],
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: setMax([...secondmeter.value.driveljYdata]),
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: "累计流量",
                type: "line",
                smooth: true, //是否平滑曲线显示
                // 	symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,
                lineStyle: {
                    normal: {
                        color: "#3deaff", // 线条颜色
                    },
                },
                areaStyle: {
                    //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "rgba(61,234,255, 0.9)" },
                                { offset: 0.7, color: "rgba(61,234,255, 0)" },
                            ],
                            false
                        ),

                        shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: [...secondmeter.value.driveljYdata],
                // data: [111,222,333,121,212,244,400],
            },
        ],
    };
    option && myChart.setOption(option);
    // if (newCumFlowChart.value > 10000) {
    //     myChart.setOption({
    //         yAxis: {
    //             max: 50000
    //         }
    //     })
    // }
};

// 绘制表2瞬时流量
const drivemeter2ls = () => {
    let myChart = echarts.init(document.getElementById("metertwoinstantaneous"));
    // drivelsYdata.value.push(newFlowChart.value);
    // if (drivelsYdata.value.length == 5) {
    //     drivelsYdata.value.shift();
    // }
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#fda085"></span>'
                result += dotHtml + '瞬时流量：' + params[0].data + 'm3/h'
                return result
            }
        },
        grid: {
            top: "8%",
            left: "0%",
            right: "6%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "#fff",
                        margin: 15,
                    },
                },
                axisTick: { show: false },
                data: [...secondmeter.value.driveTime],
                // data: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: setMax([...secondmeter.value.driveljYdata]),
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: "瞬时流量",
                type: "line",
                smooth: true, //是否平滑曲线显示
                // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,
                lineStyle: {
                    normal: {
                        color: "#ff9d26", // 线条颜色
                    },
                },
                areaStyle: {
                    //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "#f6d365" },
                                { offset: 0.7, color: "#f6d46500" },
                            ],
                            false
                        ),

                        shadowColor: "#fda085", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: [...secondmeter.value.drivessYdata],
                // data: [33,44,55,77,66,55,88],
            },
        ],
    };
    option && myChart.setOption(option);
};

// 绘制表3累计流量图
const drivemeter3lj = () => {
    let myChart = echarts.init(document.getElementById("meterthreecumulative"));
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3deaff"></span>'
                result += dotHtml + '累计流量：' + params[0].data + 'm3'
                return result
            }
        },
        grid: {
            top: "8%",
            left: "0%",
            right: "6%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "#fff",
                        margin: 15,
                    },
                },
                axisTick: { show: false },
                // data: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
                data: [...thirdmeter.value.driveTime],
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: setMax([...thirdmeter.value.driveljYdata]),
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: "累计流量",
                type: "line",
                smooth: true, //是否平滑曲线显示
                // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,

                lineStyle: {
                    normal: {
                        color: "#3deaff", // 线条颜色
                    },
                },
                areaStyle: {
                    //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "rgba(61,234,255, 0.9)" },
                                { offset: 0.7, color: "rgba(61,234,255, 0)" },
                            ],
                            false
                        ),

                        shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: [...thirdmeter.value.driveljYdata],
                // data: [111,222,333,121,212,244,400],
            },
        ],
    };
    option && myChart.setOption(option);
    // if (newCumFlowChart.value > 10000) {
    //     myChart.setOption({
    //         yAxis: {
    //             max: 50000
    //         }
    //     })
    // }
};

// 绘制表3瞬时流量
const drivemeter3ls = () => {
    let myChart = echarts.init(document.getElementById("meterthreeinstantaneous"));
    // drivelsYdata.value.push(newFlowChart.value);
    // if (drivelsYdata.value.length == 5) {
    //     drivelsYdata.value.shift();
    // }
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#fda085"></span>'
                result += dotHtml + '瞬时流量：' + params[0].data + 'm3/h'
                return result
            }
        },
        grid: {
            top: "8%",
            left: "0%",
            right: "6%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "#fff",
                        margin: 15,
                    },
                },
                axisTick: { show: false },
                data: [...thirdmeter.value.driveTime],
                // data: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: setMax([...thirdmeter.value.drivessYdata]),
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: "瞬时流量",
                type: "line",
                smooth: true, //是否平滑曲线显示
                // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,

                lineStyle: {
                    normal: {
                        color: "#ff9d26", // 线条颜色
                    },
                },
                areaStyle: {
                    //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "#f6d365" },
                                { offset: 0.7, color: "#f6d46500" },
                            ],
                            false
                        ),

                        shadowColor: "#fda085", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: [...thirdmeter.value.drivessYdata],
                // data: [33,44,55,77,66,55,88],
            },
        ],
    };
    option && myChart.setOption(option);
};

// 绘制表4累计流量图
const drivemeter4lj = () => {
    let myChart = echarts.init(document.getElementById("meterfourcumulative"));
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3deaff"></span>'
                result += dotHtml + '累计流量：' + params[0].data + 'm3'
                return result
            }
        },
        grid: {
            top: "8%",
            left: "0%",
            right: "6%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "#fff",
                        margin: 15,
                    },
                },
                axisTick: { show: false },
                // data: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
                data: [...fourthmeter.value.driveTime],
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: setMax([...fourthmeter.value.driveljYdata]),
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: "累计流量",
                type: "line",
                smooth: true, //是否平滑曲线显示
                // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,

                lineStyle: {
                    normal: {
                        color: "#3deaff", // 线条颜色
                    },
                },
                areaStyle: {
                    //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "rgba(61,234,255, 0.9)" },
                                { offset: 0.7, color: "rgba(61,234,255, 0)" },
                            ],
                            false
                        ),

                        shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: [...fourthmeter.value.driveljYdata],
                // data: [111,222,333,121,212,244,400],
            },
        ],
    };
    option && myChart.setOption(option);
    // if (newCumFlowChart.value > 10000) {
    //     myChart.setOption({
    //         yAxis: {
    //             max: 50000
    //         }
    //     })
    // }
};

// 绘制表4瞬时流量
const drivemeter4ls = () => {
    let myChart = echarts.init(document.getElementById("meterfourinstantaneous"));
    let option = {
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                var result = ''
                var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#fda085"></span>'
                result += dotHtml + '瞬时流量：' + params[0].data + 'm3/h'
                return result
            }
        },
        grid: {
            top: "8%",
            left: "0%",
            right: "6%",
            bottom: "8%",
            containLabel: true,
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLine: {
                    //坐标轴轴线相关设置。数学上的x轴
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置
                    textStyle: {
                        color: "#fff",
                        margin: 15,
                    },
                },
                axisTick: { show: false },
                data: [...fourthmeter.value.driveTime],
                // data: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: setMax([...fourthmeter.value.drivessYdata]),
                splitNumber: 4,
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#3366a1",
                    },
                },
                axisLine: { show: false },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        color: "#fff",
                    },
                },
                axisTick: { show: false },
            },
        ],
        series: [
            {
                name: "瞬时流量",
                type: "line",
                smooth: true, //是否平滑曲线显示
                // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,

                lineStyle: {
                    normal: {
                        color: "#ff9d26", // 线条颜色
                    },
                },
                areaStyle: {
                    //区域填充样式
                    normal: {
                        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                { offset: 0, color: "#f6d365" },
                                { offset: 0.7, color: "#f6d46500" },
                            ],
                            false
                        ),

                        shadowColor: "#fda085", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: [...fourthmeter.value.drivessYdata],
                // data: [33,44,55,77,66,55,88],
            },
        ],
    };
    option && myChart.setOption(option);
};
</script>
<style lang="less">
.el-collapse-item__wrap {
    // overflow:scroll;
    height: 470px;
}

.large-screen {
    position: fixed;
    z-index: 999;

    .all-content {
        position: relative;
        // background-image: url("../assets/bg1.png");
        // background-size: 100%;
        // background-repeat: no-repeat;
        background-image: radial-gradient(ellipse, #1d61af, #002957);
        height: 1080px;

        .nowtime {
            position: absolute;
            top: 24px;
            right: 80px;
            z-index: 9999;
            font-size: 16px;
            color: #79bbff;
        }

        .close {
            position: absolute;
            top: 20px;
            right: 30px;
            z-index: 9999;
            width: 26px;
            height: 26px;
            // background-color: #fff;
            background-image: url('../assets/newsetup.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }

        .content-box {
            position: absolute;
            top: 70px;
            left: 10px;
            width: 99%;
            height: 998px;
            // background-color:pink;
            box-shadow: 0 5px 8px 5px #083d79;
            display: flex;

            .left {
                width: 80%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                margin-top: 20px;

                .left-item {
                    flex-basis: 31%;
                    /* 每列占据的宽度 */
                    height: 468px;
                    position: relative;
                    border: 2px solid #2473cf;

                    .cumulative-flow {
                        position: absolute;
                        top: 200px;
                        left: 20px;
                        // background-color:pink;
                        width: 92%;
                        height: 100px;

                        .cumulative-title {
                            font-size: 14px;
                            line-height: 8px;
                            color: aliceblue;
                        }

                        .cumulative-content {
                            height: 90px;
                            // background-color: green;
                        }
                    }

                    .instantaneous-flow {
                        position: absolute;
                        top: 320px;
                        left: 20px;
                        // background-color:pink;
                        width: 92%;
                        height: 110px;

                        .instantaneous-title {
                            font-size: 14px;
                            line-height: 8px;
                            color: aliceblue;
                        }

                        .instantaneous-content {
                            height: 76px;
                            // background-color: green;
                        }
                    }

                    .title {
                        position: relative;
                        width: 100%;
                        height: 44px;
                        // background-color: #fff;
                        background-image: linear-gradient(#1b60b2, #0b305d);
                        border-bottom: 2px solid #2473cf;

                        .main-title {
                            position: absolute;
                            top: -4px;
                            left: 12px;
                            color: #fff;
                            font-size: 16px;
                            letter-spacing: 0.1em;
                        }
                    }

                    .content {
                        position: relative;
                        // background-color: pink;
                        height: 93%;

                        .named {
                            position: absolute;
                            top: 20px;
                            left: 20px;
                            color: white;
                        }

                        .device-information {
                            position: absolute;
                            top: 20px;
                            left: 50%;
                            margin-left: -210px;
                            width: 420px;
                            height: 110px;
                            background-color: #022f6694;
                            border-radius: 14px;
                            // opacity: 0.6;
                            border-top: 4px solid;
                            border-bottom: 4px solid;
                            border-image: linear-gradient(to right,
                                    #022f6600,
                                    #14ceeb,
                                    #022f6600) 4;
                            display: flex;
                            flex-direction: column;

                            .metericon {
                                width: 50px;
                                height: 50px;
                                margin-top: 14px;
                                align-self: center;
                                z-index: 99999;
                            }

                            p {
                                text-align: center;
                                color: white;
                                font-size: 16px;
                                line-height: 4px;
                            }
                        }
                    }
                }
            }

            .right {
                width: 19%;
                border: 2px solid #2473cf;
                height: 96%;
                margin-top: 20px;
                position: relative;

                .title {
                    position: relative;
                    width: 100%;
                    height: 44px;
                    // background-color: #fff;
                    background-image: linear-gradient(#1b60b2, #0b305d);
                    border-bottom: 2px solid #2473cf;

                    .main-title {
                        position: absolute;
                        top: -4px;
                        left: 12px;
                        color: #fff;
                        font-size: 16px;
                        letter-spacing: 0.1em;
                    }
                }

                .alarm-title {
                    position: absolute;
                    color: aliceblue;
                    margin-left: 10px;
                }

                .alarm-list {
                    position: absolute;
                    width: 94%;
                    height: 88%;
                    margin-left: 10px;
                    margin-top: 60px;
                    overflow: hidden;

                    .scroll {
                        height: 100%;

                        .alarm-item {
                            display: flex;
                            // background-color:pink;
                            border: 1px solid #892735;
                            background-color: #392f4f;
                            color: white;
                            height: 70px;
                            margin-top: 10px;

                            .tip {
                                width: 18%;
                                position: relative;

                                .tip-img {
                                    position: absolute;
                                    top: 20px;
                                    left: 20px;
                                }
                            }

                            .message {
                                height: 100%;

                                p {
                                    line-height: 36px;
                                }
                            }
                        }
                    }

                    // background-color: pink;
                }
            }
        }
    }

    .screen-title {
        width: 100%;
        height: 70px;
        position: relative;
        // background-color: pink;
        background-image: url("../assets/12.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        box-shadow: 0 5px 8px 5px #052b56;

        h2 {
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -92px;
            margin-top: -20px;
            color: white;
            font-size: 28px;
            text-shadow: 0px 5px 6px #052b56;
            letter-spacing: 0.2em;
        }
    }
}

.scroll {
    height: 420px;
    width: 100%;
    overflow: hidden;
}
</style>
  