# Aerthis
## Inspiration
We came up with the idea for Aerthis by wanting to solve a problem many of us face in everyday conversations: the lack of effortless and well-rounded information sources about specific countries' role in the worsening of climate change and augmenting pollution in general.

## What it does
The way you interact with Aerthis is via a 3D representation of Earth, overlaid with climate-related heat maps like global temperature rise since the 50s and the location of plastic in the oceans. You can then tap on a specific region of the world to see a collection of data about its economic and environmental status. Is also given is a summary of the recommended climate actions for the parent country. Aerthis enables you to gain deep geographical and climate-related insights driven by current data.

## How we built it
A lot of the work was centred around data collection and converting it into formats we could work with. We also concentrated a lot of energy into the UI, to make it feel natural and easy to use, while remaining powerful.
We wrote many Python scripts to scrape the data we needed and to aggregate it into formats we could use. The project runs on a web stack, with a backend powered by Flask and a frontend made with React. The globe is powered by `react-globe.gl` and we make use of Gemini for search and information complements. Here are our data sources:
- Ocean Plastics: [https://aomi.env.go.jp/]
- Air Quality: [https://aqicn.org/api/]
- Disaster Relief Spending: [https://public.emdat.be/]
- Temperature Anomalies: [https://ourworldindata.org/temperature-anomaly]

## Challenges we ran into
We had some problems with a rate-limited API we simply had to scrape. We chose to scrape with less resolution, but the end result (the air quality heat map) remains something we are proud of.

## Accomplishments that we're proud of
We are very proud of the simplicity in the conceptualization and in the execution of our vision, it allowed us to spend significant time to refine mechanisms like the UX and to fine-tune the prompts we use for Gemini. We are very happy with how the 3D map turned out, as it performs well on a range of devices.

## What we learned
We learned that the point of a hackathon is to strive for simplicity in our idea while leaving space for technical accomplishment. We learned how to interface with a diversity of data formats and geography-centred libraries.

## What's next for Aerthis
We'd like to add specific information about big corporate actors in a bid to make it easy to learn about companies that take their environmental impact seriously and those who don't.
