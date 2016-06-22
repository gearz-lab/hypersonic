Hypersonic
===

Hypersonic is a platform for developing data-centric business applications.

**Stack:**

 - [React.js](https://facebook.github.io/react/)
 - [Redux(https://github.com/reactjs/redux)
 - [Express.js](http://expressjs.com/)
 - [Bootstrap](http://getbootstrap.com/)
 - [Node.js](https://nodejs.org/)
 - [RethinkDB](http://rethinkdb.com/)

**Project status:**

Hypersonic is under active development. 1.0 release is planned for 2017 Q1.

About
---

Hypersonic is a platform for developing data-centric business applications.. So, what is this?
It's any application which the primary goal is to allow the user to manipulate entities. It allows users to input
data, search and compile the information into charts and reports. It's a management system. The entities that the users manipulate depend on the
application niche. If we're talking about a CRM, for instance, there will probably be entities for Customer, Organization, Lead and Sale.
The universe of entities that the user can manipulate is called the `Application Domain`.
  
Fortunately, virtually every *data-centric business application* share most of their DNA, 
regardless of the application domain. It doesn't matter which entities the application handles, there's
always a plethora of common problems that have to be tackled:
 
 - Authentication.
 - Authorization / Access Control.
 - API and integration.
 - Auditing / Change Tracking.
 - Notifications.
 - Dynamic SCRUD forms (search, create, read, update and delete).
 - Custom entities and forms.
 - Charts.
 - Reports.
   
Hypersonic aims to provide the tools you need to create a successful application without having to deal with all these
hurdles.
 
Core concepts
---

**Configuration over coding**

As mentioned before, *data-centric business applications* share a common DNA. Most of the business logic should be
 handled by the platform, not the application. Hypersonic provides a framework that allows for *configuring* rather than
 *coding* for most of the scenarios.
 
Hypersonic relies heavily on *declarative reactive metadata*. Instead of coding, it's possible to *define* the existence of entities
as well as all of it's metadata. It's possible, for instance, to declare that an entity's property is invalid when a give
expression is true. The UI reacts automatically accordingly.

**Extreme customization**

In today's scenario, it's impossible to think of a *data-centric business application* that doesn't allow the customer
to extend it. Hypersonic is designed, from the core, to allow for maximum customization. Actually, the application developer
and the end-user share virtually the same capabilities.  

**Internationalization**

Hypersonic is designed to support translations, time-zones and multiple date and number formats. 

About the author
---

I'm André Pena, from Brazil. I work for Thomson Reuters as a Software Architect and on Hypersonic
on most of the time that is left. [My SO profile](http://stackoverflow.com/users/192729/andrerpena?tab=profile) if you are interested. I hope you will enjoy using it as much as I enjoy implementing it.

[Follow me on twitter](https://twitter.com/andrerpena).

License
---

Hypersonic is [MIT](./LICENSE). 

Contributing
---

There's still no guideline for contributing but we'd love to have you. Please e-mail me at andrerpena@gmail.com if you
want to get onboard. We can even schedule a Skype session.

Getting started
---

**Installing global dependencies**

Hypersonic depend on `webpack-dev-server`, `gulp` and `karma`

    npm install -g gulp
    npm install -g karma-cli
    npm install -g webpack-dev-server

**Installing**

Install by cloning the GitHub repo:

    git clone https://github.com/gearz-lab/hypersonic.git
    
**Starting in development mode**

Start the webpack-dev-server:

    npm run wps
    
Start the app:

    npm run start-dev
    
**Starting in production mode**

Build:

    gulp
    
Start the app:

    npm run start


 
