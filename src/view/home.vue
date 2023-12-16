<template>
    <div class="content">
        <div class="demo-collapse" style="width:100%">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="表1" name="1">
                    <div class="content" style="width:100%">
                        <iframe class="left" src="/webserial/index.html" height="99%">
                            <p>您的浏览器不支持 iframe 标签。</p>
                        </iframe>
                        <div class="right">
                            <div class="top-content">
                                <svg t="1697441928977" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4044" width="20" height="20">
                                    <path
                                        d="M346.396444 310.840889c18.375111 0 33.223111-14.848 33.223111-33.223111L379.619556 144.611556c0-18.375111-14.904889-33.223111-33.223111-33.223111-18.375111 0-33.223111 14.848-33.223111 33.223111l0 132.949333C313.173333 295.992889 328.021333 310.840889 346.396444 310.840889zM512.568889 310.840889c18.375111 0 33.223111-14.848 33.223111-33.223111L545.792 144.611556c0-18.375111-14.848-33.223111-33.223111-33.223111-18.375111 0-33.223111 14.904889-33.223111 33.223111l0 132.949333C479.345778 295.992889 494.250667 310.840889 512.568889 310.840889zM412.899556 175.104l33.223111 0 0 66.446222-33.223111 0 0-66.446222ZM579.128889 175.104l33.223111 0 0 66.446222-33.223111 0 0-66.446222ZM911.36 811.121778l0-539.875556c0.113778-55.125333-44.657778-99.726222-99.669333-99.726222L745.244444 171.52l0 66.446222 66.446222 0c18.318222 0 33.336889 14.904889 33.336889 33.223111l0 539.932444c0 18.318222-15.018667 33.28-33.336889 33.28L213.447111 844.401778c-18.261333 0-33.223111-14.961778-33.223111-33.28L179.712 811.121778l0.512-539.875556c0-18.318222 14.904889-33.223111 33.223111-33.223111L279.893333 238.023111 279.893333 171.52 213.447111 171.52C158.435556 171.52 113.777778 216.120889 113.777778 271.246222l0 539.875556c0 55.239111 44.657778 99.726222 99.669333 99.726222l598.243556 0c53.418667 0 96.654222-41.927111 99.271111-94.776889 0.056889-0.284444 0.398222-0.625778 0.398222-0.910222l0-2.958222c0-0.398222 0.113778-0.739556 0.113778-1.137778L911.36 811.064889zM678.798222 310.840889c18.318222 0 33.223111-14.848 33.223111-33.223111L712.021333 144.611556c0-18.375111-14.904889-33.223111-33.223111-33.223111s-33.223111 14.848-33.223111 33.223111l0 132.949333C645.575111 295.992889 660.309333 310.840889 678.798222 310.840889zM312.604444 444.302222l398.848 0c18.204444 0 33.223111-14.904889 33.223111-33.223111 0-18.375111-15.018667-33.223111-33.223111-33.223111L312.604444 377.856c-18.375111 0-33.223111 14.848-33.223111 33.223111C279.381333 429.397333 294.229333 444.302222 312.604444 444.302222zM711.452444 541.866667 312.604444 541.866667c-18.375111 0-33.223111 14.904889-33.223111 33.223111s14.848 33.223111 33.223111 33.223111l398.848 0c18.204444 0 33.223111-14.904889 33.223111-33.223111S729.656889 541.866667 711.452444 541.866667zM711.452444 712.305778 312.604444 712.305778c-18.375111 0-33.223111 14.904889-33.223111 33.109333 0 18.375111 14.848 33.336889 33.223111 33.336889l398.848 0c18.204444 0 33.223111-14.961778 33.223111-33.336889C744.675556 727.153778 729.656889 712.305778 711.452444 712.305778z"
                                        fill="#272636" p-id="4045"></path>
                                </svg>
                                <span class="top-title">串口解析信息</span>
                            </div>
                            <div class="list">
                                <el-descriptions direction="vertical" :column="1" :size="size" border>
                                    <el-descriptions-item label="表地址">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ meteraddress }}</span>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="累计流量">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ newCumFlow }}</span>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="瞬时流量">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ newFlow }}</span>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="温度">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ newtemperature }}</span>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="时间">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ newMeterTime }}</span>
                                    </el-descriptions-item>
                                </el-descriptions>
                            </div>
                            <div class="bottom">
                                <el-button type="primary" @click="gotolargescreen()">查看大屏</el-button>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="表2" name="2">
                    <div class="content" style="width:100%">
                        <iframe class="left" src="/webserial/index.html" height="99%">
                            <p>您的浏览器不支持 iframe 标签。</p>
                        </iframe>
                        <div class="right">
                            <div class="top-content">
                                <svg t="1697441928977" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="4044" width="20" height="20">
                                    <path
                                        d="M346.396444 310.840889c18.375111 0 33.223111-14.848 33.223111-33.223111L379.619556 144.611556c0-18.375111-14.904889-33.223111-33.223111-33.223111-18.375111 0-33.223111 14.848-33.223111 33.223111l0 132.949333C313.173333 295.992889 328.021333 310.840889 346.396444 310.840889zM512.568889 310.840889c18.375111 0 33.223111-14.848 33.223111-33.223111L545.792 144.611556c0-18.375111-14.848-33.223111-33.223111-33.223111-18.375111 0-33.223111 14.904889-33.223111 33.223111l0 132.949333C479.345778 295.992889 494.250667 310.840889 512.568889 310.840889zM412.899556 175.104l33.223111 0 0 66.446222-33.223111 0 0-66.446222ZM579.128889 175.104l33.223111 0 0 66.446222-33.223111 0 0-66.446222ZM911.36 811.121778l0-539.875556c0.113778-55.125333-44.657778-99.726222-99.669333-99.726222L745.244444 171.52l0 66.446222 66.446222 0c18.318222 0 33.336889 14.904889 33.336889 33.223111l0 539.932444c0 18.318222-15.018667 33.28-33.336889 33.28L213.447111 844.401778c-18.261333 0-33.223111-14.961778-33.223111-33.28L179.712 811.121778l0.512-539.875556c0-18.318222 14.904889-33.223111 33.223111-33.223111L279.893333 238.023111 279.893333 171.52 213.447111 171.52C158.435556 171.52 113.777778 216.120889 113.777778 271.246222l0 539.875556c0 55.239111 44.657778 99.726222 99.669333 99.726222l598.243556 0c53.418667 0 96.654222-41.927111 99.271111-94.776889 0.056889-0.284444 0.398222-0.625778 0.398222-0.910222l0-2.958222c0-0.398222 0.113778-0.739556 0.113778-1.137778L911.36 811.064889zM678.798222 310.840889c18.318222 0 33.223111-14.848 33.223111-33.223111L712.021333 144.611556c0-18.375111-14.904889-33.223111-33.223111-33.223111s-33.223111 14.848-33.223111 33.223111l0 132.949333C645.575111 295.992889 660.309333 310.840889 678.798222 310.840889zM312.604444 444.302222l398.848 0c18.204444 0 33.223111-14.904889 33.223111-33.223111 0-18.375111-15.018667-33.223111-33.223111-33.223111L312.604444 377.856c-18.375111 0-33.223111 14.848-33.223111 33.223111C279.381333 429.397333 294.229333 444.302222 312.604444 444.302222zM711.452444 541.866667 312.604444 541.866667c-18.375111 0-33.223111 14.904889-33.223111 33.223111s14.848 33.223111 33.223111 33.223111l398.848 0c18.204444 0 33.223111-14.904889 33.223111-33.223111S729.656889 541.866667 711.452444 541.866667zM711.452444 712.305778 312.604444 712.305778c-18.375111 0-33.223111 14.904889-33.223111 33.109333 0 18.375111 14.848 33.336889 33.223111 33.336889l398.848 0c18.204444 0 33.223111-14.961778 33.223111-33.336889C744.675556 727.153778 729.656889 712.305778 711.452444 712.305778z"
                                        fill="#272636" p-id="4045"></path>
                                </svg>
                                <span class="top-title">串口解析信息</span>
                            </div>
                            <div class="list">
                                <el-descriptions direction="vertical" :column="1" :size="size" border>
                                    <el-descriptions-item label="表地址">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ meteraddress }}</span>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="累计流量">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ newCumFlow }}</span>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="瞬时流量">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ newFlow }}</span>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="温度">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ newtemperature }}</span>
                                    </el-descriptions-item>
                                    <el-descriptions-item label="时间">
                                        <span v-if="logMessage.length == 0"> 暂无数据 </span>
                                        <span v-else>{{ newMeterTime }}</span>
                                    </el-descriptions-item>
                                </el-descriptions>
                            </div>
                            <div class="bottom">
                                <el-button type="primary" @click="gotolargescreen()">查看大屏</el-button>
                            </div>
                        </div>
                    </div>

                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="large-screen" v-if="isShowLarge">
        <v-scale-screen width="1920" height="1080">
            <div class="all-content">
                <div class="screen-title">
                    <h2 style="color: white">表阀监控系统</h2>
                </div>
                <el-button class="close" type="primary" @click="gotolargescreen()">关闭大屏</el-button>
                <div class="content-box">
                    <div class="top">
                        <div class="main-meter">
                            <div class="meter-demo">
                                <div class="title">
                                    <p class="main-title">设备详情</p>
                                </div>
                                <div class="content">
                                    <p class="named">[设备基本参数]</p>
                                    <div class="device-information">
                                        <img class="metericon" src="../assets/metericon.png" alt="" />
                                        <p>#1号表</p>
                                        <p>{{ meteraddress }}</p>
                                    </div>
                                    <div class="device-detail">
                                        <p>
                                            <span style="color: white">累计流量：</span><span style="color: #4ad7cc">{{
                                                newCumFlow }} </span><span style="color: white"> m3/h</span>
                                        </p>
                                        <p>
                                            <span style="color: white">流速：</span><span style="color: #4ad7cc">{{ newFlow
                                            }}</span><span style="color: white"> m3</span>
                                        </p>
                                        <p>
                                            <span style="color: white">温度：</span><span style="color: #4ad7cc">{{ temperature
                                            }}</span><span style="color: white"> ℃</span>
                                        </p>
                                        <p>
                                            <span style="color: white">时间：</span><span style="color: #4ad7cc">{{
                                                newMeterTime }}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="detail">
                            <div class="meter-message">
                                <div class="title">
                                    <p class="main-title">参数分析</p>
                                </div>
                                <div class="cs-content">
                                    <div class="cs-first">
                                        <div class="first-top">
                                            <div class="cumulativeflow">
                                                <p class="cumulativeflow-title">[累计流量]</p>
                                                <div class="cumulativeflow-chart" id="mychart"></div>
                                            </div>
                                            <div class="temperature">
                                                <p class="temperature-title">[流速]</p>
                                                <div class="temperature-chart" id="temperature-chart"></div>
                                            </div>
                                        </div>
                                        <div class="first-bottom">
                                            <p class="ls-title">[温度]</p>
                                            <div class="ls-chart" id="ls-chart"></div>
                                        </div>
                                    </div>
                                    <div class="cs-third">
                                        <p class="alarm-title">[报警信息]</p>
                                        <div class="hasalarm">
                                            <div class="hasalarm-left">
                                                <span class="ishas">是否有事件：</span><span class="yes">是</span>
                                            </div>
                                            <div class="haslalrm-right">
                                                <span class="isnumber">事件数量：</span><span class="number">{{ alarmList.length
                                                }}</span>
                                            </div>
                                        </div>
                                        <div class="address">
                                            <vue3-seamless-scroll :list="alarmList" :step="0.5" class="scroll">
                                                <template v-for="(item, index) in alarmList" :key="index">
                                                    <div class="alarm-item">
                                                        <div class="tip">
                                                            <img class="tip-img" src="../assets/tip.png" alt=""
                                                                style="width: 30px; height: 30px" />
                                                        </div>
                                                        <div class="message">
                                                            <!-- <p>设备编号：{{ meteraddress }}</p> -->
                                                            <p>事件类型：{{ item }}</p>
                                                            <!-- <p>报警时间：{{ item.time }}</p> -->
                                                        </div>
                                                    </div>
                                                </template>
                                            </vue3-seamless-scroll>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bottom hvr-grow">
                        <div class="title">
                            <p class="main-title">设备选择</p>
                        </div>
                        <div class="bottom-content">
                            <template v-for="(item, index) in devicelist" :key="index">
                                <div class="device-item" @click="cardclick(index, $event)" :id="'idName' + index">
                                    <img class="device-img" src="../assets/meterwhite3.png" alt="" />
                                    <p class="device-id">
                                        <span style="color: white">表号：</span><span style="color: rgb(74, 215, 204)">{{
                                            item.deviceid
                                        }}</span>
                                    </p>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </v-scale-screen>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import VScaleScreen from "v-scale-screen";
import * as echarts from "echarts";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import "animate.css";

const logMessage = ref([]); // 日志信息
const meteraddress = ref(""); // 表地址
const cumulativeFlow = ref(""); // 累计流量
const newCumFlowChart = ref(""); // 累计流量小数点无单位
const newCumFlow = ref(""); // 小数点累计流量
const instantaneousFlow = ref(""); // 瞬时流量
const newFlowChart = ref(""); // 瞬时流量无小数点单位
const newFlow = ref(""); // 瞬时流量小数点
const temperature = ref(""); // 温度
const newtemperature = ref(""); // 格式化温度
const meterTime = ref(""); // 时间
const newMeterTime = ref(""); // 格式化时间
const isShowLarge = ref(false);
const driveljXdata = ref([]); // 累计流量时间
const driveljYdata = ref([]); // 累计流量数据
const drivelsYdata = ref([]); // 流速数据
const drivewdYdata = ref([]); // 温度数据
const alarmList = ref([]); // 告警信息

const activeNames = ref(['1'])
const handleChange = (val) => {
    console.log(val)
}

const alarmlist = ref([
    { type: "电池告警", time: "10-1" },
    { type: "流量告警", time: "10-2" },
    { type: "电压告警", time: "10-3" },
    { type: "电压告警", time: "10-3" },
    { type: "电压告警", time: "10-3" },
]);
const devicelist = ref([
    { id: 1, deviceid: "1号表" },
    { id: 2, deviceid: "2号表" },
    { id: 3, deviceid: "3号表" },
    { id: 4, deviceid: "4号表" },
    { id: 5, deviceid: "5号表" },
    { id: 6, deviceid: "6号表" },
]);

// 模拟温度

// watch(driveljYdata,(newVal,oldVal)=>{
//     console.log(newVal,oldVal,'新值旧值');
// })

onMounted(() => {
    setTimeout(() => {
        window.addEventListener("message", (e) => {
            // console.log(e.data,'e');
            logMessage.value = e.data;
            // console.log(this.logMessage);
            if (e.data) {
                if (e.data[38] == "808") {
                    showMeteraddress('808');
                    showCumulativeFlow('808');
                    showinstantaneousFlow('808');
                    showMetertime('808');
                } else if (e.data[51] == "modbus") {
                    showMeteraddress('modbus');
                    showStatusword()
                    showCumulativeFlow('modbus');
                    showinstantaneousFlow('modbus');
                    showtemperature()
                    showMetertime('modbus');
                }
                // 大屏打开时绘制
                if (isShowLarge.value == true) {
                    drivelj();
                    drivels();
                    drivewd();
                }
                // setInterval(()=>{
                //     drivewdYdata.value.push(21)
                // },3000)
            }
        });
    }, 1000);
    // loopPlayback()
});

// 展示表地址
const showMeteraddress = (type) => {
    meteraddress.value = "";
    if (type == '808') {
        for (let i = 11; i >= 5; i--) {
            meteraddress.value += logMessage.value[i];
        }
    } else if (type == 'modbus') {
        // meteraddress.value = parseInt(logMessage.value[47] + logMessage.value[48], 16);
        const a = parseInt(logMessage.value[47] + logMessage.value[48], 16);
        meteraddress.value = a.toString().padStart(4, '0')
    }
};

// 累计流量
const showCumulativeFlow = (type) => {
    cumulativeFlow.value = "";
    if (type == '808') {
        let unit = "m3";
        for (let i = 21; i >= 18; i--) {
            cumulativeFlow.value += logMessage.value[i];
        }
        let newArr = cumulativeFlow.value.split("");
        switch (logMessage.value[17]) {
            case "2C":
                newArr.splice(4, 0, ".");
                break;
            case "2B":
                newArr.splice(5, 0, ".");
                break;
            case "2A":
                newArr.splice(6, 0, ".");
                break;
            case "2D":
                newArr.splice(3, 0, ".");
                break;
            case "2E":
                newArr.splice(2, 0, ".");
                break;
            case "29":
                newArr.splice(7, 0, ".");
                break;
        }
        newCumFlowChart.value = newArr.join("");
        newCumFlow.value = newArr.join("") + unit;
    } else if (type == 'modbus') {
        newCumFlowChart.value = parseInt(logMessage.value[13] + logMessage.value[14] + logMessage.value[17] + logMessage.value[18], 16);
        newCumFlow.value = newCumFlowChart.value.toString().padStart(8, '0') + 'ml'
    }
};

// 瞬时流量
const showinstantaneousFlow = (type) => {
    let inFlowunit = "";
    if (type == '808') {
        if (logMessage.value[22] == "35") {
            inFlowunit = "m3/h";
        }
        instantaneousFlow.value = "";
        for (let i = 26; i >= 23; i--) {
            instantaneousFlow.value += logMessage.value[i];
        }
        let newArr = instantaneousFlow.value.split("");
        newArr.splice(4, 0, ".");
        newFlowChart.value = newArr.join("");
        newFlow.value = newArr.join("") + inFlowunit;
    } else if (type == 'modbus') {
        const a = parseInt(logMessage.value[21] + logMessage.value[22] + logMessage.value[23] + logMessage.value[24], 16);
        newFlow.value = a.toString().padStart(8, '0') + 'ml/h'
    }

};

// 时间
const showMetertime = (type) => {
    meterTime.value = "";
    if (type == '808') {
        for (let i = 33; i >= 27; i--) {
            meterTime.value += logMessage.value[i];
        }
        // console.log(this.meterTime);
        let newArr = meterTime.value.split("");
        newArr.splice(4, 0, "年");
        newArr.splice(7, 0, "月");
        newArr.splice(10, 0, `日 `);
        newArr.splice(13, 0, ":");
        newArr.splice(16, 0, ":");
        newMeterTime.value = newArr.join("");
    } else if (type == 'modbus') {
        const year = parseInt(logMessage.value[37] + logMessage.value[38], 16);
        const month = parseInt(logMessage.value[35] + logMessage.value[36], 16);
        const day = parseInt(logMessage.value[33] + logMessage.value[34], 16);
        const hour = parseInt(logMessage.value[31] + logMessage.value[32], 16);
        const minute = parseInt(logMessage.value[29] + logMessage.value[30], 16);
        const second = parseInt(logMessage.value[27] + logMessage.value[28], 16);
        newMeterTime.value = `${year}-${month}-${day}  ${hour}:${minute}:${second}`
    }

};

// 状态字
const showStatusword = () => {
    alarmList.value = []
    // 第一字节状态字
    const decimalNumber = parseInt(logMessage.value[19], 16)
    const binaryNumber = decimalNumber.toString(2)
    binaryNumber.split("")
    if (binaryNumber.length == 7) {
        if (binaryNumber[2] == '1') {
            alarmList.value.push('电池电压欠压')
        } else if (binaryNumber[3] == '1') {
            alarmList.value.push('爆管')
        } else if (binaryNumber[4] == '1') {
            alarmList.value.push('漏水')
        } else if (binaryNumber[5] == '1') {
            alarmList.value.push('温度故障')
        } else if (binaryNumber[6] == '1') {
            alarmList.value.push('流量传感器故障或空管')
        } else if (binaryNumber[7] == '1') {
            alarmList.value.push('水管安装位置反向')
        }
    }
    // 第二节状态字
    const decimalNumber2 = parseInt(logMessage.value[20], 16)
    const binaryNumber2 = decimalNumber2.toString(2)
    binaryNumber2.split("")
    if (binaryNumber2.length == 7) {
        if (binaryNumber2[0] == '1') {
            alarmList.value.push('流量过载')
        } else if (binaryNumber2[1] == '1') {
            alarmList.value.push('传感器声道异常')
        }
    }
}

// 温度
const showtemperature = () => {
    temperature.value = parseInt(logMessage.value[25] + logMessage.value[26], 16) / 100
    newtemperature.value = parseInt(logMessage.value[25] + logMessage.value[26], 16) / 100 + '℃';
    // const a = parseInt(logMessage.value[25] + logMessage.value[26], 16)
    // newtemperature.value = a.slice(0,-1) + '.' + a.slice(-1)
}

// 展示大屏页面
const gotolargescreen = () => {
    isShowLarge.value = !isShowLarge.value;
    setTimeout(() => {
        drivelj(); // 累计流量
        drivels(); // 流速
        drivewd(); // 温度
        loopPlayback(); // 自动循环点击
    }, 1000);
};

// 绘制累计流量图
const drivelj = () => {
    let myChart = echarts.init(document.getElementById("mychart"));
    driveljXdata.value.push(newMeterTime.value.slice(11));
    driveljYdata.value.push(newCumFlowChart.value);
    if (driveljXdata.value.length == 5) {
        driveljXdata.value.shift();
        driveljYdata.value.shift();
    }
    // console.log(driveljYdata.value,'监听y值');
    let option = {
        tooltip: {},
        grid: {
            top: "8%",
            left: "10%",
            right: "10%",
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
                data: driveljXdata.value,
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 10000,
                splitNumber: 7,
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
                name: "异常流量",
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
                data: driveljYdata.value,
            },
        ],
    };
    option && myChart.setOption(option);
    if (newCumFlowChart.value > 10000) {
        myChart.setOption({
            yAxis: {
                max: 50000
            }
        })
    }
};

// 绘制流速
const drivels = () => {
    let myChart = echarts.init(document.getElementById("temperature-chart"));
    drivelsYdata.value.push(newFlowChart.value);
    if (drivelsYdata.value.length == 5) {
        drivelsYdata.value.shift();
    }
    let option = {
        tooltip: {},
        grid: {
            top: "8%",
            left: "10%",
            right: "10%",
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
                data: driveljXdata.value,
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 140,
                splitNumber: 7,
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
                name: "异常流量",
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
                data: drivelsYdata.value,
            },
        ],
    };
    option && myChart.setOption(option);
};

// 绘制温度
const drivewd = () => {
    let myChart = echarts.init(document.getElementById("ls-chart"));
    drivewdYdata.value.push(temperature.value);
    if (drivewdYdata.value.length == 5) {
        drivewdYdata.value.shift();
    }
    let option = {
        tooltip: {},
        grid: {
            top: "8%",
            left: "5%",
            right: "2%",
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
                data: driveljXdata.value,
            },
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                max: 60,
                splitNumber: 7,
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
                name: "异常流量",
                type: "line",
                smooth: true, //是否平滑曲线显示
                //  symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                symbolSize: 0,

                lineStyle: {
                    normal: {
                        color: "#ff4b5d", // 线条颜色
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
                                { offset: 0, color: "#ff0844" },
                                { offset: 0.7, color: "#ff084600" },
                            ],
                            false
                        ),

                        shadowColor: "#ffb199", //阴影颜色
                        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    },
                },
                data: drivewdYdata.value,
            },
        ],
    };
    option && myChart.setOption(option);
};

// 底部元素点击
const cardclick = (item, i) => {
    console.log(item, "点击的号码");
    console.log(i, "event信息");
};

// 开启循环播放
const loopindex = ref(0);
const loopPlayback = () => {
    let a = document.getElementById("idName0");
    a.style = "background-image:linear-gradient(#1b60b2, #0b305d);";
    setInterval(() => {
        if (loopindex.value > 5) {
            return (loopindex.value = 0);
        }
        let a = document.getElementById("idName" + loopindex.value);
        a.click();
        // a.style.background = "pink";
        a.style = "background-image:linear-gradient(#1b60b2, #0b305d);";
        // 注册鼠标进入事件
        // a.onmouseover = function () {
        //     //设置其背景颜色为黄色
        //     this.style = "animation: bounce;animation-duration: 2s;";
        // };
        // background-image: linear-gradient(#1b60b2, #0b305d);
        // border-bottom: 2px solid #2473cf;
        loopindex.value += 1;
        if (loopindex.value == 2) {
            let a = document.getElementById("idName" + (loopindex.value - 2));
            a.style.background = "none";
        } else if (loopindex.value == 3) {
            let a = document.getElementById("idName" + (loopindex.value - 2));
            a.style.background = "none";
        } else if (loopindex.value == 4) {
            let a = document.getElementById("idName" + (loopindex.value - 2));
            a.style.background = "none";
        } else if (loopindex.value == 5) {
            let a = document.getElementById("idName" + (loopindex.value - 2));
            a.style.background = "none";
        } else if (loopindex.value == 6) {
            let a = document.getElementById("idName" + (loopindex.value - 2));
            a.style.background = "none";
        } else if (loopindex.value == 1) {
            let a = document.getElementById("idName5");
            a.style.background = "none";
        }
    }, 5000);
};
</script>

<style lang="less" scoped>
.content {
    position: relative;
    display: flex;
    width: 100%;
    height: 520px;

    .left {
        width: 80%;
    }

    .right {
        width: 20%;

        .top-content {
            height: 30px;
        }

        width: 20%;
        position: relative;

        svg {
            position: absolute;
            top: 2px;
            // color: #ff084600;
        }

        .top-title {
            position: absolute;
            left: 20px;
            top: 2px;
        }
    }

    .bottom {
        width: 100%;
        margin-top: 6px;
        display: flex;
        justify-content: center;
    }
}

.large-screen {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;

    .all-content {
        position: relative;
        // background-image: url("../assets/bg1.png");
        // background-size: 100%;
        // background-repeat: no-repeat;
        background-image: radial-gradient(ellipse, #1d61af, #002957);
        height: 1080px;

        .close {
            position: absolute;
            top: 80px;
            right: 30px;
            z-index: 9999;
        }

        .content-box {
            position: absolute;
            top: 70px;
            left: 10px;
            width: 99%;
            height: 998px;
            // background-color:pink;
            box-shadow: 0 5px 8px 5px #083d79;

            .top {
                display: flex;
                width: 98%;
                margin: auto;
                margin-top: 50px;
                height: 630px;

                // background-color: #fff;
                .main-meter {
                    width: 30%;
                    height: 100%;

                    // background-color: burlywood;
                    .meter-demo {
                        height: 99%;
                        width: 96%;
                        border: 2px solid #2473cf;

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
                                top: 90px;
                                left: 50%;
                                margin-left: -210px;
                                width: 420px;
                                height: 190px;
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
                                    width: 80px;
                                    height: 80px;
                                    margin-top: 14px;
                                    align-self: center;
                                    z-index: 99999;
                                }

                                p {
                                    text-align: center;
                                    color: white;
                                    font-size: 20px;
                                    line-height: 4px;
                                }
                            }

                            .device-detail {
                                position: absolute;
                                top: 320px;
                                width: 100%;
                                height: 200px;
                                text-align: center;
                                font-size: 20px;
                                // background-color: #fff;
                            }
                        }
                    }
                }

                .detail {
                    width: 70%;
                    height: 100%;

                    // background-color:darkgreen;
                    .meter-message {
                        // display: flex;
                        height: 99%;
                        width: 98%;
                        margin-left: 18px;
                        border: 2px solid #2473cf;

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

                        .cs-content {
                            display: flex;
                            width: 100%;
                            height: 93%;

                            // background-color: #fff;
                            .cs-first {
                                // flex: 1;
                                width: 70%;
                                display: flex;
                                flex-direction: column;

                                .first-top {
                                    display: flex;
                                    width: 100%;
                                    height: 50%;

                                    .cumulativeflow {
                                        flex: 1;
                                        position: relative;

                                        .cumulativeflow-title {
                                            position: absolute;
                                            top: 10px;
                                            left: 20px;
                                            color: white;
                                        }

                                        .cumulativeflow-chart {
                                            position: absolute;
                                            top: 70px;
                                            width: 100%;
                                            height: 80%;
                                            // background-color: pink;
                                        }
                                    }

                                    .temperature {
                                        flex: 1;
                                        position: relative;

                                        .temperature-title {
                                            position: absolute;
                                            top: 10px;
                                            left: 20px;
                                            color: white;
                                        }

                                        .temperature-chart {
                                            position: absolute;
                                            top: 70px;
                                            width: 100%;
                                            height: 80%;
                                        }
                                    }
                                }

                                .first-bottom {
                                    flex: 1;
                                    overflow: hidden;

                                    .ls-title {
                                        color: white;
                                        font-size: 16px;
                                        margin-left: 20px;
                                        line-height: 30px;
                                    }

                                    .ls-chart {
                                        width: 100%;
                                        height: 80%;
                                    }
                                }
                            }

                            .cs-second {
                                // flex: 1;
                                width: 30%;
                                display: flex;
                                flex-direction: column;

                                .second-top {
                                    flex: 1;
                                    overflow: hidden;

                                    .wd-title {
                                        color: white;
                                        font-size: 16px;
                                        margin-left: 20px;
                                        line-height: 30px;
                                    }

                                    .wd-chart {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }

                                .second-bottom {
                                    flex: 1;
                                    overflow: hidden;

                                    .dd-title {
                                        color: white;
                                        font-size: 16px;
                                        margin-left: 20px;
                                        line-height: 30px;
                                    }

                                    .dd-chart {
                                        width: 100%;
                                        height: 100%;
                                    }
                                }
                            }

                            .cs-third {
                                flex: 1;

                                .alarm-title {
                                    line-height: 30px;
                                    color: white;
                                }

                                .hasalarm {
                                    width: 100%;
                                    height: 80px;
                                    display: flex;

                                    .hasalarm-left {
                                        flex: 1;
                                        text-align: center;
                                        margin-top: 30px;

                                        .ishas {
                                            color: white;
                                        }

                                        .yes {
                                            color: #ff5b4a;
                                            font-size: 22px;
                                        }
                                    }

                                    .haslalrm-right {
                                        flex: 1;
                                        text-align: center;
                                        margin-top: 30px;

                                        .isnumber {
                                            color: white;
                                        }

                                        .number {
                                            color: #ff5b4a;
                                            font-size: 22px;
                                        }
                                    }
                                }

                                .address {
                                    width: 86%;
                                    height: 420px;
                                    // background-color: white;
                                    // border: 1px solid #892735;
                                    // background-color: #392f4f;
                                    float: right;
                                    border-radius: 4px;
                                    // overflow-y: scroll;
                                    margin-right: 20px;

                                    .alarm-item {
                                        display: flex;
                                        // background-color:pink;
                                        border: 1px solid #892735;
                                        background-color: #392f4f;
                                        color: white;
                                        height: 120px;
                                        margin-top: 10px;

                                        .tip {
                                            width: 18%;
                                            position: relative;

                                            .tip-img {
                                                position: absolute;
                                                top: 10px;
                                                left: 20px;
                                            }
                                        }

                                        .message {
                                            height: 100%;

                                            p {
                                                line-height: 18px;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .bottom {
                width: 98%;
                margin: auto;
                margin-top: 40px;
                height: 250px;
                // background-color: #fff;
                border: 2px solid #2473cf;

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

                .bottom-content {
                    width: 100%;
                    margin: auto;
                    margin-top: 20px;
                    // background-color: white;
                    height: 160px;
                    display: flex;
                    justify-content: space-around;

                    .device-item {
                        border: 2px solid #2473cf;
                        width: 260px;
                        height: 100%;
                        position: relative;

                        .device-img {
                            position: absolute;
                            top: 30px;
                            left: 50%;
                            margin-left: -30px;
                            width: 60px;
                            height: 60px;
                        }

                        .device-id {
                            position: absolute;
                            top: 100px;
                            left: 50%;
                            margin-left: -50px;
                        }
                    }

                    .device-item:hover {
                        animation: pulse;
                        /* referring directly to the animation's @keyframe declaration */
                        animation-duration: 2s;
                        /* don't forget to set a duration! */
                    }
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
