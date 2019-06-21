# nodkp

Node.js Discord bot for the allocation of arbitrary points. Channel specific points, allowing for multiple channels with independent points to exist in the same server.

```
$nodkp      initalize nodkp in a channel
$alias      update name of token. default 'coin'
$balance    returns users balance in DM
$update     uses mention and value to update a users balance. $update @selfquery 10
$deduct     uses mention and value to reduce a users balance. $deduct @selfquery 10 (will return error in DM if user doesn't have enough funds)
```

---

[![discord](https://img.shields.io/badge/nodkp-invite-9999ff.svg)](https://discordapp.com/api/oauth2/authorize?client_id=544764737267826700&permissions=268445696&scope=bot)

---

## Contributors

* **selfquery** - *Initial work* - [GitLab](https://gitlab.com/selfquery)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
