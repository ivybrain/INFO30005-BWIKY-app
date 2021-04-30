import { Avatar } from '@material-ui/core'
import logo from './favicon-128-2.png'

const Logo = (props) => {
    return (
        <Avatar>
            <img src={logo} alt="logo" />
        </Avatar>
    )
}

export default Logo
