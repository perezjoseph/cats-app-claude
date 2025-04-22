# Cat Gallery & Memes - Node.js Application

A Node.js application that displays cat images and AI-generated memes using AWS Bedrock.

## Features

- Responsive gallery of cat images
- AI-generated meme captions using AWS Bedrock and Anthropic Claude
- Dynamic loading and rendering of content
- Mobile-friendly design

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` and add your API keys:
   ```
   CAT_API_KEY=your_cat_api_key_here
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   BEDROCK_MODEL_ID=anthropic.claude-v2
   ```

## Running Locally

```
npm start
```

For development with hot reloading:
```
npm run dev
```

Then open your browser to http://localhost:8080

## AWS Bedrock Integration

This application uses AWS Bedrock to generate cat meme captions with Anthropic Claude. To use this feature:

1. Set up an AWS account and enable access to Bedrock
2. Create IAM credentials with Bedrock access
3. Add your AWS credentials to the `.env` file

## Deployment on AWS Elastic Beanstalk

To deploy to AWS Elastic Beanstalk:

1. Install the EB CLI: `npm install -g aws-elastic-beanstalk`
2. Initialize EB: `eb init cat-gallery --platform "Node.js 16" --region us-east-1`
3. Create environment: `eb create cat-gallery-env --cname cat-gallery --instance-type t2.micro --single`
4. Deploy updates: `eb deploy`

### Elastic Beanstalk Environment Configuration

Configure environment variables in the Elastic Beanstalk console:

1. Go to Configuration > Software
2. Add environment properties:
   - CAT_API_KEY
   - AWS_REGION
   - BEDROCK_MODEL_ID

NOTE: For AWS credentials, set up an IAM role for your Elastic Beanstalk environment instead of using environment variables.

## CloudFront Integration

You can enhance your deployment with CloudFront:

- Create a CloudFront distribution pointing to your Elastic Beanstalk environment
- Use an ACM certificate for HTTPS support
- Configure Route 53 for a custom domain name

## Technology Stack

- Node.js & Express.js
- AWS Bedrock for AI-generated meme captions
- Bootstrap for responsive UI
- Axios for HTTP requests