const vendorsController = require('../../controllers/vendorsC')
const Vendor = require('../../models/Vendor')

describe('Unit testing vendor_update from vendorsC.js', () => {

  const req = { body: {} }

  const res = {
    status: jest.fn(),
    json: jest.fn()
  }

  beforeEach(() => {

    req.vendor = { _id: '607710190959c969a0325846' }

    res.status.mockClear()
    res.json.mockClear()

  })

  test("Test Case 1: Testing updating the ready status of van Van Damme to true, id = 607710190959c969a0325846", async () => {

    Vendor.findByIdAndUpdate = jest.fn().mockResolvedValue([
      { _id: '607710190959c969a0325846', ready: true}
    ])

    req.body.ready = true
    await vendorsController.vendor_update(req, res)

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith([{_id: '607710190959c969a0325846', ready: true}])
  })

  test("Test Case 2: Testing updating the ready status of van Van Damme to false, id = 607710190959c969a0325846", async () => {

    Vendor.findByIdAndUpdate = jest.fn().mockResolvedValue([
      { _id: '607710190959c969a0325846', ready: false}
    ])

    req.body.ready = false
    console.log(req)
    await vendorsController.vendor_update(req, res)

    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith([{_id: '607710190959c969a0325846', ready: false}])
  })
})
