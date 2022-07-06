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
    height: 65,
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
    height: '20%',
    fontFamily: 'Lato',
    fonrSize: 14,
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
  postDescription: {
    overflowWrap: 'anywhere',
  },
  optionIcons: {
    fontSize: 20,
    opacity: 0.7,
  },
}));

export default useStyles;
