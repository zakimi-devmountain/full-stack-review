insert into users (
    username,
    email,
    password,
    profile_picture
) values (
    $1,
    $2,
    $3,
    $4
)
returning username, email, profile_picture;