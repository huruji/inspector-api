# inspector-api
v8 inspector api wrapper


# 使用

```bash
npm i inspector-api-wrapper
```

```js
import Inspector from 'inspector-api-wrapper'
const inspectorIns = new Inspector()
```

## 获取 cpu Profile

```js
inspectorIns.profiler.getInfo(5000).then(data => {
  fs.writeFileSync(`./cpuprofile-${Date.now()}.cpuprofile`, JSON.stringify(data))
})
```

## 获取堆内存快照

```js
inspectorIns.heap.taskSnapshot().then(data => {
  fs.writeFileSync(`./heapsnapshot-${Date.now()}.heapsnapshot`, data)
})
```

## 获取堆内存 sampling

```js
inspectorIns.heap.getProfile().then(data => {
  fs.writeFileSync(`./heapprofile-${Date.now()}.heapprofile`, JSON.stringify(data))
})
```