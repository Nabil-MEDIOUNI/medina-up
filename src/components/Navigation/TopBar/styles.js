const { makeStyles } = require('@material-ui/core');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(0.05),
  },
  seperator: {
    flexGrow: 1,
  },
  icon: {
    color: '#0A8EA0',
    fontSize: 24,
  },
  Toolbar: {
    padding: theme.spacing(1, 2.25),
    alignItems: 'center',
  },
  title: {
    color: '#29abc4',
    textTransform: 'capitalize',
    fontWeight: 500,
    marginTop: theme.spacing(0.25),
  },
  Avatar: {
    width: 25,
    height: 25,
    display: 'flex',
    textAlign: 'center',
    backgroundColor: 'white',
    border: '1.25px solid #30c39e',
    marginLeft: theme.spacing(1),
  },
  Img: {
    color: 'transparent',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    textAlign: 'center',
    textIndent: '10000px',
  },
  notification_count: {
    position: 'absolute',
    background: '#f85a40',
    right: 0,
    top: 2,
    zIndex: 3,
    borderRadius: 6,
  },
  notification_count_typo: {
    fontSize: 10,
    color: 'white',
    padding: '0px 6px',
  },
}));

export default useStyles;
