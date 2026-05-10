// QuickBooks ProAdvisor (Online Certification) — in-scope concepts and definitions
// across the 9 study domains. Anchored on the QBO ProAdvisor certification training,
// QuickBooks Online Accountant workflows, and Intuit's documented best practices.
export const services = [
  // ── Domain 1: Client Onboarding and Setup
  { a: 'Subscription tier selection', d: 'Match the client to Simple Start (single user, no inventory), Essentials (3 users + bills), Plus (5 users + inventory + classes/locations), or Advanced (25 users + workflows + custom roles)' },
  { a: 'Company setup wizard',        d: 'Initial preferences: legal name, EIN, fiscal year, accounting method (cash vs accrual), industry, currency, address' },
  { a: 'Chart of accounts setup',     d: 'Use industry-default COA at setup or import from CSV; classify accounts by type (Bank, A/R, A/P, Income, Expense, Equity, etc.) and detail type' },
  { a: 'Opening balances',            d: 'Enter as journal entry to Opening Balance Equity at conversion date; reconcile and zero out OBE before closing' },
  { a: 'Customer & vendor lists',     d: 'Import via CSV or batch entry; required fields: name, email; optional: payment terms, tax-exempt status, default income account' },
  { a: 'Products and services list',  d: 'Three types — Service (no inventory), Non-inventory (track but no qty), Inventory (Plus/Advanced only, FIFO valuation)' },
  { a: 'User permissions',            d: 'QBO user types: Standard (full or limited), Company admin, Reports-only, Time-tracking-only; Advanced adds custom roles' },
  { a: 'Apps & integrations',         d: 'Connect via Intuit App Store (apps.intuit.com); common: Bill.com, Hubdoc, ApprovalMax, Fathom, Method:CRM' },
  { a: 'Year-end close (closing date + password)', d: 'Settings → Advanced → Close the books; sets the closing date and optional password preventing edits to prior periods' },

  // ── Domain 2: Banking and Bank Feeds
  { a: 'Bank feed connection',        d: 'Direct connection: Banking → Link account; ongoing sync of cleared transactions; review on the Banking center "For Review" tab' },
  { a: 'Manual upload (.QBO / .CSV / .QFX)', d: 'For institutions without direct connect; upload file via Banking → File upload' },
  { a: 'Transaction matching',        d: 'QBO suggests matches between bank-feed entries and existing transactions (sales receipts, payments, expenses, deposits) based on amount and date' },
  { a: 'Bank rules',                  d: 'Auto-categorize repeating transactions: conditions (description/amount) → action (set account, payee, class, tag); can auto-add or hold for review' },
  { a: 'Undeposited Funds workflow',  d: 'Customer payments accumulate in Undeposited Funds; "Bank Deposit" groups them into one bank entry that matches the deposit on the bank feed' },
  { a: 'Bank reconciliation',         d: 'Settings → Reconcile; match QBO transactions to bank statement; ending balance must match; differences flagged in reconciliation report' },
  { a: 'Excluding transactions',      d: 'For duplicate or non-business items in bank feed; excluded transactions are NOT posted to the books' },
  { a: 'Transfers between accounts',  d: 'Use Transfer transaction (single entry) instead of two separate deposits/expenses to avoid duplication' },

  // ── Domain 3: Sales, Customers, and Accounts Receivable
  { a: 'Invoice workflow',            d: 'Create invoice → email/print to customer → receive payment (matches A/R) → deposit; payment posted to Undeposited Funds by default' },
  { a: 'Sales receipt vs invoice',    d: 'Sales receipt = sale + payment in one step (cash sale, no A/R); invoice = bill now, collect later (creates A/R)' },
  { a: 'Receive Payment',             d: 'Applies a customer payment to one or more open invoices; reduces A/R; payment lands in Undeposited Funds or directly in bank' },
  { a: 'Credit memo and refund receipt', d: 'Credit memo reduces A/R (apply to future invoices); refund receipt actually returns funds to customer (reduces bank/UF)' },
  { a: 'Delayed charge / delayed credit', d: 'Non-posting placeholder transactions; converted to invoices when ready to bill' },
  { a: 'Estimate (quote)',            d: 'Non-posting; can be partially or fully converted to invoice; useful for tracking pipeline' },
  { a: 'Progress invoicing',          d: 'Plus/Advanced; bill from an estimate in stages (% or fixed amount per draw); supports construction and consulting workflows' },
  { a: 'Customer statements',         d: 'Three types: Balance Forward, Open Item, Transaction Statement; emailed/printed to remind customers of A/R balance' },
  { a: 'Late fees',                   d: 'Settings → Sales → Late fees; auto-applies % or flat fee to overdue invoices' },
  { a: 'Sales receipts and tips',     d: 'Track tips by adding "Tips" item to sales form; sales receipts can be exported to deposit-grouping report' },
  { a: 'A/R Aging report',            d: 'Groups unpaid invoices into 0–30, 31–60, 61–90, >90 day buckets; key for collections workflow' },

  // ── Domain 4: Vendors, Expenses, and Accounts Payable
  { a: 'Bill vs Expense vs Check',    d: 'Bill = A/P (pay later); Expense = paid now (credit/debit card); Check = bank-drawn payment (printed/handwritten)' },
  { a: 'Bill payment workflow',       d: 'Enter bill (A/P) → Pay Bills → select bills + payment method (check/EFT) → records bill payment that clears A/P' },
  { a: 'Vendor credit',               d: 'Reduces A/P; can be applied against future bills via Pay Bills screen' },
  { a: 'Recurring transactions',      d: 'Settings → Recurring transactions; types: Scheduled (auto-create), Reminder, Unscheduled; saves time on rent, subscriptions' },
  { a: 'Expense receipts',            d: 'QBO mobile app or email-to-receipts inbox; receipts attach to transactions; some plans use AI to auto-create expense from photo' },
  { a: 'Vendor 1099 setup',           d: 'Mark vendor "Track for 1099"; enter Tax ID; Pay vendor from a tracked expense account; year-end 1099 wizard files NEC/MISC' },
  { a: 'Purchase orders (Plus/Advanced)', d: 'Non-posting; convert to bill when items received; tracks open POs and supports inventory ordering' },
  { a: 'Tags vs Classes vs Locations', d: 'Tags = ad-hoc cross-cutting labels; Classes = department/program tracking (Plus); Locations = geographic/branch (Plus)' },
  { a: 'A/P Aging report',            d: 'Groups unpaid bills by aging buckets; key for cash-flow planning' },

  // ── Domain 5: Sales Tax
  { a: 'Automated Sales Tax (AST)',   d: 'Current QBO sales-tax engine; uses customer ship-to address + product tax category to compute correct rate' },
  { a: 'Sales-tax setup',             d: 'Settings → Taxes → Sales tax; enter business address; QBO determines initial nexus from there' },
  { a: 'Tax categories',              d: 'Assigned to products/services; controls taxability per state (e.g., software-as-a-service is taxable in some states, not others)' },
  { a: 'Tax-exempt customers',        d: 'Customer record → Tax info → mark exempt + reason; future invoices skip tax automatically' },
  { a: 'Sales-tax reporting & filing', d: 'Taxes → Sales tax → "Returns due"; QBO generates a summary; some states integrate filing through partners' },
  { a: 'Adjustments',                 d: 'Sales-tax adjustment to record overpayments, underpayments, discounts for early filing; affects sales-tax liability and the offset account chosen' },

  // ── Domain 6: Payroll
  { a: 'Payroll subscription tiers',  d: 'Core, Premium, Elite — differ in direct-deposit speed, HR support, tax-penalty protection, time-tracking inclusion' },
  { a: 'Employee setup',              d: 'Personal info, federal/state withholdings (W-4), pay schedule, pay rate (hourly/salary), deductions, direct deposit info' },
  { a: 'Pay schedules',               d: 'Weekly, bi-weekly (most common), semi-monthly, monthly; influences pay-period dates and tax-deposit cadence' },
  { a: 'Direct deposit',              d: 'Funds withdrawn from bank, deposited to employees on pay date; Core = next-day, Premium/Elite = same-day' },
  { a: 'Payroll taxes (employer side)', d: 'FICA matching (6.2% SS up to wage base + 1.45% Medicare), FUTA (6% on first $7,000, often 0.6% net of state credit), SUTA' },
  { a: 'Payroll taxes (employee side)', d: 'Federal income tax (withheld per W-4), state income tax, FICA (6.2% SS + 1.45% Medicare), additional Medicare 0.9% > $200k' },
  { a: 'W-2 / 1099 year-end',         d: 'QBO Payroll auto-prepares W-2s for employees and 1099-NEC for contractors who exceeded $600' },
  { a: 'Workers\' compensation',      d: 'Pay-as-you-go option through Intuit partners; integrates with payroll to compute premium per pay run' },

  // ── Domain 7: Reports and Insights
  { a: 'P&L (Profit & Loss)',         d: 'Income − Expenses for a date range; default is YTD; cash vs accrual toggle; group by Class/Location/Tag' },
  { a: 'Balance Sheet',               d: 'Assets = Liabilities + Equity at a point in time; verifies accounting equation' },
  { a: 'Statement of Cash Flows',     d: 'Indirect method in QBO; reconciles net income to cash; sections: Operating, Investing, Financing' },
  { a: 'Customer reports',            d: 'A/R Aging, Open Invoices, Customer Balance Detail, Sales by Customer Summary' },
  { a: 'Vendor reports',              d: 'A/P Aging, Unpaid Bills, Vendor Balance Detail, Purchases by Vendor' },
  { a: 'Customizing & memorizing',    d: 'Customize columns, filters, date ranges; "Save customization" creates a saved report; share with team via group access' },
  { a: 'Management reports',          d: 'Branded packets combining cover letter + multiple reports; customize for client deliverables' },
  { a: 'Performance Center (Advanced)', d: 'Real-time dashboard widgets pulling KPIs from data; replaces traditional report navigation' },

  // ── Domain 8: Inventory and Products
  { a: 'Inventory item creation (Plus/Advanced)', d: 'Track quantity-on-hand, reorder point, sales price, cost; QBO uses FIFO valuation' },
  { a: 'COGS workflow',               d: 'When inventory item sold, QBO debits COGS (FIFO cost layer) and credits Inventory Asset; income recognized on the sales side' },
  { a: 'Inventory adjustment',        d: 'Use "Inventory Quantity Adjustment" for shrinkage, damage, count differences; adjustment posts to Inventory Asset and an offset (typically Cost of Goods Sold or Inventory Adjustment)' },
  { a: 'Reorder points',              d: 'Set per item; flagged on the Products & Services list with a low-inventory warning' },
  { a: 'Bundle (group of items)',     d: 'Sells multiple items together at a single line item; NOT a manufactured assembly — components are shipped/billed individually under the bundle' },
  { a: 'Non-inventory product',       d: 'Tracked in P&L but no quantity; useful for items the business doesn\'t want to track on hand' },
  { a: 'Service item',                d: 'Time/expertise sold; default income account; no cost tracking' },

  // ── Domain 9: Practice Management and ProAdvisor Tools
  { a: 'QuickBooks Online Accountant (QBOA)', d: 'Free firm portal; lists all client companies; one click to switch into client books; firm-side users distinct from client users' },
  { a: 'Wholesale billing',           d: 'ProAdvisor pays Intuit and bills client a discount; alternative to client-direct billing' },
  { a: 'My Accountant tab (client side)', d: 'In-product communication channel; clients can request and submit documents; ProAdvisor sees activity in QBOA' },
  { a: 'Practice Management',         d: 'Project tracking, document requests, recurring tasks, firm dashboard within QBOA' },
  { a: 'Accountant tools',            d: 'Reclassify transactions, write off invoices, journal entries, period-close review, undo reconciliation, books review' },
  { a: 'Reclassify transactions',     d: 'Bulk-reassign account/class/location on multiple transactions in one workflow' },
  { a: 'Books review',                d: 'Accountant tools → Books review; structured month-end close checklist with transaction review and report generation' },
  { a: 'Audit Log',                   d: 'Records every add/edit/delete with user, timestamp, transaction details; cannot be turned off; useful for forensic review' },
  { a: 'ProAdvisor certification recertification', d: 'Annual recertification required to maintain status; new exam each year covering product updates' },
  { a: 'ProAdvisor benefits',         d: 'Free QBOA + payroll, certification training, Find-a-ProAdvisor listing, marketing toolkit, premium support, learning library' },
];
