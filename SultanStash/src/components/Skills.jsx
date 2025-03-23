// components/Skills.js
import React from "react";

const skills = {
  languages: [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
      alt: "JavaScript",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      alt: "HTML5",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
      alt: "CSS3",
    },

    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-plain.svg",
      alt: "Python",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
      alt: "SQL",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      alt: "mongodb",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      alt: "Java",
    },
  ],

  webstuff: [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      alt: "React",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      alt: "Node.js",
    },
  ],

  other: [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      alt: "git",
    },
    {
      src: "../assets/github.png",
      alt: "github",
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      alt: "AWS",
    },
  ],
};

function Skills() {
  return (
    <section className="skills-section flex-col pro">
      <h2 className="title">Skills</h2>

      <p className="sub-title">Languages</p>
      <div className="tools-container flex-row">
        {skills.languages.map((skill, index) => (
          <img key={index} src={skill.src} alt={skill.alt} />
        ))}
      </div>

      <p className="sub-title">Frontend & Backend Technologies</p>
      <div className="tools-container flex-row">
        {skills.webstuff.map((skill, index) => (
          <img key={index} src={skill.src} alt={skill.alt} />
        ))}
      </div>

      <p className="sub-title">Other Stuff</p>
      <div className="tools-container flex-row">
        {skills.other.map((skill, index) => (
          <img key={index} src={skill.src} alt={skill.alt} />
        ))}
      </div>
    </section>
  );
}

export default Skills;
