import { Icons } from "@/components/icons";
import { HomeIcon, FolderKanbanIcon, LayoutGrid, FileTextIcon } from "lucide-react";

export const DATA = {
  name: "Marcel Dabek",
  initials: "MD",
  url: "https://marceldabek.github.io",
  location: "",
  locationLink: "",
  description:
    "Mechanical engineering student. I turn ideas into real designs and enjoy helping others learn.",
  summary:
    "Currently studying Mechanical Engineering at the University of Connecticut, where I’m the **incoming EV Chief Engineer** of UConn’s Formula SAE team for the 2026-2027 season after two years leading the EV Powertrain subsystem. I designed our [powertrain](/#projects) and led the [CT-17 accumulator](/projects/accumulator-ct17) end-to-end, owning the mechanical design, cell selection, and pack sizing. This past season the team placed **5th overall** at Formula SAE Michigan, up from 14th the year before. This summer I’m interning at both Pratt & Whitney and Transcend Mechanics.",
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
    email: "marcel.dabek@uconn.edu",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/marceldabek",
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
        url: "mailto:marcel.dabek@uconn.edu",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Pratt & Whitney",
      href: "https://www.prattwhitney.com/",
      badges: [],
      location: "Middletown, CT",
      title: "Engineering Intern, CIMA Group",
      logoUrl: "/pratt-whitney.png",
      start: "May 2026",
      end: "Present",
      description:
        "Manufacturing-engineering intern with the Composites Impact Manufacturing Analysis (CIMA) group at Pratt & Whitney’s Middletown engine center. I do [R&D on the automated composites machine at CCAT](/projects/pratt-whitney) for the composite fan blade, and support the F135 engine program through manufacturing efforts, analyzing test data on metal rotors flagged for defects. Held concurrently with an internship at Transcend Mechanics.",
    },
    {
      company: "Transcend Mechanics",
      href: "https://transcendmechanics.com/",
      badges: [],
      location: "",
      title: "Mechanical Engineering & Software Development Intern",
      logoUrl: "/transcend-mechanics.jpg",
      start: "May 2026",
      end: "Present",
      description:
        "Intern at a startup building deFlex, a SaaS platform that generatively designs flexures and compliant mechanisms straight from engineering inputs. On the software side I work with AI-assisted development to build product features and rebuilt the UI from scratch, which improved the design workflow tremendously. On the mechanical side I designed and built a [mechanical test rig](/projects/fatigue-test-rig) for characterizing flexures.",
    },
    {
      company: "UConn Formula SAE",
      href: "https://fsaeonline.com/",
      badges: [],
      location: "",
      title: "Incoming EV Chief Engineer (2026-2027), Lead EV Powertrain Engineer",
      logoUrl: "/fsae.png",
      start: "August 2023",
      end: "Present",
      description:
        "For the 2026-2027 season I will step up as EV Chief Engineer, owning every technical decision across the EV. For my first two years I led the EV Powertrain subsystem, taking UConn FSAE’s first-ever EV to a 14th-place national finish and a 1st-place Efficiency trophy and owning the chain-drive [powertrain](/projects/powertrain) end-to-end: I reverse-engineered a Yamaha R6 output shaft, used MATLAB gear-ratio modeling to select the final drive, and shifted vibration modes above the motor’s operating range with targeted ANSYS analysis. I contributed to the first-generation [CT-16 accumulator](/projects/accumulator-ct16) and led the complete design of the second-generation [CT-17 pack](/projects/accumulator-ct17): mechanical design, cell selection, and pack sizing. I also built a project-management web app with Discord sync, SSO, and a critical-path timeline to keep the team on schedule.",
    },
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
        "Led ops-automation to bring ~400,000 caps/year production in-house, improving margins by ~$50K/year. Evaluated robots plus a packaging redesign that projected 50–75% fewer manual interactions per shift. Iterated through 26 designs using additive manufacturing and a Design–FEA–Test loop to de-risk tooling. Ramped on DFM for injection molding, released three components, and added a [clip feature](/projects/engineering-intern) that eliminated install time. Developed a low-cost modification package for a high-level alarm by integrating a float valve into existing infrastructure. Set up, tested, and installed leading-edge R&D projects, and produced 50+ drawings that enabled supplier negotiations.",
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
      title: "CT-17 Accumulator",
      slug: "accumulator-ct17",
      href: "https://www.uconnformulasae.com/",
      dates: "August 2025 - June 2026",
      active: true,
      description:
        "I lead the complete end-to-end design of [UConn FSAE](https://www.uconnformulasae.com/)'s second-generation high-voltage accumulator (CT-17), owning mechanical design, cell selection, and pack sizing. Using real 2025 endurance data I resized the pack, simulated and selected the Molicel P50B cell, and validated the thermal and current-sharing design before build.",
      technologies: [
        "Solidworks",
        "Ansys Thermal-Electric",
        "Orion BMS 2",
        "K-Weld",
        "MATLAB",
        "Simulink",
        "Weld Drawings",
        "GD&T",
        "DFM",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.uconnformulasae.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/accumulator-ct17-exploded.png",
    },
    {
      title: "Powertrain",
      slug: "powertrain",
      href: "https://www.uconnformulasae.com/",
  dates: "August 2023 - May 2024",
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
      dates: "May 2025 - August 2025",
      active: true,
      description:
        "During my 2025 Summer Internship with Infiltrator Water Technologies I rapidly iterated through 26 designs. Transitioned production in-house (≈$50K/yr savings), and set up, tested, and installed new R&D projects.",
      technologies: [
        "Injection Molding",
        "DFM",
        "Solidworks",
        "FEA",
        "Draft Analysis",
        "Drawings",
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
    {
      title: "Manufacturing R&D at Pratt & Whitney",
      slug: "pratt-whitney",
      href: "https://www.prattwhitney.com/",
      dates: "May 2026 - Present",
      active: true,
      description:
        "Manufacturing-engineering work at Pratt & Whitney across two threads: R&D on the automated composites machine at CCAT for the composite fan blade, and defect inspection and tracking on metal rotors for the F135 engine program.",
      technologies: [
        "Manufacturing Engineering",
        "Defect Analysis",
        "Composites",
        "Quality",
        "Inspection",
        "DFM",
      ],
      links: [
        {
          type: "Website",
          href: "https://www.prattwhitney.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/pw-composite-cell.jpg",
    },
    {
      title: "Fatigue Test Rig",
      slug: "fatigue-test-rig",
      href: "https://transcendmechanics.com/",
      dates: "February 2026",
      active: true,
      description:
        "A closed-loop, force-controlled fatigue rig I designed and built at Transcend Mechanics to validate the fatigue life of the compliant mechanisms generated by deFlex. It captures a full force-displacement curve every cycle to catch stiffness degradation and hysteresis, runs over 100,000 cycles a day on a self-reacting 80/20 C-frame, and came in under $1,000.",
      technologies: [
        "Test Rig Design",
        "Closed-Loop Control",
        "Load Cell / DAQ",
        "Fatigue Testing",
        "Stepper Motor",
        "80/20",
        "CAD",
      ],
      links: [
        {
          type: "Website",
          href: "https://transcendmechanics.com/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/fatigue-rig-render.png",
    },
    {
      title: "CT-16 Accumulator",
      slug: "accumulator-ct16",
      href: "https://www.uconnformulasae.com/",
      dates: "August 2024 - May 2025",
      active: true,
      description:
        "On [UConn FSAE](https://www.uconnformulasae.com/)'s first-ever EV (CT-16), I helped design and build the high-voltage accumulator, contributing to the pack architecture, packaging, and hands-on assembly of our 440-cell, 462 V pack through its first competition season.",
      technologies: [
        "Solidworks",
        "Ansys",
        "Orion BMS",
        "MATLAB",
        "Simulink",
        "CAM",
        "PDM",
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
    // Placeholder projects for Projects page (previews empty; replace later)
    {
      title: "Flow Meter - DIY PCB",
      slug: "pcb-design",
      href: "#",
  dates: "2025",
      active: true,
      description:
        "A self-directed project: I tried to DIY a handheld water-dosing tool (a device that dispenses a preset amount of water and then shuts off, used to mix floor self-leveler) after the commercial version turned out to be very expensive. I designed the PCB myself for the first time to help my dad's floor-prep company. It was a fun first dive into electronics and board design.",
      technologies: [
        "PCB Design",
        "Electronics",
        "Microcontroller",
        "Soldering",
        "Prototyping",
        "CAD",
      ],
      links: [
        { type: "Website", href: "#", icon: <Icons.globe className="size-3" /> },
      ],
      image: "/pcb1.png",
    },
    {
      title: "Solidworks Workshops",
      slug: "solidworks-workshops",
      href: "#",
  dates: "September 2025",
      active: true,
      description:
        "I led recruiting and CAD education for UConn FSAE, driving 600 sign-ups, the largest in team history, and ran hands-on classroom workshops where students learned SolidWorks with TAs walking the room to help. Across four sessions of two classrooms each, roughly 100 students a day were introduced to Formula SAE and the design work behind it.",
      technologies: [
        "Solidworks",
        "Teaching",
        "Recruiting",
        "Leadership",
        "CAD",
        "Mentorship",
      ],
      links: [
        { type: "Website", href: "#", icon: <Icons.globe className="size-3" /> },
      ],
      image: "/workshop1.jpg",
    },
    {
      title: "Electrical Structures",
      href: "#",
  dates: "March 2025 - May 2025",
      active: false,
      description: "Bracketry and composite/metal structures for mounting LV/HV systems: vibration isolation, serviceability, and harness routing.",
      technologies: [
        "Solidworks",
        "Tolerance Stackups",
      ],
      links: [
        { type: "Website", href: "#", icon: <Icons.globe className="size-3" /> },
      ],
      image: "/electricalstructure1.jpg",
    },
  ],
} as const;

