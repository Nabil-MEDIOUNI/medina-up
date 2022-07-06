import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  surname: {
    color: 'white',
    fontWeight: 500,
    paddingTop: theme.spacing(1.5),
    letterSpacing: 1,
    textTransform: 'capitalize',
    fontSize: 18,
  },
  position: {
    fontSize: 14,
    fontWeight: 100,
    textTransform: 'capitalize',
    letterSpacing: 1,
    color: 'white',
  },
  secondContainer: {
    marginTop: theme.spacing(-4.5),
  },
  Row: {
    width: '80%',
    height: '100%',
    background: 'white',
    borderRadius: 8,
    padding: theme.spacing(1.25, 0),
    display: 'flex',
    flexDirection: 'column',
    margin: '10px auto',
    alignItems: 'center',
  },
  nav: {
    width: '75%',
  },
  icon: {
    fontSize: 20,
    opacity: 0.8,
  },
  arrowIcon: {
    fontSize: 16,
    opacity: 0.8,
  },
}));

export default useStyles;
