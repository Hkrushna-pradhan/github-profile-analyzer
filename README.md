# GitHub Profile Analyzer API

## Overview

A REST API built using Node.js, Express.js, MySQL, and GitHub Public API that analyzes GitHub user profiles and stores useful insights.

## Features

* Analyze GitHub profiles by username
* Fetch profile data from GitHub API
* Store profile insights in MySQL
* Retrieve all analyzed profiles
* Retrieve a single analyzed profile
* Calculate total repository stars
* Detect most-used programming language

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub Public API

## Installation

```bash
git clone https://github.com/Hkrushna-pradhan/github-profile-analyzer.git
cd github-profile-analyzer
npm install
```

## Environment Variables

Create a .env file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=github_analyzer
```

## Run Application

```bash
npm run dev
```

## API Endpoints

### Analyze GitHub Profile

POST /api/profiles/analyze/:username

### Get All Profiles

GET /api/profiles

### Get Single Profile

GET /api/profiles/:username

## Sample Response

```json
{
  "message": "Profile analyzed successfully",
  "username": "Hkrushsna-pradhan",
  "followers": 22792,
  "public_repos": 8,
  "total_stars": 21455,
  "most_used_language": "HTML"
}
```
