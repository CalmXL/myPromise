class XLPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(executor) {
    this.status = XLPromise.PENDING
    this.value = null

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
    }
  }

  reject(reason) {
    if (this.status === XLPromise.PENDING) {
      this.status = XLPromise.REJECTED
      this.value = reason
    }
  }

  then(onFulfilled, onRejected) {

    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => { }
    }

    if (typeof onRejected !== 'function') {
      onRejected = () => { }
    }

    if (this.status === XLPromise.FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === XLPromise.REJECTED) {
      onRejected(this.value)
    }
  }
}

