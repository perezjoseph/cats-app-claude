# Deploying to AWS Elastic Beanstalk

This document outlines the steps to deploy the Node.js Cat Gallery & Memes application to AWS Elastic Beanstalk.

## Prerequisites

1. AWS Account with access to Elastic Beanstalk, IAM, and Bedrock services
2. AWS CLI and EB CLI installed and configured
3. Node.js project ready for deployment

## Deployment Steps

### 1. Install EB CLI if not already installed

```bash
pip install awsebcli
```

### 2. Initialize Elastic Beanstalk application

```bash
cd /path/to/your/project
eb init cat-gallery --platform "Node.js 18" --region us-east-1
```

### 3. Create an Elastic Beanstalk environment

```bash
eb create cat-gallery-env --cname cat-gallery --instance-type t2.micro --single
```

### 4. Configure environment variables

You can configure environment variables through the AWS Console or EB CLI:

```bash
eb setenv CAT_API_KEY=your_cat_api_key_here AWS_REGION=us-east-1 BEDROCK_MODEL_ID=anthropic.claude-v2
```

### 5. Configure IAM Role for AWS Bedrock

1. Go to the AWS Console > IAM > Roles
2. Find the role assigned to your Elastic Beanstalk environment (typically aws-elasticbeanstalk-ec2-role)
3. Attach the AmazonBedrockFullAccess policy to this role

### 6. Deploy your application

```bash
eb deploy
```

### 7. Open the application

```bash
eb open
```

## AWS Bedrock Configuration

To ensure AWS Bedrock works properly:

1. Make sure Bedrock is enabled in your AWS account
2. Verify you have requested access to the Anthropic Claude model
3. Check that your IAM role has proper permissions to invoke Bedrock models

## Troubleshooting

If you encounter issues with the Bedrock integration:

1. Check CloudWatch logs via the EB console
2. Verify your IAM permissions
3. Ensure the region you're using has Bedrock support
4. Confirm that you have access to the Anthropic Claude model in your AWS account

## Monitoring and Maintenance

- Check application health: `eb status`
- View logs: `eb logs`
- SSH into instance: `eb ssh`
- Terminate environment when not needed: `eb terminate cat-gallery-env`