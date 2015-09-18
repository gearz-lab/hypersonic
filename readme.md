![image](https://github.com/gearz-lab/gearz/blob/master/assets/gearz.png)

Gearz is a platform for developing data-centric business applications.

**Stack:**

 - [React.js](https://facebook.github.io/react/)
 - [Express.js](http://expressjs.com/)
 - [Bootstrap](http://getbootstrap.com/)
 - [Node.js](https://nodejs.org/)
 - [RethinkDB](http://rethinkdb.com/)

**Project status:**

Gearz is under active development. 1.0 release is planned for 2016 Q3.
About
---

Gearz is not a library, nor a framework. It is a platform. The most important thing to understand is that Gearz is not 
suited for any type of applications, it is a platform for creating *data-centric business applications*. So, what is this?
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
   
Gearz aims to provide you with the tools you need to create a successful application without having to deal with all these
hurdles.
 
Why do we need another platform?
---

There are some amazing platforms on the market already. Some examples are:

 - [SalesForce1](https://developer.salesforce.com/platform/overview)
 - [Visual Studio LightSwitch](https://msdn.microsoft.com/en-us/library/lightswitch.aspx)

We truly respect these platforms. However, an interesting thing about technology is that, once a more modern and powerful 
underlying technology arrives, it creates room for improvement. Some times, corporates are not dynamic enough to reshape
 on time.
 
Gearz is based on a modern and open stack. Designed for creating dynamic, real-time and responsive apps:

Node.js is [showing an unprecedented growth](http://apmblog.dynatrace.com/2015/04/09/node-js-is-hitting-the-big-time-in-enterprise-markets/)
. It's amazing how powerful is the community behind [NPM](https://www.npmjs.com/). We all love the security of static-typed languages, but experience is 
showing that, for dynamic applications, with the need for dynamic schemas, maybe a dynamic language like JavaScript is a better
fit.

Facebook's [React.js](https://facebook.github.io/react/) is amazing. It fits perfectly for creating reactive and responsive client-side components. One of
the reasons it excels is the ability to render the app both in the server and in the client, which is called "isomorphic" behavior.
As a bonus, it's learning curve is incredibly low.
 
[RethinkDB](http://rethinkdb.com/) is perfect for variable schema applications. It's reliable, really easy to shard and replicate and it
 supports server-side joins. Additionally, it's possible to subscribe for data change, which makes it a perfect fit for
 real-time applications.

Did I forget to mention? Gearz is free, even for commercial use, and it's solely based on free-to-use components.

Core concepts
---

**Configuration over programming**

As mentioned before, *data-centric business applications* share a common DNA. Most of the business logic should be
 handled by the platform, not the application. Gearz provides a framework that allows for *configuring* rather than
 *coding* for most of the scenarios.
 
Gearz relies heavily on *declarative reactive metadata*. Instead of coding, it's possible to *define* the existence of entities
as well as all of it's metadata. It's possible, for instance, to declare that an entity's property is invalid when a give
expression is true. The UI reacts automatically accordingly.

**Extreme customization**

In today's scenario, it's impossible to think of a *data-centric business application* that doesn't allow the customer
to extend it. Gearz is designed, from the core, to allow for maximum customization. Actually, the application developer
and the end-user share virtually the same capabilities.  

**Mobile first**

No need for comments. Gearz is designed to be mobile first. As we rely mostly on configuration and not on programming, we plan to use [React Native](https://facebook.github.io/react-native/)
to automatically generate mobile native builds with little to no code.

**Internationalization**

Gearz is designed to support translations, time-zones and multiple date and number formats. 

About the author
---

Hello, I'm André Pena, from Brazil. I work for Thomson Reuters as a Software Development Specialist and I work on Gearz
on most of the time that is left. [My SO profile](http://stackoverflow.com/users/192729/andrerpena?tab=profile) if you are interested. I hope you will enjoy using it as much as I enjoy implementing it.

[Follow me on twitter](https://twitter.com/andrerpena).

License
---

Gearz is [MIT](./LICENSE). 

Contributing
---

There's still no guideline for contributing but we'd love to have you. Please e-mail me at andrerpena@gmail.com if you
want to get onboard. We can even schedule a Skype session.

Getting started
---

**Installing global dependencies**

Gearz depend on `webpack-dev-server`, `gulp` and `karma`

    npm install -g gulp
    npm install -g karma-cli
    npm install -g webpack-dev-server

**Installing**

Install by cloning the GitHub repo:

    git clone https://github.com/gearz-lab/gearz.git
    
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


 
