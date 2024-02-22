# C2E Store Service Setup Guide

Please execute the folowing commands cefore starting the App for the first time.

> npm install

> npm run migrate

> npx sequelize-cli db:seed:all

> npm start

# Curriki C2E Store Service API Documentation (Open API Specification)

Welcome to the Curriki C2E Store Service API documentation. :tada: :tada: :tada:

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [C2E Listing Routes](#c2e-listing-routes)
  - [Create C2E Listing](#create-c2e-listing)
- [C2E Subscription Routes](#c2e-subscription-routes)
  - [Get C2E Player Subscriptions Manifest](#get-c2e-player-subscriptions-manifest)
- [API Key Routes](#api-key-routes)
- [Database Diagram](#database-diagram)
- [C2E SPECIFICATION DOCUMENT](https://github.com/CurrikiEducationalExperiences/cee-publisher-service/blob/main/public/C2E%20Specification%20v1.0.pdf?raw=true)

---

## Base URL

All endpoints are relative to the base URL:
> https://service-host/api/v1



---

## Authentication

### API Key

All endpoints require an `x-api-key` header for authentication. Different roles have different API keys for access.

---

## C2E Listing Routes

### Create C2E Listing

Endpoint to create a new C2E Listing.

- **URL:** `/c2e-listings`
- **Method:** `POST`
- **Summary:** Create C2E Listing
- **Parameters:**
  - `x-api-key` (header) - API Key (role: cee-publisher-service)
    - **Type:** string
    - **Default:** API Key (role: cee-publisher-service)
    - **Required:** true
  - `payload` (body) - User credentials
    - **Type:** object
    - **Properties:**
      - `ceeId` (string) - C2E Id (Example: "5f5e2e3e-3e3e-4e4e-5e5e-6e6e7e7e7e7e")
      - `name` (string) - C2E Listing Name (Example: "C2E Listing Name")
      - `subject` (array of strings) - Educational subjects (Example: ["Mathematics"])
      - `educationLevel` (array of strings) - Education levels (Example: ["Grade 1"])
      - `keywords` (array of strings) - Keywords for the listing (Example: ["Mathematics", "Grade 1", "Addition", "Subtraction"])
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": "C2E Listing created successfully!"
      }
      ```
  - `400`:
    - **Description:** Failed
    - **Schema:**
      ```json
      {
        "code": 400,
        "message": "Failed to create C2E Listing!",
        "result": null
      }
      ```

---

## C2E Subscription Routes

### Get C2E Player Subscriptions Manifest

Endpoint to retrieve the C2E Player Subscriptions Manifest.

- **URL:** `/c2e-subscriptions/manifest`
- **Method:** `GET`
- **Summary:** Get C2E Player Subscriptions Manifest
- **Parameters:**
  - `x-api-key` (header) - API Key (role: cee-player-service)
    - **Type:** string
    - **Default:** API Key (role: cee-player-service)
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": "C2E Player Subscriptions Manifest"
      }
      ```
  - `400`:
    - **Description:** Failed
    - **Schema:**
      ```json
      {
        "code": 400,
        "message": "Failed to show C2E Subscriptions!",
        "result": null
      }
      ```

---

## API Key Routes

### Get API Keys

Endpoint to retrieve API Keys.

- **URL:** `/keys`
- **Method:** `GET`
- **Summary:** Get API Keys
- **Parameters:**
  - `Authorization` (header) - Authorization token
    - **Type:** string
    - **Default:** Bearer APIKey
    - **Required:** true
- **Responses:**
  - `200`:
    - **Description:** Success
    - **Schema:**
      ```json
      {
        "code": 200,
        "message": "Success",
        "result": [
          {
            "key": "APIKey",
            "clientRole": "cee-publisher-service | cee-player-service",
            "clientEmail": "demo-c2e-store@curriki.org"
          }
        ]
      }
      ```

---


## Database Diagram
![db](https://raw.githubusercontent.com/CurrikiEducationalExperiences/cee-store-service/main/public/c2e-store-service-diagram.png)


