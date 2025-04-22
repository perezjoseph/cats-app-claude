# Elastic Beanstalk Deployment Package

This directory contains a prepared deployment package for AWS Elastic Beanstalk.

## Manual Deployment Steps

Since the EB CLI is not available in this environment, follow these manual steps:

1. **Create a ZIP file of the application**:
   - Zip all application files (excluding node_modules, .git, etc.)
   - Use the command: `zip -r deployment.zip . -x "node_modules/*" ".git/*" "deployment/*"`

2. **Upload to Elastic Beanstalk**:
   - Go to AWS Console > Elastic Beanstalk
   - Select your environment "cat-gallery-env"
   - Choose "Upload and Deploy"
   - Select the deployment.zip file
   - Add a version label (e.g., "nodejs-bedrock-1.0")
   - Click "Deploy"

3. **Configure Environment Variables**:
   - In the Elastic Beanstalk console, go to Configuration > Software
   - Under "Environment properties", add:
     - CAT_API_KEY (if you have one)
     - AWS_REGION=us-east-1
     - BEDROCK_MODEL_ID=anthropic.claude-v2

4. **Set up IAM Role**:
   - Ensure the instance profile used by Elastic Beanstalk has the AmazonBedrockFullAccess policy attached

## After Deployment

- Check the environment health
- View logs if there are any issues
- Test the application functionality