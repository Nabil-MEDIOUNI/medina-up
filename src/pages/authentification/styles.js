import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  // login
  topIce: {
    position: 'fixed',
    top: '-0.75rem',
    right: '-0.75rem',
    zIndex: 2,
  },
  ice: {
    width: '14rem',
  },
  header: {
    fontSize: 26,
    fontWeight: 600,
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    fontWeight: '400',
    color: '#007AF5',
  },
  loginButton: {
    background: 'linear-gradient(90deg, #037EF3, #30C39E)',
    color: '#FFFFFF',
    width: '60%',
    height: 42,
    boxShadow: '0px 3px 6px #00000029',
  },
  buttons: {
    background: 'white',
    width: '100%',
    height: 45,
  },
  btnsImg: {
    position: 'absolute',
    zIndex: 1,
    width: 20,
    marginLeft: theme.spacing(4),
  },
  // forgot password
  img: {
    width: 112,
    height: 112,
  },
  fpw: {
    margin: theme.spacing(0),
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    width: '80%',
    margin: '0 auto',
  },
  mail: {
    border: '1px solid #BDBDBD',
    padding: theme.spacing(1.125, 1.375),
    borderRadius: 4,
    outline: 'none',
    width: '50%',
  },
  send: {
    width: '30%',
    height: 35,
    borderRadius: 4,
    boxShadow: '0px 3px 6px #00000029',
  },
  send_Typo: {
    fontSize: 16,
    color: 'white',
  },
  ArrowBackIcon: {
    position: 'fixed',
    top: 30,
    left: 15.5,
  },
  // reset password
  loginButtonzzz: {
    background: '#08C4CD',
    color: '#FFFFFF',
    width: '100%',
    height: 40,
    fontSize: 14,
    boxShadow: '0px 3px 6px #00000029',
    borderRadius: '50px',
  },
}));

export default useStyles;
