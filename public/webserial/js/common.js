; (function () {
	if (!('serial' in navigator)) {
		alert('当前浏览器不支持串口操作,请更换Edge或Chrome浏览器')
	}
	let serialPort = null
	navigator.serial.getPorts().then((ports) => {
		if (ports.length > 0) {
			serialPort = ports[0]
			serialStatuChange(true)
		}
	})
	let reader
	//串口目前是打开状态
	let serialOpen = false
	//串口目前是手动关闭状态
	let serialClose = true
	//串口分包合并时钟
	let serialTimer = null
	//串口循环发送时钟
	let serialloopSendTimer = null
	//串口缓存数据
	let serialData = []
	//文本解码
	let asciidecoder = new TextDecoder()
	let currQuickSend = []
	//快捷发送列表
	let quickSendList = [
		{
			name: 'ESP32 AT指令',
			list: [
				{
					name: '测试 AT 启动',
					content: 'AT',
					hex: false,
				},
				{
					name: '重启模块',
					content: 'AT+RST',
					hex: false,
				},
				{
					name: '查看版本信息',
					content: 'AT+GMR',
					hex: false,
				},
				{
					name: '查询当前固件支持的所有命令及命令类型',
					content: 'AT+CMD?',
					hex: false,
				},
				{
					name: '进⼊ Deep-sleep 模式 1分钟',
					content: 'AT+GSLP=60000',
					hex: false,
				},
				{
					name: '开启AT回显功能',
					content: 'ATE1',
					hex: false,
				},
				{
					name: '关闭AT回显功能',
					content: 'ATE0',
					hex: false,
				},
				{
					name: '恢复出厂设置',
					content: 'AT+RESTORE',
					hex: false,
				},
				{
					name: '查询 UART 当前临时配置',
					content: 'AT+UART_CUR?',
					hex: false,
				},
				{
					name: '设置 UART 115200 保存flash',
					content: 'AT+UART_DEF=115200,8,1,0,3',
					hex: false,
				},
				{
					name: '查询 sleep 模式',
					content: 'AT+SLEEP?',
					hex: false,
				},
				{
					name: '查询当前剩余堆空间和最小堆空间',
					content: 'AT+SYSRAM?',
					hex: false,
				},
				{
					name: '查询系统提示信息',
					content: 'AT+SYSMSG?',
					hex: false,
				},
				{
					name: '查询 flash 用户分区',
					content: 'AT+SYSFLASH?',
					hex: false,
				},
				{
					name: '查询本地时间戳',
					content: 'AT+SYSTIMESTAMP?',
					hex: false,
				},
				{
					name: '查询 AT 错误代码提示',
					content: 'AT+SYSLOG?',
					hex: false,
				},
				{
					name: '设置/查询系统参数存储模式',
					content: 'AT+SYSPARA?',
					hex: false,
				},
			],
		},
	]
	//工具配置
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
		hexSend: false,
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

	// 生成vue右侧
	// const App = {
	// 	data() {
	// 		return {
	// 			logMessage: [], // 日志信息
	// 			meteraddress: "", // 表地址
	// 			cumulativeFlow: "", // 累计流量
	// 			newCumFlow: "", // 小数点累计流量
	// 			instantaneousFlow: "", // 瞬时流量
	// 			newFlow: "", // 瞬时流量小数点
	// 			meterTime: "", // 时间
	// 			newMeterTime: "", // 格式化时间
	// 			xTime:[], // x时间坐标
	// 			yValue:[], // y流量坐标
	// 		};
	// 	},
	// 	mounted() {
	// 		window.addEventListener('message', (e) => {
	// 			// console.log(e.data,'e');
	// 			this.logMessage = e.data
	// 			console.log(this.logMessage);
	// 			if (e.data) {
	// 				this.showMeteraddress()
	// 				this.showCumulativeFlow()
	// 				this.showinstantaneousFlow()
	// 				this.showMetertime()
	// 				this.dirveEcharts()
	// 			}
	// 		})
	// 	},
	// 	methods: {
	// 		// 展示表地址
	// 		showMeteraddress() {
	// 			// debugger
	// 			this.meteraddress = ""
	// 			for (let i = 11; i >= 5; i--) {
	// 				this.meteraddress += this.logMessage[i]
	// 			}
	// 		},

	// 		// 累计流量
	// 		showCumulativeFlow() {
	// 			this.cumulativeFlow = ""
	// 			let unit = "m3"
	// 			for (let i = 21; i >= 18; i--) {
	// 				this.cumulativeFlow += this.logMessage[i]
	// 			}
	// 			let newArr = this.cumulativeFlow.split("")
	// 			switch (this.logMessage[17]) {
	// 				case '2C':
	// 					newArr.splice(4, 0, ".")
	// 					break
	// 				case '2B':
	// 					newArr.splice(5, 0, ".")
	// 					break
	// 				case '2A':
	// 					newArr.splice(6, 0, ".")
	// 					break
	// 				case '2D':
	// 					newArr.splice(3, 0, ".")
	// 					break
	// 				case '2E':
	// 					newArr.splice(2, 0, ".")
	// 					break
	// 				case '29':
	// 					newArr.splice(7, 0, ".")
	// 					break
	// 			}
	// 			this.newCumFlow = newArr.join("") + unit
	// 		},

	// 		// 瞬时流量
	// 		showinstantaneousFlow() {
	// 			let inFlowunit = ""
	// 			if (this.logMessage[22] == '35') {
	// 				inFlowunit = "m3/h"
	// 			}
	// 			this.instantaneousFlow = ""
	// 			for (let i = 26; i >= 23; i--) {
	// 				this.instantaneousFlow += this.logMessage[i]
	// 			}
	// 			let newArr = this.instantaneousFlow.split("")
	// 			newArr.splice(4, 0, ".")
	// 			this.newFlow = newArr.join("") + inFlowunit
	// 		},

	// 		// 时间
	// 		showMetertime() {
	// 			// debugger
	// 			this.meterTime = ""
	// 			for (let i = 33; i >= 27; i--) {
	// 				this.meterTime += this.logMessage[i]
	// 			}
	// 			// console.log(this.meterTime);
	// 			let newArr = this.meterTime.split("")
	// 			newArr.splice(4, 0, "年")
	// 			newArr.splice(7, 0, "月")
	// 			newArr.splice(10, 0, `日 `)
	// 			newArr.splice(13, 0, ":")
	// 			newArr.splice(16, 0, ":")
	// 			this.newMeterTime = newArr.join("")
	// 		},

	// 		// 绘制瞬时流量趋势
	// 		dirveEcharts() {
	// 			// debugger
	// 			let myChart = echarts.init(document.getElementById('echarts'));
	// 			// const xTime = []
	// 			// const yValue = []
	// 			this.xTime.push(this.newMeterTime.slice(11))
	// 			this.yValue.push(this.instantaneousFlow)
	// 			if (this.xTime.length == 5) {
	// 				this.xTime.shift()
	// 				this.yValue.shift()
	// 			}
	// 			let option = {
	// 				tooltip: {
	// 					trigger: 'axis',
	// 					//   formatter: function(params) {
	// 					// 	return JSON.parse(JSON.stringify(params[0].axisValue)) + `<br>` +
	// 					// 	JSON.parse(JSON.stringify(params[0].value.slice(0,4))) + "."+ JSON.parse(JSON.stringify(params[0].value.slice(4,8))) + 'm3/h';
	// 					//   },
	// 				},
	// 				xAxis: {
	// 					type: 'category',
	// 					data: this.xTime
	// 				},
	// 				yAxis: {
	// 					type: 'value'
	// 				},
	// 				grid: {
	// 					top: '8%',
	// 					left: '3%',
	// 					right: '4%',
	// 					bottom: '3%',
	// 					containLabel: true
	// 				},
	// 				series: [
	// 					{
	// 						data: this.yValue,
	// 						type: 'line'
	// 					}
	// 				]
	// 			}
	// 			option && myChart.setOption(option);
	// 		}
	// 	}
	// };
	// // 
	// const app = Vue.createApp(App);
	// app.use(ElementPlus);
	// app.mount("#app");

	//生成快捷发送列表
	let quickSend = document.getElementById('serial-quick-send')
	let sendList = localStorage.getItem('quickSendList')
	if (sendList) {
		quickSendList = JSON.parse(sendList)
	}
	quickSendList.forEach((item, index) => {
		let option = document.createElement('option')
		option.innerText = item.name
		option.value = index
		quickSend.appendChild(option)
	})

	//快捷发送列表被单击
	document.getElementById('serial-quick-send-content').addEventListener('click', (e) => {
		let curr = e.target
		if (curr.tagName != 'BUTTON') {
			curr = curr.parentNode
		}
		if (curr.tagName != 'BUTTON') {
			return
		}
		const index = Array.from(curr.parentNode.parentNode.children).indexOf(curr.parentNode)
		if (curr.classList.contains('quick-remove')) {
			currQuickSend.list.splice(index, 1)
			curr.parentNode.remove()
			saveQuickList()
			return
		}
		if (curr.classList.contains('quick-send')) {
			let item = currQuickSend.list[index]
			if (item.hex) {
				sendHex(item.content)
				return
			}
			sendText(item.content)
		}
	})
	//快捷列表双击改名
	document.getElementById('serial-quick-send-content').addEventListener('dblclick', (e) => {
		let curr = e.target
		if (curr.tagName != 'INPUT' || curr.type != 'text') {
			return
		}
		const index = Array.from(curr.parentNode.parentNode.children).indexOf(curr.parentNode)
		changeName((name) => {
			currQuickSend.list[index].name = name
			curr.parentNode.outerHTML = getQuickItemHtml(currQuickSend.list[index])
			saveQuickList()
		}, currQuickSend.list[index].name)
	})
	//快捷发送列表被改变
	document.getElementById('serial-quick-send-content').addEventListener('change', (e) => {
		let curr = e.target
		if (curr.tagName != 'INPUT') {
			return
		}
		const index = Array.from(curr.parentNode.parentNode.children).indexOf(curr.parentNode)
		if (curr.type == 'text') {
			currQuickSend.list[index].content = curr.value
		}
		if (curr.type == 'checkbox') {
			currQuickSend.list[index].hex = curr.checked
		}
		saveQuickList()
	})
	function saveQuickList() {
		localStorage.setItem('quickSendList', JSON.stringify(quickSendList))
	}

	const quickSendContent = document.getElementById('serial-quick-send-content')
	//快捷发送列表更换选项
	quickSend.addEventListener('change', (e) => {
		let index = e.target.value
		if (index != -1) {
			changeOption('quickSendIndex', index)
			currQuickSend = quickSendList[index]
			//
			quickSendContent.innerHTML = ''
			currQuickSend.list.forEach((item) => {
				quickSendContent.innerHTML += getQuickItemHtml(item)
			})
		}
	})
	//添加快捷发送
	document.getElementById('serial-quick-send-add').addEventListener('click', (e) => {
		const item = {
			name: '发送',
			content: '',
			hex: false,
		}
		currQuickSend.list.push(item)
		quickSendContent.innerHTML += getQuickItemHtml(item)
		saveQuickList()
	})
	function getQuickItemHtml(item) {
		return `<div class="d-flex p-1 border-bottom quick-item">
			<button type="button" title="移除该项" class="btn btn-sm btn-outline-secondary me-1 quick-remove"><i class="bi bi-x"></i></button>
			<input class="form-control form-control-sm me-1" placeholder="要发送的内容,双击改名" value="${item.content}">
			<button class="flex-shrink-0 me-1 align-self-center btn btn-secondary btn-sm  quick-send" title="${item.name}">${item.name}</button>
			<input class="form-check-input flex-shrink-0 align-self-center" type="checkbox" ${item.hex ? 'checked' : ''}>
		</div>`
	}
	//快捷发送分组新增
	document.getElementById('serial-quick-send-add-group').addEventListener('click', (e) => {
		changeName((name) => {
			quickSendList.push({
				name: name,
				list: [],
			})
			quickSend.innerHTML += `<option value="${quickSendList.length - 1}">${name}</option>`
			quickSend.value = quickSendList.length - 1
			quickSend.dispatchEvent(new Event('change'))
			saveQuickList()
		})
	})
	//快捷发送分组重命名
	document.getElementById('serial-quick-send-rename-group').addEventListener('click', (e) => {
		changeName((name) => {
			currQuickSend.name = name
			quickSend.options[quickSend.value].innerText = name
			saveQuickList()
		}, currQuickSend.name)
	})
	//快捷发送分组删除
	document.getElementById('serial-quick-send-remove-group').addEventListener('click', (e) => {
		if (quickSendList.length == 1) {
			return
		}
		//弹窗询问是否删除
		if (!confirm('是否删除该分组?')) {
			return
		}
		quickSendList.splice(quickSend.value, 1)
		quickSend.options[quickSend.value].remove()
		quickSend.value = 0
		quickSend.dispatchEvent(new Event('change'))
		saveQuickList()
	})

	//导出
	document.getElementById('serial-quick-send-export').addEventListener('click', (e) => {
		let data = JSON.stringify(currQuickSend.list)
		let blob = new Blob([data], { type: 'text/plain' })
		saveAs(blob, currQuickSend.name + '.json')
	})
	//导入
	document.getElementById('serial-quick-send-import-btn').addEventListener('click', (e) => {
		document.getElementById('serial-quick-send-import').click()
	})
	document.getElementById('serial-quick-send-import').addEventListener('change', (e) => {
		let file = e.target.files[0]
		e.target.value = ''
		let reader = new FileReader()
		reader.onload = function (e) {
			let data = e.target.result
			try {
				let list = JSON.parse(data)
				currQuickSend.list.push(...list)
				list.forEach((item) => {
					quickSendContent.innerHTML += getQuickItemHtml(item)
				})
				saveQuickList()
			} catch (e) {
				showMsg('导入失败:' + e.message)
			}
		}
		reader.readAsText(file)
	})

	//重置参数
	document.getElementById('serial-reset').addEventListener('click', (e) => {
		if (!confirm('是否重置参数?')) {
			return
		}
		localStorage.removeItem('serialOptions')
		localStorage.removeItem('toolOptions')
		localStorage.removeItem('quickSendList')
		location.reload()
	})
	//导出参数
	document.getElementById('serial-export').addEventListener('click', (e) => {
		let data = {
			serialOptions: localStorage.getItem('serialOptions'),
			toolOptions: localStorage.getItem('toolOptions'),
			quickSendList: localStorage.getItem('quickSendList'),
		}
		let blob = new Blob([JSON.stringify(data)], { type: 'text/plain' })
		saveAs(blob, 'web-serial-debug.json')
	})
	//导入参数
	document.getElementById('serial-import').addEventListener('click', (e) => {
		document.getElementById('serial-import-file').click()
	})
	document.getElementById('serial-import-file').addEventListener('change', (e) => {
		let file = e.target.files[0]
		e.target.value = ''
		let reader = new FileReader()
		reader.onload = function (e) {
			let data = e.target.result
			try {
				let obj = JSON.parse(data)
				if (obj.serialOptions == null) {
					localStorage.removeItem('serialOptions')
				} else {
					localStorage.setItem('serialOptions', obj.serialOptions)
				}
				if (obj.toolOptions == null) {
					localStorage.removeItem('toolOptions')
				} else {
					localStorage.setItem('toolOptions', obj.toolOptions)
				}
				if (obj.quickSendList == null) {
					localStorage.removeItem('quickSendList')
				} else {
					localStorage.setItem('quickSendList', obj.quickSendList)
				}

				location.reload()
			} catch (e) {
				showMsg('导入失败:' + e.message)
			}
		}
		reader.readAsText(file)
	})


	//读取参数
	let options = localStorage.getItem('serialOptions')
	if (options) {
		let serialOptions = JSON.parse(options)
		set('serial-baud', serialOptions.baudRate)
		set('serial-data-bits', serialOptions.dataBits)
		set('serial-stop-bits', serialOptions.stopBits)
		set('serial-parity', serialOptions.parity)
		set('serial-buffer-size', serialOptions.bufferSize)
		set('serial-flow-control', serialOptions.flowControl)
	}
	options = localStorage.getItem('toolOptions')
	if (options) {
		toolOptions = JSON.parse(options)
	}
	document.getElementById('serial-timer-out').value = toolOptions.timeOut
	document.getElementById('serial-log-type').value = toolOptions.logType
	document.getElementById('serial-auto-scroll').innerText = toolOptions.autoScroll ? '自动滚动' : '暂停滚动'
	document.getElementById('serial-add-crlf').checked = toolOptions.addCRLF
	document.getElementById('serial-hex-send').checked = toolOptions.hexSend
	document.getElementById('serial-loop-send').checked = toolOptions.loopSend
	document.getElementById('serial-loop-send-time').value = toolOptions.loopSendTime
	document.getElementById('serial-send-content').value = toolOptions.sendContent
	document.getElementById('agreement-type').value = toolOptions.agreement  // 默认选中的协议是808
	quickSend.value = toolOptions.quickSendIndex
	quickSend.dispatchEvent(new Event('change'))
	resetLoopSend()

	//实时修改选项
	document.getElementById('serial-timer-out').addEventListener('change', (e) => {
		changeOption('timeOut', parseInt(e.target.value))
	})
	document.getElementById('serial-log-type').addEventListener('change', (e) => {
		changeOption('logType', e.target.value)
	})
	document.getElementById('serial-auto-scroll').addEventListener('click', function (e) {
		let autoScroll = this.innerText != '自动滚动'
		this.innerText = autoScroll ? '自动滚动' : '暂停滚动'
		changeOption('autoScroll', autoScroll)
	})
	document.getElementById('serial-send-content').addEventListener('change', function (e) {
		changeOption('sendContent', this.value)
	})
	document.getElementById('serial-add-crlf').addEventListener('change', function (e) {
		changeOption('addCRLF', this.checked)
	})
	document.getElementById('serial-hex-send').addEventListener('change', function (e) {
		changeOption('hexSend', this.checked)
	})
	document.getElementById('serial-loop-send').addEventListener('change', function (e) {
		changeOption('loopSend', this.checked)
		resetLoopSend()
	})
	document.getElementById('serial-loop-send-time').addEventListener('change', function (e) {
		changeOption('loopSendTime', parseInt(this.value))
		resetLoopSend()
	})
	document.getElementById('agreement-type').addEventListener('change', function (e) {
		// 改变协议时给大屏切换
	})

	//重制发送循环时钟
	function resetLoopSend() {
		clearInterval(serialloopSendTimer)
		if (toolOptions.loopSend) {
			serialloopSendTimer = setInterval(() => {
				send()
			}, toolOptions.loopSendTime)
		}
	}

	//清空
	document.getElementById('serial-clear').addEventListener('click', (e) => {
		serialLogs.innerHTML = ''
	})
	//复制
	document.getElementById('serial-copy').addEventListener('click', (e) => {
		let text = serialLogs.innerText
		if (text) {
			copyText(text)
		}
	})
	//保存
	document.getElementById('serial-save').addEventListener('click', (e) => {
		let text = serialLogs.innerText
		if (text) {
			saveText(text)
		}
	})
	//发送
	document.getElementById('serial-send').addEventListener('click', (e) => {
		send()
	})

	const serialToggle = document.getElementById('serial-open-or-close')
	const serialLogs = document.getElementById('serial-logs')

	//选择串口
	document.getElementById('serial-select-port').addEventListener('click', async () => {
		// 客户端授权
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
	})

	//关闭串口
	async function closeSerial() {
		if (serialOpen) {
			serialOpen = false
			reader?.cancel()
			serialToggle.innerHTML = '打开串口'
			disabledOptions(false)
		}
	}

	//打开串口
	async function openSerial() {
		// debugger
		let SerialOptions = {
			baudRate: parseInt(get('serial-baud')),
			dataBits: parseInt(get('serial-data-bits')),
			stopBits: parseInt(get('serial-stop-bits')),
			parity: get('serial-parity'),
			bufferSize: parseInt(get('serial-buffer-size')),
			flowControl: get('serial-flow-control'),
		}

		serialPort
			.open(SerialOptions)
			.then(() => {
				serialToggle.innerHTML = '关闭串口'
				serialOpen = true
				serialClose = false
				disabledOptions(true)
				localStorage.setItem('serialOptions', JSON.stringify(SerialOptions))
				readData()
			})
			.catch((e) => {
				showMsg('打开串口失败:' + e.toString())
			})
	}

	//禁用或恢复串口选项
	function disabledOptions(disabled) {
		document.querySelectorAll('#serial-options .input-group input,#serial-options .input-group select').forEach((item) => {
			item.disabled = disabled
		})
	}

	//打开或关闭串口 ！！非常重要
	serialToggle.addEventListener('click', async () => {
		// debugger
		if (!serialPort) {
			showMsg('请先选择串口')
			return
		}

		if (serialPort.writable && serialPort.readable) {
			closeSerial()
			serialClose = true
			return
		}

		openSerial()
	})

	//设置读取元素
	function get(id) {
		return document.getElementById(id).value
	}
	function set(id, value) {
		return (document.getElementById(id).value = value)
	}

	//修改参数并保存
	function changeOption(key, value) {
		toolOptions[key] = value
		localStorage.setItem('toolOptions', JSON.stringify(toolOptions))
	}

	//串口事件监听
	navigator.serial.addEventListener('connect', (e) => {
		serialStatuChange(true)
		serialPort = e.target
		//未主动关闭连接的情况下,设备重插,自动重连
		if (!serialClose) {
			openSerial()
		}
	})
	navigator.serial.addEventListener('disconnect', (e) => {
		serialStatuChange(false)
		setTimeout(closeSerial, 500)
	})
	function serialStatuChange(statu) {
		let tip
		if (statu) {
			tip = '<div class="alert alert-success" role="alert">设备已连接</div>'
		} else {
			tip = '<div class="alert alert-danger" role="alert">设备已断开</div>'
		}
		document.getElementById('serial-status').innerHTML = tip
	}
	//串口数据收发
	async function send() {
		let content = document.getElementById('serial-send-content').value
		if (!content) {
			addLogErr('发送内容为空')
			return
		}
		if (toolOptions.hexSend) {
			await sendHex(content)
		} else {
			await sendText(content)
		}
	}

	//发送HEX到串口
	async function sendHex(hex) {
		console.log(hex,'hex');
		// 判断输入的信息中是否有，
		if (hex.indexOf(',') != -1) {
			const newArr = hex.split(',')
			const value = newArr[0].replace(/\s+/g, '')
			if (/^[0-9A-Fa-f]+$/.test(value) && value.length % 2 === 0) {
				let data = []
				for (let i = 0; i < value.length; i = i + 2) {
					data.push(parseInt(value.substring(i, i + 2), 16))
				}
				await writeData(Uint8Array.from(data))
			} else {
				addLogErr('HEX格式错误:' + hex)
			}
			// 延时发送报警的信息
			setTimeout(() => {
				const value = newArr[1].replace(/\s+/g, '')
				if (/^[0-9A-Fa-f]+$/.test(value) && value.length % 2 === 0) {
					let data = []
					for (let i = 0; i < value.length; i = i + 2) {
						data.push(parseInt(value.substring(i, i + 2), 16))
					}
					writeData(Uint8Array.from(data))
				} else {
					addLogErr('HEX格式错误:' + hex)
				}
			}, 1000)
			// newArr.forEach(async(item) =>{
			// 	const value = item.replace(/\s+/g, '')
			// 	if (/^[0-9A-Fa-f]+$/.test(value) && value.length % 2 === 0) {
			// 		let data = []
			// 		for (let i = 0; i < value.length; i = i + 2) {
			// 			data.push(parseInt(value.substring(i, i + 2), 16))
			// 		}
			// 		await writeData(Uint8Array.from(data))
			// 	} else {
			// 		addLogErr('HEX格式错误:' + hex)
			// 	}
			// })
		} else {
			const value = hex.replace(/\s+/g, '')
			if (/^[0-9A-Fa-f]+$/.test(value) && value.length % 2 === 0) {
				let data = []
				for (let i = 0; i < value.length; i = i + 2) {
					data.push(parseInt(value.substring(i, i + 2), 16))
				}
				await writeData(Uint8Array.from(data))
			} else {
				addLogErr('HEX格式错误:' + hex)
			}
		}
	}

	//发送ASCII到串口
	async function sendText(text) {
		const encoder = new TextEncoder()
		writeData(encoder.encode(text))
	}

	//写串口数据，这里可以向vue父组件发送指令！！
	async function writeData(data) {
		console.log(data, '写入的数据');
		// debugger
		if (!serialPort || !serialPort.writable) {
			addLogErr('请先打开串口再发送数据')
			return
		}
		const writer = serialPort.writable.getWriter()
		if (toolOptions.addCRLF) {
			data = new Uint8Array([...data, 0x0d, 0x0a])
		}
		await writer.write(data)
		writer.releaseLock()
		addLog(data, false)
	}

	// unit8Array转成字符串
	function Uint8ArrayToString(fileData) {
		var dataString = "";
		for (var i = 0; i < fileData.length; i++) {
			dataString += String.fromCharCode(fileData[i]);
		}
		return dataString
	}

	//读串口数据
	async function readData() {
		while (serialOpen && serialPort.readable) {
			reader = serialPort.readable.getReader()
			// const newArr = []
			try {
				while (true) {
					const { value, done } = await reader.read()
					// newArr.push(value[0])
					console.log(value,done,'1');
					if (done) {
						break
					}
					let a = dataReceived(value)
					// 可以拿到组成的数组
					// console.log(newArr,'塞进数组');
					if (newArr.length == 38) {
						window.parent.postMessage(dataHex, '*');
					}
				}
			} catch (error) {
			} finally {
				// window.parent.postMessage(message, '*');
				reader.releaseLock()
			}
		}
		await serialPort.close()
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

	//添加日志
	function addLog(data, isReceive = true) {
		console.log(data,'日志方法data');
		// debugger
		let classname = 'text-primary'
		let form = '→'
		if (isReceive) {
			classname = 'text-success'
			form = '←'
		}
		newmsg = ''
		if (toolOptions.logType.includes('hex')) {
			let dataHex = []
			for (const d of data) {
				//转16进制并补0
				dataHex.push(('0' + d.toString(16).toLocaleUpperCase()).slice(-2))
				// dataHex.push(d)
			}
			console.log(dataHex,'dataHex');
			if (toolOptions.logType.includes('&')) {
				newmsg += 'HEX:'
			}
			newmsg += dataHex.join(' ') + '<br/>'
			// 将日志信息发送出去（808）
			if (dataHex.length == 38) {
				dataHex.push('808')
				console.log(dataHex, '日志信息');
				window.parent.postMessage(dataHex, '*');
			}
			// modbus
			if(dataHex.length == 51){
				dataHex.push('modbus')
				console.log(dataHex, '日志信息');
				window.parent.postMessage(dataHex, '*');
				// console.log(dataHex[11] + dataHex[12] + dataHex[15] + dataHex[16],'累计流量L');
				// console.log(dataHex[13] + dataHex[14] + dataHex[17] + dataHex[18],'累计流量mL');
				// console.log(dataHex[19] + dataHex[20],'状态字')
				// console.log(dataHex[21] + dataHex[22] + dataHex[23] + dataHex[24],'瞬时流量')
				// console.log(dataHex[25] + dataHex[26] ,'当前表水温')
				// console.log(dataHex[27] + dataHex[28] ,'秒')
				// console.log(dataHex[29] + dataHex[30] ,'分')
				// console.log(dataHex[31] + dataHex[32] ,'小时')
				// console.log(dataHex[33] + dataHex[34] ,'日')
				// console.log(dataHex[35] + dataHex[36] ,'月')
				// console.log(dataHex[37] + dataHex[38] ,'年')
				// console.log(dataHex[47] + dataHex[48] ,'表地址')
			}
			// console.log(dataHex, '其他日志信息');
		}
		if (toolOptions.logType.includes('ascii')) {
			let dataAscii = asciidecoder.decode(Uint8Array.from(data))
			if (toolOptions.logType.includes('&')) {
				newmsg += 'TXT:'
			}
			newmsg += dataAscii + '<br/>'
		}
		let time = toolOptions.showTime ? formatDate(new Date()) + '&nbsp;' : ''
		const template = '<div><span class="' + classname + '">' + time + form + '</span><br>' + newmsg + '</div>'
		let tempNode = document.createElement('div')
		tempNode.innerHTML = template
		serialLogs.append(tempNode)
		if (toolOptions.autoScroll) {
			serialLogs.scrollTop = serialLogs.scrollHeight - serialLogs.clientHeight
		}
	}

	//系统日志
	function addLogErr(msg) {
		let time = toolOptions.showTime ? formatDate(new Date()) + '&nbsp;' : ''
		const template = '<div><span class="text-danger">' + time + ' 系统消息</span><br>' + msg + '</div>'
		let tempNode = document.createElement('div')
		tempNode.innerHTML = template
		serialLogs.append(tempNode)
		if (toolOptions.autoScroll) {
			serialLogs.scrollTop = serialLogs.scrollHeight - serialLogs.clientHeight
		}
	}

	//复制文本
	function copyText(text) {
		let textarea = document.createElement('textarea')
		textarea.value = text
		textarea.readOnly = 'readonly'
		textarea.style.position = 'absolute'
		textarea.style.left = '-9999px'
		document.body.appendChild(textarea)
		textarea.select()
		textarea.setSelectionRange(0, textarea.value.length)
		document.execCommand('copy')
		document.body.removeChild(textarea)
		showMsg('已复制到剪贴板')
	}

	//保存文本
	function saveText(text) {
		let blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
		saveAs(blob, 'serial.log')
	}

	//下载文件
	function saveAs(blob, filename) {
		if (window.navigator.msSaveOrOpenBlob) {
			navigator.msSaveBlob(blob, filename)
		} else {
			let link = document.createElement('a')
			let body = document.querySelector('body	')
			link.href = window.URL.createObjectURL(blob)
			link.download = filename
			// fix Firefox
			link.style.display = 'none'
			body.appendChild(link)
			link.click()
			body.removeChild(link)
			window.URL.revokeObjectURL(link.href)
		}
	}

	//弹窗
	const modalTip = new bootstrap.Modal('#model-tip')
	function showMsg(msg, title = 'Web Serial') {
		//alert(msg)
		document.getElementById('modal-title').innerHTML = title
		document.getElementById('modal-message').innerHTML = msg
		modalTip.show()
	}

	//当前时间 精确到毫秒
	function formatDate(now) {
		const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
		const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
		const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
		const millisecond = ('00' + now.getMilliseconds()).slice(-3)
		return `${hour}:${minute}:${second}.${millisecond}`
	}

	//左右折叠
	document.querySelectorAll('.toggle-button').forEach((element) => {
		element.addEventListener('click', (e) => {
			e.currentTarget.parentElement.querySelector('.collapse').classList.toggle('show')
			e.currentTarget.querySelector('i').classList.toggle('bi-chevron-compact-right')
			e.currentTarget.querySelector('i').classList.toggle('bi-chevron-compact-left')
		})
	})

	//设置名称
	const modalNewName = new bootstrap.Modal('#model-change-name')
	function changeName(callback, oldName = '') {
		set('model-new-name', oldName)
		modalNewName.show()
		document.getElementById('model-save-name').onclick = null
		document.getElementById('model-save-name').onclick = function () {
			callback(get('model-new-name'))
			modalNewName.hide()
		}
	}
})()
