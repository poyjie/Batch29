<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" />
      <q-toolbar-title>
        Hello {{ name }}
      </q-toolbar-title>
      <q-btn @click="printPDF" flat round dense icon="picture_as_pdf" />
    </q-toolbar>
    <div class="q-pa-md">
      <!-- convert to QInput -->
      <input type="text" v-model="address">
      <q-btn @click="create" size="sm" round color="primary" icon="save" />

      <!-- Use the Population of locations -->
      <pie-chart :donut="true" :data="[['Blueberry', 55], ['Strawberry', 30]]"></pie-chart>
      <!-- convert to QList -->
      <!-- <ol>
        <li v-for="(loc, ind) in locations" :key="ind">
          {{ loc.name }}
          <button @click="remove(ind)">x{{ ind }}</button>
        </li>
      </ol> -->
      <list-locations :locations="locations" name="Pogi"
      @poop="
        (data) => {
          log('data', data)
        }
      "
      />
      <!-- <list-locations :locations="locations" /> -->
    </div>
    
  </div>
</template>

<script>
import listLocations from 'src/components/listLocations.vue'

export default {
  components: {
    listLocations
  },
  data () {
    return {
      name: 'pogi',
      address: '',
      locations: [
        {
          name: 'San Fabian Pangasinan',
          coords: {},
          population: 100
        },
        {
          name: 'Agoo La Union',
          coords: {},
          population: 21
        },
        {
          name: 'Bicutan Taguig',
          coords: {},
          population: 210
        }
      ]
    }
  },
  computed: {
    chartData(){
      return this.locations.map((loc) => {
        return[
          loc.name,
          loc.population
        ]
       })
    }
  },
  methods: {
    log: console.log,
    create () {
      this.locations.push({
        name: this.address,
        coords: {}
      })
      this.address = ''
    },
    printPDF () {
      const docDefinition = {
        content: [
          'Bulleted list example:',
          {
            // to treat a paragraph as a bulleted list, set an array of items under the ul key
            ul: [
              'Item 1',
              'Item 2',
              'Item 3',
              { text: 'Item 4', bold: true },
            ]
          }
        ]
      }
      this.$pdfMake.createPdf(docDefinition).open()
    }
  }
}
</script>