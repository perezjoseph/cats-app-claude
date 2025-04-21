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

### AWS Elastic Beanstalk with CloudFront, Custom Domain, and HTTPS
This application is deployed on AWS Elastic Beanstalk with CloudFront for HTTPS support at:
https://jpilier.people.aws.dev

To deploy your own version:
1. Install the EB CLI: `pip install awsebcli`
2. Initialize EB: `eb init cat-gallery --platform "Python 3.9" --region us-east-1`
3. Create environment: `eb create cat-gallery-env --cname cat-gallery --instance-type t2.micro --single`
4. Deploy updates: `eb deploy`

#### CloudFront, Custom Domain, and HTTPS Configuration
The application includes CloudFront integration with a custom domain that automatically:
- Creates a CloudFront distribution pointing to your Elastic Beanstalk environment
- Uses an ACM certificate for HTTPS support on your custom domain
- Redirects HTTP requests to HTTPS for improved security
- Creates a Route 53 A record (jpilier.people.aws.dev) pointing to the CloudFront distribution

Once deployed, your application will be accessible via:
- Elastic Beanstalk URL: http://cat-gallery.us-east-1.elasticbeanstalk.com (backend)
- Custom Domain with HTTPS: https://jpilier.people.aws.dev (recommended for users)

The deployment leverages:
- AWS Certificate Manager (ACM) for the SSL/TLS certificate
- CloudFront for CDN functionality and TLS termination
- Route 53 for custom domain name DNS configuration

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
