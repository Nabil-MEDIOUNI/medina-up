import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  topIce: {
    position: 'fixed',
    top: '-0.75rem',
    right: '-0.75rem',
  },
  ice: {
    width: '14rem',
  },
  aiesec_human: {
    position: 'fixed',
    top: 0,
    left: '1.75rem',
    width: '2.5rem',
  },
  app_btn: {
    width: '19.5rem',
    height: 'fit-content',
    margin: '0 auto',
    display: 'flex',
    boxShadow: '0px 0px 10px #f0efef',
    padding: '0.75rem 0rem',
    borderRadius: 4,
  },
  btnsImg: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: theme.spacing(4),
  },
}));

export default useStyles;
