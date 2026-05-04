// AWS Solutions Architect Associate (SAA-C03) — every in-scope AWS service paired with a one-line purpose.
// Used by the Service Match drill on the cert page.
export const services = [
  // Analytics
  { a: 'Amazon Athena',          d: 'Query data in S3 with standard SQL — serverless' },
  { a: 'AWS Data Exchange',      d: 'Find and subscribe to third-party data products in AWS' },
  { a: 'Amazon Data Firehose',   d: 'Reliably load streaming data into data lakes, warehouses, and analytics services' },
  { a: 'Amazon EMR',             d: 'Big data processing with Hadoop, Spark, Hive, and Presto' },
  { a: 'AWS Glue',               d: 'Serverless ETL — discover, catalog, and transform data' },
  { a: 'Amazon Kinesis',         d: 'Real-time streaming data ingestion and processing' },
  { a: 'AWS Lake Formation',     d: 'Build, secure, and manage data lakes on S3' },
  { a: 'Amazon MSK',             d: 'Managed Streaming for Apache Kafka' },
  { a: 'Amazon OpenSearch Service', d: 'Managed search, log analytics, and observability with OpenSearch APIs' },
  { a: 'Amazon QuickSuite',      d: 'Cloud-native business intelligence and dashboards' },
  { a: 'Amazon Redshift',        d: 'Petabyte-scale managed data warehouse' },

  // Application Integration
  { a: 'Amazon AppFlow',         d: 'Transfer data between SaaS apps (Salesforce, ServiceNow, etc.) and AWS' },
  { a: 'AWS AppSync',            d: 'Managed GraphQL API service' },
  { a: 'Amazon EventBridge',     d: 'Serverless event bus connecting AWS, SaaS, and custom apps' },
  { a: 'Amazon MQ',              d: 'Managed message broker for ActiveMQ and RabbitMQ' },
  { a: 'Amazon SNS',             d: 'Pub/sub messaging — push notifications to email, SMS, mobile, SQS, Lambda' },
  { a: 'Amazon SQS',             d: 'Fully managed message queues to decouple distributed components' },
  { a: 'AWS Step Functions',     d: 'Serverless workflow orchestration with visual state machines' },

  // AWS Cost Management
  { a: 'AWS Budgets',            d: 'Set custom cost or usage budgets and alert on overruns' },
  { a: 'AWS Cost and Usage Report', d: 'Most detailed cost data — granular line-item billing exports' },
  { a: 'AWS Cost Explorer',      d: 'Visualize and forecast AWS spend by service, account, or tag' },
  { a: 'Savings Plans',          d: 'Flexible commitment-based discount on EC2, Fargate, and Lambda' },

  // Compute
  { a: 'AWS Batch',              d: 'Run large-scale batch jobs without managing the underlying compute' },
  { a: 'Amazon EC2',             d: 'Resizable virtual servers in the cloud' },
  { a: 'Amazon EC2 Auto Scaling', d: 'Automatically scale EC2 instance counts based on demand or schedule' },
  { a: 'AWS Elastic Beanstalk',  d: 'Deploy and run web apps on AWS without managing infrastructure (PaaS)' },
  { a: 'AWS Outposts',           d: 'Run AWS infrastructure on-premises in your own data center' },
  { a: 'AWS Serverless Application Repository', d: 'Find and deploy ready-made serverless applications' },
  { a: 'VMware Cloud on AWS',    d: 'Run VMware workloads natively on AWS infrastructure' },
  { a: 'AWS Wavelength',         d: 'AWS infrastructure embedded in 5G networks for ultra-low-latency mobile/edge' },

  // Containers
  { a: 'Amazon ECR',             d: 'Managed Docker container image registry' },
  { a: 'Amazon ECS',             d: 'AWS-native container orchestration service' },
  { a: 'Amazon ECS Anywhere',    d: 'Run ECS tasks on your own on-premises hardware' },
  { a: 'Amazon EKS',             d: 'Managed Kubernetes service' },
  { a: 'Amazon EKS Anywhere',    d: 'Run EKS-compatible Kubernetes on your own on-prem infrastructure' },
  { a: 'Amazon EKS Distro',      d: 'Same Kubernetes distribution AWS uses for EKS, packaged for self-management' },

  // Database
  { a: 'Amazon Aurora',          d: 'High-performance MySQL- and PostgreSQL-compatible managed database' },
  { a: 'Amazon Aurora Serverless', d: 'Auto-scaling on-demand Aurora that scales to zero when idle' },
  { a: 'Amazon DocumentDB',      d: 'MongoDB-compatible managed document database' },
  { a: 'Amazon DynamoDB',        d: 'Managed NoSQL key-value and document database with single-digit-ms latency' },
  { a: 'Amazon ElastiCache',     d: 'Managed in-memory cache (Redis or Memcached)' },
  { a: 'Amazon Keyspaces',       d: 'Managed Apache Cassandra-compatible database' },
  { a: 'Amazon Neptune',         d: 'Managed graph database for relationships and connected data' },
  { a: 'Amazon RDS',             d: 'Managed relational databases (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server)' },

  // Developer Tools
  { a: 'AWS X-Ray',              d: 'Distributed tracing and analysis for applications' },

  // Front-End Web and Mobile
  { a: 'AWS Amplify',            d: 'Build and deploy full-stack web and mobile apps' },
  { a: 'Amazon API Gateway',     d: 'Create, publish, and manage REST, HTTP, and WebSocket APIs' },
  { a: 'AWS Device Farm',        d: 'Test mobile and web apps against real devices in the cloud' },

  // Machine Learning
  { a: 'Amazon Comprehend',      d: 'Natural-language processing — sentiment, entities, key phrases' },
  { a: 'Amazon Kendra',          d: 'Intelligent enterprise search powered by ML' },
  { a: 'Amazon Lex',             d: 'Build conversational chatbots and voice interfaces' },
  { a: 'Amazon Polly',           d: 'Text-to-speech with lifelike voices' },
  { a: 'Amazon Rekognition',     d: 'Image and video analysis — face detection, labels, content moderation' },
  { a: 'Amazon SageMaker AI',    d: 'End-to-end platform to build, train, and deploy ML models' },
  { a: 'Amazon Textract',        d: 'Extract text, forms, and tables from scanned documents' },
  { a: 'Amazon Transcribe',      d: 'Automatic speech-to-text transcription' },
  { a: 'Amazon Translate',       d: 'Neural machine translation between languages' },

  // Management and Governance
  { a: 'AWS Auto Scaling',       d: 'Unified scaling across EC2, ECS, DynamoDB, Aurora, etc.' },
  { a: 'AWS CLI',                d: 'Command-line tool for managing AWS services' },
  { a: 'AWS CloudFormation',     d: 'Infrastructure-as-code — provision AWS resources from templates' },
  { a: 'AWS CloudTrail',         d: 'Audit log of all API calls and account activity' },
  { a: 'Amazon CloudWatch',      d: 'Monitoring, metrics, logs, and alarms across AWS resources' },
  { a: 'AWS Compute Optimizer',  d: 'Recommend optimal AWS resource sizes based on workload patterns' },
  { a: 'AWS Config',             d: 'Track configuration changes and compliance of AWS resources' },
  { a: 'AWS Control Tower',      d: 'Set up and govern a secure, multi-account AWS environment' },
  { a: 'AWS Health Dashboard',   d: 'Personalized view of AWS service health and account events' },
  { a: 'AWS License Manager',    d: 'Manage software licenses across AWS and on-premises' },
  { a: 'Amazon Managed Grafana', d: 'Fully managed Grafana for observability dashboards' },
  { a: 'Amazon Managed Service for Prometheus', d: 'Managed Prometheus-compatible monitoring service' },
  { a: 'AWS Management Console', d: 'Web-based UI for managing AWS services' },
  { a: 'AWS Organizations',      d: 'Centrally manage multiple AWS accounts with consolidated billing and SCPs' },
  { a: 'AWS Service Catalog',    d: 'Curate and distribute approved IT services within the org' },
  { a: 'AWS Systems Manager',    d: 'Operational hub — patch, automate, and configure AWS and on-prem resources' },
  { a: 'AWS Trusted Advisor',    d: 'Best-practice checks for cost, performance, security, fault tolerance, limits' },
  { a: 'AWS Well-Architected Tool', d: 'Self-assessment against the AWS Well-Architected Framework pillars' },

  // Media Services
  { a: 'Amazon Elastic Transcoder', d: 'Cloud-based media transcoding service' },
  { a: 'Amazon Kinesis Video Streams', d: 'Stream and store live video for analytics and ML' },

  // Migration and Transfer
  { a: 'AWS Application Migration Service', d: 'Lift-and-shift migrate servers to AWS with minimal downtime' },
  { a: 'AWS DataSync',           d: 'Fast online data transfer between on-prem storage and AWS' },
  { a: 'AWS DMS',                d: 'Database Migration Service — migrate databases with minimal downtime' },
  { a: 'AWS Snow Family',        d: 'Physical devices for moving large amounts of data into and out of AWS' },
  { a: 'AWS Transfer Family',    d: 'Managed SFTP, FTPS, and FTP for transferring files into and out of S3 and EFS' },

  // Networking and Content Delivery
  { a: 'AWS Client VPN',         d: 'Managed remote-access VPN for individual users' },
  { a: 'Amazon CloudFront',      d: 'Global content delivery network (CDN)' },
  { a: 'AWS Direct Connect',     d: 'Dedicated private network connection from on-premises to AWS' },
  { a: 'Elastic Load Balancing', d: 'Distribute traffic across targets — Application, Network, and Gateway types' },
  { a: 'AWS Global Accelerator', d: 'Improve global app performance using AWS backbone with static anycast IPs' },
  { a: 'AWS PrivateLink',        d: 'Private connectivity to AWS services and SaaS without public internet' },
  { a: 'Amazon Route 53',        d: 'Scalable DNS, domain registration, and health-checked routing' },
  { a: 'AWS Site-to-Site VPN',   d: 'Encrypted IPsec tunnels between on-premises and AWS' },
  { a: 'AWS Transit Gateway',    d: 'Hub that connects VPCs and on-premises networks through a single gateway' },
  { a: 'Amazon VPC',             d: 'Logically isolated virtual network inside AWS' },

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
  { a: 'AWS IAM Identity Center', d: 'Single sign-on (SSO) and central permission management across AWS accounts' },
  { a: 'Amazon Inspector',       d: 'Automated vulnerability scanning for EC2, ECR, and Lambda' },
  { a: 'AWS KMS',                d: 'Create and manage cryptographic keys used to encrypt data' },
  { a: 'Amazon Macie',           d: 'Discover and protect sensitive data (e.g., PII) in S3 using ML' },
  { a: 'AWS Network Firewall',   d: 'Stateful, managed network firewall and IPS for VPCs' },
  { a: 'AWS RAM',                d: 'Resource Access Manager — share AWS resources across accounts' },
  { a: 'AWS Secrets Manager',    d: 'Store, rotate, and retrieve secrets like database credentials and API keys' },
  { a: 'AWS Security Hub',       d: 'Single dashboard aggregating security alerts and compliance status' },
  { a: 'AWS Shield',             d: 'DDoS protection — Standard is free; Advanced adds higher-tier mitigation' },
  { a: 'AWS WAF',                d: 'Web Application Firewall — protect web apps from common exploits' },
  { a: 'IAM',                    d: 'Identity and Access Management — users, groups, roles, and permissions' },

  // Serverless
  { a: 'AWS Fargate',            d: 'Serverless compute engine for containers (ECS/EKS)' },
  { a: 'AWS Lambda',             d: 'Run code without provisioning or managing servers (FaaS)' },

  // Storage
  { a: 'AWS Backup',             d: 'Centralize and automate backups across AWS services' },
  { a: 'Amazon EBS',             d: 'Persistent block storage volumes for EC2 instances' },
  { a: 'Amazon EFS',             d: 'Managed elastic NFS file system for Linux workloads' },
  { a: 'Amazon FSx',             d: 'Managed file systems (Windows, Lustre, NetApp ONTAP, OpenZFS)' },
  { a: 'Amazon S3',              d: 'Object storage with virtually unlimited capacity and 11 nines durability' },
  { a: 'Amazon S3 Glacier',      d: 'Low-cost archival object storage for long-term retention' },
  { a: 'AWS Storage Gateway',    d: 'Hybrid cloud storage — give on-prem apps access to AWS storage' },
];
