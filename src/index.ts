import * as inspector from 'inspector'
import { Profiler } from './profiler'
import { Heap } from './heap'

export class Inspector {
  session: inspector.Session
  profiler: Profiler
  heap: Heap
  constructor() {
    const session = new inspector.Session
    this.profiler = new Profiler({session})
    this.heap = new Heap({session})
  }

  getSession():inspector.Session {
    return this.session
  }

  destroy():void {
    this.session.disconnect()
    this.session = null as unknown as inspector.Session
  }

}

export default Inspector
