<template>
    <div class="content">
        <div class="left">
            <div class="content">
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm"
                    :size="formSize" status-icon>
                    <el-form-item label="波特率" prop="baudRate">
                        <el-input v-model="ruleForm.baudRate" :disabled="formdisabled" />
                    </el-form-item>
                    <el-form-item label="数据位" prop="dataBits">
                        <el-select v-model="ruleForm.dataBits" :disabled="formdisabled" placeholder="请选择数据位">
                            <el-option label="8" value="8" />
                            <el-option label="7" value="7" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="停止位" prop="stopBits">
                        <el-select v-model="ruleForm.stopBits" :disabled="formdisabled" placeholder="请选择停止位">
                            <el-option label="1" value="1" />
                            <el-option label="2" value="2" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="校验位" prop="parity">
                        <el-select v-model="ruleForm.parity" :disabled="formdisabled" placeholder="请选择校验位">
                            <el-option label="none" value="none" />
                            <el-option label="even" value="even" />
                            <el-option label="odd" value="odd" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="缓冲区" prop="bufferSize">
                        <el-input v-model="ruleForm.bufferSize" :disabled="formdisabled" />
                    </el-form-item>
                    <el-form-item label="控制流" prop="bufferSize">
                        <el-select v-model="ruleForm.flowControl" :disabled="formdisabled" placeholder="请选择数据位">
                            <el-option label="none" value="none" />
                            <el-option label="hardWare" value="hardWare" />
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="openSerialport">选择串口</el-button>
                        <el-button v-if="isShowopen" type="primary" @click="submitForm(ruleFormRef)">打开串口</el-button>
                        <el-button v-else type="primary" @click="closeSerial">关闭串口</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="open" v-if="isConnect">设备已连接</div>
            <div class="break" v-else>设备已断开</div>
        </div>
        <div class="center">
            <div>
                <p>串口日志</p>
                <!-- <el-input readonly v-model="textarea" :rows="16" type="textarea" /> -->
                <div class="logs">
                    <template v-for="(item, index) in list" :key="index">
                        <p style=" word-wrap:break-word;">{{ item }}</p>
                    </template>
                </div>
                <el-input v-model="inputtextarea" :rows="2" type="textarea" style="margin-top:10px" />
            </div>
            <div class="bottom-item">
                <div class="send">
                    <el-button @click="send">发送</el-button>
                </div>
                <div class="isloop">
                    <el-checkbox v-model="isloop" @change="changeshowdelay" label="循环发送" size="large" />
                </div>
                <div class="interval">
                    <el-input v-model="interval" :disabled="isshowdelay" placeholder="Please input">
                        <template #prepend>发送间隔(MS)</template>
                    </el-input>
                </div>
            </div>
        </div>
        <div class="right">
            <el-descriptions direction="vertical" :column="1" border>
                <el-descriptions-item label="表地址">
                    <span v-if="meteraddress.length == 0"> 暂无数据 </span>
                    <span v-else>{{ meteraddress }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="累计流量">
                    <span v-if="meteraddress.length == 0"> 暂无数据 </span>
                    <span v-else>{{ newCumFlow }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="瞬时流量">
                    <span v-if="meteraddress.length == 0"> 暂无数据 </span>
                    <span v-else>{{ newFlow }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="温度">
                    <span v-if="meteraddress.length == 0"> 暂无数据 </span>
                    <span v-else>{{ newtemperature }}</span>
                </el-descriptions-item>
                <el-descriptions-item label="时间">
                    <span v-if="meteraddress.length == 0"> 暂无数据 </span>
                    <span v-else>{{ newMeterTime }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, defineEmits } from "vue"
import { ElMessage } from 'element-plus'

// 表格相关
const formSize = ref('default')
const ruleFormRef = ref()
const ruleForm = reactive({
    baudRate: '2400',
    dataBits: '8',
    stopBits: '1',
    parity: 'even',
    bufferSize: '1024',
    flowControl: 'none'
})
let reader
let serialPort = null // 串口
let serialOpen = false // 串口目前是打开状态
let serialClose = true 	//串口目前是手动关闭状态
let serialData = []  //串口缓存数据
let serialTimer = null
let toolOptions = {
    //自动滚动
    autoScroll: true,
    //显示时间 界面未开放
    showTime: true,
    //日志类型
    logType: 'hex&ascii',
    //分包合并时间
    timeOut: 50,
    //末尾加回车换行
    addCRLF: false,
    //HEX发送
    hexSend: true,
    //循环发送
    loopSend: false,
    //循环发送时间
    loopSendTime: 1000,
    //输入的发送内容
    sendContent: '',
    //快捷发送选中索引
    quickSendIndex: 0,
    //选中的协议
    agreement: '808'
}
const formdisabled = ref(false)
// const textarea = ref('') // 日志文本域
const inputtextarea = ref('00 03 02 00 00 17 05 AD') // 输入
const interval = ref('') // 发送间隔
const list = ref([]) // 日志列表
const isloop = ref(false) // 是否循环发送
// 表单校验
const rules = reactive({
    baudRate: [
        { required: true, message: '请输入波特率', trigger: 'blur' },
    ]
})

const emit = defineEmits(['dropDownValueChange'])

const isShowopen = ref(true)
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            let SerialOptions = {
                baudRate: ruleForm.baudRate,
                dataBits: ruleForm.dataBits,
                stopBits: ruleForm.stopBits,
                parity: ruleForm.parity,
                bufferSize: ruleForm.bufferSize,
                flowControl: ruleForm.flowControl,
            }
            serialPort
                .open(SerialOptions)
                .then(() => {
                    // serialToggle.innerHTML = '关闭串口'
                    isShowopen.value = !isShowopen.value
                    serialOpen = true
                    serialClose = false
                    disabledOptions(true)
                    localStorage.setItem('serialOptions', JSON.stringify(SerialOptions))
                    readData()
                })
                .catch((e) => {
                    // showMsg('打开串口失败:' + e.toString())
                    console.log('打开串口失败:' + e.toString());
                })
        } else {
            console.log('error submit!', fields)
        }
    })
}

// 禁用选项
function disabledOptions(disabled) {
    formdisabled.value = disabled
}

async function readData() {
    while (serialOpen && serialPort.readable) {
        reader = serialPort.readable.getReader()
        // const newArr = []
        try {
            while (true) {
                const { value, done } = await reader.read()
                // newArr.push(value[0])
                // console.log(value, done, '1');
                if (done) {
                    break
                }
                dataReceived(value)
                // 可以拿到组成的数组
                // console.log(a,'返回的数组');
                // if (newArr.length == 38) {
                //     window.parent.postMessage(dataHex, '*');
                // }
            }
        } catch (error) {
        } finally {
            // window.parent.postMessage(message, '*');
            reader.releaseLock()
        }
    }
    await serialPort.close()
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
}

// 选择串口
const openSerialport = async () => {
    try {
        await navigator.serial.requestPort().then(async (port) => {
            //关闭旧的串口
            serialPort?.close()
            await serialPort?.forget()
            serialPort = port
            serialStatuChange(true)
        })
    } catch (e) {
        console.error('获取串口权限出错' + e.toString())
    }
}

const isConnect = ref(false)
// 改变串口状态展示
const serialStatuChange = (statu) => {
    if (statu) {
        isConnect.value = true
    } else {
        isConnect.value = false
    }
}

let serialloopSendTimer = null
// 发送
const send = async () => {
    if (inputtextarea.value.length == 0) {
        return ElMessage.error('输入框内容为空！')
    }
    if (isloop.value == true) {
        // clearInterval(serialloopSendTimer)
        serialloopSendTimer = setInterval(() => {
            sendHex(inputtextarea.value)
        }, interval.value)
    } else {
        await sendHex(inputtextarea.value)
    }

}

//发送HEX到串口
async function sendHex(hex) {
    const value = hex.replace(/\s+/g, '')
    if (/^[0-9A-Fa-f]+$/.test(value) && value.length % 2 === 0) {
        let data = []
        for (let i = 0; i < value.length; i = i + 2) {
            data.push(parseInt(value.substring(i, i + 2), 16))
        }
        await writeData(Uint8Array.from(data))
    } else {
        // addLogErr('HEX格式错误:' + hex)
        ElMessage.error('HEX格式错误:' + hex)
    }
}

//写串口数据
async function writeData(data) {
    // debugger
    if (!serialPort || !serialPort.writable) {
        // addLogErr('请先打开串口再发送数据')
        // return
        return ElMessage.error('请先打开串口再发送数据')
    }
    const writer = serialPort.writable.getWriter()
    if (toolOptions.addCRLF) {
        data = new Uint8Array([...data, 0x0d, 0x0a])
    }
    await writer.write(data)
    writer.releaseLock()
    addLog(data, false)
}

// const meterMessage = ref([]) // 右侧展示表信息
const meteraddress = ref('') // 表地址
const newCumFlowChart = ref('')
const newCumFlow = ref('')
const newFlowChart = ref('')
const newFlow = ref('')
const temperature = ref('')
const newtemperature = ref('')
const newMeterTime = ref('')

const driveljYdata = ref([]) // 累计流量横坐标
const drivessYdata = ref([]) // 瞬时流量横坐标
const drivewdYdata = ref([]) // 温度横坐标
const driveTime = ref([]) // 时间
const binaryNumber1 = ref('') // 状态字1
const binaryNumber2 = ref('') // 状态字2

// 添加日志
function addLog(data, isReceive) {
    // console.log(data, '日志方法data');
    let form = ''
    if (isReceive) {
        form = '←'
    } else {
        form = '→'
    }
    let dataHex = []
    for (const d of data) {
        //转16进制并补0
        dataHex.push(('0' + d.toString(16).toLocaleUpperCase()).slice(-2))
        // dataHex.push(d)
    }
    // console.log(dataHex, 'dataHex');
    // modbus
    if (dataHex.length == 51) {
        // meterMessage.value = dataHex
        // 表地址
        const a = parseInt(dataHex[47] + dataHex[48], 16);
        meteraddress.value = a.toString().padStart(4, '0')
        // 累计流量
        newCumFlowChart.value = parseInt(dataHex[13] + dataHex[14] + dataHex[17] + dataHex[18], 16) / 100000;
        // newCumFlow.value = newCumFlowChart.value.toString().padStart(8, '0') + 'ml'
        newCumFlow.value = newCumFlowChart.value.toString() + 'm3'
        console.log(dataHex[18], '18位置')
        // 瞬时流量
        newFlowChart.value = parseInt(dataHex[21] + dataHex[22] + dataHex[23] + dataHex[24], 16) / 100000;
        console.log(dataHex[24], '24位置')
        // newFlow.value = newFlowChart.value.toString().padStart(8, '0') + 'm3/h'
        newFlow.value = newFlowChart.value.toString() + 'm3/h'
        // 温度
        temperature.value = parseInt(dataHex[25] + dataHex[26], 16) / 100
        newtemperature.value = parseInt(dataHex[25] + dataHex[26], 16) / 100 + '℃';
        // 时间
        const year = parseInt(dataHex[37] + dataHex[38], 16);
        const month = parseInt(dataHex[35] + dataHex[36], 16).toString().padStart(2, '0');;
        const day = parseInt(dataHex[33] + dataHex[34], 16).toString().padStart(2, '0');;
        const hour = parseInt(dataHex[31] + dataHex[32], 16).toString().padStart(2, '0');
        const minute = parseInt(dataHex[29] + dataHex[30], 16).toString().padStart(2, '0');;
        const second = parseInt(dataHex[27] + dataHex[28], 16).toString().padStart(2, '0');;
        newMeterTime.value = `${year}-${month}-${day}  ${hour}:${minute}:${second}`
        // 状态字2
        const decimalNumber1 = parseInt(dataHex[19], 16)
        binaryNumber1.value = decimalNumber1.toString(2).padStart(8, '0')
        console.log(binaryNumber1.value, '状态字2')
        // 状态字1
        const decimalNumber2 = parseInt(dataHex[20], 16)
        binaryNumber2.value = decimalNumber2.toString(2).padStart(8, '0')
        console.log(binaryNumber2.value, '状态字1')
        // 40 -> 01000000 高-> 低

        // 累计流量展示数组添加数据
        driveljYdata.value.push(newCumFlowChart.value)
        if (driveljYdata.value.length == 6) {
            driveljYdata.value.shift();
        }
        // 瞬时流量展示数组添加数据
        drivessYdata.value.push(newFlowChart.value)
        if (drivessYdata.value.length == 6) {
            drivessYdata.value.shift();
        }
        // 时间展示数组添加数据
        driveTime.value.push(newMeterTime.value.slice(11))
        if (driveTime.value.length == 6) {
            driveTime.value.shift();
        }
        console.log(drivessYdata.value, '组件累计流量数组');
        const data = { meteraddress: meteraddress.value, driveljYdata: driveljYdata.value, drivessYdata: drivessYdata.value, temperature: temperature.value, driveTime: driveTime.value, binaryNumber1: binaryNumber1.value, binaryNumber2: binaryNumber2.value }
        emit('dropDownValueChange', data)

    }
    // 808
    if (dataHex.length == 38) {
        // debugger
        // 表地址
        meteraddress.value=''
        for (let i = 11; i >= 5; i--) {
            meteraddress.value += dataHex[i];
        }
        // 累计流量
        let ljFlow = ''
        for (let i = 21; i >= 18; i--) {
            ljFlow += dataHex[i];
        }
        let newArr = ljFlow.split("");
        console.log(newArr,'newArr');
        switch (dataHex[17]) {
            case "2C":
                newArr.splice(6, 0, ".");
                break;
            case "2B":
                newArr.splice(7, 0, ".");
                break;
            case "2A":
                newArr.splice(8, 0, ".");
                break;
            case "2D":
                newArr.splice(5, 0, ".");
                break;
            case "2E":
                newArr.splice(4, 0, ".");
                break;
            case "29":
                newArr.splice(9, 0, ".");
                break;
        }
        newCumFlowChart.value = newArr.join("");
        newCumFlow.value = newArr.join("") + 'm3'
        // 瞬时流量
        let inFlowunit = ""
        let instantaneousFlow = ""
        if (dataHex[22] == "35") {
            inFlowunit = "m3/h";
        }
        for (let i = 26; i >= 23; i--) {
            instantaneousFlow += dataHex[i];
        }
        let newsFlowArr = instantaneousFlow.split("");
        newsFlowArr.splice(4, 0, ".");
        newFlowChart.value = newsFlowArr.join("")
        newFlow.value = newFlowChart.value + inFlowunit
        // 时间
        let meterTime = ""
        for (let i = 33; i >= 27; i--) {
            meterTime += dataHex[i];
        }
        let newTimeArr = meterTime.split("");
        newTimeArr.splice(4, 0, "年");
        newTimeArr.splice(7, 0, "月");
        newTimeArr.splice(10, 0, `日 `);
        newTimeArr.splice(13, 0, ":");
        newTimeArr.splice(16, 0, ":");
        newMeterTime.value = newTimeArr.join("");

        // 状态字1
        // let decimalNumber1 = parseInt(dataHex[34],16)
        // console.log(dataHex[34],typeof dataHex[34],'状态字');
        const firstDecimaArr = dataHex[34].split("") // 拆分为数组
        console.log(Number(firstDecimaArr[0]).toString(2).padStart(4, 0),'前4位2进制');
        console.log(Number(firstDecimaArr[1]).toString(2).padStart(4, 0),'后4位2进制');
        binaryNumber2.value = Number(firstDecimaArr[0]).toString(2).padStart(4, 0) + Number(firstDecimaArr[1]).toString(2).padStart(4, 0)

        // 累计流量展示数组添加数据
        driveljYdata.value.push(newCumFlowChart.value)
        if (driveljYdata.value.length == 6) {
            driveljYdata.value.shift();
        }
        // 瞬时流量展示数组添加数据
        drivessYdata.value.push(newFlowChart.value)
        if (drivessYdata.value.length == 6) {
            drivessYdata.value.shift();
        }
        // 时间展示数组添加数据
        driveTime.value.push(newMeterTime.value.slice(11))
        if (driveTime.value.length == 6) {
            driveTime.value.shift();
        }
        console.log(drivessYdata.value, '组件累计流量数组');
        const data = { meteraddress: meteraddress.value, driveljYdata: driveljYdata.value, drivessYdata: drivessYdata.value, driveTime: driveTime.value ,binaryNumber2: binaryNumber2.value}
        emit('dropDownValueChange', data)
    }
    const newStr = dataHex.join('')
    list.value.push(form + newStr)

    // driveljYdata.value.push(newCumFlowChart.value)
    // if (driveljYdata.value.length == 6) {
    //     driveljYdata.value.shift();
    // }
    // // console.log(driveljYdata.value,'累计流量');
    // drivessYdata.value.push(newFlowChart.value)
    // if (drivessYdata.value.length == 6) {
    //     drivessYdata.value.shift();
    // }
    // drivewdYdata.value.push(newMeterTime.value)
    // if (drivewdYdata.value.length == 6) {
    //     drivewdYdata.value.shift();
    // }
    // defineExpose({driveljYdata, drivessYdata,drivewdYdata})
}

//串口分包合并
function dataReceived(data) {
    serialData.push(...data)
    if (toolOptions.timeOut == 0) {
        addLog(serialData, true)
        serialData = []
        return
    }
    //清除之前的时钟
    clearTimeout(serialTimer)
    serialTimer = setTimeout(() => {
        //超时发出
        addLog(serialData, true)
        serialData = []
    }, toolOptions.timeOut)
}

//关闭串口
async function closeSerial() {
    if (serialOpen) {
        serialOpen = false
        reader?.cancel()
        isShowopen.value = true
        disabledOptions(false)
    }
}

const isshowdelay = ref(true)
// 自定义延时时间
const changeshowdelay = (value) => {
    if (value == true) {
        isshowdelay.value = false
    } else {
        isshowdelay.value = true
        clearInterval(serialloopSendTimer)
    }
}

</script>

<style lang="less" scoped>
.content {
    height: 340px;
    display: flex;
    position: relative;

    .left {
        width: 300px;

        .content {
            width: 90%;
            height: 390px;
            margin-top: 20px;
        }

        .open {
            margin: auto;
            width: 240px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background-color: #f0f9eb;
            color: #67c23a;
            font-size: 14px;
        }

        .break {
            margin: auto;
            width: 240px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            background-color: #fef0f0;
            color: #f56c6c;
            font-size: 14px;
        }
    }

    .center {
        flex: 1;

        .bottom-item {
            position: relative;
            margin-top: 10px;
            width: 100%;
            height: 40px;

            // background-color: pink;
            .send {
                position: absolute;
                right: 0;
            }

            .isloop {
                position: absolute;
                left: 0;
                top: -4px;
            }

            .interval {
                position: absolute;
                left: 100px;
                width: 300px;
            }
        }

        .logs {
            height: 300px;
            width: 100%;
            border-radius: 5px;
            border: 1px solid #dcdfe6;
            font-size: 12px;
            overflow-y: scroll;
        }
    }

    .right {
        width: 300px;
    }
}
</style>