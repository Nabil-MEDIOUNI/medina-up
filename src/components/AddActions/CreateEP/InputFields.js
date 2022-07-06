import { allUniversities, year_of_study } from '../../../constants/allUniversities';
import communication from '../../../constants/communication';
import { products, signupBoolean } from '../../../constants/others';

export const InputFields = (ep, handleMany, setEP) => [
  {
    label: 'Full Name',
    onChange: handleMany(ep, setEP, 'EPName'),
    key: 1,
    req: true,
  },
  {
    label: 'Email',
    type: 'email',
    onChange: handleMany(ep, setEP, 'EPEmail'),
    key: 2,
  },
  {
    label: 'Phone Number',
    type: 'number',
    onChange: handleMany(ep, setEP, 'EPPhone'),
    key: 3,
  },
  {
    label: 'Birthday year',
    type: 'number',
    onChange: handleMany(ep, setEP, 'EPAge'),
    key: 4,
    req: true,
  },
];

export const MarketQuestions = (ep, handleMany, setEP) => [
  {
    label: 'If CORONA persists, will u travel?',
    onChange: handleMany(ep, setEP, 'Travel'),
    key: 6,
    req: true,
  },
  {
    label: 'Obstacles prevent u from traveling?',
    onChange: handleMany(ep, setEP, 'Obstacles'),
    key: 7,
    req: true,
  },
];

export const Selecters = (ep, handleMany, setEP) => [
  {
    label: 'University',
    handle: handleMany(ep, setEP, 'EPUniversity'),
    actions: allUniversities,
  },
  {
    label: 'Year of Study',
    handle: handleMany(ep, setEP, 'EPYear'),
    actions: year_of_study,
  },
  {
    label: 'Communication Prefrences',
    handle: handleMany(ep, setEP, 'CommunicationPrefrences'),
    actions: communication,
  },
  {
    label: 'Product Interested In',
    handle: handleMany(ep, setEP, 'Product'),
    actions: products,
  },
  {
    label: 'Type Signup',
    handle: handleMany(ep, setEP, 'Is_sign_up'),
    actions: signupBoolean,
  },
];
