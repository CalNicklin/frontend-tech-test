29th Dec -
Cool! Let's get into this. 

I'm going with vanilla React for this, I'd usually work on Next.js but I don't think it's necessary for this. I'm using pnpm and of course, Typescript.

I'm adding Vercel's house style guide linting presets. They're strict and well judged IMO, and I've applied this to recent work I've released.

Added Prettier
Added eslint / vercel style guide. Had to downgrade the eslint version to 8.x to get it to work. 

1st Jan -
Have changed my mind over the last few days - going to have a go at implementing SDUI for this, because why not? I'm interested in it. Will implement a Node service (Hono) to handle fetching the external API data, then transforming into a rendering schema. I assume that in production Clearscore would be reading from a database, but for this test, will just use the API because of scope and time. I like using Hono because it has an awesome integration with Zod, so you can type routes and generate OpenAPI scalar docs at the same time. Nice.

I'm going to develop this with a TDD / CDD approach. I'll start with CDD to strong up the API service, then I'll implement all types with zod, based on the shape of the API response. I will use Tanstack Query for all fetching and caching, and I can use my zod schemas inside the query fetch functions to infer the types of the data AND validate schema at runtime, nice. I'm deliberately doing this instead of passing a type argument to the useQuery generic, because the query function actually accepts 4 generics, and I dont want the other 3 to choose defaults that I don't want - by allow tanstack query / TS to infer the return type, i'm not forced to use the defaults.

The other cool thing about using zod for schemas is that I can use these same types in my UI component props, so I've got a single source of truth for the prop data types AND runtime validation. On a full stack node app, I'd like to use Drizzle for the database ORM, and then use the same zod schemas for the data types in the database models.

Next I can spec some tests for the API client, just to make sure I don't forget to handle errors, etc.

Then I can get down to the actual business logic of the SDui service. It will do 2 things:
1. Receive the API data, and combine it with the defined UI structure (I assume in production this would come form some kind of CMS)
2. Transform the data into a rendering schema, and pass it to the React rendering function.

Should be straight forward to implement this in a TDD approach, basically just testing that the data is transformed correctly, and that invalid data is handled gracefully.

This service will be aware of the design system, and will pass component props such as 'type', 'variant', 'size', 'color', etc. which will be used in my component with cva to handle the styling.

**Edit:**
Thinking about this, I'm not going to implement CVA. I think it will limit the advantages of the SDUI approach i.e. dynamic styling. I'll just use the tailwind classes directly in the component.
**Edit again:**
I've changed my mind again. After doing some more digging into SDui, reading e.g. https://github.com/csmets/Server-Driven-UI/blob/master/docs/README.md I actually think CVA is a good decision. "The server should dictate the presentation, but should never control the design." Therefore the variants used by CVA can be passed from the server, and the client components handle the design classes.

With this implementation, I'll have type safety for the data AND the UI components, which means if short for time, I'll at least have static type checking across my app and I can have a pretty high level of confidence in browser level testing.

Nearly there - will then need to integration level implement the actual rendering function, test it with mock schema and handle loading and error states.

If i've got time, I'll also implement some kind of UI testing framework, maybe Playwright - in fact, this might take precedence over the rendering function tests because Playwright / browser level testing will actually cover the integration of the rendering function with the UI.


Work log:

I've setup my directory structure with path aliases, Tsconfig, and added a .env file.

Setup basic CI.

I've also added a src/env.ts file to type the env variables, ensuring that the env variables are valid and that the app will exit if they are not.

Use my friend AI to update the README.md file with the new project structure.

Just restructued the project so that test docs are in the root, and the src folder is just the source code.

Updated thinking on CVA.

Starting to actually code! Starting with the server. 

Implemented it.todo for the data service, now working through it. 

Converted the mock report to a zod schema.

Completed implementing the data service tests. Admit that it's very basic in it's implementation especially around fetching - I think out of scope for this UI focused test.

Now working on the Hono app. Leaning on previous work I've done to implement the basic structure of this.

I'm using the Hono router to implement the routes. I'm using the zod-openapi package to generate the type safety in route handlers - i'm not actually implementing the OpenAPI spec here (even though its generated), because of timing, but I like the API provided by the package and of course in production I'd be publishing the OpenAPI spec too. I'm using a nice lib called Stoker which provides Hono helper methods. 

Have got basic tests working for the credit report route, but I now need to implement the actual SDui service and retrunng that schema.

I've decided ti implement the sdui schema as a component level ui. So, the insights cards will be split into, text, header etc.

3rd Jan:

I've written my tests for the SDui service business logic, and I've implemented the service.

Added some nice touches to the server and client script to run the app which uses concurrently to run the server and client in parallel, with nice colors.

Disabled the eslint rule for explicit function return types, because I want TS to infer the return type, mostly.

Noticed in CI that my credit route tests failing - because I had forgot to update my tests now I am returning a SDUI schema, not just the credit report.

Resolved a weird git error where app.tsx / App.tsx filename not recognised.



