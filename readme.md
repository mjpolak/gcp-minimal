# Genarl

What is it ...
## Assumptions


Docker need for deployment machine
# Architecture


# Deployment pipeline




# Preparing infrastructure

## Preparing GCP project

 1. Create project on https://console.cloud.google.com/projectcreate it need to be unique across GCP
 1. Generate certificate to authenticate terraform
    1. Go to Service Accounts settings: https://console.cloud.google.com/iam-admin/serviceaccounts
    1. Click `Create service account` button
    1. Fill `Name`,`Account ID` and add `Description` i used `terraform`.
    1. Click `Create and continue` Button.
    1. Click on `Select a Role` dropdown and select `Owner`
    1. Click `Done`
    1. Click newly created account on list.
    1. Switch to "Keys" Tab.
    1. Click on "Add key" and select "Create new Key", pick `JSON` type on modal.
    1. Your certificate should be downloaded.
1. Rename certificate to `cert.json` and move it to root directory of project.

## Creating Infrastructure

1. Use `docker-compose run --rm terraform` to enter terraform environment.
1.


# Local development


