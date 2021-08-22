import * as inspector from 'inspector'


export interface ProfilerOptions {
  session?: inspector.Session
}

class Profiler {
  session: inspector.Session
  constructor(options?: ProfilerOptions) {
    this.session = (options || {}).session || (new inspector.Session())
    this.session.connect()
  }

  getInfo(time?: number): Promise<inspector.Profiler.Profile> {
    const interval = time || 1000
    const session = this.session
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
