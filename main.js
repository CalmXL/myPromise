class XLPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(executor) {
    this.status = XLPromise.PENDING
    this.value = null

    executor(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(value) {
    this.status = XLPromise.FULFILLED
    this.value = value;
  }

  reject(reason) {
    this.status = XLPromise.REJECTED
    this.value = reason
  }
}

