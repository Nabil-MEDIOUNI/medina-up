import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  filterContent: {
    height: 'calc(100vh)',
    overflow: 'auto',
  },
  resetButton: {
    marginRight: theme.spacing(1.5),
  },
  filtersHeader: {
    width: '100%',
    backgroundColor: '#30c39e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  icon: {
    color: theme.palette.common.strongGray,
  },
  text: {
    textTransform: 'capitalize',
    paddingRight: theme.spacing(2),
  },
  quantityRoot: {
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #CCCCCC',
    },
  },
  form: {
    color: theme.palette.common.strongGray,
    paddingTop: theme.spacing(0.125),
  },
  userName: {
    textTransform: 'capitalize',
    fontSize: 14,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: 110,
    overflow: 'hidden',
  },
  textInput: {
    outline: 'none',
    border: 'none',
    background: 'none',
    width: '100%',
    height: '30%',
    fontFamily: 'Lato',
  },
  fileType: {
    textTransform: 'uppercase',
  },
  textArea: {
    cursor: 'text',
  },
  titleInput: {
    outline: 'none',
    height: 30,
    width: '75%',
    border: 'none',
    boxShadow: '0px 0px 10px #f1eded',
    borderRadius: 5,
    padding: '0px 10px',
    fontSize: 12,
  },
  optionIcons: {
    fontSize: 20,
    opacity: 0.6,
  },
  creatorName: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 'inherit',
    display: 'flex',
    alignItems: 'center',
  },
  creatorPosition: {
    fontSize: 10,
    lineHeight: 'inherit',
  },
  postDescription: {
    overflowWrap: 'anywhere',
  },
  like: {
    marginLeft: 4,
    width: '90%',
    color: '#0e6fa4',
  },
}));

export default useStyles;
