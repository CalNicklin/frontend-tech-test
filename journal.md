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

With this implementation, I'll have type safety for the data AND the UI components, which means if short for time, I'll at least have static type checking across my app and I can have a pretty high level of confidence in browser level testing.

Nearly there - will then need to integration level implement the actual rendering function, test it with mock schema and handle loading and error states.

If i've got time, I'll also implement some kind of UI testing framework, maybe Playwright - in fact, this might take precedence over the rendering function tests because Playwright / browser level testing will actually cover the integration of the rendering function with the UI.
