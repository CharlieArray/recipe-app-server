const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'password',
      email: 'john@gmail.com'
    },
    {
      id: 2,
      user_name: 'test-user-2',
      password: 'password',
      email: 'james@gmail.com'
    },
    {
      id: 3,
      user_name: 'test-user-3',
      password: 'password',
      email: 'adam@gmail.com'
    },
    {
      id: 4,
      user_name: 'test-user-4',
      password: 'password',
      email: 'steve@gmail.com'
    },
  ]
}

function makeItemsArray(users) {
  return [
    {
      id: 1,
      item: 'cherries',
      users_id: users[0].id,
    },
    {
      id: 2,
      item: 'oranges',
      users_id: users[1].id,
    },
    {
      id: 3,
      item: 'blueberries',
      users_id: users[2].id,
     
    },
    {
      id: 4,
      item: 'apples',
      users_id: users[3].id,
    },
  ]
}

function makeItemsFixtures() {
  const testUsers = makeUsersArray()
  const testItem = makeItemsArray(testUsers)
  return { testUsers, testItem }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        shoppinglist,
        users
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE shoppinglist_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('shoppinglist_id_seq', 0)`),
        trx.raw(`SELECT setval('users_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedItemsTables(db, users, shoppinglist,) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('shoppinglist').insert(shoppinglist)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('shoppinglist_id_seq', ?)`,
      [shoppinglist[shoppinglist.length - 1].id],
    )
  })
}

function seedMaliciousItems(db, user, shoppinglist) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('shoppinglist')
        .insert([shoppinglist])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeItemsArray,
  makeItemsFixtures,
  cleanTables,
  seedItemsTables,
  seedMaliciousItems,
  makeAuthHeader,
  seedUsers,
}