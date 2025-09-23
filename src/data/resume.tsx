import { Icons } from "@/components/icons";
import { HomeIcon, FolderKanbanIcon, LayoutGrid, FileTextIcon } from "lucide-react";

export const DATA = {
  name: "Marcel Dabek",
  initials: "MD",
  url: "https://example.com",
  location: "",
  locationLink: "",
  description:
    "Mechanical engineering student. I turn ideas into real designs and enjoy helping others learn.",
  summary:
    "Currently studying Mechanical Engineering at the University of Connecticut. In addition to my academic work, I lead the EV Powertrain subsystem for UConn’s Formula SAE team, where __**I designed and integrated the [powertrain](/#projects), [accumulator](/#projects), and electrical structures for our first-ever [electric vehicle](/#projects)**__.",
  avatarUrl: "/headshot2.jpg",
  skills: [
    "Solidworks",
    "Ansys",
    "MATLAB",
    "Autodesk Fusion 360",
    "Manufacturing",
    "RaceStudio",
    "RMS GUI",
    "Bluebeam Revu",
    "MITCalc",
    "React",
    "Java",
    "Python",
    "Typescript",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/projects", icon: FolderKanbanIcon, label: "Projects" },
    { href: "/gallery", icon: LayoutGrid, label: "Gallery" },
    { href: "/resume", icon: FileTextIcon, label: "Resume" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/MarcelDabek",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/marceldabek/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:hello@example.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Infiltrator Water Technologies",
      href: "https://www.infiltratorwater.com/",
      badges: [],
      location: "",
      title: "Product Engineering Intern",
      logoUrl: "/iwt.png",
      start: "May 2025",
      end: "August 2025",
      description:
        "Designed and released multiple injection-molded components (DFM). Resolved a critical assembly issue blocking an advanced treatment model. Developed a low-cost modification package for the high-level alarm. Led efforts to bring manufacturing in-house, improving margins by ~$50K/year. Set up, tested and installed a new R&D project. Produced drawing packages that enabled supplier negotiations.",
    },
    {
      company: "UConn Formula SAE",
      href: "https://fsaeonline.com/",
      badges: [],
      location: "",
      title: "Lead EV Powertrain Engineer",
      logoUrl: "/fsae.png",
      start: "August 2023",
      end: "Present",
      description:
        "Led UConn FSAE’s first electric vehicle to a 14th-place national finish, owning the powertrain, accumulator, and electrical integration. Designed the powertrain from first principles—MATLAB gear-ratio modeling (predicted 1.05 g launch), ANSYS structural/topology optimization (~35% mass reduction), and vibration tuning to shift modes above the motor’s operating range. Reverse-engineered and designed a custom motor shaft to interface with a Yamaha R6 sprocket, validating geometry with 3D scans and proper fits/heat-treat. Architected a 440-cell, 92 kW, 8.32 kWh accumulator that met FSAE rules without active cooling, built in two weeks, and later redesigned to cut weight 25% and volume 35% while improving serviceability and thermal paths.",
    },
  ],
  education: [
    {
      school: "University of Connecticut",
      href: "https://uconn.edu",
      degree: "Bachelor of Engineering (In Progress)",
  logoUrl: "/uconn.svg",
      start: "2023",
      end: "2027",
    },
  ],
  projects: [
    {
      title: "Accumulator",
      slug: "accumulator",
      href: "https://www.uconnformulasae.com/",
      dates: "Aug 2024 - May 2025",
      active: true,
      description:
        "With the 2025 [UConn Formula SAE](https://www.uconnformulasae.com/) EV program, I led the end-to-end design of our high-voltage accumulator—owning architecture, packaging, and safety systems.",
      technologies: [
        "Solidworks",
        "Ansys",
        "RMS GUI",
        "Orion BMS",
        "MATLAB",
        "CAM",
        "PDM",
        "Race Studio",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.uconnformulasae.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/videos/accumulator/preview.mp4",
    },
    {
      title: "Powertrain",
      slug: "powertrain",
      href: "https://www.uconnformulasae.com/",
      dates: "Aug 2023 - May 2024",
      active: true,
      description:
        "Designed, manufactured, assembled the motor and differential. Built the CAD in SolidWorks and verified with ANSYS (static, modal, fatigue).",
      technologies: [
        "Solidworks",
        "Ansys",
        "MATLAB",
        "MIT Calc",
        "Race Studio",
        "Fatigue",
        "Modal",
        "Static",
        "CAM",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.uconnformulasae.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/videos/powertrain/preview.mp4",
    },
    {
      title: "Engineering Intern",
      slug: "engineering-intern",
      href: "https://www.infiltratorwater.com/",
      dates: "March 2025 - May 2025",
      active: true,
      description:
        "Rapidly iterated through 26 designs. Transitioned production in-house (≈$50K/yr savings), and set up, tested, and installed new R&D projects.",
      technologies: [
        "Injection Molding",
        "DFM",
        "Solidworks",
        "Solidworks Simulation",
        "Draft Analysis",
        "Rapid Prototyping",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.infiltratorwater.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "",
      video: "/videos/engineering-intern/preview.mp4",
    },
    {
      title: "Team Ops Hub",
      slug: "project-manager-website",
      href: "https://marceldabek.github.io/fsae-dashboard/",
      dates: "July 2025 - August 2025",
      active: true,
      description:
        "Built a project-management web app that syncs with Discord for SSO and roster sync, gives members mobile-friendly personal dashboards, and maps all projects on a timeline with dependencies and critical-path tracking.",
      technologies: [
        "Firebase",
        "Typescript",
        "Discord API",
        "Untitled UI",
        "Shadcn UI",
        "TailwindCSS",
        "Node.js",
      ],
      links: [
        {
          type: "Website",
          href: "https://marceldabek.github.io/fsae-dashboard/",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/marceldabek/fsae-dashboard",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "",
      video: "/videos/project-manager-website/preview.mp4",
    },
    // Placeholder projects for Projects page (previews empty; replace later)
    {
      title: "CAD Vault",
      slug: "cad-vault",
      href: "#",
      dates: "2025",
      active: false,
      description: "A placeholder CAD component library and vault.",
      technologies: [
        "Solidworks",
        "PDM",
        "DFM",
        "CAM",
        "Drafting",
        "Revision Control",
        "BOM",
        "Design Reviews",
      ],
      links: [
        { type: "Website", href: "#", icon: <Icons.globe className="size-3" /> },
      ],
      image: "",
    },
    {
      title: "Thermal Lab",
      slug: "thermal-lab",
      href: "#",
      dates: "2025",
      active: false,
      description: "A placeholder for thermal simulations and experiments.",
      technologies: [
        "Ansys",
        "MATLAB",
        "CFD",
        "Heat Transfer",
        "Conduction",
        "Convection",
        "Radiation",
        "Mesh Refinement",
      ],
      links: [
        { type: "Website", href: "#", icon: <Icons.globe className="size-3" /> },
      ],
      image: "",
    },
    {
      title: "Drive Dynamics",
      slug: "drive-dynamics",
      href: "#",
      dates: "2025",
      active: false,
      description: "A placeholder for drivetrain modeling and testing.",
      technologies: [
        "Race Studio",
        "MATLAB",
        "Fatigue",
        "Modal",
        "Static",
        "Optimization",
        "Gear Design",
        "Tolerance Stackups",
      ],
      links: [
        { type: "Website", href: "#", icon: <Icons.globe className="size-3" /> },
      ],
      image: "",
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "Hack The North",
      dates: "September 14th - 16th, 2018",
      location: "Waterloo, Ontario",
      description:
        "Developed a mobile application which delivers university campus wide events in real time to all students.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
    {
      title: "FirstNet Public Safety Hackathon",
      dates: "March 23rd - 24th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a mobile application which communcicates a victims medical data from inside an ambulance to doctors at hospital.",
      icon: "public",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/firstnet.png",
      links: [],
    },
    {
      title: "DeveloperWeek Hackathon",
      dates: "February 3rd - 4th, 2018",
      location: "San Francisco, California",
      description:
        "Developed a web application which aggregates social media data regarding cryptocurrencies and predicts future prices.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/developer-week.jpg",
      links: [
        {
          title: "Github",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/cryptotrends/cryptotrends",
        },
      ],
    },
    {
      title: "HackDavis",
      dates: "January 20th - 21st, 2018",
      location: "Davis, California",
      description:
        "Developed a mobile application which allocates a daily carbon emission allowance to users to move towards a sustainable environment.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-davis.png",
      win: "Best Data Hack",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2018/white.svg",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/my6footprint",
        },
        {
          title: "ML",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/my6footprint-machine-learning",
        },
        {
          title: "iOS",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/CarbonWallet",
        },
        {
          title: "Server",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/Wallet6/wallet6-server",
        },
      ],
    },
    {
      title: "ETH Waterloo",
      dates: "October 13th - 15th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a blockchain application for doctors and pharmacists to perform trustless transactions and prevent overdosage in patients.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/eth-waterloo.png",
      links: [
        {
          title: "Organization",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ethdocnet",
        },
      ],
    },
    {
      title: "Hack The North",
      dates: "September 15th - 17th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed a virtual reality application allowing users to see themselves in third person.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Streamer Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/htn2017",
        },
        {
          title: "Client Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/RTSPClient",
        },
      ],
    },
    {
      title: "Hack The 6ix",
      dates: "August 26th - 27th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed an open platform for people shipping items to same place to combine shipping costs and save money.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-6ix.jpg",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/ShareShip/ShareShip",
        },
        {
          title: "Site",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://share-ship.herokuapp.com/",
        },
      ],
    },
    {
      title: "Stupid Hack Toronto",
      dates: "July 23rd, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a chrome extension which tracks which facebook profiles you have visited and immediately texts your girlfriend if you visited another girls page.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/stupid-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/nsagirlfriend/nsagirlfriend",
        },
      ],
    },
    {
      title: "Global AI Hackathon - Toronto",
      dates: "June 23rd - 25th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a python library which can be imported to any python game and change difficulty of the game based on real time emotion of player. Uses OpenCV and webcam for facial recognition, and a custom Machine Learning Model trained on a [Kaggle Emotion Dataset](https://www.kaggle.com/c/challenges-in-representation-learning-facial-expression-recognition-challenge/leaderboard) using [Tensorflow](https://www.tensorflow.org/Tensorflow) and [Keras](https://keras.io/). This project recieved 1st place prize at the Global AI Hackathon - Toronto and was also invited to demo at [NextAI Canada](https://www.nextcanada.com/next-ai).",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/global-ai-hackathon.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://syncedreview.com/2017/06/26/global-ai-hackathon-in-toronto/",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/TinySamosas/",
        },
      ],
    },
    {
      title: "McGill AI for Social Innovation Hackathon",
      dates: "June 17th - 18th, 2017",
      location: "Montreal, Quebec",
      description:
        "Developed realtime facial microexpression analyzer using AI",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/ai-for-social-good.jpg",
      links: [],
    },
    {
      title: "Open Source Circular Economy Days Hackathon",
      dates: "June 10th, 2017",
      location: "Toronto, Ontario",
      description:
        "Developed a custom admin interface for food waste startup <a href='http://genecis.co/'>Genecis</a> to manage their data and provide analytics.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/open-source-circular-economy-days.jpg",
      win: "1st Place Winner",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/genecis",
        },
      ],
    },
    {
      title: "Make School's Student App Competition 2017",
      dates: "May 19th - 21st, 2017",
      location: "International",
      description: "Improved PocketDoc and submitted to online competition",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/make-school-hackathon.png",
      win: "Top 10 Finalist | Honourable Mention",
      links: [
        {
          title: "Medium Article",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://medium.com/make-school/the-winners-of-make-schools-student-app-competition-2017-a6b0e72f190a",
        },
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native",
        },
      ],
    },
    {
      title: "HackMining",
      dates: "May 12th - 14th, 2017",
      location: "Toronto, Ontario",
      description: "Developed neural network to optimize a mining process",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-mining.png",
      links: [],
    },
    {
      title: "Waterloo Equithon",
      dates: "May 5th - 7th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Pocketdoc, an app in which you take a picture of a physical wound, and the app returns common solutions or cures to the injuries or diseases.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/waterloo-equithon.png",
      links: [
        {
          title: "Devpost",
          icon: <Icons.globe className="h-4 w-4" />,
          href: "https://devpost.com/software/pocketdoc-react-native",
        },
        {
          title: "YouTube",
          icon: <Icons.youtube className="h-4 w-4" />,
          href: "https://www.youtube.com/watch?v=XwFdn5Rmx68",
        },
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/pocketdoc-react-native",
        },
      ],
    },
    {
      title: "SpaceApps Waterloo",
      dates: "April 28th - 30th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed Earthwatch, a web application which allows users in a plane to virtually see important points of interest about the world below them. They can even choose to fly away from their route and then fly back if they choose. Special thanks to CesiumJS for providing open source world and plane models.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/space-apps.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/earthwatch",
        },
      ],
    },
    {
      title: "MHacks 9",
      dates: "March 24th - 26th, 2017",
      location: "Ann Arbor, Michigan",
      description:
        "Developed Super Graphic Air Traffic, a VR website made to introduce people to the world of air traffic controlling. This project was built completely using THREE.js as well as a node backend server.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/mhacks-9.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/threejs-planes",
        },
      ],
    },
    {
      title: "StartHacks I",
      dates: "March 4th - 5th, 2017",
      location: "Waterloo, Ontario",
      description:
        "Developed at StartHacks 2017, Recipic is a mobile app which allows you to take pictures of ingredients around your house, and it will recognize those ingredients using ClarifAI image recognition API and return possible recipes to make. Recipic recieved 1st place at the hackathon for best pitch and hack.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/starthacks.png",
      win: "1st Place Winner",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-ionic",
        },
        {
          title: "Source (Server)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/recipic-rails",
        },
      ],
    },
    {
      title: "QHacks II",
      dates: "February 3rd - 5th, 2017",
      location: "Kingston, Ontario",
      description:
        "Developed a mobile game which enables city-wide manhunt with random lobbies",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/qhacks.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2017/white.svg",
      links: [
        {
          title: "Source (Mobile)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/dillionverma/human-huntr-react-native",
        },
        {
          title: "Source (API)",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/mattBlackDesign/human-huntr-rails",
        },
      ],
    },
    {
      title: "Terrible Hacks V",
      dates: "November 26th, 2016",
      location: "Waterloo, Ontario",
      description:
        "Developed a mock of Windows 11 with interesting notifications and functionality",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/terrible-hacks-v.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/justinmichaud/TerribleHacks2016-Windows11",
        },
      ],
    },
    {
      title: "Portal Hackathon",
      dates: "October 29, 2016",
      location: "Kingston, Ontario",
      description:
        "Developed an internal widget for uploading assignments using Waterloo's portal app",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/portal-hackathon.png",
      links: [
        {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/UWPortalSDK/crowmark",
        },
      ],
    },
  ],
} as const;

