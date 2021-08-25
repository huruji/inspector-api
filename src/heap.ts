import * as inspector from 'inspector'


export interface HeapOptions {
  session?: inspector.Session
}

export class Heap {
  session: inspector.Session
  constructor(options?: HeapOptions) {
    this.session = (options || {}).session || (new inspector.Session())
    if (!options?.session) {
      this.connect()
    }
  }

  connect():void{
    try{
      this.session.connect()
    } catch(err){
    }
  }

  taskSnapshot():Promise<string> {
    const session = this.session
    this.connect()
    return new Promise((resolve, reject) => {
      const chunks:string[] = []
      const appendChunk = (message:inspector.InspectorNotification<inspector.HeapProfiler.AddHeapSnapshotChunkEventDataType>):void => {
        chunks.push(message.params.chunk)
      }
      session.on('HeapProfiler.addHeapSnapshotChunk', appendChunk)

      session.post('HeapProfiler.takeHeapSnapshot', (err, r) => {
        if(err) {
          reject(err)
        }
        resolve(chunks.join(''))
        session.removeListener('HeapProfiler.addHeapSnapshotChunk', appendChunk)
      })
    })
  }

  getProfile(time?: number):Promise<inspector.HeapProfiler.SamplingHeapProfile> {
    const interval = time || 5000
    const session = this.session
    this.connect()
    return new Promise((resolve, reject) => {
      session.post('HeapProfiler.startSampling', (err) => {
        if(err) {
          reject(err)
        }
        setTimeout(() => {
          session.post('HeapProfiler.stopSampling', (err, data) => {
            if(err) {
              reject(err)
            }
            resolve(data.profile)
            session.disconnect()
          })
        }, interval)
      })
    })
  }
}

export default Heap
