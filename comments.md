Data service -
- Limited test coverage especially around refetching data, 
- Lack of clarity on teh actual schema properties of the API, for example I might be over typing it.


Design system -
I think the naming of the colors is overly semantic. For example, 'green pill text' means the text is forever green with that token. It would be better to have colors named as e.g. Brand-1[step-2] for hue and shading. Then, we can easily swap out the color for a different value. So, I've mocked up a micro design system as such.

Using cva - grabbed much boilerplate code from previous projects.

Missing localisation

Not testing for specific font sizes etc