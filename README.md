# Cat Gallery Flask App

A simple Flask application that displays cat images from TheCatAPI.

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. (Optional) Create a `.env` file based on `.env.example` and add your TheCatAPI key if you have one

## Running Locally

```
python app.py
```

Then open your browser to http://localhost:8080

## Deployment

### AWS Elastic Beanstalk with CloudFront and HTTPS
This application is deployed on AWS Elastic Beanstalk with CloudFront for HTTPS support at:
https://[cloudfront-distribution-id].cloudfront.net

To deploy your own version:
1. Install the EB CLI: `pip install awsebcli`
2. Initialize EB: `eb init cat-gallery --platform "Python 3.9" --region us-east-1`
3. Create environment: `eb create cat-gallery-env --cname cat-gallery --instance-type t2.micro --single`
4. Deploy updates: `eb deploy`

#### CloudFront and HTTPS Configuration
The application includes CloudFront integration that automatically:
- Creates a CloudFront distribution pointing to your Elastic Beanstalk environment
- Uses the AWS default CloudFront certificate for HTTPS support
- Redirects HTTP requests to HTTPS for improved security

Once deployed, your application will be accessible via:
- Elastic Beanstalk URL: http://cat-gallery.us-east-1.elasticbeanstalk.com
- CloudFront HTTPS URL: https://[generated-id].cloudfront.net (will be shown in AWS CloudFront console)

To find your CloudFront URL:
1. Go to the AWS CloudFront console
2. Look for the distribution with your Elastic Beanstalk domain as the origin
3. Use the "Distribution Domain Name" shown in the console

### Render.com Alternative
This application can also be deployed on Render.com:

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Use the following settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn application:application`

## Features

- Displays a responsive gallery of cat images
- Click "Load New Cats" to refresh the gallery with new images
- Mobile-friendly design
