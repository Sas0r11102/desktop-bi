export interface ColumnMeta {
  name: string;
  type: 'number' | 'string' | 'date' | 'boolean';
  distinct?: number;
  min?: number;
  max?: number;
}

export type Row = Record<string, string | number | boolean | null>;

export interface Dataset {
  columns: ColumnMeta[];
  rows: Row[];
  rowCount: number;
  sourceFile: string;
  // Aggregated values for KPI
  totalBalance: number;
  income: number;
  expense: number;
  netProfit: number;
  orders: number;
  // Revenue flow data
  revenueFlow: { month: string; revenue: number; expense: number }[];
  // Expense split data
  expenseSplit: { name: string; value: number; color: string }[];
  // Transactions
  transactions: Transaction[];
  // Subscriptions
  subscriptions: Subscription[];
}

export interface Transaction {
  icon: string;
  name: string;
  date: string;
  amount: number;
  type: 'positive' | 'negative';
}

export interface Subscription {
  icon: string;
  name: string;
  period: string;
  amount: string;
}

export interface FileEntry {
  name: string;
  path: string;
  size: number;
  modified: number;
  type: 'csv' | 'excel';
}

export interface AppConfig {
  lastFolder: string | null;
  lastFile: string | null;
  autoRefresh: boolean;
}
