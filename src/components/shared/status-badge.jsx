import { Badge } from '@/components/ui/badge';

const statusConfig = {
  // Status
  ACTIVE: { variant: 'success', label: 'Active' },
  INACTIVE: { variant: 'secondary', label: 'Inactive' },
  SUSPENDED: { variant: 'danger', label: 'Suspended' },
  PENDING: { variant: 'warning', label: 'Pending' },
  // Payment
  COMPLETED: { variant: 'success', label: 'Completed' },
  FAILED: { variant: 'danger', label: 'Failed' },
  REFUNDED: { variant: 'info', label: 'Refunded' },
  // Course
  DRAFT: { variant: 'secondary', label: 'Draft' },
  PUBLISHED: { variant: 'success', label: 'Published' },
  ARCHIVED: { variant: 'outline', label: 'Archived' },
  // Application
  SUBMITTED: { variant: 'default', label: 'Submitted' },
  UNDER_REVIEW: { variant: 'warning', label: 'Under Review' },
  OFFER_RECEIVED: { variant: 'success', label: 'Offer Received' },
  REJECTED: { variant: 'danger', label: 'Rejected' },
  APPROVED: { variant: 'success', label: 'Approved' },
};

export default function StatusBadge({ status, className }) {
  const config = statusConfig[status] || { variant: 'outline', label: status };
  return <Badge variant={config.variant} className={className}>{config.label}</Badge>;
}