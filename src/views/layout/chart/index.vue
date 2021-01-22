<template>
  <div class="chart">
    <el-card>
      <ul class="list">
        <li>
          <div class="itemContent color1">
            {{ headerData.increment_questions }}
          </div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div class="itemContent color1">{{ headerData.total_users }}</div>
          <p>总用户量</p>
        </li>
        <li>
          <div class="itemContent color2">
            {{ headerData.increment_questions }}
          </div>
          <p>新增试题</p>
        </li>
        <li>
          <div class="itemContent color2">{{ headerData.total_questions }}</div>
          <p>总试题量</p>
        </li>
        <li>
          <div class="itemContent color2">
            {{ headerData.total_done_questions }}
          </div>
          <p>总刷题量</p>
        </li>
        <li>
          <div class="itemContent color2">
            {{ headerData.personal_questions }}
          </div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card :style="{ marginTop: '15px' }">
      <div class="pie" ref="pie"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data () {
    return {
      headerData: ''
    }
  },
  methods: {
    async getHeaderData () {
      const res = await this.$axios.post('/data/title')
      // console.log(res)
      if (res.code === 200) {
        this.headerData = res.data
      }
    },
    async getStatisticsData () {
      const res = await this.$axios.post('/data/statistics')
      // console.log(res)
      if (res.code === 200) {
        setTimeout(() => {
          var myChart = echarts.init(this.$refs.pie)
          myChart.setOption({
            tooltip: {
              trigger: 'item'
            },
            legend: {
              top: '5%',
              right: '100',
              orient: 'vertical'
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                  borderRadius: 10,
                  borderColor: '#fff',
                  borderWidth: 2
                },
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '28',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: res.data
              }
            ]
          })
        }, 0)
      }
    }
  },
  created () {
    this.getHeaderData()
  },
  mounted () {
    this.getStatisticsData()
  }
}
</script>

<style lang="less">
.chart {
  .list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    .itemContent {
      border-radius: 50%;
      width: 99px;
      height: 99px;
      line-height: 99px;
    }
    .color1 {
      border: 3px solid #0086fa;
      color: #0086fa;
    }
    .color2 {
      border: 3px solid #f76137;
      color: #f76137;
    }
  }
  .pie {
    height: 400px;
  }
}
</style>
