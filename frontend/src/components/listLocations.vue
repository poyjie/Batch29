<template>
  <div>
    <h5>{{name}}</h5>
    <ol>
      <li v-for="(loc, idx) in locations" :key="idx">
        {{ 'ind'+ idx }} - {{ loc.address }}
        <button @click="remove(idx)">x</button>
        <q-btn round size="xs" color="grey" icon="edit" />
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: [
    'locations',
    'name'
  ],
  methods: {
    remove (i) {
      this.locations.splice(i, 1)
    }
  }
}
</script>