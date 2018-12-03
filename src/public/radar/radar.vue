<template lang="jade">
#radar
  .chart
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import utils from 'src/assets/js/utils';
import api from 'src/assets/js/api';

export default {
    asyncData (resolve, reject) {
        let self = this;
        this.fetch().done(function () {
            self.transData(this);
            resolve(this);
        });
    },
    methods: {
        // 获取当前用户的能力模型
        fetch () {
            let uid = utils.getURLParam("uid");
            return api.get({
                url: constant.API.USER_ABILITY + uid + "/",
            });
        },
        transData (respData) {
            let indicator = [];
            let values = [];
            let info = respData.info || {};
            Object.keys(respData.data).forEach(text => {
                indicator.push({
                    text: text,
                    max: info.max || 0
                });
                let value = respData.data[text];
                values.push(value);
            });
            if (values.length) {
                this.option.radar.indicator = indicator;
                this.option.series[0].data[0].value = values;
            }
        },
        renderChart () {
            this.$chart && this.$chart.setOption(this.option);
        }
    },
    watch: {
        option: {
            deep: true,
            handler () {
                this.renderChart();
            }
        }
    },
    ready () {
        let $radar = document.getElementById('radar');
        let $chart = $radar.getElementsByClassName('chart');
        this.$chart = echarts.init($chart[0]);
    },
    data () {
        return {
            $chart: {},
            info: {},
            data: {},
            success: false,
            option: {
                title: {
                    text: '能力雷达图',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    position: 'inside',
                    textStyle: {
                        fontSize: 10
                    }
                },
                radar:  {
                    indicator: [],
                    center: ['50%', '50%'],
                    radius: '75%',
                    startAngle: 50,
                    splitNumber: 5,
                    shape: 'circle',
                    name: {
                        formatter:'{value}',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: '#666',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.5)'
                        }
                    }
                },
                series: [
                    {
                        name: '雷达图',
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        label: {
                            normal: {
                                // show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
                                        offset: 0,
                                        color: 'blue'
                                    }, {
                                        offset: 0.7,
                                        color: 'red'
                                    }, {
                                        offset: 1,
                                        color: 'yellow'
                                    }]
                                    , false)
                                }
                            }
                        },
                        data: [
                            {
                                // 数据部分
                                value: [],
                                // 每个数据点
                                symbol: 'circle',
                                symbolSize: 10,
                                itemStyle: {
                                    normal: {
                                        color: 'yellow'
                                    }
                                },
                                lineStyle: {
                                    normal: {
                                        color: 'yellow'
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        };
    }
};
</script>
<style lang="less">
#radar {
  height: 100%;
  width: 100%;
  .chart{
    width: 100%;
    height: 100%;
  }
}

</style>
