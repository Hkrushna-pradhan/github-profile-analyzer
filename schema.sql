CREATE TABLE github_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE,
    name VARCHAR(255),
    bio TEXT,
    public_repos INT,
    followers INT,
    following INT,
    public_gists INT,
    account_created DATE,
    profile_url VARCHAR(255),
    avatar_url VARCHAR(500),
    total_stars INT,
    most_used_language VARCHAR(100),
    analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);