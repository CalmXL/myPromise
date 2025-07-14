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
}

