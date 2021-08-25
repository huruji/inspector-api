import * as fs from 'fs'
import Inspector from '../dist/index'

import Paloma from 'paloma'
const app = new Paloma()

const inspectorIns = new Inspector()

app.route({ method: 'GET', path: '/get_cpu_profile', async controller (ctx) {
  inspectorIns.profiler.getInfo(5000).then(data => {
    fs.writeFileSync(`./cpuprofile-${Date.now()}.cpuprofile`, JSON.stringify(data))
  })

  ctx.body = '12312'
}})

app.route({ method: 'GET', path: '/get_heap_snapshot', async controller (ctx) {
  inspectorIns.heap.taskSnapshot().then(data => {
    fs.writeFileSync(`./heapsnapshot-${Date.now()}.heapsnapshot`, data)
  }).catch(err => {
    console.log(err)
  })

  ctx.body = '12312'
}})

app.route({ method: 'GET', path: '/get_heap_sampling', async controller (ctx) {
  inspectorIns.heap.getProfile().then(data => {
    fs.writeFileSync(`./heapprofile-${Date.now()}.heapprofile`, JSON.stringify(data))
  }).catch(err => {
    console.log(err)
  })

  ctx.body = '12312'
}})

app.listen(5000)
