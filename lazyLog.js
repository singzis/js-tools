//实现⼀个同步的sleep⽅法，调⽤⽅式：(new LazyLog()).log(1).sleep(1000).log(2)，输出：先输出1，延迟1秒后输出2
class LazyLog {
  #sleepTime
  #uniqueTime
  #sleepEffects

  constructor(){
    this.#sleepTime = 0
    this.#sleepEffects = new Map()
    this.#uniqueTime = null
  }

  logVal(val) {
    console.log(val)
  }

  log(val) {
    if (this.#uniqueTime) {
      this.#sleepEffects.get(this.#uniqueTime).push(val)
    } else {
      this.logVal(val)
    }

    return this
  }

  sleep(time) {
    this.#sleepTime = this.#sleepTime + time
    const uniqueTime = Symbol(time)
    this.#uniqueTime = uniqueTime
    this.#sleepEffects.set(this.#uniqueTime, [])
    setTimeout(() => {
      this.#sleepEffects.get(uniqueTime).forEach(this.logVal)
      this.#uniqueTime = null
      this.#sleepEffects.delete(uniqueTime)
    }, this.#sleepTime)
    return this
  }

  clearSleepTime() {
    this.#sleepTime = 0
    this.#uniqueTime = null
    return this
  }
}

// test
(new LazyLog()).log(1).sleep(3000).log(2).log(3).log(4).sleep(1000).log(5).log(6).log(7).clearSleepTime().log(9)
