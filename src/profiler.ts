import * as inspector from 'inspector'


export interface ProfilerOptions {
  session?: inspector.Session
}

export class Profiler {
  session: inspector.Session
  constructor(options?: ProfilerOptions) {
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

  getInfo(time?: number): Promise<inspector.Profiler.Profile> {
    const interval = time || 5000
    const session = this.session
    this.connect()
    return new Promise((resolve, reject) => {
      session.post('Profiler.enable', (err) => {
        if (err) {
          reject(err)
        }
        session.post('Profiler.start', (err) => {
          if (err) {
            reject(err)
          }
          setTimeout(() => {
            session.post('Profiler.stop', (err, data) => {
              if(err) {
                reject(err)
              }
              resolve(data.profile)
              session.disconnect()
            })
          }, interval)
        })
      })
    })
  }

}

export default Profiler
