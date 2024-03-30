process model

electron inherits its multi-process architecture from chromium, which makes the framework architecturally very similar to a modern web browser.

this guide will expand on the concepts applied in the tutorial

why not a single process?

web browsers are incredibly complicated applications. aside from their primary ability to display web content, they have many secondary responsibilities, such as managing multiple windows and loading third-party extensions.

in the earlier days, browsers usually used a single process for all of this funtionality.

although this pattern meant less overhead for each tab you had open, it also meant that one website crashing or hanging would affect the entire browser.

the multi-process model

to solve this problem, the chrome team decided that each tab would render in its own process, limiting the harm that buggy or malicious code on a web page could cause to the app as a whole. a single browser process then controls these processes, as well as the application lifecycle as a whole. this diagram below fromt he chrome comic visualizes this model:

electron applications are structured very similarly. as an app developer, you control two types of processes: main and renderer. these are analogous to chrome's own browser and renderer processes outlined above.
