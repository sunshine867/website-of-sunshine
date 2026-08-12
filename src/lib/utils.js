import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = 'NPR') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 0 }).format(amount);
}

export function formatDate(date, options = {}) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', ...options }).format(new Date(date));
}

export function truncate(str, length = 100) {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}

export function getInitials(firstName, lastName) {
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
}

export function getRoleBadgeColor(role) {
  const colors = {
    SUPER_ADMIN: 'bg-red-100 text-red-800',
    ADMIN: 'bg-purple-100 text-purple-800',
    TEACHER: 'bg-blue-100 text-blue-800',
    STUDENT: 'bg-green-100 text-green-800',
  };
  return colors[role] || 'bg-gray-100 text-gray-800';
}