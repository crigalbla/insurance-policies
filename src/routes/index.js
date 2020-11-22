const { Router } = require('express');
const router = Router();
const axios = require('axios');

const urlClients = 'http://www.mocky.io/v2/5808862710000087232b75ac';
const urlPolicies = 'http://www.mocky.io/v2/580891a4100000e8242b75c5';

router.get('/', (req, res) => {
  res.send('Insurance Policies API');
});

// The users
router.get('/users', (req, res) => {
  axios.get(urlClients).then(response => {
    res.send(response.data);
  }).catch(error => {
    res.send(error);
  });
});

// The policies
router.get('/policies', (req, res) => {
  axios.get(urlPolicies).then(response => {
    res.send(response.data);
  }).catch(error => {
    res.send(error);
  });

});

// Get user data filtered by user id
router.get('/users/id=:id', (req, res) => {
  const { id } = req.params;
  let client = undefined;
  let policies = undefined;

  axios.all([
    axios.get(urlClients),
    axios.get(urlPolicies)
  ]).then(axios.spread((response1, response2) => {
    client = response1.data.clients.find(cl => cl.id === id);
    policies = response2.data.policies.filter(pol => pol.clientId === id);
    policies = policies.map(pol => {
      delete pol.clientId;
      return pol;
    });

    const clientAndPolicy = {
      ...client,
      policies: policies
    }

    res.send(client ? clientAndPolicy : 'User not found');
  })).catch(error => {
    res.send(error);
  });
});

// Get user data filtered by user name
router.get('/users/name=:name', (req, res) => {
  const { name } = req.params;
  let client = undefined;
  let policies = undefined;

  axios.all([
    axios.get(urlClients),
    axios.get(urlPolicies)
  ]).then(axios.spread((response1, response2) => {
    client = response1.data.clients.find(cl => cl.name === name);
    policies = response2.data.policies.filter(pol => pol.clientId === client.id);
    policies = policies.map(pol => {
      delete pol.clientId;
      return pol;
    });

    const clientAndPolicy = {
      ...client,
      policies: policies
    }

    res.send(client ? clientAndPolicy : 'User not found');
  })).catch(error => {
    res.send(error);
  });
});

// Get the list of policies linked to a user name
router.get('/policies/name=:name', (req, res) => {
  const { name } = req.params;
  let client = undefined;
  let policies = undefined;

  axios.all([
    axios.get(urlClients),
    axios.get(urlPolicies)
  ]).then(axios.spread((response1, response2) => {
    let error = undefined;
    client = response1.data.clients.find(cl => cl.name === name);
    if (!client) {
      error = 'User name not found';
    } else {
      policies = response2.data.policies.filter(pol => pol.clientId === client.id);
    }

    if (policies && policies.length < 1) error = `The user with name = '${name}' have not policies`;

    res.send(error || policies);
  })).catch(error => {
    res.send(error);
  });
});

// Get the user linked to a policy number
router.get('/policies/id=:id', (req, res) => {
  const { id } = req.params;
  let client = undefined;
  let policy = undefined;

  axios.all([
    axios.get(urlClients),
    axios.get(urlPolicies)
  ]).then(axios.spread((response1, response2) => {
    let error = undefined;
    policy = response2.data.policies.find(pol => pol.id === id);
    if (!policy) {
      error = `The policy with id = '${id}' not found`;
    } else {
      client = response1.data.clients.find(cl => cl.id === policy.clientId);
    }

    if (!client) error = 'This policy are not linked with any of our clients';

    res.send(error || client);
  })).catch(error => {
    res.send(error);
  });
});

module.exports = router;
