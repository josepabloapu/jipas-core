var express = require('express')
var router = express.Router()

var system = require('./system')
var users = require('./users')
var tickets = require('./tickets')

/* Loggin routes */
router.route('/register/green').post(system.registerGreenUser)
router.route('/register/yellow').post(system.registerYellowUser)
router.route('/register/red').post(system.registerRedUser) // admin
router.route('/login').post(system.login, system.createToken)
router.route('/logout').get(system.verifyToken, system.removeToken)

/* Users routes */
// router.route('/users') // admin
 // .get(users.getAllUsers)
// router.route('/users/:id') // admin
  // .get(users.getUserById)
  // .put(users.updateUserById)
  // .delete(users.deleteUserById)

router.route('/users/self')
  .get(system.verifyToken, users.getSelf)
  .put(system.verifyToken, users.setValidTrue, users.updateSelf)
  .delete(system.verifyToken, users.deleteSelf)
router.route('/users/self/green-users')
  .get(system.verifyToken, users.getSelfAllGreenUsers)
  .post(system.verifyToken, users.createSelfGreenUser)
router.route('/users/self/green-users/:id')
  .get(system.verifyToken, users.getSelfGreenUser)
  .put(system.verifyToken, users.updateSelfGreenUser)
  .delete(system.verifyToken, users.deleteSelfGreenUser)

/* Tickets routes */
router.route('/tickets') // admin
 .get(tickets.getAllTickets)
 .post(tickets.createTicket)
router.route('/tickets/:id') // admin
 .get(tickets.getTicketById)
 .put(tickets.updateTicketById)
 .delete(tickets.deleteTicketById)

// router.route('/tickets/self')
//   .get(system.verifyToken, tickets.getSelfAllTickets)
//   .post(system.verifyToken, tickets.createSelfTicket)
// router.route('/tickets/self/:id')
//   .get(system.verifyToken, tickets.getSelfTicket)
//   .put(system.verifyToken, tickets.updateSelfTicket)
//   .delete(system.verifyToken, tickets.deleteSelfTicket)

router.route('/tickets/category/:category')
.get(tickets.getTicketsByCategory)
router.route('/tickets/level/:level')
.get(tickets.getTicketsByLevel)
router.route('/tickets/category/:category/level/:level')
 .get(tickets.getTicketsByCategoryByLevel)

// router.route('/tickets/self/category/:category')
//   .get(system.verifyToken, tickets.getSelfTicketsByCategory)
// router.route('/tickets/self/from/:lyear/:lmonth/:lday/to/:gyear/:gmonth/:gday')
//   .get(system.verifyToken, tickets.getSelfTicketsByDate)

module.exports = router
