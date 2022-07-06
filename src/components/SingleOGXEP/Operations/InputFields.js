const InputFields = (currentEP, handleMany, setEP) => [
  {
    label: 'Full Name',
    type: 'text',
    dfltVl: currentEP.EPName,
    onChange: handleMany(currentEP, setEP, 'EPName'),
  },
  {
    label: 'ExpaID',
    type: 'text',
    dfltVl: currentEP.ExpaID,
    onChange: handleMany(currentEP, setEP, 'ExpaID'),
  },
  {
    label: 'Email',
    type: 'text',
    dfltVl: currentEP.EPEmail,
    onChange: handleMany(currentEP, setEP, 'EPEmail'),
  },
  {
    label: 'Phone',
    type: 'text',
    dfltVl: currentEP.EPPhone,
    onChange: handleMany(currentEP, setEP, 'EPPhone'),
  },
  {
    label: 'CV Link',
    type: 'text',
    dfltVl: currentEP.CV,
    onChange: handleMany(currentEP, setEP, 'CV'),
  },
  {
    label: 'Facebook Link',
    type: 'text',
    dfltVl: currentEP.FacebookLink,
    onChange: handleMany(currentEP, setEP, 'FacebookLink'),
  },
  {
    label: 'Note',
    type: 'text',
    dfltVl: currentEP.Note,
    onChange: handleMany(currentEP, setEP, 'Note'),
  },
  {
    label: 'Opportunity Link',
    type: 'text',
    dfltVl: currentEP.OpportunityLink,
    onChange: handleMany(currentEP, setEP, 'OpportunityLink'),
  },
  {
    label: 'Finance Corner',
    type: 'text',
    dfltVl: currentEP.FinanceCorner,
    onChange: handleMany(currentEP, setEP, 'FinanceCorner'),
  },
  {
    label: 'Host LC',
    type: 'text',
    dfltVl: currentEP.HostLC,
    onChange: handleMany(currentEP, setEP, 'HostLC'),
  },
  {
    label: 'Country',
    type: 'text',
    dfltVl: currentEP.Country,
    onChange: handleMany(currentEP, setEP, 'Country'),
  },
  {
    label: 'Accepted Date',
    type: 'text',
    dfltVl: currentEP.AccDate,
    onChange: handleMany(currentEP, setEP, 'AccDate'),
  },
  {
    label: 'Approved Date',
    type: 'text',
    dfltVl: currentEP.APDDate,
    onChange: handleMany(currentEP, setEP, 'APDDate'),
  },
  {
    label: 'Realisation Date',
    type: 'text',
    dfltVl: currentEP.REDate,
    onChange: handleMany(currentEP, setEP, 'REDate'),
  },
  {
    label: 'Finished Date',
    type: 'text',
    dfltVl: currentEP.FinDate,
    onChange: handleMany(currentEP, setEP, 'FinDate'),
  },
];

export default InputFields;
