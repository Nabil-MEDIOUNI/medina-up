import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boxkbir: {
    position: 'fixed',
    height: '100vh',
    width: '100%',
    background: '#f7f7f7',
    zIndex: -1,
  },
  boxloul: {
    width: '85%',
    height: '10%',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.15)',
    borderRadius: 10,
    background: 'white',
    padding: '12px 10px',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: '0.5rem',
  },
  name: {
    color: theme.palette.common.black,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontFamily: 'Lato',
    fontSize: '12px',
  },
  position: {
    color: theme.palette.common.black,
    textTransform: 'capitalize',
    fontFamily: 'Lato',
    fontSize: '12px',
  },
  profile: {
    color: theme.palette.common.black,
    textTransform: 'capitalize',
    fontFamily: 'Lato',
    fontSize: '10px',
    fontWeight: 'semi-bold',
  },
  title: {
    marginRight: '13.5rem',
    marginTop: '-1rem',
  },
}));
export default useStyles;
