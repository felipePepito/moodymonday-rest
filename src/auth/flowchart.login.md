#Flow Chart of Login Procedure


POST call to 'auth/login'
Body: { email, password }
   ↓
--------------
**app.controller.login()**

   ↓

Intercepted by **AuthGuard('local')**\
Uses the code supplied by passport-local (which uses LocalStrategy below)
- Look for credentials
- Running validate function
- Return User Object


   ↓

**validate()** function of\
**LocalStrategy** extends PassportStrategy(Strategy)

   ↓

**AuthService.validateUser(email, password)**

   ↓

**UserService.findOne(email)**

   ↓

**AuthService.validateUser**\
user is valid: returns user without password
user is not valid: returns null

   ↓

**LocalStrategy.validate**\
user is returned: pass user to app.controller.login
null is returned: throw UnauthorizedException

   ↓


