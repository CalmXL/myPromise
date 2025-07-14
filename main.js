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
      this.callbacks.map((callback) => {
        callback.onFulfilled(this.value)
      })
    }
  }

  reject(reason) {
    if (this.status === XLPromise.PENDING) {
      this.status = XLPromise.REJECTED
      this.value = reason
      this.callbacks.map((callback) => {
        callback.onRejected(this.value)
      })
    }
  }

  then(onFulfilled, onRejected) {

    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => { }
    }

    if (typeof onRejected !== 'function') {
      onRejected = () => { }
    }

    if (this.status === XLPromise.PENDING) {
      this.callbacks.push({
        onFulfilled,
        onRejected
      })
    }

    if (this.status === XLPromise.FULFILLED) {
      setTimeout(() => {
        try {
          onFulfilled(this.value)
        } catch (err) {
          onRejected(err)
        }
      })

    }

    if (this.status === XLPromise.REJECTED) {
      setTimeout(() => {
        try {
          onRejected(this.value)
        } catch (err) {
          onRejected(err)
        }
      })
    }
  }
}

