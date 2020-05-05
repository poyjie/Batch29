<template>
  <div >
    <!-- NAVIGATION -->
    <q-toolbar class="bg-dark text-white">
      <q-btn flat round dense icon="menu" />
       <q-avatar> <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg"></q-avatar>
       <q-toolbar-title> Jedd T. Mercado </q-toolbar-title>
          <q-btn @click="printPDF" flat round dense icon="picture_as_pdf" />
    </q-toolbar>
    <!--  CONTENTS -->
        <div style="width: 100%; height:400px;">
      <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker v-for="(loc,i) in locations" :key="i" :lat-lng="loc.coords"></l-marker>
      </l-map>
    </div>
    <div class="row q-pa-md doc-container">

      <!-- LEFT FORM -->
      <div class="col-4 col-md-6">
        <h5 class="text-h6 "><center>{{title}}</center></h5>

        <q-input filled v-model="id_x" disabled bottom-slots label="ID"/>
        <q-input filled v-model="address" bottom-slots label="Location"/>
        <q-input filled v-model.number="population" type="number" bottom-slots label="Population"/>
       <div>
          <q-btn-group >
            <q-btn label="save" type="button" color="green" icon="save" @click="create"/>
            <q-btn label="update" type="button" color="orange" icon="edit" @click="update"/>
            <q-btn label="clear" type="button" color="red" icon="clear" @click="clear"/>
          </q-btn-group>
        </div>
        <br>

        <q-list bordered separator>

          <q-item v-ripple v-for="(loc, idx) in locations" :key="idx">
            <q-item-section> {{idx}}. {{ loc._id }} - {{ loc.address }}</q-item-section>
            <q-btn-group rounded>
              <q-btn @click="remove(loc._id)" color="red" icon="delete" />
              <q-btn @click="getData(loc._id)" color="orange" icon="edit" />
            </q-btn-group>

          </q-item>
        </q-list>
      </div>

      <!-- RIGHT CHART -->
      <div class="col-4 col-md-6">
        <pie-chart :donut="true" :data="chartData"></pie-chart>
      </div>

    </div>

  </div>
</template>


<script>
import { latLng } from 'leaflet'
import { LMarker} from 'vue2-leaflet'
export default {
  components: {
    LMarker
    // LPopup,
    // LTooltip
  },
  mounted (){
    this.locations = []
    this.locationsService = this.$dbCon.wingsService('locations').init()
    this.locationsService.on('dataChange',(locs)=>{
      this.locations = locs
    })
  },
  data(){
    return{
      population:'',
      address:'',
      id_x:'',
      zoom: 13,
      center: latLng(7.0754424,125.595300),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      title: 'GEO MAPPING',
      locations: [
        {
          address: 'add1',
          coords: {},
          population:100
        }
      ]
    }
  },
  computed: {
    chartData(){
      return this.locations.map((loc) => {
        return[
          loc.address,
          loc.population
        ]
       })
    }
  },
  methods: {
    async create() {

      const result = await this.$axios.get(`https://geocode.xyz/${this.address}?json=1`)
      console.log('address',result.data)
      const { latt,longt } = result.data

      this.locationsService.create({
        address: this.address,
        coords: latLng(latt,longt),
        population: this.population
      })

      this.address = ''
      this.id_x = ''
      this.population = ''
    },
    remove(i){
      this.locationsService.remove(i)
    },
    getData(i){
      const p=this.locationsService.get(i)
      p.then(values => {
        this.id_x=values['_id']
        this.address=values['address']
        this.population=values['population']
      })
    },
    update(){

      this.locationsService.update(this.id_x,{
        address: this.address,
        population: this.population
      })

      this.address = ''
      this.id_x = ''
      this.population = ''

    },
    clear(){
      this.address = ''
      this.id_x = ''
      this.population = ''
    },
    printPDF () {
      
      var header= ['Address','Population']

      var bodyData = [header]
      this.locations.forEach(function(sourceRow) {
        var dataRow = []
        dataRow.push(sourceRow.address)
        dataRow.push(sourceRow.population)
        bodyData.push(dataRow)
      })

      const docDefinition = {
        content: [
          'List Of Locations',
          {

            table: {
              body:bodyData
            }
          }
        ]
      }
      this.$pdfMake.createPdf(docDefinition).open()
    }
  }
}
</script>