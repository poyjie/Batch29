// import something here
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import { LMap, LTileLayer } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import axios from 'axios'
import wings from 'wings4'

var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js')
pdfMake.vfs = pdfFonts.pdfMake.vfs

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

// "async" is optional
export default async ({ Vue /* app, router, Vue, ... */ }) => {
  // something to do
  Vue.prototype.$dbCon= wings('http://localhost:3030')
  Vue.prototype.$axios = axios
  Vue.prototype.$pdfMake = pdfMake
  Vue.use(Chartkick.use(Chart))
  Vue.component('l-map', LMap)
  Vue.component('l-tile-layer', LTileLayer)
}