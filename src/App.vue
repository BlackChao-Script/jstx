<!--
 * @Author: fhj
 * @LastEditors: fhj
 * @Description: 
-->
<script>
export default {
  mpType: 'app',
  onLaunch: async function () {},
  onShow: function () {},
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    test: ''
  },
  methods: {},
  destroyed() {}
}
</script>

<style lang="scss">
@import './styles/index.scss';
@import 'uview-ui/index.scss';
</style>
