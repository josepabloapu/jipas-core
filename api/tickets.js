
var Ticket = require('../models/ticket.js')

module.exports.getAllTickets = function (req, res) {
  Ticket.find(function (err, tickets) {
    if (err) { res.send(err) }
    res.json(tickets)
  })
}

module.exports.createTicket = function (req, res) {
  var ticket = new Ticket(req.body)
  ticket.save(function (err) {
    if (err) res.send(err)
    res.send(ticket)
  })
}

module.exports.getTicketById = function (req, res) {
  Ticket.findById(req.params.id, function (err, ticket) {
    if (err) { res.send(err) }
    res.status(200).json(ticket)
  })
}

module.exports.updateTicketById = function (req, res) {
  Ticket.findById(req.params.id, function (err, ticket) {
    if (err) return err
    var key
    for (key in req.body) {
      ticket[key] = req.body[key]
    }
    ticket.save(function (err) {
      if (err) return err
      res.send(ticket)
    })
  })
}

module.exports.deleteTicketById = function (req, res) {
  Ticket.findByIdAndRemove(req.params.id, function (err) {
    if (err) { res.send(err) }
    res.status(200).json({ status: 'The ticket has been deleted' })
  })
}

module.exports.getSelfAllTickets = function (req, res) {
  Ticket.find({'originator': req.user._id},
    function (err, tickets) {
      if (err) res.send(err)
      res.status(200).json(tickets)
    })
}

module.exports.createSelfTicket = function (req, res) {
  req.body.originator = req.user._id
  var ticket = new Ticket(req.body)
  ticket.save(function (err) {
    if (err) res.send(err)
    res.send(ticket)
  })
}

module.exports.getSelfTicket = function (req, res) {
  Ticket.findOne({'_id': req.params.id, 'originator': req.user._id},
    function (err, ticket) {
      if (err) return err
      res.status(200).json(ticket)
    })
}

module.exports.updateSelfTicket = function (req, res) {
  Ticket.findOne({'_id': req.params.id, 'originator': req.user._id},
    function (err, ticket) {
      if (err) return err
      if (!ticket) return res.json({ status: 'Ticket not found' })
      var key
      for (key in req.body) {
        ticket[key] = req.body[key]
      }
      ticket.save(function (err) {
        if (err) return err
        res.send(ticket)
      })
    })
}

module.exports.deleteSelfTicket = function (req, res) {
  Ticket.findOneAndRemove({'_id': req.params.id, 'originator': req.user._id},
    function (err, ticket) {
      if (err) return err
      res.status(200).json({ status: 'The ticket has been deleted' })
    })
}

module.exports.getSelfTicketsByCategory = function (req, res) {
  Ticket.find({'originator': req.user._id, 'category': req.params.category},
    function (err, tickets) {
      if (err) return err
      res.status(200).json(tickets)
    })
}

module.exports.getSelfTicketsByDate = function (req, res) {
  Ticket.find(
    {
      'originator': req.user._id,
      'datePublished':
      {
        '$gte': new Date(req.params.lyear, req.params.lmonth, req.params.lday),
        '$lte': new Date(req.params.gyear, req.params.gmonth, req.params.gday)
      }
    },
    function (err, tickets) {
      if (err) return err
      res.status(200).json(tickets)
    })
}

module.exports.getTicketsByCategory = function (req, res) {
  Ticket.find({'category': req.params.category},
    function (err, tickets) {
      if (err) return err
      res.status(200).json(tickets)
    })
}

module.exports.getTicketsByLevel = function (req, res) {
  Ticket.find({'level': req.params.level},
    function (err, tickets) {
      if (err) return err
      res.status(200).json(tickets)
    })
}

module.exports.getTicketsByCategoryByLevel = function (req, res) {
  Ticket.find({'category': req.params.category, 'level': req.params.level},
    function (err, tickets) {
      if (err) return err
      res.status(200).json(tickets)
    })
}
