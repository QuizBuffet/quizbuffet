// AWS Cloud Practitioner (CLF-C02) — every in-scope AWS service paired with a one-line purpose.
// Used by the Service Match drill on the cert page.
export const services = [
  // Analytics
  { a: 'Amazon Athena',          d: 'Query data in S3 with standard SQL — serverless' },
  { a: 'Amazon EMR',             d: 'Big data processing with Hadoop, Spark, Hive, and Presto' },
  { a: 'AWS Glue',               d: 'Serverless ETL service for discovering, cataloging, and transforming data' },
  { a: 'Amazon Kinesis',         d: 'Real-time streaming data ingestion and processing' },
  { a: 'Amazon OpenSearch Service', d: 'Managed search, log analytics, and observability with OpenSearch/Elasticsearch APIs' },
  { a: 'Amazon QuickSight',      d: 'Cloud-native business intelligence and dashboards' },
  { a: 'Amazon Redshift',        d: 'Petabyte-scale managed data warehouse' },

  // Application Integration
  { a: 'Amazon EventBridge',     d: 'Serverless event bus connecting AWS, SaaS, and custom apps' },
  { a: 'Amazon SNS',             d: 'Pub/sub messaging — push notifications to email, SMS, mobile, and SQS' },
  { a: 'Amazon SQS',             d: 'Fully managed message queues to decouple distributed components' },
  { a: 'AWS Step Functions',     d: 'Serverless workflow orchestration with visual state machines' },

  // Business Applications
  { a: 'Amazon Connect',         d: 'Cloud-based contact center for customer service' },
  { a: 'Amazon SES',             d: 'Scalable bulk and transactional email sending' },

  // Cloud Financial Management
  { a: 'AWS Budgets',            d: 'Set custom cost or usage budgets and alert on overruns' },
  { a: 'AWS Cost and Usage Reports', d: 'Most detailed cost data — granular line-item billing exports' },
  { a: 'AWS Cost Explorer',      d: 'Visualize and forecast AWS spend by service, account, or tag' },
  { a: 'AWS Marketplace',        d: 'Curated catalog of third-party software and SaaS purchasable through AWS billing' },

  // Compute
  { a: 'AWS Batch',              d: 'Run large-scale batch jobs without managing the underlying compute' },
  { a: 'Amazon EC2',             d: 'Resizable virtual servers in the cloud' },
  { a: 'AWS Elastic Beanstalk',  d: 'Deploy and run web apps on AWS without managing infrastructure (PaaS)' },
  { a: 'Amazon Lightsail',       d: 'Simple, predictable-priced virtual servers and databases for small projects' },
  { a: 'AWS Outposts',           d: 'Run AWS infrastructure on-premises in your own data center' },

  // Containers
  { a: 'Amazon ECR',             d: 'Managed Docker container image registry' },
  { a: 'Amazon ECS',             d: 'AWS-native container orchestration service' },
  { a: 'Amazon EKS',             d: 'Managed Kubernetes service' },

  // Customer Enablement
  { a: 'AWS Support',            d: 'Tiered customer support: Developer, Business, Enterprise On-Ramp, Enterprise' },

  // Database
  { a: 'Amazon Aurora',          d: 'High-performance MySQL- and PostgreSQL-compatible managed relational database' },
  { a: 'Amazon DocumentDB',      d: 'MongoDB-compatible managed document database' },
  { a: 'Amazon DynamoDB',        d: 'Managed NoSQL key-value and document database with single-digit-ms latency' },
  { a: 'Amazon ElastiCache',     d: 'Managed in-memory cache (Redis or Memcached)' },
  { a: 'Amazon Neptune',         d: 'Managed graph database for relationships and connected data' },
  { a: 'Amazon RDS',             d: 'Managed relational databases (MySQL, PostgreSQL, SQL Server, MariaDB, Oracle)' },

  // Developer Tools
  { a: 'AWS CLI',                d: 'Command-line tool for managing AWS services' },
  { a: 'AWS CodeBuild',          d: 'Managed build service for compiling, testing, and packaging code' },
  { a: 'AWS CodePipeline',       d: 'Fully managed CI/CD pipeline orchestration' },
  { a: 'AWS X-Ray',              d: 'Distributed tracing and analysis for applications' },

  // End User Computing
  { a: 'Amazon AppStream 2.0',   d: 'Stream desktop applications from the cloud to any device' },
  { a: 'Amazon WorkSpaces',      d: 'Managed virtual desktops (Desktop-as-a-Service)' },
  { a: 'Amazon WorkSpaces Secure Browser', d: 'Cloud-managed secure browser for accessing internal sites and SaaS' },

  // Frontend Web and Mobile
  { a: 'AWS Amplify',            d: 'Build and deploy full-stack web and mobile apps' },
  { a: 'AWS AppSync',            d: 'Managed GraphQL API service' },

  // IoT
  { a: 'AWS IoT Core',           d: 'Connect, manage, and ingest data from IoT devices at scale' },

  // Machine Learning
  { a: 'Amazon Comprehend',      d: 'Natural-language processing — extract sentiment, entities, key phrases' },
  { a: 'Amazon Kendra',          d: 'Intelligent enterprise search powered by ML' },
  { a: 'Amazon Lex',             d: 'Build conversational chatbots and voice interfaces' },
  { a: 'Amazon Polly',           d: 'Text-to-speech with lifelike voices' },
  { a: 'Amazon Q',               d: 'Generative-AI assistant for business and developers' },
  { a: 'Amazon Rekognition',     d: 'Image and video analysis — face detection, labels, content moderation' },
  { a: 'Amazon SageMaker AI',    d: 'End-to-end platform to build, train, and deploy ML models' },
  { a: 'Amazon Textract',        d: 'Extract text, forms, and tables from scanned documents' },
  { a: 'Amazon Transcribe',      d: 'Automatic speech-to-text transcription' },
  { a: 'Amazon Translate',       d: 'Neural machine translation between languages' },

  // Management and Governance
  { a: 'AWS Auto Scaling',       d: 'Automatically scale resources up and down to match demand' },
  { a: 'AWS CloudFormation',     d: 'Infrastructure-as-code — provision AWS resources from templates' },
  { a: 'AWS CloudTrail',         d: 'Audit log of all API calls and account activity' },
  { a: 'Amazon CloudWatch',      d: 'Monitoring, metrics, logs, and alarms across AWS resources' },
  { a: 'AWS Compute Optimizer',  d: 'Recommend optimal AWS resource sizes based on workload patterns' },
  { a: 'AWS Config',             d: 'Track configuration changes and compliance of AWS resources' },
  { a: 'AWS Control Tower',      d: 'Set up and govern a secure, multi-account AWS environment' },
  { a: 'AWS Health Dashboard',   d: 'Personalized view of AWS service health and account events' },
  { a: 'AWS License Manager',    d: 'Manage software licenses across AWS and on-premises' },
  { a: 'AWS Management Console', d: 'Web-based UI for managing AWS services' },
  { a: 'AWS Organizations',      d: 'Centrally manage and govern multiple AWS accounts with consolidated billing' },
  { a: 'AWS Service Catalog',    d: 'Curate and distribute approved IT services for use within the org' },
  { a: 'Service Quotas',         d: 'View and manage AWS service limits/quotas centrally' },
  { a: 'AWS Systems Manager',    d: 'Operational hub — patch, automate, and configure AWS and on-prem resources' },
  { a: 'AWS Trusted Advisor',    d: 'Best-practice checks for cost, performance, security, fault tolerance, service limits' },
  { a: 'AWS Well-Architected Tool', d: 'Self-assessment against the AWS Well-Architected Framework pillars' },

  // Migration and Transfer
  { a: 'AWS Application Discovery Service', d: 'Discover on-premises servers and dependencies for migration planning' },
  { a: 'AWS Application Migration Service', d: 'Lift-and-shift migrate servers to AWS with minimal downtime' },
  { a: 'AWS DMS',                d: 'Database Migration Service — migrate databases to AWS with minimal downtime' },
  { a: 'Migration Evaluator',    d: 'Build a data-driven business case for AWS migration' },
  { a: 'AWS Migration Hub',      d: 'Single place to track progress of application migrations across AWS tools' },
  { a: 'AWS SCT',                d: 'Schema Conversion Tool — convert database schemas between engines' },
  { a: 'AWS Snow Family',        d: 'Physical devices for moving large amounts of data into and out of AWS' },

  // Networking and Content Delivery
  { a: 'Amazon API Gateway',     d: 'Create, publish, and manage REST, HTTP, and WebSocket APIs' },
  { a: 'Amazon CloudFront',      d: 'Global content delivery network (CDN)' },
  { a: 'AWS Direct Connect',     d: 'Dedicated private network connection from on-premises to AWS' },
  { a: 'AWS Global Accelerator', d: 'Improve global app performance using the AWS backbone with static anycast IPs' },
  { a: 'AWS PrivateLink',        d: 'Private connectivity to AWS services and SaaS without traversing the public internet' },
  { a: 'Amazon Route 53',        d: 'Scalable DNS and domain registration service' },
  { a: 'AWS Transit Gateway',    d: 'Hub that connects VPCs and on-premises networks through a single gateway' },
  { a: 'Amazon VPC',             d: 'Logically isolated virtual network inside AWS' },
  { a: 'AWS Site-to-Site VPN',   d: 'Encrypted IPsec tunnels between on-premises and AWS' },
  { a: 'AWS Client VPN',         d: 'Managed remote-access VPN for individual users' },

  // Security, Identity, and Compliance
  { a: 'AWS Artifact',           d: 'On-demand access to AWS compliance reports (SOC, ISO, PCI, etc.)' },
  { a: 'AWS Audit Manager',      d: 'Continuously audit AWS usage against compliance frameworks' },
  { a: 'AWS Certificate Manager', d: 'Provision, manage, and deploy SSL/TLS certificates' },
  { a: 'AWS CloudHSM',           d: 'Dedicated single-tenant hardware security modules in the cloud' },
  { a: 'Amazon Cognito',         d: 'User sign-up, sign-in, and identity for web and mobile apps' },
  { a: 'Amazon Detective',       d: 'Investigate and analyze security findings using ML and graph analysis' },
  { a: 'AWS Directory Service',  d: 'Managed Microsoft Active Directory in the cloud' },
  { a: 'AWS Firewall Manager',   d: 'Centrally configure and manage firewall rules across accounts' },
  { a: 'Amazon GuardDuty',       d: 'Threat detection — continuously monitors for malicious activity' },
  { a: 'AWS IAM',                d: 'Identity and Access Management — users, groups, roles, and permissions' },
  { a: 'AWS IAM Identity Center', d: 'Single sign-on (SSO) and central permission management across AWS accounts' },
  { a: 'Amazon Inspector',       d: 'Automated vulnerability scanning for EC2, ECR, and Lambda' },
  { a: 'AWS KMS',                d: 'Create and manage cryptographic keys used to encrypt data' },
  { a: 'Amazon Macie',           d: 'Discover and protect sensitive data (e.g., PII) in S3 using ML' },
  { a: 'AWS RAM',                d: 'Resource Access Manager — share AWS resources across accounts' },
  { a: 'AWS Secrets Manager',    d: 'Store, rotate, and retrieve secrets like database credentials and API keys' },
  { a: 'AWS Security Hub',       d: 'Single dashboard aggregating security alerts and compliance status' },
  { a: 'AWS Shield',             d: 'DDoS protection — Standard is free; Advanced adds higher-tier mitigation' },
  { a: 'AWS WAF',                d: 'Web Application Firewall — protect web apps from common exploits' },

  // Serverless
  { a: 'AWS Fargate',            d: 'Serverless compute engine for containers (ECS/EKS)' },
  { a: 'AWS Lambda',             d: 'Run code without provisioning or managing servers (FaaS)' },

  // Storage
  { a: 'AWS Backup',             d: 'Centralize and automate backups across AWS services' },
  { a: 'Amazon EBS',             d: 'Persistent block storage volumes for EC2 instances' },
  { a: 'Amazon EFS',             d: 'Managed elastic NFS file system for Linux workloads' },
  { a: 'AWS Elastic Disaster Recovery', d: 'Disaster-recovery service for replicating servers to AWS' },
  { a: 'Amazon FSx',             d: 'Managed file systems (Windows, Lustre, NetApp ONTAP, OpenZFS)' },
  { a: 'Amazon S3',              d: 'Object storage with virtually unlimited capacity and 11 nines durability' },
  { a: 'Amazon S3 Glacier',      d: 'Low-cost archival object storage for long-term retention' },
  { a: 'AWS Storage Gateway',    d: 'Hybrid cloud storage — give on-prem apps access to AWS storage' },
];
