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
  },
  commentInput: {
    border: 'none',
    marginLeft: 16,
    width: '100%',
    outline: 'none',
  },
  moreReactions: {
    border: '1px solid #525252',
    borderRadius: '50%',
    display: 'flex',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContatiner: {
    alignItems: 'center',
    display: 'flex',
  },
  searchInput: {
    background: 'white',
    width: '100%',
    height: 35,
    boxShadow: '0px 0px 10px #f3f3f3',
    border: 'none',
    borderRadius: 4,
    paddingLeft: 35,
    outline: 'none',
  },
  searchIcon: {
    position: 'absolute',
    fontSize: 19,
    paddingLeft: 8,
    opacity: 0.45,
    zIndex: 1,
  },
}));

export default useStyles;
