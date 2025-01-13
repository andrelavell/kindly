  * [DEVELOPER PORTAL](https://developers.cj.com/authentication/</>)
  * [Home](https://developers.cj.com/authentication/</>)
  * Authentication
    * [Overview](https://developers.cj.com/authentication/</authentication/overview>)
    * [Personal Access Tokens](https://developers.cj.com/authentication/</account/personal-access-tokens>)
  * Sign In


Authentication Overview
# Authentication Overview
API requests must be authenticated by passing a token in the `Authorization` HTTP request header.
## Personal Access Tokens
To call an API using a personal access token, you must include an `Authorization` header in your HTTP request that contains the authorization type `Bearer` followed by your personal access token. You can manage your personal access tokens from the [personal access tokens](https://developers.cj.com/authentication/</account/personal-access-tokens>) page. See the following example of an `Authorization` HTTP header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIXVCJ9

```

You should keep your personal access tokens secure and private. Never put them in publically accessible places, such as in client-side code or public code repositories.
## Developer Keys
Developer keys are deprecated. They will continue to work when authenticating with existing APIs, but will not work with future APIs. Please use personal access tokens instead.
© 2025 Commission Junction LLC | [Privacy Policy](https://developers.cj.com/authentication/<https:/www.cj.com/legal/privacy>) | [Terms of Use](https://developers.cj.com/authentication/<https:/www.cj.com/legal/terms >) | [API Terms of Use](https://developers.cj.com/authentication/<https:/www.cj.com/legal/ws-terms >)
Authentication Overview
Personal Access Tokens
Developer Keys


