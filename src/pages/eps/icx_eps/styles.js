import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 51.5,
  },
  tapBar: {
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabTitle: {
    color: theme.palette.common.darkBlack,
  },
  EP: {
    display: 'flex',
    margin: '50% auto',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 0px 1px #545454',
    width: '90%',
  },
  oppAvatar: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  avatar: {
    border: '2px solid white',
    borderRadius: '100%',
    position: 'relative',
  },
  link: {
    textDecoration: 'none', color: 'currentColor', outline: 'none', userSelect: 'none', cursor: 'default',
  },
  university: {
    backgroundColor: '#f7f7f7',
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(1),
    padding: theme.spacing(0.5),
  },
  univIcon: {
    opacity: 0.5,
    fontSize: 10,
    marginRight: theme.spacing(0.5),
  },
  univTypo: {
    fontSize: 10,
    color: '#00000099',
    lineHeight: '100%',
  },
  hr: {
    width: '85%',
    margin: '0 auto',
    opacity: 0.2,
  },
  header: {
    fontSize: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  shownIcon: {
    opacity: 0.8,
    fontSize: theme.spacing(2),
  },
  contenHeader: {
    color: 'rgba(0, 0, 0, 0.35)',
    fontSize: 12,
    maxWidth: '90%',
    wordWrap: 'break-word',
    marginTop: 8,
    lineHeight: 'normal',
    paddingBottom: 6,
    textTransform: 'none',
  },
  EPcontent: {
    color: '#00000099',
    overflow: 'hidden',
    fontSize: 12,
    maxWidth: '95%',
    wordWrap: 'break-word',
    fontWeight: 500,
    textOverflow: 'ellipsis',
    letterSpacing: 0.22,
  },
  pagination: {
    display: 'flex',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    paddingBottom: theme.spacing(2),
    margin: '0px 10px 0px 8px',
  },
  page_item: {
    padding: theme.spacing(0, 0.75),
    listStyle: 'none',
  },
  page_link: {
    padding: '8px 12px',
    background: 'none',
    outline: 'none',
    border: 'none',
    borderRadius: 3,
    boxShadow: '0px 0px 5px #bebebe',
  },
  wrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  border: {
    width: 0.7,
    height: 35,
    position: 'relative',
    background: '#707070',
    opacity: 0.5,
    margin: '0px 15px',
  },
  emptyListTypo: {
    textAlign: 'center',
    fontSize: 14,
    width: '80%',
    opacity: 0.7,
  },
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
  formLabel: {
    margin: 0,
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
  },
  filterCaption: {
    fontSize: 12,
    marginTop: 2,
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  searchContatiner: {
    alignItems: 'center',
    display: 'flex',
    width: '80%',
    margin: '0 auto 8px auto',
  },
  searchInput: {
    background: 'white',
    width: 275,
    height: 35,
    boxShadow: '0px 0px 10px #ececec',
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
  managerAvatar: {
    width: 22,
    height: 22,
    display: 'flex',
    textAlign: 'center',
    marginLeft: theme.spacing(-1),
    backgroundColor: 'white',
    border: '1px solid white',
  },
  managerImg: {
    color: 'transparent',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    textAlign: 'center',
    textIndent: '10000px',
  },
  EPsList: {
    background: 'white',
    width: '90%',
    margin: '16px auto',
    padding: '12px 0px',
    borderRadius: 2,
    boxShadow: '0px 0px 10px #00000029',
  },

  productsContainer: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto',
    whiteSpace: 'nowrap',
    width: '80%',
  },
  productBtn: {
    display: 'flex',
    padding: theme.spacing(0.5),
    borderRadius: '2px',
    alignItems: 'center',
  },
  productImg: {
    width: 16,
    paddingRight: theme.spacing(0.5),
  },
  productTypo: {
    color: 'white',
    fontSize: 10,
  },
  selectProduct: {
    fontSize: '1.2rem',
    fontWeight: 700,
    fontStyle: 'italic',
    borderBottom: '1px solid black',
    padding: 8,
    opacity: 0.9,
  },
  epInformationIcon: {
    fontSize: 22,
    marginRight: 8,
    color: '#30C39E',
  },
  epInformationTypo: {
    color: '#30C39E',
  },
  epNoteIcon: {
    fontSize: 22,
    marginRight: 8,
    color: '#FDC747',
    transform: 'rotate(-90deg)',
  },
  epNoteTypo: {
    color: '#FDC747',
  },
  epOppIcon: {
    fontSize: 22,
    marginRight: 8,
    color: '#007AF5',
  },
  epOppTypo: {
    color: '#007AF5',
  },
}));

export default useStyles;
