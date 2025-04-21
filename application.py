# This file is needed for AWS Elastic Beanstalk
from app import app as application

if __name__ == '__main__':
    application.run()
