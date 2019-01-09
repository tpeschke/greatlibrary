insert into usersAuth (username, img, auth0, tooltip)
values ($1, $2, $3, '1')
RETURNING *;