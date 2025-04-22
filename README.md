# Cat Gallery PHP App

A simple PHP application that displays cat images from TheCatAPI.

## Setup

1. Clone this repository
2. (Optional) Create a `.env` file and add your TheCatAPI key if you have one:
   ```
   CAT_API_KEY=your_api_key_here
   ```

## Running Locally

```
php -S localhost:8080
```

Then open your browser to http://localhost:8080

## Deployment

### AWS Elastic Beanstalk with CloudFront

To deploy your own version:
1. Use a PHP platform on Elastic Beanstalk
2. Initialize EB: `eb init cat-gallery --platform "PHP 8.0" --region us-east-1`
3. Create environment: `eb create cat-gallery-env --cname cat-gallery --instance-type t2.micro --single`
4. Deploy updates: `eb deploy`

#### CloudFront Configuration
You can use CloudFront with your PHP application:
- Create a CloudFront distribution pointing to your Elastic Beanstalk environment
- Use an ACM certificate for HTTPS support
- Configure Route 53 for a custom domain name

### Vercel Deployment
This application can be deployed on Vercel:

1. Create a Vercel account and install the Vercel CLI
2. Run `vercel` in the project directory
3. The included `vercel.json` file has the necessary configuration for PHP deployment

### Traditional PHP Hosting
You can deploy to any PHP hosting service:

1. Upload the files to your hosting provider
2. Ensure the server has PHP 7.4+ and the curl extension
3. Make sure the `.htaccess` file is properly configured for URL rewriting

## Features

- Displays a responsive gallery of cat images
- Click "Load New Cats" to refresh the gallery with new images
- Mobile-friendly design
