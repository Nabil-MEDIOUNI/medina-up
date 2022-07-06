import { allStatuses } from '../../../../../constants/allStatuses';
import { allUniversities } from '../../../../../constants/allUniversities';
import genders from '../../../../../constants/genders';
import { LNSBoolean, signupBoolean } from '../../../../../constants/others';

export const filterMenuItems = (
  filterCaption,
  setStatusList,
  setSignupList,
  setLNSList,
  setUniversityList,
  setResponsibleList,
  setManagerList,
  setGenderList,
  isEB,
  isMember,
) => [
  {
    label: 'Statuses',
    caption: filterCaption('FILTER_EPS_STATUS'),
    click: () => setStatusList(true),
    canView: true,
  },
  {
    label: 'Sign-up Type',
    caption: filterCaption('FILTER_EPS_Is_sign_up'),
    click: () => setSignupList(true),
    canView: true,
  },
  {
    label: 'Lead Nurturing System ',
    caption: filterCaption('FILTER_EPS_LNS'),
    click: () => setLNSList(true),
    canView: true,
  },
  {
    label: 'University',
    caption: filterCaption('FILTER_EPS_UNIVERSITY'),
    click: () => setUniversityList(true),
    canView: true,
  },
  {
    label: 'Team Responsible',
    caption: filterCaption('FILTER_EPS_RESPONSIBLE'),
    click: () => setResponsibleList(true),
    canView: isEB,
  },
  {
    label: 'EP Manager',
    caption: filterCaption('FILTER_EPS_MANAGER'),
    click: () => setManagerList(true),
    canView: !isMember,
  },
  {
    label: 'Gender',
    caption: filterCaption('FILTER_EPS_GENDER'),
    click: () => setGenderList(true),
    canView: true,
  },
];

export const filterBlock = (
  openStatusList,
  setStatusList,
  openSignupList,
  setSignupList,
  openLNSList,
  setLNSList,
  openGenderList,
  setGenderList,
  openUniversityList,
  setUniversityList,
) => [
  {
    list: allStatuses,
    open: openStatusList,
    setList: setStatusList,
    storageName: 'FILTER_EPS_STATUS',
  },
  {
    list: signupBoolean,
    open: openSignupList,
    setList: setSignupList,
    storageName: 'FILTER_EPS_Is_sign_up',
  },
  {
    list: LNSBoolean,
    open: openLNSList,
    setList: setLNSList,
    storageName: 'FILTER_EPS_LNS',
  },
  {
    list: genders,
    open: openGenderList,
    setList: setGenderList,
    storageName: 'FILTER_EPS_GENDER',
  },
  {
    list: allUniversities,
    open: openUniversityList,
    setList: setUniversityList,
    storageName: 'FILTER_EPS_UNIVERSITY',
  },
];

export const filterSelect = (responsible, openResponsiblerList, setResponsibleList, managers, openManagerList, setManagerList) => [
  {
    title: 'Team Responsible',
    label: 'Responsibles',
    list: responsible?.allTeamResponsible,
    open: openResponsiblerList,
    setList: setResponsibleList,
    storageName: 'FILTER_EPS_RESPONSIBLE',
  },
  {
    title: 'EP Manger',
    label: 'Mangers',
    list: managers?.allManagers,
    open: openManagerList,
    setList: setManagerList,
    storageName: 'FILTER_EPS_MANAGER',
  },
];
