# ClearScore Tech Test

Congratulations on being selected to progress to the next stage of the interview process and to complete our tech test. The purpose of this test is to assess the quality of the code that you write, your approach to problem solving, and your ability to reason about the approaches and practices you have implemented.

There isn't necessarily a _correct_ or _perfect_ submission for this test, different approaches have various benefits and downsides, however you will be expected to defend your decisions if you are asked to attend a face-to-face interview.

In the same vein, do not worry too much about how much progress you make through each part of the test, but rather **make sure that what you _do_ complete is of a high, production-ready standard**. 

This is not a "timed-task", but we expect it to take around 4 hours. Anything you don't prioritise to complete should be mentioned in a comments.md file.

If you have any questions please do not hesitate to contact us.

## The Task

At ClearScore we have created our own version of what is known as a _Design System._ In short what this means is that every page across our product is built from the same base design elements: buttons, headings, icons, etc. which are pulled in and utilised everywhere to reduce bugs, improve consistency, and increase velocity.

For your submission you will build a microcosm of this Design System.  

_Please push any code changes to **this** repo, which has been setup as **private** so only you and ClearScore can see it._

### The Component

We're hoping to improve our user's experience by implementing an attractive "Insights" feature in the report section. These will be used to highlight certain aspects of a user's report, both in terms of what is going well and what can be improved.

Please implement this feature, consuming a subset of a credit report JSON payload in order to conditionally display the on/off track tokens. The component consists of a header, with either a horizontally scrollable list or grid of cards underneath, depending on the current viewport size. Each card is identical but for the pills & text therein.

![image](https://user-images.githubusercontent.com/21218317/76093511-fb1fae00-5fb8-11ea-98eb-2effebc28477.png)

### The Design System

The following are all the measurements and different values you will need to complete the task

**Border radii**

- `8px`
- `4px`

**Colours**

- "Midnight": `#253648`
- "Gallery": `#F7F7F8`
- CTA: `#0F81A3`
- CTA (hover): `#66AEC5`
- Green pill text: `#15693B`
- Green pill background: `#DDF9EA`
- Orange pill text: `#764C25`
- Orange pill background `#FDEFE2`
- Gray pill background `#EEEFF1`

**Font sizes**

- `20px`
- `16px`
- `14px`
- `12px`

**Font weights**

- `normal`
- `bold`

**Spacing**

- `24px`
- `16px`
- `10px`
- `8px`
- `4px`

**Shadows**

- `0 0.5rem 0.75rem rgba(0,0,0,0.16)`;

**Breakpoints**

- Small: min-width `375px`
- Medium: min-width `768px`
- Large: min-width `1024px`
- Extra Large: min-width `1280px`

### **Language**

The following language is to be used for each card. The language is the same whether or not something is "on track" or "off track".

- Header: Public information
  - Body: Bankruptcies and individual voluntary arrangements can damage your score
  - Impact: High Impact
- Header: Credit utilisation
  - Body: Using more than 50% of your available credit can damage your score
  - Impact: Medium Impact
- Header: Electoral roll
  - Body: Being on the electoral roll can improve your score
  - Impact: Medium Impact

For clarity, the on/off track language is as follows:

- On Track
- Off Track

### Business Logic

The following describes the logic for determining whether or not a particular user is `on` or `off` track depending upon their credit report JSON.

**Public information**

If the user has any CCJ or insolvencies, then they are considered to be `off track`.

If there is any information within the `personal.publicInfo.courtAndInsolvencies[]` array, they have CCJ or insolvency.

**Credit utilisation**

If the user has any credit card balance 50% or more of their limit, they are considered `off track`

An account it considered to be a credit card when `accounts[].accountCategory` is `credit_cards`

Their balance can be found under `accounts[].overview.balance.amount` and their limit `accounts[].overview.limit.amount`. 

**Electoral roll**

If the user is not on an electoral roll, they are considered to be `off track`. 

There is a boolean with this information found `personal.electoralRoll[].current` where `true` means they are on the electoral roll.

### The Designs

More detailed screenshots can be found at [/design](/design).

_You will note that padding and margins are not displayed - for the purpose of this test, please use best guess efforts._

**Small**

![image](https://user-images.githubusercontent.com/21218317/76093511-fb1fae00-5fb8-11ea-98eb-2effebc28477.png)

**Medium**

![image](https://user-images.githubusercontent.com/21218317/76093517-fce97180-5fb8-11ea-8516-9925ff68bbac.png)

**Large**

![image](https://user-images.githubusercontent.com/21218317/76093524-feb33500-5fb8-11ea-8aaa-79ff22b37e7b.png)

**Extra large**

![image](https://user-images.githubusercontent.com/21218317/76093528-01158f00-5fb9-11ea-9b92-cea5910a0e38.png)

**Designers comments:**

> The width of the card is dependent on the screen, and on small and medium screens 2 cards are full visible, with only small amount of the third visible.
>
> The height of the card is dependent on the copy, but all cards should be the same height.

### Project setup

It's up to you what frameworks and libraries you would like to utilise in this project, if any, but please note we are a React house.

If you use React, we recommend you use `npm init vite` or `create-react-app` as these will give you a lot of functionality for free, however if you have your own boilerplate then you are welcome to use that instead. Please separate the boilerplate and your own work into separate commits to make the work of the reviewers easier.

Please include a [COMMENTS.md](http://comments.md) with any decisions you made that you feel are worth highlighting and concessions you had to make due to the time constraints, as well as anything else you think we should be aware of when reviewing your code.

## Junior Applicants

Feel free to use the [mock-report.json](/mock-report.json) directly

## Mid+ Applicants

Please implement fetching the [report](/mock-report.json) via http call from the following API

- [https://api.jsonbin.io/v3/b/6107fbe9f14b8b153e05e714?meta=false](https://api.jsonbin.io/v3/b/6107fbe9f14b8b153e05e714?meta=false)

## Senior Applicants (Essential for seniors, Stretch Goal for others)

We'd love to see how the to implement an interaction where clicking the 'Electoral role' cards shows more [Insight Details](/mock-insight-details.json) found in this API:

- [https://api.jsonbin.io/v3/b/6128c389c5159b35ae04d4ed/1?meta=false](https://api.jsonbin.io/v3/b/6128c389c5159b35ae04d4ed/1?meta=false)

The additional information can be display how you like (e.g. modal, drawer, tool-tip etc). Our example is a 'drawer' which comes from the right shown within [/drawer-design](/drawer-design).

**Designers comments:**

> The 'drawer' UI is still being worked on, sorry! Please don't spend any time on the look and feel.
>
> The features are good to go though. We should show/hide the insight description with an 'on/off track' tag, the title and relevant description along with the additional information.

# What to focus on

- Production-ready quality i.e. tested code
- Getting more than one breakpoint implemented
- Sticking to the design
- Scalable / maintainable code

Good luck!
