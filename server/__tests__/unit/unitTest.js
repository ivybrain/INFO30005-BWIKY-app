const vendorsController = require('../../controllers/vendorsC')
const Vendor = require('../../models/Vendor')

describe('Unit testing vendor_update from vendorsC.js', () => {
  // test('test test', () => {
  //   expect(123).toEqual(123)
  // })
  const req = {
    params: { vendor_id: '607710190959c969a0325846' },
    headers: { authorization: 'Bearer totessecure' },
    body: { ready: 'true' }
  }

  const res = {
    status: jest.fn(),
    json: jest.fn()
  }

  beforeAll(() => {
    res.status.mockClear()
    res.json.mockClear()

    Vendor.findById = jest
      .fn()
      .mockResolvedValue([
        { _id: '607710190959c969a0325846', van_name: 'Van Damme' },
      ])

    // Vendor.findById.mockImplementationOnce(() => ({
    //   lean: jest.fn().mockReturnValue({
    //     _id: '607710190959c969a0325846',
    //     van_name: 'Van Damme',
    //   }),
    // }))

    //vendorsController.find_vendor(req, res);

    Vendor.findByIdAndUpdate = jest.fn().mockResolvedValue([
      { _id: '607710190959c969a0325846', ready: true}
    ])

    req.vendor = { _id: '607710190959c969a0325846' }
    vendorsController.vendor_update(req, res);
    console.log(req);


  })

  test("Test Case 1: Testing updating the ready status of van Van Damme, id = 607710190959c969a0325846", () => {
    //console.log(expect(res.render).toHaveBeenCalledTimes)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
