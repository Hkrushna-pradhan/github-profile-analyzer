const db = require("../config/db");
const axios = require("axios");

const analyzeProfile = async (req, res) => {
    try {
        const username = req.params.username;

        const userResponse = await axios.get(
            `https://api.github.com/users/${username}`
        );

        const repoResponse = await axios.get(
            `https://api.github.com/users/${username}/repos`
        );

        const user = userResponse.data;
        const repos = repoResponse.data;

        let totalStars = 0;
        let languageCount = {};

        repos.forEach((repo) => {
            totalStars += repo.stargazers_count;

            if (repo.language) {
                languageCount[repo.language] =
                    (languageCount[repo.language] || 0) + 1;
            }
        });

        let mostUsedLanguage = "N/A";

        if (Object.keys(languageCount).length > 0) {
            mostUsedLanguage = Object.keys(languageCount).reduce((a, b) =>
                languageCount[a] > languageCount[b] ? a : b
            );
        }

        const sql = `
        INSERT INTO github_profiles
        (
            username,
            name,
            bio,
            public_repos,
            followers,
            following,
            public_gists,
            account_created,
            profile_url,
            avatar_url,
            total_stars,
            most_used_language
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            bio = VALUES(bio),
            public_repos = VALUES(public_repos),
            followers = VALUES(followers),
            following = VALUES(following),
            public_gists = VALUES(public_gists),
            total_stars = VALUES(total_stars),
            most_used_language = VALUES(most_used_language)
        `;

        db.query(
            sql,
            [
                user.login,
                user.name,
                user.bio,
                user.public_repos,
                user.followers,
                user.following,
                user.public_gists,
                user.created_at.split("T")[0],
                user.html_url,
                user.avatar_url,
                totalStars,
                mostUsedLanguage
            ],
            (err) => {
                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message: "Profile analyzed successfully",
                    username: user.login,
                    followers: user.followers,
                    public_repos: user.public_repos,
                    total_stars: totalStars,
                    most_used_language: mostUsedLanguage
                });
            }
        );
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllProfiles = (req, res) => {
    db.query(
        "SELECT * FROM github_profiles",
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

const getProfileByUsername = (req, res) => {
    const username = req.params.username;

    db.query(
        "SELECT * FROM github_profiles WHERE username=?",
        [username],
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

module.exports = {
    analyzeProfile,
    getAllProfiles,
    getProfileByUsername
};