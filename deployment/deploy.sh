#!/bin/bash

# Elastic Beanstalk Deployment Script
# This script helps deploy the Node.js application to AWS Elastic Beanstalk

echo "========== Cat Gallery & Memes Deployment Script =========="
echo "This script will help you deploy the application to AWS Elastic Beanstalk"
echo ""

# Check for AWS CLI
if ! command -v aws &> /dev/null; then
    echo "AWS CLI not found! Please install it before running this script."
    exit 1
fi

# Set default region if not already set
if [ -z "$AWS_REGION" ]; then
    export AWS_REGION="us-east-1"
    echo "Using default AWS region: $AWS_REGION"
fi

# Check for existing application
echo "Checking for existing Elastic Beanstalk application..."
APP_NAME="cat-gallery"
ENV_NAME="cat-gallery-env"

aws elasticbeanstalk describe-applications --application-names $APP_NAME &> /dev/null
if [ $? -ne 0 ]; then
    echo "Application '$APP_NAME' not found. Creating new application..."
    aws elasticbeanstalk create-application --application-name $APP_NAME --description "Cat Gallery & Memes Application"
else
    echo "Found existing application '$APP_NAME'"
fi

# Create S3 bucket for application versions if it doesn't exist
S3_BUCKET="elasticbeanstalk-$AWS_REGION-$(aws sts get-caller-identity --query 'Account' --output text)"
aws s3api head-bucket --bucket $S3_BUCKET 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Creating S3 bucket for application versions..."
    aws s3 mb s3://$S3_BUCKET
fi

# Upload deployment package
VERSION_LABEL="nodejs-bedrock-memes-$(date +%Y%m%d%H%M%S)"
echo "Uploading application version $VERSION_LABEL..."
aws s3 cp deployment/deployment.zip s3://$S3_BUCKET/$APP_NAME/$VERSION_LABEL.zip

# Create new application version
echo "Creating new application version..."
aws elasticbeanstalk create-application-version \
    --application-name $APP_NAME \
    --version-label $VERSION_LABEL \
    --source-bundle S3Bucket=$S3_BUCKET,S3Key=$APP_NAME/$VERSION_LABEL.zip \
    --description "Node.js version with AWS Bedrock meme generation"

# Check if environment exists
aws elasticbeanstalk describe-environments --environment-names $ENV_NAME --application-name $APP_NAME | grep -q "\"EnvironmentName\": \"$ENV_NAME\""
if [ $? -eq 0 ]; then
    # Update existing environment
    echo "Updating existing environment '$ENV_NAME'..."
    aws elasticbeanstalk update-environment \
        --environment-name $ENV_NAME \
        --version-label $VERSION_LABEL
else
    # Create new environment
    echo "Creating new environment '$ENV_NAME'..."
    aws elasticbeanstalk create-environment \
        --application-name $APP_NAME \
        --environment-name $ENV_NAME \
        --solution-stack-name "64bit Amazon Linux 2 v5.8.0 running Node.js 18" \
        --version-label $VERSION_LABEL \
        --option-settings file://deployment/eb-options.json
fi

echo ""
echo "Deployment initiated! Check the AWS Elastic Beanstalk console for status."
echo "Don't forget to set the following environment variables in the EB console:"
echo "- CAT_API_KEY (optional)"
echo "- AWS_REGION (default: us-east-1)"
echo "- BEDROCK_MODEL_ID (default: anthropic.claude-v2)"
echo ""
echo "You'll also need to configure the IAM role for Bedrock access."
echo "========== Deployment Script Complete =========="