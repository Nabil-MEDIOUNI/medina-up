import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  background: {
    zIndex: '1111',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'fixed',
    touchAction: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  position: {
    color: theme.palette.common.white,
    textTransform: 'capitalize',
  },
  drawer: {
    width: 278,
    flexShrink: 0,
    overflowX: 'hidden',
  },
  drawerPaper: {
    width: 278,
    overflowX: 'hidden',
    borderRadius: '0px 40px 40px 0px',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.75, 1),
    justifyContent: 'flex-end',
    height: '4rem',
  },
  menuButtonActive: {
    backgroundColor: '#f3f3f3',
  },
  menuButtonInActive: {
    color: '#FFFFFF',
  },
  activeTypo: {
    color: '#626262',
  },
  inActiveTypo: {
    color: '#000000',
    opacity: 0.8,
  },
}));

export default useStyles;
