export const person = {
  email_sent: {
    name: 'email_sent',
    displayName: 'Email Sent',
  },
  contacted: {
    name: 'contacted',
    displayName: 'Contacted',
  },
  interested: {
    name: 'interested',
    displayName: 'Interested',
  },
  not_interested: {
    name: 'Not Interested',
    displayName: 'Not Interested',
  },
  not_contacted: {
    name: 'Not Contacted',
    displayName: 'Not Contacted',
  },
  open: {
    name: 'open',
    displayName: 'Open',
  },
  applied: {
    name: 'applied',
    displayName: 'Applied',
  },
  accepted: {
    name: 'accepted',
    displayName: 'Accepted',
  },
  approved: {
    name: 'approved',
    displayName: 'Approved',
  },
  finished: {
    name: 'finished',
    displayName: 'Finished',
  },
  realized: {
    name: 'realized',
    displayName: 'Realized',
  },
  completed: {
    name: 'completed',
    displayName: 'Completed',
  },
  deleted: {
    name: 'deleted',
    displayName: 'Deleted',
  },
  unresponsive: {
    name: 'unresponsive',
    displayName: 'Unresponsive',
  },
  rejected: {
    name: 'rejected',
    displayName: 'Rejected',
  },
};

export const opportunity = {
  draft: {
    name: 'draft',
    displayName: 'Draft',
  },
  under_review: {
    name: 'under_review',
    displayName: 'Under Review',
  },
  open: {
    name: 'open',
    displayName: 'Live',
  },
  unpublished: {
    name: 'unpublished',
    displayName: 'Unpublished',
  },
  expired: {
    name: 'expired',
    displayName: 'Expired',
  },
};

export const allStatuses = [
  { name: 'Email_Sent', value: 'Email_Sent' },
  { name: 'Contacted', value: 'contacted' },
  { name: 'Interested', value: 'interested' },
  { name: 'Open', value: 'open' },
  { name: 'Applied', value: 'applied' },
  { name: 'Accepted', value: 'accepted' },
  { name: 'Approved', value: 'approved' },
  { name: 'Realized', value: 'realized' },
  { name: 'Finished', value: 'finished' },
  { name: 'Completed', value: 'completed' },
  { name: 'Rejected', value: 'rejected' },
  { name: 'Unresponsive', value: 'unresponsive' },
  { name: 'Not_Interested', value: 'Not_Interested' },
  { name: 'Not_Contacted', value: 'Not_Contacted' },
  { name: 'No_Status', value: 'No_Status' },
];

const statuses = {
  person,
  opportunity,
};

export default statuses;
