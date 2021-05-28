const request = require('supertest')
const app = require('../../app')

// jest.useFakeTimers()

describe('Integration Test: Using the vendor app, the van operator sets the status of their van.', () => {
  // Test Case 1: Vendor ID = 607710190959c969a0325846 (Vendor = Van Damme)
  // Set status of van to ready

  const vendor_name = 'Van Damme'
  const vendor_id = '607710190959c969a0325846'
  const vendor_password = 'password'
  const incorrect_vendor_passowrd = 'incorrect_password'

  // test(`Test 1 (set van status to ready): Van Damme ${vendor_id}`, () => {
  //   return (
  //     request(app)
  //       // Log in to the vendor
  //       .post(`/vendors/login`)
  //       .send({
  //         van_name: vendor_name,
  //         password: vendor_password,
  //       })
  //       .then((loginRes) => {
  //         request(app)
  //           // Update the van's status
  //           .patch(`/vendors/${vendor_id}`)
  //           .send({ ready: true })
  //           // .set({ Authorization: loginRes.body })
  //           .set({ Authorization: 'totessecure' })
  //           .then((res) => {
  //             // HTTP Response Code should be 200 OK
  //             expect(res.statusCode).toBe(200)
  //             // It should return a JSON Web Token
  //             expect(res.type).toBe('application/json')
  //             // Ready should be set to true
  //             expect(res.body.ready).toBe(true)
  //             // The van name should be Van Damme
  //             expect(res.body.van_name).toBe(vendor_name)
  //             // The van ID should be 607710190959c969a0325846
  //             expect(res.body._id).toBe(vendor_id)
  //           })
  //       })
  //   )
  // })

  test(`Test 1 (set van status to ready): Van Damme ${vendor_id}`, () => {
    return (
      request(app)
        // Update the van's status
        .patch(`/vendors/${vendor_id}`)
        .send({ ready: true })
        // .set({ Authorization: loginRes.body })
        .set({ Authorization: 'totessecure' })
        .then((res) => {
          // HTTP Response Code should be 200 OK
          expect(res.statusCode).toBe(200)
          // // It should return a JSON Web Token
          // expect(res.type).toBe('application/json')
          // // Ready should be set to true
          // expect(res.body.ready).toBe(true)
          // // The van name should be Van Damme
          // expect(res.body.van_name).toBe(vendor_name)
          // // The van ID should be 607710190959c969a0325846
          // expect(res.body._id).toBe(vendor_id)
        })
    )
  })

  // test(`Test 1 (set van status to ready): Van Damme ${vendor_id}`, async () => {
  //   const jwt = await request(app)
  //     // Log in to the vendor
  //     .post(`/vendors/login`)
  //     .send({
  //       van_name: vendor_name,
  //       password: vendor_password,
  //     })
  //     .then((loginRes) => {
  //       return loginRes
  //     })

  //   return (
  //     // Update the van's status
  //     request(app)
  //       .patch(`/vendors/${vendor_id}`)
  //       .send({ ready: true })
  //       .set({ Authorization: jwt })
  //       // .set({ Authorization: 'totessecure' })
  //       .then((res) => {
  //         // HTTP Response Code should be 200 OK
  //         expect(res.statusCode).toBe(200)
  //         // It should return a JSON Web Token
  //         expect(res.type).toBe('application/json')
  //         // Ready should be set to true
  //         expect(res.body.ready).toBe(true)
  //         // The van name should be Van Damme
  //         expect(res.body.van_name).toBe(vendor_name)
  //         // The van ID should be 607710190959c969a0325846
  //         expect(res.body._id).toBe(vendor_id)
  //       })
  //   )
  // })

  // test(`Test 2 (set van status to not ready): Van Damme ${vendor_id}`, () => {
  //   return (
  //     request(app)
  //       // Log in to the vendor
  //       .post(`/vendors/login`)
  //       .send({
  //         van_name: vendor_name,
  //         password: vendor_password,
  //       })
  //       .then((loginRes) => {
  //         // Update the van's status
  //         request(app)
  //           .patch(`/vendors/${vendor_id}`)
  //           .send({ ready: false })
  //           .set({ Authorization: loginRes.body })
  //           .then((res) => {
  //             // HTTP Response Code should be 200 OK
  //             expect(res.statusCode).toBe(200)
  //             // It should return a JSON Web Token
  //             expect(res.type).toBe('application/json')
  //             // Ready should be set to true
  //             expect(res.body.ready).toBe(false)
  //             // The van name should be Van Damme
  //             expect(res.body.van_name).toBe(vendor_name)
  //             // The van ID should be 607710190959c969a0325846
  //             expect(res.body._id).toBe(vendor_id)
  //           })
  //       })
  //   )
  // })
})

// test(`Test 3 (set van status to ready with incorrect credentials): Van Damme ${vendor_id}`, () => {
//   return (
//     request(app)
//       // Send a POST request with the appropriate body
//       .post(`/vendors/login`)
//       .send({ van_name: vendor_name, password: incorrect_vendor_passowrd })
//       .then((res) => {
//         // HTTP Response Code should be 403 Forbidden
//         expect(res.statusCode).toBe(403)
//         // It should return plain text (Forbidden)
//         expect(res.type).toBe('text/plain')
//       })
//   )
// })
