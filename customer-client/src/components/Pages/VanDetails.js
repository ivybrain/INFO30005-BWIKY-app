import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../constants'

const columns = ['Item', 'Description', 'Price']

const VanDetails = (props) => {
  const { vans, menu, setMenu } = props
  const id = props.match.params.id

  const [vanData, setVanData] = useState(null)

  const rows = menu

  useEffect(() => {
    if (!vanData) {
      if (vans) {
        // Get the van from vans with the same ID
        const vansWithCorrectName = vans.filter((van) => van._id === id)
        if (vansWithCorrectName.length !== 0) {
          console.log('found this van without needing another API call')
          setVanData(vansWithCorrectName[0])
        }
      } else {
        // Try to get the van information from the API
        console.log('getting individual van data')
        const headers = { 'Access-Control-Allow-Origin': '*' }

        axios(`${API_URL}/vendors/${id}`, {
          headers,
        })
          .then((res) => {
            let data = res.data
            data.distance = 10
            setVanData(data)
          })
          .catch((err) => {
            console.error(err)
          })
      }
    }
  }, [vanData, vans, id])

  useEffect(() => {
    if (!menu) {
      console.log('getting menu')
      const headers = { 'Access-Control-Allow-Origin': '*' }

      axios(`${API_URL}/items`, {
        headers,
      })
        .then((res) => {
          setMenu(res.data)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [])

  return (
    <Container>
      {vanData === null || vanData === undefined ? (
        <Typography variant="h3">Van Details Loading...</Typography>
      ) : (
        <div>
          <Typography variant="h3">Van Details {vanData.van_name}</Typography>
          <Typography variant="body">
            This van is {vanData.distance}km away!
          </Typography>

          {menu === null ? (
            ''
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{row.item_name}</TableCell>
                      <TableCell>{row.item_description}</TableCell>
                      {/* <TableCell>{row.price}</TableCell> */}
                      <TableCell>{row.item_price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
    </Container>
  )
}

export default VanDetails
