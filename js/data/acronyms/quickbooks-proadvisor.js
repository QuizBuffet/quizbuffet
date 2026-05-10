export const acronyms = [
  // Intuit / QuickBooks products
  { a: 'QBO',       d: 'QuickBooks Online' },
  { a: 'QBOA',      d: 'QuickBooks Online Accountant — the free firm portal for ProAdvisors' },
  { a: 'QBDT',      d: 'QuickBooks Desktop' },
  { a: 'QB Time',   d: 'Intuit time-tracking add-on (formerly TSheets)' },
  { a: 'QB Bills',  d: 'QuickBooks Bill Pay (powered by Melio integration)' },
  { a: 'QB Payments', d: 'QuickBooks credit-card and ACH payment processing' },
  { a: 'QB Capital', d: 'QuickBooks small-business lending platform' },

  // Editions & subscription tiers
  { a: 'EasyStart',        d: 'QuickBooks Online Simple Start (entry-level)' },
  { a: 'Essentials',       d: 'QuickBooks Online Essentials' },
  { a: 'Plus',             d: 'QuickBooks Online Plus (adds inventory, classes/locations, projects)' },
  { a: 'Advanced',         d: 'QuickBooks Online Advanced (adds custom roles, batch transactions, workflows, dedicated support)' },
  { a: 'Self-Employed',    d: 'QuickBooks Self-Employed (Schedule C / 1099 contractors)' },

  // Core accounting acronyms
  { a: 'A/R',       d: 'Accounts Receivable — money owed by customers' },
  { a: 'A/P',       d: 'Accounts Payable — money owed to vendors' },
  { a: 'GL',        d: 'General Ledger' },
  { a: 'COA',       d: 'Chart of Accounts' },
  { a: 'JE',        d: 'Journal Entry' },
  { a: 'P&L',       d: 'Profit and Loss statement (Income Statement)' },
  { a: 'B/S',       d: 'Balance Sheet' },
  { a: 'COGS',      d: 'Cost of Goods Sold' },
  { a: 'GAAP',      d: 'Generally Accepted Accounting Principles' },
  { a: 'IFRS',      d: 'International Financial Reporting Standards' },
  { a: 'YTD',       d: 'Year-to-Date' },
  { a: 'WIP',       d: 'Work In Progress' },
  { a: 'TB',        d: 'Trial Balance' },
  { a: 'PO',        d: 'Purchase Order' },

  // Methods & cycles
  { a: 'Accrual',   d: 'Accrual basis — income/expenses recorded when earned/incurred' },
  { a: 'Cash',      d: 'Cash basis — income/expenses recorded when money moves' },
  { a: 'FIFO',      d: 'First-In, First-Out (inventory valuation; QBO uses FIFO)' },
  { a: 'LIFO',      d: 'Last-In, First-Out (NOT supported by QBO)' },

  // Banking / Payments
  { a: 'ACH',       d: 'Automated Clearing House — electronic bank transfer' },
  { a: 'EFT',       d: 'Electronic Funds Transfer' },
  { a: 'NSF',       d: 'Non-Sufficient Funds (bounced check)' },
  { a: 'Bank feed', d: 'Real-time connection from a bank/credit-card account into QBO' },
  { a: 'WebConnect', d: 'Manual import format (.QBO file) for accounts without direct connect' },

  // Sales / Customer-facing
  { a: 'Estimate',  d: 'Quote / proposal (non-posting, can convert to invoice)' },
  { a: 'Invoice',   d: 'A/R transaction billed to a customer' },
  { a: 'Sales Receipt', d: 'Records sale + payment in one transaction (cash sale)' },
  { a: 'Credit Memo', d: 'Reduces A/R; can be applied to invoices or refunded' },
  { a: 'RA',        d: 'Refund Receipt — gives money back to a customer' },
  { a: 'Delayed Charge', d: 'Non-posting placeholder; converts to invoice later' },
  { a: 'NPO',       d: 'Non-posting transaction (Estimate, PO, Delayed Charge) — does not affect ledger' },

  // Vendors / A/P
  { a: 'Bill',      d: 'A/P transaction owed to a vendor (paid later)' },
  { a: 'Expense',   d: 'Direct expense paid at time of purchase' },
  { a: 'Check',     d: 'Bank-drawn check transaction' },
  { a: 'Vendor Credit', d: 'Reduces A/P; can offset future bills' },
  { a: 'Bill Payment', d: 'Pays one or more bills (writes a check or generates EFT)' },

  // Sales tax
  { a: 'AST',       d: 'Automated Sales Tax (current QBO sales-tax engine)' },
  { a: 'Nexus',     d: 'A business connection to a state that creates a sales-tax obligation' },
  { a: 'Resale Cert', d: 'Customer\'s tax-exempt resale certificate; marks invoices as exempt' },

  // Payroll
  { a: 'Core',      d: 'QuickBooks Payroll Core tier (basic full-service payroll)' },
  { a: 'Premium',   d: 'QuickBooks Payroll Premium tier (adds same-day direct deposit, HR support)' },
  { a: 'Elite',     d: 'QuickBooks Payroll Elite tier (adds tax-penalty protection, personal HR advisor)' },
  { a: 'W-2',       d: 'IRS form for employee wages (Wage and Tax Statement)' },
  { a: 'W-4',       d: 'Employee withholding allowance form (filled out at hire)' },
  { a: '1099-NEC',  d: 'Form for nonemployee compensation ≥ $600 to a contractor' },
  { a: '1099-MISC', d: 'Form for miscellaneous income (rents, royalties, etc.)' },
  { a: 'I-9',       d: 'Employment Eligibility Verification (USCIS form)' },
  { a: 'FUTA',      d: 'Federal Unemployment Tax Act (employer-only, 6% on first $7,000)' },
  { a: 'SUTA',      d: 'State Unemployment Tax Act (state-specific rate and wage base)' },
  { a: 'FICA',      d: 'Federal Insurance Contributions Act — Social Security + Medicare' },
  { a: 'OASDI',     d: 'Old-Age, Survivors, and Disability Insurance (Social Security portion of FICA, 6.2% to wage base)' },
  { a: 'HI',        d: 'Hospital Insurance (Medicare portion of FICA, 1.45%)' },

  // Inventory / Products
  { a: 'SKU',       d: 'Stock Keeping Unit (unique product identifier)' },
  { a: 'UOM',       d: 'Unit of Measure' },
  { a: 'Bundle',    d: 'A group of products sold together (NOT a manufactured assembly)' },

  // Reports / Reporting
  { a: 'A/R Aging', d: 'Report grouping unpaid A/R by 0–30, 31–60, 61–90, >90 days' },
  { a: 'A/P Aging', d: 'Report grouping unpaid A/P by aging buckets' },
  { a: 'TB',        d: 'Trial Balance — debit/credit totals by account' },
  { a: 'Stmt of Cash Flows', d: 'Operating, investing, and financing cash activity (indirect method in QBO)' },

  // Practice management & access
  { a: 'ProAdvisor', d: 'Intuit credential for accounting/bookkeeping professionals' },
  { a: 'Wholesale Discount', d: 'Discount applied when accountant manages billing for the client' },
  { a: 'Client Direct',      d: 'Client pays Intuit directly for the QBO subscription' },
  { a: 'My Accountant',      d: 'In-product portal where the client communicates with their ProAdvisor' },
  { a: 'Audit Log',          d: 'QBO log of every transaction add/edit/delete with user and timestamp' },
  { a: 'Bank Connect',       d: 'Direct connection between QBO and a financial institution' },

  // Compliance / Privacy
  { a: 'PCI DSS',  d: 'Payment Card Industry Data Security Standard (applies when processing card payments)' },
  { a: 'IRS Pub 15', d: 'Employer\'s Tax Guide (Circular E) — federal payroll tax tables' },
];
