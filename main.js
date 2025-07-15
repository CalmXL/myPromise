class XLPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(executor) {
    this.status = XLPromise.PENDING
    this.value = null
    this.callbacks = []

    try {
      executor(this.resolve.bind(this), this.reject.bind(this))
    } catch (err) {
      this.reject(err)
    }
  }

  resolve(value) {
    if (this.status === XLPromise.PENDING) {
      this.status = XLPromise.FULFILLED
      this.value = value;
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onFulfilled(this.value)
        })
      })
    }
  }

  reject(reason) {
    if (this.status === XLPromise.PENDING) {
      this.status = XLPromise.REJECTED
      this.value = reason
      setTimeout(() => {
        this.callbacks.map((callback) => {
          callback.onRejected(this.value)
        })
      })
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => this.value
    }

    if (typeof onRejected !== 'function') {
      onRejected = () => this.value
    }

    return new XLPromise((resolve, reject) => {
      if (this.status === XLPromise.PENDING) {
        this.callbacks.push({
          onFulfilled,
          onRejected
        })
      }

      if (this.status === XLPromise.FULFILLED) {
        console.log('fulfilled');
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value)
            resolve(result)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.status === XLPromise.REJECTED) {
        console.log('rejected');
        setTimeout(() => {
          try {
            const result = onRejected(this.value)
            resolve(result)
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }
}

