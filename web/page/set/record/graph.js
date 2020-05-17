import React, { Component } from 'react';
// import echarts from 'echarts'
import moment from 'moment'
const echarts = require('echarts/lib/echarts');

require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/graph');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

const color = [
    "#d71345",
    "#f47920",
    "#ffd400",
    "#45b97c",
    "#40835e",
    "#145b7d",
    "#8552a1",
    "#ef5b9c",
    "#f3704b",
    "#dec674",
    "#7fb80e",
    "#73b9a2",
    "#2b4490",
    "#f2eada",
]

function getBarOption({
    legendData = [],
    xAxisData = [],
    seriesData = [],
}) {
    return {
        color,
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: seriesData
    };
}

class Graph extends Component {

    instance = null

    componentDidMount() {
        const instance = echarts.init(document.getElementById('set-record-graph'));
        this.instance = instance
    }

    componentWillReceiveProps(next) {
        const { recordList, recordCategoryList } = next
        if (recordList !== this.props.recordList || recordCategoryList !== this.props.recordCategoryList) {
            this.setOption(next)
        }
    }

    setOption = (props) => {
        const { instance } = this
        const { recordList, recordCategoryList } = props
        if (!instance) return;
        if (!recordList) return
        const data = this.formatData(props)
        if (data) {
            instance.setOption(data, true)
        }
    }

    toMoment = (num) => {
        let str = num + ''
        str = `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6)}`
        return moment(str)
    }

    formatData = (props) => {
        const { recordListParams, recordList, recordCategoryList } = props
        const category = recordCategoryList.find(v => v._id === recordListParams.category)
        if (category) {
            if (category.graph === 1) {
                const option = this.getBarOption(category, props)
                return getBarOption(option)
            } else if (category.graph === 2) {
                return this.getPieOption(category, props)
            }
        }
    }

    getBarOption = (category, props) => {
        const { recordListParams, toFormat, recordList } = props
        const hasTag = category.hasTag
        let legendData = hasTag ? category.tags.slice(0) : [category.name]
        const time = recordListParams.time
        const xAxisData = []
        const obj = {}
        const obj1 = {}
        let uid = 0
        let num = toFormat(moment().add(1, 'days'))
        while ((num = toFormat(this.toMoment(time[0]).add(uid, 'days'))) <= time[1]) {
            xAxisData.push(num)
            ++uid
        }
        recordList.forEach(v => {
            const { tag, value, time } = v
            if (hasTag) {
                if (!obj[time]) {
                    obj[time] = {}
                }
                obj[time][tag] = value
            } else {
                obj[time] = value
            }
        })

        for (let i = xAxisData.length - 1; i > 0; i--) {
            if (obj[xAxisData[i]] === undefined) xAxisData.splice(i, 1)
        }
        const seriesData = legendData.map(v => {
            const p = {
                name: v,
                type: 'bar',
                stack: '总量'
            }
            p.data = xAxisData.map(val => {
                if (hasTag) {
                    if (obj[val] && obj[val][v]) {
                        obj1[v] = true
                        return obj[val][v]
                    }
                } else {
                    return obj[val] || 0
                }
                return 0
            })
            return p
        })
        if (hasTag) {
            legendData = legendData.filter(v => obj1[v])
        }
        return {
            seriesData,
            legendData,
            xAxisData
        }
    }
    getPieOption = (category, props) => {
        const { recordList } = props
        const obj = {}, list = [];
        recordList.forEach(v => {
            const { tag, value } = v
            if (!obj[tag]) {
                obj[tag] = 0
            }
            obj[tag] += value
        })
        Object.keys(obj).forEach(v => {
            list.push({ value: obj[v], name: v })
        })
        const data = list.sort(function (a, b) { return a.value - b.value; })
        const series = [
            {
                name: category.name,
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data,
                animationType: 'scale',
                animationEasing: 'elasticOut',
            }
        ]
        const total = data.reduce((a, b) => a + b.value, 0)
        return {
            color,
            title: {
                text: `${category.name}总数为${total}${category.unit}`,
                top: 20,
            },
            tooltip: {
                trigger: 'item',
                formatter: `{a} <br/>{b} : {c}${category.unit} ({d}%)`
            },
            series
        };
    }
    render() {
        return (
            <div id="set-record-graph"></div>
        );
    }
}

export default Graph
