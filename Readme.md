#Beluga CDN Client
##Please note that this project is in "Work in progress" state - anyhting can change here.


###Install
```
npm i belugacdn
```

###Usage
```
const cdn = require('belugacdn');
const belugaCdn = new cdn(username, password);

belugaCdn.listSites(function(error, data) {
  if (error) console.log({error});

  console.log({siteList : data});
})

//you can also use promises
belugaCdn.listSites()
  .then(function(data) {
    console.log({data});
  })
  .catch(function(error) {
    console.log({error});
  });
```

More code v soon.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
