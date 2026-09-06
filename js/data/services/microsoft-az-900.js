// Microsoft Azure Fundamentals (AZ-900): in-scope services and core concepts.
export const services = [
  // Cloud concepts
  { a: 'Public cloud',                d: 'Shared resources delivered over the internet by a cloud provider' },
  { a: 'Private cloud',               d: 'Cloud infrastructure operated solely for a single organization' },
  { a: 'Hybrid cloud',                d: 'Combination of public and private cloud with orchestrated workloads' },
  { a: 'IaaS',                        d: 'Infrastructure as a Service: VMs, networks, storage' },
  { a: 'PaaS',                        d: 'Platform as a Service: managed runtimes and services' },
  { a: 'SaaS',                        d: 'Software as a Service: fully managed applications' },
  { a: 'Shared responsibility model', d: 'Customer vs cloud provider responsibility split for security and operations' },
  { a: 'Consumption-based pricing',   d: 'Pay only for resources you use, with no upfront capital cost' },
  { a: 'Capital vs operating expenditure', d: 'CapEx (upfront purchase) vs OpEx (ongoing pay-as-you-go) cost models' },
  { a: 'High availability',           d: 'System designed to remain operational despite component failures' },
  { a: 'Scalability',                 d: 'Ability to add capacity (scale up) or instances (scale out) as load grows' },
  { a: 'Elasticity',                  d: 'Automatic scaling up and down to match demand' },
  { a: 'Reliability',                 d: 'System ability to recover from failures and continue functioning' },
  { a: 'Disaster recovery',           d: 'Strategy and tooling to restore service after a major outage' },

  // Azure architecture
  { a: 'Azure region',                d: 'Geographic area containing one or more datacenters' },
  { a: 'Azure region pair',           d: 'Two regions paired in the same geography for resilience' },
  { a: 'Sovereign region',            d: 'Region designed for government or regulated workloads (e.g., Azure Government)' },
  { a: 'Availability Zone',           d: 'Physically separate datacenter within a region' },
  { a: 'Datacenter',                  d: 'Physical facility hosting Azure infrastructure' },
  { a: 'Azure Resource Manager (ARM)', d: 'Deployment and management layer for Azure resources' },
  { a: 'ARM template',                d: 'JSON template for declarative resource deployment' },
  { a: 'Bicep',                       d: 'Domain-specific language for declarative Azure deployment (transpiles to ARM)' },
  { a: 'Resource group',              d: 'Logical container for Azure resources sharing lifecycle and policies' },
  { a: 'Subscription',                d: 'Billing and access boundary in Azure containing resource groups' },
  { a: 'Management group',            d: 'Container above subscriptions for org-wide policy and access' },

  // Compute
  { a: 'Azure Virtual Machines',      d: 'IaaS Windows or Linux VMs in Azure' },
  { a: 'VM Scale Sets',               d: 'Identical, load-balanced VMs that scale automatically' },
  { a: 'Azure Container Instances',   d: 'Run containers without managing servers (single container or pods)' },
  { a: 'Azure Container Apps',        d: 'Serverless container app platform with built-in scale-to-zero' },
  { a: 'Azure Kubernetes Service',    d: 'Managed Kubernetes for container orchestration' },
  { a: 'Azure Functions',             d: 'Serverless event-driven compute, billed per execution' },
  { a: 'Azure App Service',           d: 'Managed PaaS for hosting web apps, APIs, and mobile backends' },
  { a: 'Azure Virtual Desktop',       d: 'Cloud-hosted Windows desktops and apps for remote workforces' },

  // Networking
  { a: 'Azure Virtual Network (VNet)', d: 'Private network in Azure with subnets, routing, and security' },
  { a: 'Subnet',                      d: 'IP range within a VNet for grouping resources' },
  { a: 'VNet peering',                d: 'Private connection between two VNets' },
  { a: 'Network Security Group',      d: 'Allow/deny rules on subnet or NIC level' },
  { a: 'Azure VPN Gateway',           d: 'Site-to-site or point-to-site IPsec VPN to Azure' },
  { a: 'Azure ExpressRoute',          d: 'Private dedicated connection from on-premises to Azure' },
  { a: 'Azure DNS',                   d: 'Hosting service for DNS domains in Azure' },
  { a: 'Azure Load Balancer',         d: 'Layer 4 TCP/UDP load balancer for VMs' },
  { a: 'Azure Application Gateway',   d: 'Layer 7 load balancer with WAF capabilities' },
  { a: 'Azure Front Door',            d: 'Global, scalable entry point with CDN, WAF, and routing' },
  { a: 'Azure CDN',                   d: 'Content Delivery Network for static content acceleration' },

  // Storage
  { a: 'Azure Blob Storage',          d: 'Object storage for unstructured data: Hot, Cool, Cold, Archive tiers' },
  { a: 'Blob storage tiers',          d: 'Hot (frequent), Cool (30-day), Cold (90-day), Archive (180+ day) access tiers' },
  { a: 'Azure Files',                 d: 'Managed SMB and NFS file shares in the cloud' },
  { a: 'Azure Disk Storage',          d: 'Managed disks attached to Azure VMs (SSD/HDD options)' },
  { a: 'Azure Queue Storage',         d: 'Simple message queue for async communication' },
  { a: 'Azure Table Storage',         d: 'NoSQL key-value store for structured non-relational data' },
  { a: 'Storage account redundancy',  d: 'LRS, ZRS, GRS, GZRS: locally to geo-redundant replication' },
  { a: 'AzCopy',                      d: 'CLI tool for high-throughput data transfer to and from Azure Storage' },
  { a: 'Azure Storage Explorer',      d: 'Free GUI for managing Azure Storage resources' },
  { a: 'Azure Migrate',               d: 'Hub for assessing and migrating servers, databases, apps, and data to Azure' },
  { a: 'Azure Data Box',              d: 'Physical appliances for offline bulk data transfer to Azure' },

  // Databases
  { a: 'Azure SQL Database',          d: 'Managed PaaS SQL Server-compatible database' },
  { a: 'Azure SQL Managed Instance',  d: 'Near-100% SQL Server compatibility with managed infrastructure' },
  { a: 'SQL Server on Azure VM',      d: 'IaaS SQL Server with full OS and engine control' },
  { a: 'Azure Cosmos DB',             d: 'Globally distributed multi-model NoSQL database' },
  { a: 'Azure Database for MySQL',    d: 'Managed MySQL service' },
  { a: 'Azure Database for PostgreSQL', d: 'Managed PostgreSQL service' },

  // Identity, governance, security
  { a: 'Microsoft Entra ID',          d: 'Cloud-based identity and access management (formerly Azure AD)' },
  { a: 'Microsoft Entra Connect',     d: 'Syncs on-premises Active Directory to Microsoft Entra ID' },
  { a: 'Multi-factor authentication', d: 'Requires multiple proofs (password + phone, biometric, etc.) for sign-in' },
  { a: 'Conditional Access',          d: 'Policies that grant or block access based on signals (location, device, risk)' },
  { a: 'Single sign-on',              d: 'One sign-in for multiple applications' },
  { a: 'Privileged Identity Management', d: 'Just-in-time, time-bound activation of privileged roles' },
  { a: 'Azure RBAC',                  d: 'Role-based access control for Azure resources' },
  { a: 'Built-in role',               d: 'Pre-defined Azure RBAC role (Owner, Contributor, Reader, etc.)' },
  { a: 'Custom role',                 d: 'Customer-defined Azure RBAC role with specific permissions' },
  { a: 'Azure Policy',                d: 'Define and enforce rules on Azure resources for compliance' },
  { a: 'Resource lock',               d: 'Prevents accidental delete or modify on critical resources (CanNotDelete, ReadOnly)' },
  { a: 'Tag',                         d: 'Key-value metadata attached to resources for organization and billing' },
  { a: 'Azure Blueprints',            d: 'Package of artifacts (policies, RBAC, templates) for repeatable governance' },

  // Security
  { a: 'Microsoft Defender for Cloud', d: 'Cloud security posture management and threat protection' },
  { a: 'Microsoft Sentinel',          d: 'Cloud-native SIEM and SOAR for security analytics' },
  { a: 'Azure Key Vault',             d: 'Managed secrets, keys, and certificate storage' },
  { a: 'Azure DDoS Protection',       d: 'Distributed denial-of-service mitigation for Azure resources' },
  { a: 'Azure Firewall',              d: 'Managed cloud-based network firewall service' },

  // Monitoring and management
  { a: 'Azure Monitor',               d: 'Unified monitoring for metrics, logs, alerts across Azure' },
  { a: 'Azure Service Health',        d: 'Personalized service-incident and maintenance notifications' },
  { a: 'Azure Advisor',               d: 'Personalized best-practice recommendations across cost, security, performance' },
  { a: 'Log Analytics',               d: 'Workspace and KQL query engine for log data in Azure Monitor' },
  { a: 'Application Insights',        d: 'APM for live applications: performance, exceptions, dependencies' },
  { a: 'Azure portal',                d: 'Web-based unified console for managing Azure resources' },
  { a: 'Azure CLI',                   d: 'Cross-platform command-line interface for Azure' },
  { a: 'Azure PowerShell',            d: 'PowerShell modules for managing Azure resources' },
  { a: 'Cloud Shell',                 d: 'Browser-based shell pre-configured with Azure CLI and PowerShell' },
  { a: 'Azure mobile app',            d: 'iOS/Android app for monitoring Azure resources on the go' },

  // Cost management
  { a: 'Azure Pricing Calculator',    d: 'Estimate costs for planned Azure deployments' },
  { a: 'TCO Calculator',              d: 'Total Cost of Ownership comparison for on-prem vs Azure' },
  { a: 'Microsoft Cost Management',   d: 'Cost analysis, budgets, and recommendations for Azure spend' },
  { a: 'Azure Reservations',          d: '1-year or 3-year capacity commitments for VM, SQL, etc. at a discount' },
  { a: 'Azure Hybrid Benefit',        d: 'Use existing Windows Server or SQL licenses to reduce Azure cost' },
  { a: 'Spot Virtual Machines',       d: 'Discounted VMs that can be evicted when Azure needs the capacity' },
  { a: 'Azure free account',          d: 'Time-limited free credits and 12 months of selected free services' },

  // Compliance and trust
  { a: 'Microsoft Privacy Statement', d: 'Microsoft public statement on collection and use of customer data' },
  { a: 'Microsoft Trust Center',      d: 'Hub for compliance, security, privacy, and transparency information' },
  { a: 'Service Trust Portal',        d: 'Audit reports, attestations, and compliance documentation' },
  { a: 'Azure compliance documentation', d: 'Per-service compliance certifications (ISO, SOC, HIPAA, GDPR, etc.)' },

  // Support
  { a: 'Service Level Agreement',     d: 'Microsoft-published uptime and performance commitment per service' },
  { a: 'Composite SLA',               d: 'Combined SLA across dependent services in an architecture' },
  { a: 'Azure support plans',         d: 'Basic (free), Developer, Standard, Professional Direct support tiers' },
  { a: 'Azure Knowledge Center',      d: 'Community Q&A and Microsoft-supported answers' },
  { a: 'Microsoft Q&A',               d: 'Community technical Q&A site for Microsoft technologies' },
];
