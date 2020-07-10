INSERT INTO meme_user (
    username,
    email,
    password,
    profile_picture
) VALUES (
    ${username},
    ${email},
    ${password},
    ${profilePicture}
)
returning user_id, username, email, profile_picture;