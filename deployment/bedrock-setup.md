# AWS Bedrock Setup for Cat Gallery & Memes

This guide will help you set up AWS Bedrock properly to work with the Cat Gallery & Memes application.

## Prerequisites

1. AWS account with administrative access
2. AWS Management Console access

## Steps to Enable AWS Bedrock

### 1. Enable AWS Bedrock in Your Account

1. Go to the AWS Management Console
2. Search for "Bedrock" and select it from the services list
3. If this is your first time using Bedrock, you'll need to go through the onboarding process
4. Click "Get started" and follow the prompts

### 2. Request Access to Anthropic Claude Models

1. In the AWS Bedrock console, navigate to "Model access" in the left sidebar
2. Find the "Anthropic" section and select the Claude model you want to use (e.g., anthropic.claude-v2)
3. Click "Access model" and submit your request
4. Wait for approval (this might be instant for some accounts)

### 3. Configure IAM Role for Elastic Beanstalk

#### Option 1: Update the Instance Profile

1. Go to the AWS IAM Console
2. Find the role used by your Elastic Beanstalk environment (typically aws-elasticbeanstalk-ec2-role)
3. Click "Add permissions" and then "Attach policies"
4. Search for "AmazonBedrockFullAccess" and attach it to the role

#### Option 2: Create a Custom Policy

If you prefer more granular control, create a custom policy:

1. Go to the AWS IAM Console
2. Create a new policy with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:ListFoundationModels"
      ],
      "Resource": "*"
    }
  ]
}
```

3. Attach this policy to your Elastic Beanstalk instance profile

### 4. Test Bedrock Access

After deploying your application:

1. Monitor CloudWatch logs to ensure Bedrock API calls are working correctly
2. Try generating a meme through the application UI
3. If you encounter errors, check the CloudWatch logs for specific error messages

## Troubleshooting

### Common Issues

1. **Access Denied Errors**: Ensure your IAM role has the appropriate permissions
2. **Model Not Found**: Verify you've requested access to the model and the request is approved
3. **Region Mismatch**: Make sure the AWS_REGION environment variable matches the region where you've enabled Bedrock
4. **Quota Limits**: Check if you've hit quota limits for Bedrock API calls

### Getting Help

If you're still experiencing issues, check the following resources:

- AWS Bedrock documentation
- AWS Support
- AWS re:Post community