import {
  AppBar,
  Toolbar,
  Container,
  Typography,
} from '@mui/material';

export default function Header() {
  return (
    <AppBar >
      <Container>
        <Toolbar>
          <Typography>
            Mini Blog
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
