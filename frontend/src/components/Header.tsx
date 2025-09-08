import {
  AppBar,
  Toolbar,
  Container,
  Typography,
} from '@mui/material';
import Btn from './Button';

export default function Header() {
  return (
    <AppBar >
      <Container>
        <Toolbar>
          <Typography>
            Mini Blog
          </Typography>

          <Btn name='login' id={'login'} onClick={function (): void {
            throw new Error('Function not implemented.');
          } }></Btn>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
