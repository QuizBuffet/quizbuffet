// AWS Certified AI Practitioner (AIF-C01) — AI/ML services and supporting infrastructure with one-line purposes.
export const services = [
  // Core AI/ML platforms
  { a: 'Amazon SageMaker AI',    d: 'End-to-end platform to build, train, and deploy ML models' },
  { a: 'Amazon Bedrock',         d: 'Fully managed access to foundation models from leading AI companies via API' },
  { a: 'Amazon Q',               d: 'Generative-AI assistant for business and developers' },
  { a: 'Amazon Q Developer',     d: 'AI coding assistant integrated into IDEs and the AWS Console' },
  { a: 'Amazon Q Business',      d: 'Generative-AI assistant for enterprise knowledge and workflows' },

  // SageMaker components
  { a: 'SageMaker Studio',       d: 'Web IDE for the full ML workflow' },
  { a: 'SageMaker Canvas',       d: 'No-code ML model building for business analysts' },
  { a: 'SageMaker JumpStart',    d: 'Pre-built foundation models, solutions, and example notebooks' },
  { a: 'SageMaker Ground Truth', d: 'Build high-quality labeled training datasets with human/automated labeling' },
  { a: 'SageMaker Data Wrangler', d: 'Visual tool to prepare, clean, and feature-engineer ML data' },
  { a: 'SageMaker Feature Store', d: 'Centralized repository to store, share, and reuse ML features' },
  { a: 'SageMaker Model Monitor', d: 'Detect concept drift and data quality issues in deployed models' },
  { a: 'SageMaker Clarify',      d: 'Detect bias in data/models and explain predictions' },
  { a: 'SageMaker Pipelines',    d: 'CI/CD-style ML workflow orchestration' },

  // Bedrock features
  { a: 'Bedrock Knowledge Bases', d: 'RAG made easy — connect FMs to your private data sources' },
  { a: 'Bedrock Agents',         d: 'Build agents that plan and execute multi-step tasks using FMs' },
  { a: 'Bedrock Guardrails',     d: 'Apply content filters, denied topics, and PII protection to FM outputs' },

  // Pre-trained AI services (computer vision)
  { a: 'Amazon Rekognition',     d: 'Image and video analysis — face detection, labels, content moderation' },
  { a: 'Amazon Textract',        d: 'Extract text, forms, and tables from scanned documents' },

  // Pre-trained AI services (language)
  { a: 'Amazon Comprehend',      d: 'Natural-language processing — sentiment, entities, key phrases' },
  { a: 'Amazon Comprehend Medical', d: 'NLP service specialized for clinical and medical text' },
  { a: 'Amazon Translate',       d: 'Neural machine translation between languages' },
  { a: 'Amazon Transcribe',      d: 'Automatic speech-to-text transcription' },
  { a: 'Amazon Polly',           d: 'Text-to-speech with lifelike voices' },
  { a: 'Amazon Lex',             d: 'Build conversational chatbots and voice interfaces' },

  // Specialized AI services
  { a: 'Amazon Kendra',          d: 'Intelligent enterprise search powered by ML' },
  { a: 'Amazon Personalize',     d: 'Build real-time personalization and recommendation systems' },
  { a: 'Amazon Forecast',        d: 'Time-series forecasting using ML' },
  { a: 'Amazon Fraud Detector',  d: 'Detect fraudulent activity using ML' },

  // Compute & storage commonly paired with ML
  { a: 'Amazon EC2',             d: 'Virtual servers — used for ML training/inference (incl. GPU instances)' },
  { a: 'Amazon S3',              d: 'Object storage — primary location for training datasets and model artifacts' },
  { a: 'AWS Lambda',             d: 'Run inference code without provisioning or managing servers' },

  // Security and governance for AI
  { a: 'AWS IAM',                d: 'Identity and Access Management — control who can call AI services' },
  { a: 'AWS KMS',                d: 'Manage cryptographic keys used to encrypt training data and model artifacts' },
  { a: 'Amazon Macie',           d: 'Discover and protect sensitive data (e.g., PII) in S3 used for AI training' },
  { a: 'AWS Secrets Manager',    d: 'Store and rotate API keys, model credentials, and other secrets' },
  { a: 'AWS Audit Manager',      d: 'Continuously audit AWS usage against compliance frameworks (incl. AI workloads)' },
  { a: 'AWS Artifact',           d: 'On-demand access to AWS compliance reports' },

  // Monitoring and observability
  { a: 'Amazon CloudWatch',      d: 'Monitoring, metrics, logs, and alarms — including model performance metrics' },
  { a: 'AWS CloudTrail',         d: 'Audit log of all API calls (including AI service invocations)' },

  // Concepts (core to the AIF-C01 exam — not services but tested as terms)
  { a: 'Foundation Model',       d: 'Large pre-trained model adaptable to many downstream tasks (the basis of generative AI)' },
  { a: 'Prompt Engineering',     d: 'Crafting input prompts to elicit better, safer, and more useful FM outputs' },
  { a: 'Retrieval-Augmented Generation', d: 'Combine an FM with retrieved context from your data to ground responses' },
  { a: 'Fine-tuning',            d: 'Customize a foundation model on your own labeled data' },
  { a: 'Continued Pre-training', d: 'Extend a foundation model with additional unlabeled domain text' },
  { a: 'Embedding',              d: 'Numerical vector representation of text/image used for similarity and search' },
  { a: 'Tokenization',           d: 'Splitting text into tokens (words/subwords) the model processes' },
  { a: 'Hallucination',          d: 'When a model generates plausible but factually incorrect content' },
  { a: 'Bias and Fairness',      d: 'Systematic skew in model behavior across groups; managed via responsible-AI practices' },
  { a: 'Explainability',         d: 'Tools and practices that make a model’s predictions interpretable' },
  { a: 'Vector Database',        d: 'Database for storing and querying high-dimensional embeddings (used in RAG)' },
];
