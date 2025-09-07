# Single Spa microfrontend to root-config communication

## setup
```
> cd .\navbar-main\
> pnpm install
> cd .\root-config-main\
> pnpm install
```

In one shell run:
```psh
> cd .\navbar-main\
> pnpm start --https --port 9001
```


In another shell run:
```psh
> cd .\root-config-main\
> pnpm start
```

BOTH need to be running for the application to work.
Make sure the navbar is running at https://localhost:9001. If any SSL or certificate problems occur, then follow the instructions of [this article](https://improveandrepeat.com/2016/09/allowing-self-signed-certificates-on-localhost-with-chrome-and-firefox/)
